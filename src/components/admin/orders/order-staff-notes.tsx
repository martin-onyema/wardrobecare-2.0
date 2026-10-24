'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Pin, Trash2, Send } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { adminCreateOrderNote, adminDeleteOrderNote } from '@/actions/order-notes'
import { formatDate } from '@/lib/format'

type Note = {
  id: string
  body: string
  pinned: boolean
  authorName: string
  createdAt: string
}

/**
 * Order staff-notes timeline. Cloned from customer-notes.tsx (the existing
 * project pattern for CRM-style staff notes). Same UI: textarea + pin switch
 * on top, list below with author + date + pinned badge + delete confirm.
 */
export function OrderStaffNotes({
  orderId,
  notes,
}: {
  orderId: string
  notes: Note[]
}) {
  const router = useRouter()
  const [saving, startSave] = useTransition()
  const [body, setBody] = useState('')
  const [pinned, setPinned] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) {
      toast.error('Note cannot be empty')
      return
    }
    startSave(async () => {
      const r = await adminCreateOrderNote(orderId, body, pinned)
      if (r.ok) {
        toast.success('Note added')
        setBody('')
        setPinned(false)
        router.refresh()
      } else {
        toast.error(r.error ?? 'Could not add note')
      }
    })
  }

  // Pinned first, then chronological desc.
  const sorted = [...notes].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="font-display text-lg">Add staff note</CardTitle>
          <CardDescription>
            Internal note — only visible to staff. Use for packing instructions,
            delivery follow-ups, fraud checks, etc.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              placeholder="e.g. Customer called to confirm — please ring the doorbell, no delivery to the gatehouse."
              required
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={pinned} onCheckedChange={setPinned} />
                Pin to top
              </label>
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                Add note
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {sorted.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No staff notes yet.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((n) => (
            <NoteRow key={n.id} note={n} />
          ))}
        </div>
      )}
    </div>
  )
}

function NoteRow({ note }: { note: Note }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function del() {
    setBusy(true)
    const r = await adminDeleteOrderNote(note.id)
    if (r.ok) {
      toast.success('Note deleted')
      router.refresh()
    } else {
      toast.error(r.error ?? 'Could not delete')
    }
    setBusy(false)
  }

  return (
    <Card className={note.pinned ? 'border-l-4 border-l-foreground' : ''}>
      <CardContent className="p-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-medium">{note.authorName}</span>
            <span className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</span>
            {note.pinned && (
              <Badge variant="outline" className="text-[10px] gap-0.5">
                <Pin className="size-2.5" /> Pinned
              </Badge>
            )}
          </div>
          <p className="text-sm whitespace-pre-wrap">{note.body}</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="size-7 p-0 text-muted-foreground hover:text-red-600"
              disabled={busy}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this note?</AlertDialogTitle>
              <AlertDialogDescription>
                The note will be permanently removed from the order timeline.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={del}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
