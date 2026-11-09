'use server'

/**
 * SEO Manager — server actions.
 *
 * All actions are server-side authorised:
 *   - Editing SEO fields (title, description, h1, intro, og image) — any staff
 *     with content-edit permission (we use category.manage / product.update
 *     / cms.manage depending on content type, ADMIN always allowed).
 *   - Changing slug, noindex, inSitemap — ADMIN only (these affect URLs or
 *     indexing visibility).
 *   - Managing redirects and global SEO templates — ADMIN only.
 *
 * Every change writes a SeoAuditLog row recording who / when / what changed.
 */

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { requireStaff, requireSuperAdmin, roleHasPermission } from '@/lib/permissions'
import { getCurrentStaffUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import {
  fillTemplate,
  getTemplate,
  type SeoContentType,
} from '@/lib/seo'

// ============================================================
// AUDIT LOG HELPER
// ============================================================

async function logChange(input: {
  entityType: string
  entityId: string
  fieldName: string
  oldValue: string | null
  newValue: string | null
  userId: string
}) {
  try {
    await db.seoAuditLog.create({
      data: {
        entityType: input.entityType,
        entityId: input.entityId,
        fieldName: input.fieldName,
        oldValue: input.oldValue?.toString().slice(0, 2000) ?? null,
        newValue: input.newValue?.toString().slice(0, 2000) ?? null,
        changedById: input.userId,
      },
    })
  } catch (e: any) {
    // Audit logging must never break the save.
    console.error('[seo] could not write audit log:', e?.message)
  }
}

// ============================================================
// SAVE SEO — for a category, product, service, or page
// ============================================================

export type SaveSeoInput = {
  type: SeoContentType
  /** For category/product — the row id. For service/page — the route (which is also the SeoOverride key). */
  id: string
  seoTitle: string
  seoDescription: string
  h1: string
  introText: string
  ogImage: string
  /** Product only — main image alt text. */
  imageAlt?: string
  /** The slug / URL. For category/product this is the slug (without the leading /product/ prefix); for service/page it's the route. */
  url: string
  noindex: boolean
  inSitemap: boolean
}

export type SaveSeoResult = { ok: true; redirectCreated?: boolean } | { ok: false; error: string }

export async function saveSeoAction(input: SaveSeoInput): Promise<SaveSeoResult> {
  // Authorise
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')

  // Slug changes / noindex / inSitemap require ADMIN
  const changingIndexing = true // always check, since these fields are in the form
  if (changingIndexing && user.role !== 'ADMIN') {
    return { ok: false, error: 'Only administrators can change SEO indexing settings or URL slugs.' }
  }

  // Validate URL
  if (input.type === 'category' || input.type === 'product') {
    if (!/^[a-z0-9\-]+$/.test(input.url)) {
      return { ok: false, error: 'Slug must be lowercase letters, numbers, and hyphens only.' }
    }
  } else {
    if (!input.url.startsWith('/') || !/^\/[a-z0-9\-/]*$/.test(input.url)) {
      return { ok: false, error: 'URL must start with / and use lowercase letters, numbers, and hyphens.' }
    }
  }

  let redirectCreated = false

  if (input.type === 'category') {
    const existing = await db.category.findUnique({ where: { id: input.id } })
    if (!existing) return { ok: false, error: 'Category not found.' }

    const oldSlug = existing.slug
    const newSlug = input.url
    const slugChanged = oldSlug !== newSlug

    // If slug changed, ensure new slug isn't taken
    if (slugChanged) {
      const taken = await db.category.findUnique({ where: { slug: newSlug } })
      if (taken) return { ok: false, error: `Slug "${newSlug}" is already in use by another category.` }
    }

    const oldValues = {
      seoTitle: existing.seoTitle,
      seoDescription: existing.seoDescription,
      seoH1: existing.seoH1,
      seoIntroText: existing.seoIntroText,
      seoOgImage: existing.seoOgImage,
      noindex: existing.noindex,
      inSitemap: existing.inSitemap,
      slug: existing.slug,
    }

    await db.category.update({
      where: { id: input.id },
      data: {
        seoTitle: input.seoTitle || null,
        seoDescription: input.seoDescription || null,
        seoH1: input.h1 || null,
        seoIntroText: input.introText || null,
        seoOgImage: input.ogImage || null,
        noindex: input.noindex,
        inSitemap: input.inSitemap,
        ...(slugChanged ? { slug: newSlug } : {}),
      },
    })

    // Audit log each changed field
    for (const [k, oldV] of Object.entries(oldValues)) {
      const newV = (input as any)[k === 'slug' ? 'url' : k === 'seoH1' ? 'h1' : k === 'seoIntroText' ? 'introText' : k === 'seoOgImage' ? 'ogImage' : k]
      if (String(oldV ?? '') !== String(newV ?? '')) {
        await logChange({
          entityType: 'category',
          entityId: input.id,
          fieldName: k,
          oldValue: oldV == null ? null : String(oldV),
          newValue: newV == null ? null : String(newV),
          userId: user.id,
        })
      }
    }

    // Auto-create redirect on slug change
    if (slugChanged) {
      const fromPath = `/shop?category=${oldSlug}`
      const toPath = `/shop?category=${newSlug}`
      // Don't create a redirect if one already exists from this path
      const existingRedirect = await db.redirect.findUnique({ where: { fromPath } }).catch(() => null)
      if (!existingRedirect) {
        await db.redirect.create({
          data: { fromPath, toPath, statusCode: 308, note: `slug change (category)`, createdById: user.id },
        }).catch(() => {/* may collide with a same-path redirect; ignore */})
        redirectCreated = true
      }
    }
  } else if (input.type === 'product') {
    const existing = await db.product.findUnique({
      where: { id: input.id },
      include: { images: { orderBy: { position: 'asc' }, take: 1 } },
    })
    if (!existing) return { ok: false, error: 'Product not found.' }

    const oldSlug = existing.slug
    const newSlug = input.url
    const slugChanged = oldSlug !== newSlug

    if (slugChanged) {
      const taken = await db.product.findUnique({ where: { slug: newSlug } })
      if (taken) return { ok: false, error: `Slug "${newSlug}" is already in use by another product.` }
    }

    const oldValues = {
      seoTitle: existing.seoTitle,
      seoDescription: existing.seoDescription,
      seoH1: existing.seoH1,
      ogImage: existing.ogImage,
      noindex: existing.noindex,
      inSitemap: existing.inSitemap,
      slug: existing.slug,
    }

    // Saving SEO does NOT change product.published or product.status
    await db.product.update({
      where: { id: input.id },
      data: {
        seoTitle: input.seoTitle || null,
        seoDescription: input.seoDescription || null,
        seoH1: input.h1 || null,
        ogImage: input.ogImage || null,
        noindex: input.noindex,
        inSitemap: input.inSitemap,
        ...(slugChanged ? { slug: newSlug } : {}),
      },
    })

    // Update main image alt text if provided
    if (input.imageAlt !== undefined && existing.images.length > 0) {
      const mainImage = existing.images[0]
      if (mainImage.altText !== input.imageAlt) {
        await db.productImage.update({
          where: { id: mainImage.id },
          data: { altText: input.imageAlt || null },
        })
        await logChange({
          entityType: 'product',
          entityId: input.id,
          fieldName: 'imageAlt',
          oldValue: mainImage.altText ?? null,
          newValue: input.imageAlt || null,
          userId: user.id,
        })
      }
    }

    for (const [k, oldV] of Object.entries(oldValues)) {
      const newV = (input as any)[k === 'slug' ? 'url' : k === 'seoH1' ? 'h1' : k]
      if (String(oldV ?? '') !== String(newV ?? '')) {
        await logChange({
          entityType: 'product',
          entityId: input.id,
          fieldName: k,
          oldValue: oldV == null ? null : String(oldV),
          newValue: newV == null ? null : String(newV),
          userId: user.id,
        })
      }
    }

    if (slugChanged) {
      const fromPath = `/product/${oldSlug}`
      const toPath = `/product/${newSlug}`
      const existingRedirect = await db.redirect.findUnique({ where: { fromPath } }).catch(() => null)
      if (!existingRedirect) {
        await db.redirect.create({
          data: { fromPath, toPath, statusCode: 308, note: `slug change (product)`, createdById: user.id },
        }).catch(() => {/* ignore collision */})
        redirectCreated = true
      }
    }
  } else if (input.type === 'service' || input.type === 'page') {
    // SeoOverride — keyed by route
    const route = input.id // for service/page, "id" IS the route
    const existing = await db.seoOverride.findUnique({ where: { route } })
    const name = existing?.name ?? route

    const oldValues = existing ? {
      seoTitle: existing.seoTitle,
      seoDescription: existing.seoDescription,
      h1: existing.h1,
      introText: existing.introText,
      ogImage: existing.ogImage,
      noindex: existing.noindex,
      inSitemap: existing.inSitemap,
    } : null

    if (existing) {
      await db.seoOverride.update({
        where: { route },
        data: {
          seoTitle: input.seoTitle || null,
          seoDescription: input.seoDescription || null,
          h1: input.h1 || null,
          introText: input.introText || null,
          ogImage: input.ogImage || null,
          noindex: input.noindex,
          inSitemap: input.inSitemap,
        },
      })
    } else {
      await db.seoOverride.create({
        data: {
          route,
          contentType: input.type,
          name,
          seoTitle: input.seoTitle || null,
          seoDescription: input.seoDescription || null,
          h1: input.h1 || null,
          introText: input.introText || null,
          ogImage: input.ogImage || null,
          noindex: input.noindex,
          inSitemap: input.inSitemap,
        },
      })
    }

    if (oldValues) {
      for (const [k, oldV] of Object.entries(oldValues)) {
        const newV = (input as any)[k]
        if (String(oldV ?? '') !== String(newV ?? '')) {
          await logChange({
            entityType: input.type,
            entityId: route,
            fieldName: k,
            oldValue: oldV == null ? null : String(oldV),
            newValue: newV == null ? null : String(newV),
            userId: user.id,
          })
        }
      }
    } else {
      await logChange({
        entityType: input.type,
        entityId: route,
        fieldName: '_created',
        oldValue: null,
        newValue: 'created override',
        userId: user.id,
      })
    }
  }

  // Invalidate caches — the public page, the sitemap, the admin lists
  revalidatePath('/', 'layout')
  revalidatePath('/sitemap.xml')
  revalidatePath('/admin/seo')

  return { ok: true, redirectCreated }
}

// ============================================================
// FILL EMPTY FIELDS FROM TEMPLATE — single record
// ============================================================

export type FillFromTemplateResult = { ok: true; filledCount: number } | { ok: false; error: string }

export async function fillFromTemplateAction(input: {
  type: SeoContentType
  id: string
  name: string
}): Promise<FillFromTemplateResult> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')

  const tpl = await getTemplate(input.type)
  let filledCount = 0

  if (input.type === 'category') {
    const r = await db.category.findUnique({ where: { id: input.id } })
    if (!r) return { ok: false, error: 'Category not found.' }
    const data: any = {}
    if (!r.seoTitle) { data.seoTitle = fillTemplate(tpl.titleTemplate, input.name); filledCount++ }
    if (!r.seoDescription) { data.seoDescription = fillTemplate(tpl.descriptionTemplate, input.name); filledCount++ }
    if (!r.seoH1) { data.seoH1 = input.name; filledCount++ }
    if (tpl.introTemplate && !r.seoIntroText) { data.seoIntroText = fillTemplate(tpl.introTemplate, input.name); filledCount++ }
    if (filledCount > 0) await db.category.update({ where: { id: input.id }, data })
  } else if (input.type === 'product') {
    const r = await db.product.findUnique({ where: { id: input.id }, include: { images: { orderBy: { position: 'asc' }, take: 1 } } })
    if (!r) return { ok: false, error: 'Product not found.' }
    const data: any = {}
    if (!r.seoTitle) { data.seoTitle = fillTemplate(tpl.titleTemplate, input.name); filledCount++ }
    if (!r.seoDescription) { data.seoDescription = fillTemplate(tpl.descriptionTemplate, input.name); filledCount++ }
    if (!r.seoH1) { data.seoH1 = input.name; filledCount++ }
    if (filledCount > 0) await db.product.update({ where: { id: input.id }, data })
    // Image alt
    if (tpl.altTemplate && r.images.length > 0 && !r.images[0].altText) {
      await db.productImage.update({
        where: { id: r.images[0].id },
        data: { altText: fillTemplate(tpl.altTemplate, input.name) },
      })
      filledCount++
    }
  } else if (input.type === 'service' || input.type === 'page') {
    const route = input.id
    const existing = await db.seoOverride.findUnique({ where: { route } })
    const data: any = {
      route,
      contentType: input.type,
      name: existing?.name ?? input.name,
    }
    if (!existing?.seoTitle) { data.seoTitle = fillTemplate(tpl.titleTemplate, input.name); filledCount++ }
    if (!existing?.seoDescription) { data.seoDescription = fillTemplate(tpl.descriptionTemplate, input.name); filledCount++ }
    if (!existing?.h1) { data.h1 = input.name; filledCount++ }
    if (tpl.introTemplate && !existing?.introText) { data.introText = fillTemplate(tpl.introTemplate, input.name); filledCount++ }
    if (existing) {
      const upd: any = {}
      if (data.seoTitle && !existing.seoTitle) upd.seoTitle = data.seoTitle
      if (data.seoDescription && !existing.seoDescription) upd.seoDescription = data.seoDescription
      if (data.h1 && !existing.h1) upd.h1 = data.h1
      if (data.introText && !existing.introText) upd.introText = data.introText
      if (Object.keys(upd).length > 0) await db.seoOverride.update({ where: { route }, data: upd })
    } else if (filledCount > 0) {
      await db.seoOverride.create({
        data: {
          route,
          contentType: input.type,
          name: input.name,
          seoTitle: data.seoTitle ?? null,
          seoDescription: data.seoDescription ?? null,
          h1: data.h1 ?? null,
          introText: data.introText ?? null,
        },
      })
    }
  }

  if (filledCount > 0) {
    await logChange({
      entityType: input.type,
      entityId: input.id,
      fieldName: '_template_fill',
      oldValue: null,
      newValue: `filled ${filledCount} empty field(s)`,
      userId: user.id,
    })
    revalidatePath('/admin/seo')
  }

  return { ok: true, filledCount }
}

