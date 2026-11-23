'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createSaleAction } from '@/actions/sales'

export function NewSaleWizard() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [name, setName] = useState('')
  const [kind, setKind] = useState<'CAMPAIGN' | 'CLEARANCE'>('CAMPAIGN')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [headline, setHeadline] = useState('')
  const [subheadline, setSubheadline] = useState('')
  const [announcement, setAnnouncement] = useState('')

  // Default start = tomorrow 9am Lagos time
  const today = new Date()
  today.setDate(today.getDate() + 1)
  today.setHours(9, 0, 0, 0)
  const defaultStart = today.toISOString().slice(0, 16)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { toast.error('Campaign name is required.'); return }
    if (!startsAt) { toast.error('Start date is required.'); return }
    if (kind === 'CAMPAIGN' && !endsAt) { toast.error('End date is required for timed campaigns.'); return }

    startTransition(async () => {
      const result = await createSaleAction({
        name,
        kind,
        startsAt: startsAt || defaultStart,
        endsAt: kind === 'CLEARANCE' ? null : endsAt,
        headline,
        subheadline,
        announcement,
      })
      if (result.ok) {
        toast.success('Campaign draft created.')
        router.push(`/admin/sales/${result.id}`)
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>New Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign name (internal)</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Black Friday 2026" className="mt-1" />
            </div>

            <div>
              <Label>Campaign type</Label>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setKind('CAMPAIGN')}
                  className={`rounded-lg border-2 px-4 py-2 text-sm ${kind === 'CAMPAIGN' ? 'border-foreground bg-foreground text-background' : 'border-border'}`}
                >
                  Timed Sale
                </button>
                <button
                  type="button"
                  onClick={() => setKind('CLEARANCE')}
                  className={`rounded-lg border-2 px-4 py-2 text-sm ${kind === 'CLEARANCE' ? 'border-foreground bg-foreground text-background' : 'border-border'}`}
                >
                  Clearance (no end date)
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="start">Start date & time</Label>
                <Input id="start" type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} defaultValue={defaultStart} className="mt-1" />
              </div>
              {kind === 'CAMPAIGN' && (
                <div>
                  <Label htmlFor="end">End date & time</Label>
                  <Input id="end" type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} className="mt-1" />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="headline">Homepage headline (max 60 chars)</Label>
              <Input id="headline" maxLength={60} value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. Up to 40% off selected pieces" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="sub">Supporting headline (max 140 chars)</Label>
              <Textarea id="sub" maxLength={140} value={subheadline} onChange={(e) => setSubheadline(e.target.value)} placeholder="e.g. Curated pieces at their best prices — until Sunday only." className="mt-1" rows={2} />
            </div>

            <div>
              <Label htmlFor="announce">Announcement bar message (optional, max 80 chars)</Label>
              <Input id="announce" maxLength={80} value={announcement} onChange={(e) => setAnnouncement(e.target.value)} placeholder="e.g. Sale ends Sunday — shop now" className="mt-1" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => router.push('/admin/sales')}>Cancel</Button>
              <Button type="submit" disabled={pending}>
                {pending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Create Campaign
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
