/**
 * Gmail SMTP email sender — sends directly through Gmail.
 * Bypasses Resend entirely.
 * 
 * Requires:
 *   GMAIL_USER="Wardrobecare@gmail.com"
 *   GMAIL_APP_PASSWORD="16-char app password from Google"
 */

import nodemailer from 'nodemailer'

export function gmailConfigured(): boolean {
  return !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
}

let transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
  return transporter
}

export async function sendGmail(input: {
  to: string
  subject: string
  html: string
}): Promise<{ ok: boolean; error?: string; messageId?: string }> {
  if (!gmailConfigured()) {
    console.log('[gmail] not configured — set GMAIL_USER and GMAIL_APP_PASSWORD')
    return { ok: false, error: 'not-configured' }
  }
  try {
    const info = await getTransporter().sendMail({
      from: process.env.GMAIL_USER,
      to: input.to,
      subject: input.subject,
      html: input.html,
    })
    console.log('[gmail] sent:', info.messageId)
    return { ok: true, messageId: info.messageId }
  } catch (e: any) {
    console.error('[gmail] error:', e?.message)
    return { ok: false, error: e?.message }
  }
}
