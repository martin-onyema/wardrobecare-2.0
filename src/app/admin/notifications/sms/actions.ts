'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/session'
import { sendTestSms } from '@/lib/sms'

/**
 * Server action: send a test SMS to TERMII_TO or to an explicit phone.
 * Only admins may trigger this — non-admins get a 403-style error.
 */
export async function sendTestSmsAction(to: string | undefined): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin()
  const result = await sendTestSms(to)
  revalidatePath('/admin/notifications/sms')
  return result
}
