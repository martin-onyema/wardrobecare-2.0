'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2, Send, TestTube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { sendTestSmsAction } from './actions'

export function SmsTestPanel({ defaultTo }: { defaultTo?: string }) {
  const [to, setTo] = useState(defaultTo ?? '')
  const [sending, setSending] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      const r = await sendTestSmsAction(to.trim() || undefined)
      if (r.ok) {
        toast.success('Test SMS sent. Check the phone — and check the log below.')
      } else {
        toast.error(`SMS failed: ${r.error ?? 'unknown error'}`)
      }
    } catch (e: any) {
      toast.error(e?.message ?? 'Could not send test SMS')
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row sm:items-end gap-3">
      <div className="flex-1">
        <Label htmlFor="sms-to" className="text-xs text-muted-foreground">
          Send test SMS to (leave blank to use TERMII_TO)
        </Label>
        <Input
          id="sms-to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="2348012345678"
          className="mt-1"
        />
      </div>
      <Button type="submit" disabled={sending} className="sm:mb-0">
        {sending ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Send className="size-4 mr-2" />}
        Send test SMS
      </Button>
    </form>
  )
}
