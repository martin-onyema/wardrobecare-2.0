/**
 * Termii SMS integration for Wardrobecare.
 *
 * Sends SMS notifications to the store owner when a new order is placed.
 * Uses the Termii Messaging API: POST https://api.termii.com/api/sms/send
 *
 * Security:
 *   - The Termii API key is read from process.env.TERMII_API_KEY — never
 *     exposed to the client. This module is server-only.
 *   - The store owner's phone number is read from env.TERMII_TO or from
 *     AdminSettings.supportPhone / AdminSettings.whatsappNumber (in that
 *     order of preference).
 *
 * Reliability:
 *   - SMS sending is best-effort — a failure NEVER blocks order creation.
 *   - Every send attempt (success or failure) is recorded in the SmsLog
 *     table so admins can see in /admin/notifications exactly why an SMS
 *     did or didn't go out. SmsLog writes are themselves best-effort
 *     and never throw.
 */

import { db } from '@/lib/db'

const TERMII_ENDPOINT = 'https://api.termii.com/api/sms/send'
const SMS_TIMEOUT_MS = 8000

export function termiiConfigured(): boolean {
  return !!process.env.TERMII_API_KEY
}

/**
 * Which env / settings field the store-owner phone was resolved from.
 * Returned for diagnostics and stored on SmsLog.recipientSource.
 */
export type OwnerPhoneResolution =
  | { phone: string; source: 'TERMII_TO' | 'AdminSettings.supportPhone' | 'AdminSettings.whatsappNumber' }
  | { phone: null; source: 'none' }

/**
 * Resolve the store-owner phone for new-order SMS notifications.
 *
 * Lookup order:
 *   1. process.env.TERMII_TO  (highest priority — explicit env override)
 *   2. AdminSettings.supportPhone
 *   3. AdminSettings.whatsappNumber
 *
 * If none of the three is set, returns { phone: null, source: 'none' }
 * and the SMS send is skipped (with a SmsLog row recording why).
 */
export async function resolveOwnerPhone(): Promise<OwnerPhoneResolution> {
  if (process.env.TERMII_TO && process.env.TERMII_TO.trim()) {
    return { phone: process.env.TERMII_TO.trim(), source: 'TERMII_TO' }
  }
  try {
    const settings = await db.adminSettings.findUnique({
      where: { id: 'singleton' },
      select: { supportPhone: true, whatsappNumber: true },
    })
    if (settings?.supportPhone && settings.supportPhone.trim()) {
      return { phone: settings.supportPhone.trim(), source: 'AdminSettings.supportPhone' }
    }
    if (settings?.whatsappNumber && settings.whatsappNumber.trim()) {
      return { phone: settings.whatsappNumber.trim(), source: 'AdminSettings.whatsappNumber' }
    }
  } catch (e: any) {
    console.error('[sms] could not read AdminSettings for owner phone:', e?.message)
  }
  return { phone: null, source: 'none' }
}

function normalizePhone(phone: string): string {
  // Strip everything except digits and +
  let p = phone.replace(/[^\d+]/g, '')
  // Remove leading +
  p = p.replace(/^\+/, '')
  // If starts with 0, replace with 234 (Nigeria)
  if (p.startsWith('0')) p = '234' + p.slice(1)
  // If starts with 234, leave as is
  // If doesn't start with a country code, assume Nigeria
  if (!p.startsWith('234') && p.length === 10) p = '234' + p
  return p
}

type OrderSmsData = {
  orderNumber: string
  customerName: string
  customerPhone: string
  items: { productName: string; quantity: number }[]
  total: number
  paymentStatus: string
  paymentMethod: string
}

/**
 * Build a professional SMS body for a new order notification.
 */
export function buildOrderSms(data: OrderSmsData): string {
  const itemsSummary = data.items
    .map((it) => `${it.productName} (x${it.quantity})`)
    .join(', ')

  // Truncate items if the SMS would exceed 160 chars (single SMS)
  let itemsLine = itemsSummary
  if (itemsLine.length > 80) {
    itemsLine = itemsSummary.slice(0, 77) + '...'
  }

  const totalFormatted = `NGN ${Number(data.total).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`
  const paymentLabel = data.paymentStatus === 'SUCCESS' ? 'Paid' : data.paymentStatus === 'PENDING' ? 'Pending' : data.paymentStatus

  return `WARDROBECARE - NEW ORDER!

Order: ${data.orderNumber}
Customer: ${data.customerName}
Phone: ${data.customerPhone}
Product: ${itemsLine}
Total: ${totalFormatted}
Payment: ${paymentLabel}

Check your dashboard to process this order.`
}

