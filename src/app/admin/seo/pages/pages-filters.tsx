'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const TYPES = [
  { value: 'all', label: 'All' },
  { value: 'category', label: 'Categories' },
  { value: 'product', label: 'Products' },
  { value: 'service', label: 'Services' },
  { value: 'page', label: 'Pages' },
]

const BANDS = [
  { value: 'all', label: 'Any status' },
  { value: 'bad', label: 'Poor' },
  { value: 'warn', label: 'Needs work' },
  { value: 'good', label: 'Good' },
]

export function PagesFilters({
  currentType,
  currentBand,
  currentIssue,
  currentQuery,
}: {
  currentType: string
  currentBand: string
  currentIssue: string
  currentQuery: string
}) {
  const router = useRouter()
  const sp = useSearchParams()
  const [q, setQ] = useState(currentQuery)

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      if (q !== currentQuery) {
        update({ q })
      }
    }, 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  function update(patch: Record<string, string>) {
    const params = new URLSearchParams(sp?.toString() ?? '')
    for (const [k, v] of Object.entries(patch)) {
      if (v === '' || v === 'all') params.delete(k)
      else params.set(k, v)
    }
    // Reset page when filters change
    if (!('page' in patch)) params.delete('page')
    router.push(`/admin/seo/pages?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <Button
            key={t.value}
            size="sm"
            variant={currentType === t.value ? 'secondary' : 'ghost'}
            onClick={() => update({ type: t.value })}
          >
            {t.label}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {BANDS.map((b) => (
          <Button
            key={b.value}
            size="sm"
            variant={currentBand === b.value ? 'secondary' : 'ghost'}
            onClick={() => update({ band: b.value })}
          >
            {b.label}
          </Button>
        ))}
        {currentIssue && (
          <Badge variant="destructive" className="cursor-pointer" onClick={() => update({ issue: '' })}>
            Filter: {currentIssue} ✕
          </Badge>
        )}
        <Input
          placeholder="Search pages…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="ml-auto max-w-xs"
        />
      </div>
    </div>
  )
}
