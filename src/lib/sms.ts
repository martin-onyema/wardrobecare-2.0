/**
 * Termii SMS integration for Wardrobecare.
 *
 * Sends SMS notifications to the store owner when a new order is placed.
 * Uses the Termii Messaging API: POST https://api.termii.com/api/sms/send
 *
 * Security:
 *   - The Termii API key is read from process.env.TERMII_API_KEY — never
 *     exposed to the client. This module is server-only.
 *   - The store owner's phone number is read from process.env.TERMII_TO
 *     (or AdminSettings.supportPhone as a fallback).
 *
 * Reliability:
 *   - SMS sending is best-effort — a failure NEVER blocks order creation.
 *   - Duplicate prevention: the order ID is included in the SMS body
 *     and logged, so the store owner can deduplicate manually if a retry
 *     fires. The code itself does NOT retry — it's a one-shot send.
 */

const TERMII_ENDPOINT = 'https://api.termii.com/api/sms/send'
const SMS_TIMEOUT_MS = 8000

export function termiiConfigured(): boolean {
  return !!process.env.TERMII_API_KEY
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
 * Send an SMS notification via Termii.
 *
 * @param to - The recipient's phone number (international format preferred,
 *             or Nigerian local format — will be normalised to 234XXX)
 * @param message - The SMS body text
 * @returns { ok: boolean; error?: string } — never throws
 */
export async function sendSms(to: string, message: string): Promise<{ ok: boolean; error?: string }> {
  if (!termiiConfigured()) {
    console.log('[sms] skipped (TERMII_API_KEY not set)')
    return { ok: false, error: 'not-configured' }
  }

  const recipient = normalizePhone(to)
  if (!recipient || recipient.length < 10) {
    console.error('[sms] invalid phone number:', to)
    return { ok: false, error: 'invalid-phone' }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), SMS_TIMEOUT_MS)

  try {
    const res = await fetch(TERMII_ENDPOINT, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.TERMII_API_KEY,
        to: recipient,
        from: process.env.TERMII_SENDER_ID || 'WARDROBECARE',
        sms: message,
        type: 'plain',
        channel: 'dnd', // DND route for transactional messages — bypasses Do-Not-Disturb
      }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(`[sms] termii ${res.status}: ${body.slice(0, 300)}`)
      return { ok: false, error: `termii-${res.status}` }
    }

    const data: any = await res.json().catch(() => ({}))
    if (data.code === 'ok' || data.message === 'Successfully Sent') {
      console.log(`[sms] sent to ${recipient} (id: ${data.message_id ?? '?'})`)
      return { ok: true }
    }

    console.error(`[sms] termii returned non-ok:`, data)
    return { ok: false, error: data.message || 'termii-error' }
  } catch (e: any) {
    const reason = e?.name === 'AbortError' ? 'timeout' : e?.message
    console.error(`[sms] failed to send to ${recipient}: ${reason}`)
    return { ok: false, error: String(reason) }
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
 * @param data - The order details to include in the SMS
 * @param ownerPhone - The store owner's phone number (from AdminSettings.supportPhone
 *                     or TERMII_TO env var). If empty, SMS is skipped.
 */
export async function notifyOwnerNewOrder(
  data: OrderSmsData,
  ownerPhone: string | null | undefined,
): Promise<{ ok: boolean; error?: string }> {
  const target = ownerPhone || process.env.TERMII_TO
  if (!target) {
    console.log('[sms] owner notification skipped (no phone number configured)')
    return { ok: false, error: 'no-owner-phone' }
  }

  const message = buildOrderSms(data)
  return sendSms(target, message)
}