/**
 * Persist a SmsLog row. Best-effort — never throws. The SmsLog table is
 * the admin's only way to see why an SMS didn't go out, so we swallow
 * any DB error and just log to console.
 */
async function logSmsAttempt(input: {
  reason: string
  orderId?: string | null
  recipient: string
  message: string
  ok: boolean
  error?: string | null
  providerResponse?: string | null
  recipientSource?: string | null
}) {
  try {
    await db.smsLog.create({
      data: {
        reason: input.reason,
        orderId: input.orderId ?? null,
        recipient: input.recipient,
        message: input.message.slice(0, 480),
        ok: input.ok,
        error: (input.error ?? null)?.toString().slice(0, 240) ?? null,
        providerResponse: (input.providerResponse ?? null)?.toString().slice(0, 800) ?? null,
        recipientSource: input.recipientSource ?? null,
      },
    })
  } catch (e: any) {
    // Logging must never break the send or the order flow.
    console.error('[sms] could not write SmsLog row:', e?.message)
  }
}

/**
 * Send an SMS notification via Termii.
 *
 * @param to - The recipient's phone number (international format preferred,
 *             or Nigerian local format — will be normalised to 234XXX)
 * @param message - The SMS body text
 * @param meta - Optional metadata for the SmsLog row (reason, orderId,
 *               recipientSource). Defaults to reason='manual' if omitted.
 * @returns { ok: boolean; error?: string } — never throws
 */
