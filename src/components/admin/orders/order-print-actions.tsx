'use client'

import { useState } from 'react'
import { Printer, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/**
 * Print action for the classic /admin/orders/[id] detail page.
 *
 * Lets the staff jump straight to the print route with a pre-selected copy
 * (or all three). The print route itself handles the A4 layout and print
 * stylesheet — this component just builds the URL.
 */
export function OrderPrintActions({ orderId }: { orderId: string }) {
  const [open, setOpen] = useState(false)

  function printUrl(opts: { file?: boolean; ship?: boolean; cust?: boolean; imgs?: boolean }) {
    const params = new URLSearchParams()
    if (opts.file) params.set('file', '1')
    if (opts.ship) params.set('ship', '1')
    if (opts.cust) params.set('cust', '1')
    if (opts.imgs) params.set('imgs', '1')
    return `/admin/orders/console/print?id=${orderId}&${params.toString()}`
  }

  function openPrint(url: string) {
    setOpen(false)
    window.open(url, '_blank')
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="sm">
          <Printer className="size-3.5" />
          Print
          <ChevronDown className="size-3.5 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Print documents</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => openPrint(printUrl({ file: true, ship: true, cust: true, imgs: true }))}>
          All 3 copies (with images)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openPrint(printUrl({ file: true, ship: true, cust: true }))}>
          All 3 copies (no images)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => openPrint(printUrl({ file: true, imgs: true }))}>
          File copy only
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openPrint(printUrl({ ship: true, imgs: true }))}>
          Shipping copy only
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openPrint(printUrl({ cust: true, imgs: true }))}>
          Customer receipt only
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
