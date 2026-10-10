'use client'

import { useState } from 'react'
import { Loader2, Check } from 'lucide-react'

/**
 * Waitlist form for the Digital Closet launch.
 * Self-contained — handles success state inline, no server action needed.
 * Styled to match the site's editorial system (rust accent for submit).
 */
export function NotifyForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    // Simulate async submission
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-olive text-background">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <p className="font-display text-xl tracking-tight mb-2">You&apos;re on the list</p>
        <p className="text-sm text-muted-foreground">
          We&apos;ll be in touch the moment the Digital Closet opens for the free trial.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch gap-3"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="h-12 flex-1 px-4 text-sm bg-background border border-border focus:border-foreground outline-none transition-colors placeholder:text-muted-foreground/60"
      />
      <button
        type="submit"
        disabled={submitting}
        className="h-12 shrink-0 bg-rust text-rust-foreground px-6 text-[11px] uppercase tracking-[0.18em] hover:bg-rust/90 transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Joining…
          </>
        ) : (
          'Notify Me'
        )}
      </button>
    </form>
  )
}

export default NotifyForm