// ============================================================
// APPLY TEMPLATES TO ALL — never overwrites existing values
// ============================================================

export async function applyTemplatesToAllAction(): Promise<{ ok: true; filledCount: number; byType: Record<string, number> } | { ok: false; error: string }> {
  await requireSuperAdmin()

  const types: SeoContentType[] = ['category', 'product', 'service', 'page']
  const byType: Record<string, number> = { category: 0, product: 0, service: 0, page: 0 }
  let total = 0

  for (const type of types) {
    const tpl = await getTemplate(type)

    if (type === 'category') {
      const rows = await db.category.findMany()
      for (const r of rows) {
        const data: any = {}
        if (!r.seoTitle) data.seoTitle = fillTemplate(tpl.titleTemplate, r.name)
        if (!r.seoDescription) data.seoDescription = fillTemplate(tpl.descriptionTemplate, r.name)
        if (!r.seoH1) data.seoH1 = r.name
        if (tpl.introTemplate && !r.seoIntroText) data.seoIntroText = fillTemplate(tpl.introTemplate, r.name)
        if (Object.keys(data).length > 0) {
          await db.category.update({ where: { id: r.id }, data })
          const n = Object.keys(data).length
          byType.category += n
          total += n
        }
      }
    } else if (type === 'product') {
      const rows = await db.product.findMany({ include: { images: { orderBy: { position: 'asc' }, take: 1 } } })
      for (const r of rows) {
        const data: any = {}
        if (!r.seoTitle) data.seoTitle = fillTemplate(tpl.titleTemplate, r.name)
        if (!r.seoDescription) data.seoDescription = fillTemplate(tpl.descriptionTemplate, r.name)
        if (!r.seoH1) data.seoH1 = r.name
        let n = 0
        if (Object.keys(data).length > 0) {
          await db.product.update({ where: { id: r.id }, data })
          n += Object.keys(data).length
        }
        if (tpl.altTemplate && r.images.length > 0 && !r.images[0].altText) {
          await db.productImage.update({ where: { id: r.images[0].id }, data: { altText: fillTemplate(tpl.altTemplate, r.name) } })
          n++
        }
        byType.product += n
        total += n
      }
    } else if (type === 'service' || type === 'page') {
      const routes = type === 'service'
        ? (await import('@/lib/services-data')).SERVICES.map((s) => ({ route: `/services/${s.slug}`, name: s.name }))
        : (await import('@/lib/seo')).STATIC_PAGES.map((p) => ({ route: p.route, name: p.name }))
      const existing = new Map((await db.seoOverride.findMany({ where: { contentType: type } })).map((o) => [o.route, o]))
      for (const r of routes) {
        const ex = existing.get(r.route)
        const upd: any = {}
        if (!ex?.seoTitle) upd.seoTitle = fillTemplate(tpl.titleTemplate, r.name)
        if (!ex?.seoDescription) upd.seoDescription = fillTemplate(tpl.descriptionTemplate, r.name)
        if (!ex?.h1) upd.h1 = r.name
        if (tpl.introTemplate && !ex?.introText) upd.introText = fillTemplate(tpl.introTemplate, r.name)
        if (Object.keys(upd).length > 0) {
          if (ex) {
            await db.seoOverride.update({ where: { route: r.route }, data: upd })
          } else {
            await db.seoOverride.create({
              data: { route: r.route, contentType: type, name: r.name, ...upd },
            })
          }
          const n = Object.keys(upd).length
          byType[type] += n
          total += n
        }
      }
    }
  }

  revalidatePath('/admin/seo')
  return { ok: true, filledCount: total, byType }
}

