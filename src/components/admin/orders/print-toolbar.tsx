'use client'

import { Printer, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * Tiny client toolbar for the print preview page. Lives at the top of the
 * print route so the user can press "Print now" (which calls window.print)
 * and go back to the console. Hidden by the print stylesheet.
 */
export function PrintToolbar({
  orderNumber,
  copiesLabel,
}: {
  orderNumber: string
  copiesLabel: string
}) {
  return (
    <div className="print-toolbar flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/orders/console">
            <ArrowLeft className="size-3.5" /> Back to console
          </Link>
        </Button>
        <span className="text-sm text-muted-foreground">
          Print preview — {orderNumber}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{copiesLabel}</span>
        <Button size="sm" onClick={() => window.print()}>
          <Printer className="size-3.5" /> Print now (Ctrl/Cmd+P)
        </Button>
      </div>
    </div>
  )
}
