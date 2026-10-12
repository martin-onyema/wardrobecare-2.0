'use server'

import { revalidatePath } from 'next/cache'
import { supabaseServer, PRODUCT_IMAGES_BUCKET } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

export type UploadResult = {
  ok: boolean
  url?: string
  path?: string
  error?: string
}

/**
 * Upload a product image.
 *
 * Storage strategy (in order of preference):
 *  1. If NEXT_PUBLIC_SUPABASE_URL is set → upload to Supabase Storage (works on Vercel)
 *  2. Otherwise → save to /public/products/ locally (works in dev + on self-hosted)
 *
 * Only admins can call this — server-side session check.
 */
export async function adminUploadProductImage(file: File): Promise<UploadResult> {
  // 1. Auth check — admin only
  const session = await getSession()
  const role = (session?.user as any)?.role
  if (!session || role !== 'ADMIN') {
    return { ok: false, error: 'Unauthorized' }
  }

  // 2. Validate file
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, error: 'File too large (5MB max)' }
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, error: 'Unsupported file type. Use JPG, PNG, WebP, or GIF.' }
  }

  // 3. Generate a unique filename — never trust the user's filename as-is
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext) ? ext : 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`

  // 4. Try Supabase if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = supabaseServer()
      const storagePath = `products/${filename}`
      const { error: uploadError } = await supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        })

      if (uploadError) {
        return { ok: false, error: uploadError.message }
      }

      const { data: pub } = supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .getPublicUrl(storagePath)

      return { ok: true, url: pub.publicUrl, path: storagePath }
    } catch (e: any) {
      // Fall through to local storage if Supabase fails
      console.warn('Supabase upload failed, falling back to local:', e?.message)
    }
  }

  // 5. Local fallback — write to /public/products/
  // (Works in dev and on self-hosted deployments. On Vercel, the filesystem
  //  is ephemeral so use Supabase for production.)
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Resolve the project root — server actions run from the Next.js CWD,
    // which is the project root (where package.json lives).
    const projectRoot = process.cwd()
    const publicProductsDir = path.join(projectRoot, 'public', 'products')
    if (!existsSync(publicProductsDir)) {
      await mkdir(publicProductsDir, { recursive: true })
    }

    const fullPath = path.join(publicProductsDir, filename)
    await writeFile(fullPath, buffer)

    // Return the public URL path — /products/<filename>
    // The image-url helper in src/lib/image-url.ts already normalizes
    // /products/* paths to absolute public URLs.
    const publicUrl = `/products/${filename}`
    return { ok: true, url: publicUrl, path: publicUrl }
  } catch (e: any) {
    return { ok: false, error: `Could not save image to local filesystem: ${e?.message ?? 'Unknown error'}` }
  }
}

/**
 * Restore a product from Trash (status: ARCHIVED → ACTIVE).
 * Used by the product edit form's "Restore from Trash" button.
 */
export async function adminRestoreProduct(productId: string): Promise<{ ok: boolean; error?: string }> {
  const session = await getSession()
  const role = (session?.user as any)?.role
  if (!session || role !== 'ADMIN') {
    return { ok: false, error: 'Unauthorized' }
  }
  try {
    const product = await db.product.findUnique({ where: { id: productId }, select: { name: true, status: true } })
    if (!product) return { ok: false, error: 'Product not found' }
    if (product.status !== 'ARCHIVED') {
      return { ok: false, error: `Product is not in Trash (current status: ${product.status})` }
    }
    await db.product.update({
      where: { id: productId },
      data: { status: 'ACTIVE' },
    })
    revalidatePath('/admin/products')
    revalidatePath('/shop')
    return { ok: true }
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not restore product' }
  }
}

/**
 * Delete a product image from Supabase Storage.
 * Useful when admin removes an image from a product edit form.
 */
export async function adminDeleteProductImage(path: string): Promise<{ ok: boolean; error?: string }> {
  const session = await getSession()
  const role = (session?.user as any)?.role
  if (!session || role !== 'ADMIN') {
    return { ok: false, error: 'Unauthorized' }
  }

  // If it's a local /products/* path, no deletion needed (the file is
  // still on disk in public/products/, but it's no longer referenced by
  // the product). Skip without error.
  if (path.startsWith('/products/') || path.startsWith('/images/')) {
    return { ok: true }
  }

  // Strip any leading slash — Supabase paths shouldn't start with /
  const cleanPath = path.replace(/^\/+/, '')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return { ok: true } // No Supabase configured — nothing to delete
  }

  const supabase = supabaseServer()
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .remove([cleanPath])

  if (error) {
    return { ok: false, error: error.message }
  }

  revalidatePath('/admin/products')
  return { ok: true }
}