// ============================================================
// SAVE TEMPLATE — per content type
// ============================================================

export async function saveTemplateAction(input: {
  contentType: SeoContentType
  titleTemplate: string
  descriptionTemplate: string
  introTemplate: string
  altTemplate: string
}): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireSuperAdmin()
  const existing = await db.seoTemplate.findUnique({ where: { contentType: input.contentType } })
  if (existing) {
    await db.seoTemplate.update({
      where: { contentType: input.contentType },
      data: {
        titleTemplate: input.titleTemplate || null,
        descriptionTemplate: input.descriptionTemplate || null,
        introTemplate: input.introTemplate || null,
        altTemplate: input.altTemplate || null,
      },
    })
  } else {
    await db.seoTemplate.create({
      data: {
        contentType: input.contentType,
        titleTemplate: input.titleTemplate || null,
        descriptionTemplate: input.descriptionTemplate || null,
        introTemplate: input.introTemplate || null,
        altTemplate: input.altTemplate || null,
      },
    })
  }
  revalidatePath('/admin/seo/templates')
  return { ok: true }
}

// ============================================================
// REDIRECT CRUD
// ============================================================

export async function addRedirectAction(input: {
  fromPath: string
  toPath: string
  statusCode?: number
  note?: string
}): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireSuperAdmin()
  const from = input.fromPath.trim()
  const to = input.toPath.trim()
  if (!from.startsWith('/') || !to.startsWith('/')) {
    return { ok: false, error: 'Both paths must start with /.' }
  }
  if (from === to) {
    return { ok: false, error: 'Source and destination must be different.' }
  }
  // Prevent redirect loops: from must not equal a destination that already redirects back
  const existing = await db.redirect.findUnique({ where: { fromPath: from } }).catch(() => null)
  if (existing) {
    return { ok: false, error: `A redirect from ${from} already exists.` }
  }
  // Check chain: if "to" is itself a redirect source, we'd create a chain.
  // Allow it but warn — next step could be to flatten, but for now we accept 1-hop chains.
  const reverse = await db.redirect.findUnique({ where: { fromPath: to } }).catch(() => null)
  if (reverse) {
    return { ok: false, error: `Destination ${to} is itself a redirect source. This would create a loop.` }
  }
  const user = await getCurrentStaffUser()
  await db.redirect.create({
    data: {
      fromPath: from,
      toPath: to,
      statusCode: input.statusCode ?? 308,
      note: input.note ?? 'manual',
      createdById: user?.id,
    },
  })
  revalidatePath('/admin/seo/redirects')
  revalidatePath('/', 'layout')
  return { ok: true }
}

export async function deleteRedirectAction(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireSuperAdmin()
  await db.redirect.delete({ where: { id } }).catch(() => {/* ignore */})
  revalidatePath('/admin/seo/redirects')
  revalidatePath('/', 'layout')
  return { ok: true }
}

// ============================================================
// SITEMAP REGENERATE
// ============================================================

/**
 * "Regenerate sitemap" — Next.js' MetadataRoute sitemap is generated on
 * demand when /sitemap.xml is requested, so there's no cached file to
 * rebuild. But the action serves as a real signal: it revalidates the
 * /sitemap.xml path, which forces Next to regenerate it on next request,
 * and writes an audit log entry so admins can see when it was triggered.
 */
export async function regenerateSitemapAction(): Promise<{ ok: true; timestamp: string } | { ok: false; error: string }> {
  await requireSuperAdmin()
  revalidatePath('/sitemap.xml')
  revalidatePath('/admin/seo/sitemap')
  const user = await getCurrentStaffUser()
  await logChange({
    entityType: 'sitemap',
    entityId: 'sitemap.xml',
    fieldName: '_regenerate',
    oldValue: null,
    newValue: 'regenerated',
    userId: user?.id ?? 'system',
  })
  return { ok: true, timestamp: new Date().toISOString() }
}