export async function sendSms(
  to: string,
  message: string,
  meta?: { reason?: string; orderId?: string | null; recipientSource?: string | null },
): Promise<{ ok: boolean; error?: string }> {
  const reason = meta?.reason ?? 'manual'
  const recipientSource = meta?.recipientSource ?? null
  const orderId = meta?.orderId ?? null

  if (!termiiConfigured()) {
    console.log('[sms] skipped (TERMII_API_KEY not set)')
    await logSmsAttempt({
      reason,
      orderId,
      recipient: to,
      message,
      ok: false,
      error: 'TERMII_API_KEY not set',
      recipientSource,
    })
    return { ok: false, error: 'not-configured' }
  }

  const recipient = normalizePhone(to)
  if (!recipient || recipient.length < 10) {
    console.error('[sms] invalid phone number:', to)
    await logSmsAttempt({
      reason,
      orderId,
      recipient: to,
      message,
      ok: false,
      error: 'invalid phone number',
      recipientSource,
    })
    return { ok: false, error: 'invalid-phone' }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), SMS_TIMEOUT_MS)

  // Build the request body — try DND channel first (for transactional bypass),
  // fall back to 'generic' channel if the sender ID isn't approved for DND.
  const buildBody = (channel: string) => JSON.stringify({
    api_key: process.env.TERMII_API_KEY,
    to: recipient,
    from: process.env.TERMII_SENDER_ID || 'WARDROBECARE',
    sms: message,
    type: 'plain',
    channel,
  })

  try {
    // First attempt: DND channel (bypasses Do-Not-Disturb for transactional SMS)
    let res = await fetch(TERMII_ENDPOINT, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: buildBody('dnd'),
    })

    // If DND channel fails with 422 (sender ID not approved for DND route),
    // retry with the 'generic' channel which works with any approved sender ID.
    if (res.status === 422) {
      const dndBody = await res.text().catch(() => '')
      console.warn(`[sms] termii DND channel rejected (422), retrying with generic channel: ${dndBody.slice(0, 200)}`)
      res = await fetch(TERMII_ENDPOINT, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: buildBody('generic'),
      })
    }

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(`[sms] termii ${res.status}: ${body.slice(0, 300)}`)
      await logSmsAttempt({
        reason,
        orderId,
        recipient,
        message,
        ok: false,
        error: `termii-${res.status}`,
        providerResponse: body.slice(0, 800),
        recipientSource,
      })
      return { ok: false, error: `termii-${res.status}` }
    }

    const data: any = await res.json().catch(() => ({}))
    if (data.code === 'ok' || data.message === 'Successfully Sent') {
      console.log(`[sms] sent to ${recipient} (id: ${data.message_id ?? '?'})`)
      await logSmsAttempt({
        reason,
        orderId,
        recipient,
        message,
        ok: true,
        providerResponse: JSON.stringify(data).slice(0, 800),
        recipientSource,
      })
      return { ok: true }
    }

    console.error(`[sms] termii returned non-ok:`, data)
    await logSmsAttempt({
      reason,
      orderId,
      recipient,
      message,
      ok: false,
      error: data.message || 'termii-error',
      providerResponse: JSON.stringify(data).slice(0, 800),
      recipientSource,
    })
    return { ok: false, error: data.message || 'termii-error' }
  } catch (e: any) {
    const reason2 = e?.name === 'AbortError' ? 'timeout' : e?.message
    console.error(`[sms] failed to send to ${recipient}: ${reason2}`)
    await logSmsAttempt({
      reason,
      orderId,
      recipient,
      message,
      ok: false,
      error: String(reason2),
      recipientSource,
    })
    return { ok: false, error: String(reason2) }
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Send a new-order SMS notification to the store owner.
 *
 * This is the main entry point — called from the order creation flow in
 * store.ts after the order is successfully created. It never throws and
 * never blocks the order.
 *
 * Backwards-compatible signature: existing callers pass `ownerPhone`
 * (from AdminSettings.supportPhone). If that's empty, we now also
 * fall back to TERMII_TO env var and to AdminSettings.whatsappNumber,
 * and we record every attempt to SmsLog.
 *
 * @param data - The order details to include in the SMS
 * @param ownerPhone - Optional store owner phone (from AdminSettings.supportPhone).
 *                     If null/empty, we resolve via resolveOwnerPhone().
 * @param orderId - Optional order id, used to link SmsLog rows to the order.
 */
export async function notifyOwnerNewOrder(
  data: OrderSmsData,
  ownerPhone?: string | null | undefined,
  orderId?: string | null,
): Promise<{ ok: boolean; error?: string }> {
  // If caller passed a phone, use it. Otherwise resolve via env + AdminSettings.
  let target: string | null = ownerPhone || null
  let source: string | null = ownerPhone ? 'AdminSettings.supportPhone' : null
  if (!target) {
    const r = await resolveOwnerPhone()
    target = r.phone
    source = r.source === 'none' ? null : r.source
  }
  if (!target) {
    console.log('[sms] owner notification skipped (no phone number configured)')
    await logSmsAttempt({
      reason: 'NEW_ORDER',
      orderId: orderId ?? null,
      recipient: '(none)',
      message: buildOrderSms(data),
      ok: false,
      error: 'no owner phone number configured (set TERMII_TO env var or AdminSettings.supportPhone)',
      recipientSource: 'none',
    })
    return { ok: false, error: 'no-owner-phone' }
  }

  const message = buildOrderSms(data)
  return sendSms(target, message, {
    reason: 'NEW_ORDER',
    orderId: orderId ?? null,
    recipientSource: source,
  })
}

/**
 * Send a manual test SMS — used by the admin diagnostic page.
 * Always uses TERMII_TO if set, otherwise the explicit `to` arg.
 */
export async function sendTestSms(to?: string): Promise<{ ok: boolean; error?: string }> {
  const target = to?.trim() || process.env.TERMII_TO || ''
  if (!target) {
    await logSmsAttempt({
      reason: 'TEST',
      recipient: '(none)',
      message: 'Wardrobecare SMS test',
      ok: false,
      error: 'no recipient provided and TERMII_TO not set',
      recipientSource: 'none',
    })
    return { ok: false, error: 'no-recipient' }
  }
  const message = `WARDROBECARE — test SMS.\nIf you can read this, your Termii integration is working.\nSent: ${new Date().toISOString()}`
  return sendSms(target, message, { reason: 'TEST', recipientSource: to?.trim() ? 'manual' : 'TERMII_TO' })
}
