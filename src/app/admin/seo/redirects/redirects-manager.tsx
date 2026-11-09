'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addRedirectAction, deleteRedirectAction } from '@/actions/seo'

type RedirectRow = {
  id: string
  fromPath: string
  toPath: string
  statusCode: number
  note: string | null
  createdAt: string
}

export function RedirectsManager({ initial }: { initial: RedirectRow[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  function add(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      const r = await addRedirectAction({ fromPath: from, toPath: to, statusCode: 308, note: 'manual' })
      if (r.ok) {
        toast.success('Redirect added.')
        setFrom('')
        setTo('')
        router.refresh()
      } else {
        toast.error(r.error)
      }
    })
  }

  function del(id: string) {
    if (!confirm('Delete this redirect? The old URL will start returning 404 again.')) return
    startTransition(async () => {
      const r = await deleteRedirectAction(id)
      if (r.ok) {
        toast.success('Redirect deleted.')
        router.refresh()
      } else {
        toast.error(r.error)
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={add} className="flex flex-col sm:flex-row sm:items-end gap-3 p-4 border rounded-md bg-card">
        <div className="flex-1">
          <Label htmlFor="from" className="text-xs text-muted-foreground">Old address</Label>
          <Input id="from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="/old-address" className="mt-1 font-mono" />
        </div>
        <div className="flex-1">
          <Label htmlFor="to" className="text-xs text-muted-foreground">New address</Label>
          <Input id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="/new-address" className="mt-1 font-mono" />
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Plus className="size-4 mr-2" />}
          Add redirect
        </Button>
      </form>

      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-muted-foreground border-b">
            <tr>
              <th className="text-left py-3 px-4">Old address</th>
              <th className="text-left py-3 px-3"></th>
              <th className="text-left py-3 px-3">New address</th>
              <th className="text-left py-3 px-3">Type</th>
              <th className="text-left py-3 px-3">Note</th>
              <th className="text-left py-3 px-3">Created</th>
              <th className="text-left py-3 px-3"></th>
            </tr>
          </thead>
          <tbody>
            {initial.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground">
                  No redirects yet. They are created automatically when you change a URL slug in the editor, or you can add one by hand above.
                </td>
              </tr>
            ) : (
              initial.map((r) => (
                <tr key={r.id} className="border-b last:border-0">
                  <td className="py-3 px-4 font-mono text-xs">{r.fromPath}</td>
                  <td className="py-3 px-3 text-muted-foreground">→</td>
                  <td className="py-3 px-3 font-mono text-xs">{r.toPath}</td>
                  <td className="py-3 px-3"><span className="text-xs font-mono">{r.statusCode}</span></td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">{r.note ?? '—'}</td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">{new Date(r.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
                  <td className="py-3 px-3">
                    <Button size="sm" variant="ghost" onClick={() => del(r.id)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
