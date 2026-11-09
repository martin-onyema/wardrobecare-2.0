'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { regenerateSitemapAction } from '@/actions/seo'

export function SitemapManager({ lastRegenerated }: { lastRegenerated: string | null }) {
  const [pending, startTransition] = useTransition()
  const [last, setLast] = useState(lastRegenerated)

  function regenerate() {
    startTransition(async () => {
      const r = await regenerateSitemapAction()
      if (r.ok) {
        toast.success('Sitemap regenerated. Next request to /sitemap.xml will be fresh.')
        setLast(r.timestamp)
      } else {
        toast.error(r.error)
      }
    })
  }

  return (
    <div className="flex items-center gap-3">
      <Button onClick={regenerate} disabled={pending}>
        {pending ? <Loader2 className="size-4 mr-2 animate-spin" /> : <RefreshCw className="size-4 mr-2" />}
        Regenerate sitemap now
      </Button>
      <span className="text-xs text-muted-foreground">
        {last ? `Last regenerated: ${new Date(last).toISOString().replace('T', ' ').slice(0, 19)}` : 'Never regenerated via admin'}
      </span>
    </div>
  )
}
