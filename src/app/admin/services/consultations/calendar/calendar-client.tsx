'use client'

/**
 * Calendar & availability client.
 *
 * Layout (matches mockup 51):
 *   Left:  Week grid (Mon–Sat × 4 slot times). Each cell is one of:
 *          - open (white, clickable to block)
 *          - blocked (hatched, clickable to unblock)
 *          - booked (colored by status, clicking opens the booking
 *            in the Requests tab)
 *   Right: Availability rules (working days, session times,
 *          session length, travel buffer, minimum notice, allow
 *          video/in-person toggles)
 */

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ChevronLeft, ChevronRight, Lock, Unlock } from 'lucide-react'
import { toast } from 'sonner'
import { adminBlockSlot, adminUnblockSlot, adminSaveAvailability } from '@/actions/consultations-workflow'
import { BOOKING_STATUS, SLOT_TIMES, fmtDateShort } from '../_shared'

type Booking = {
  id: string
  bookingNumber: string
  bookerName: string
  slotDate: string
  slotTime: string
  status: string
  sessionMode: string
  location: string | null
  assignedStylistId: string | null
}

type Blocked = {
  slotDate: string
  slotTime: string
  reason: string | null
}

type Day = {
  key: string
  weekday: string
  day: number
  month: string
  fullLabel: string
}

type Stylist = { id: string; name: string; role: string }

type Availability = {
  workingDays: string[]
  travelBufferMinutes: number
  minNoticeHours: number
  allowVideo: boolean
  allowInPerson: boolean
}

type Props = {
  canManage: boolean
  days: Day[]
  weekOffset: number
  stylistFilter: string
  stylists: Stylist[]
  bookings: Booking[]
  blocked: Blocked[]
  availability: Availability
}

export function CalendarClient({
  canManage,
  days,
  weekOffset,
  stylistFilter,
  stylists,
  bookings,
  blocked,
  availability,
}: Props) {
  const router = useRouter()
  const [blocking, startBlock] = useTransition()

  // Availability form state
  const [workingDays, setWorkingDays] = useState<string[]>(availability.workingDays)
  const [travelBuffer, setTravelBuffer] = useState(availability.travelBufferMinutes)
  const [minNotice, setMinNotice] = useState(availability.minNoticeHours)
  const [allowVideo, setAllowVideo] = useState(availability.allowVideo)
  const [allowInPerson, setAllowInPerson] = useState(availability.allowInPerson)
  const [saving, startSave] = useTransition()

  function isBlocked(date: string, time: string): Blocked | null {
    return blocked.find((b) => b.slotDate === date && b.slotTime === time) ?? null
  }

  function bookingsAt(date: string, time: string): Booking[] {
    return bookings.filter((b) => b.slotDate === date && b.slotTime === time)
  }

  function onToggleBlock(date: string, time: string) {
    if (!canManage) {
      toast.error('Your role cannot change availability.')
      return
    }
    startBlock(async () => {
      const already = isBlocked(date, time)
      if (already) {
        const r = await adminUnblockSlot(date, time)
        if (!r.ok) {
          toast.error(r.error, { duration: 8000 })
          return
        }
        toast.success('Slot opened.', { duration: 3000 })
      } else {
        const r = await adminBlockSlot(date, time)
        if (!r.ok) {
          toast.error(r.error, { duration: 8000 })
          return
        }
        toast.success('Slot blocked. The website will no longer offer it.', { duration: 4000 })
      }
      router.refresh()
    })
  }

  function onSaveAvailability() {
    startSave(async () => {
      const r = await adminSaveAvailability({
        workingDays,
        travelBufferMinutes: travelBuffer,
        minNoticeHours: minNotice,
        allowVideo,
        allowInPerson,
      })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success('Availability rules saved.', { duration: 4000 })
    })
  }

  function toggleDay(d: string) {
    setWorkingDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    )
  }

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
      {/* Left: calendar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-base">
            Week of {days[0].fullLabel.split(' ').slice(0, 3).join(' ')} {new Date(days[0].key).getFullYear()}
          </h3>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/services/consultations/calendar?weekOffset=${weekOffset - 1}&stylist=${stylistFilter}`}
              className="border border-border p-2 hover:bg-secondary"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <Link
              href={`/admin/services/consultations/calendar?weekOffset=${weekOffset + 1}&stylist=${stylistFilter}`}
              className="border border-border p-2 hover:bg-secondary"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Stylist filter */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Link
            href={`/admin/services/consultations/calendar?weekOffset=${weekOffset}&stylist=all`}
            className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] border transition-colors ${
              stylistFilter === 'all'
                ? 'bg-foreground text-background border-foreground'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            All stylists
          </Link>
          {stylists.map((s) => (
            <Link
              key={s.id}
              href={`/admin/services/consultations/calendar?weekOffset=${weekOffset}&stylist=${s.id}`}
              className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] border transition-colors ${
                stylistFilter === s.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {s.name}
            </Link>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs mb-3">
          <LegendItem color="bg-white border border-green-600" label="Open" />
          <LegendItem color="bg-yellow-500" label="Paid, to confirm" />
          <LegendItem color="bg-olive" label="Confirmed" />
          <LegendItem color="bg-rust" label="Needs new date" />
          <LegendItem color="bg-indigo-600" label="In session" />
          <LegendItem color="bg-stone-300" label="Blocked" />
        </div>

        {/* Grid */}
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-secondary/40">
              <tr>
                <th className="w-20 px-2 py-2 text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono">Time</th>
                {days.map((d) => (
                  <th key={d.key} className="px-2 py-2 text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono">
                    {d.weekday} {d.day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOT_TIMES.map((t) => (
                <tr key={t} className="border-t border-border/60">
                  <td className="px-2 py-2 font-mono text-[10px] text-muted-foreground bg-secondary/20">{t}</td>
                  {days.map((d) => {
                    const cellBookings = bookingsAt(d.key, t)
                    const block = isBlocked(d.key, t)
                    return (
                      <td key={d.key} className="border-l border-border/40 px-1 py-1 align-top">
                        <CalendarCell
                          date={d.key}
                          time={t}
                          bookings={cellBookings}
                          blocked={block}
                          canManage={canManage}
                          isBlocking={blocking}
                          onToggleBlock={onToggleBlock}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          Click an open or blocked slot to block or open it. Click a booking
          to open it in Requests.
        </p>
      </div>

      {/* Right: availability rules */}
      <div>
        <div className="border border-border bg-card">
          <div className="px-5 py-3 border-b border-border">
            <h3 className="font-display text-sm">Availability rules</h3>
          </div>
          <div className="p-5 space-y-4 text-sm">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Working days
              </label>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => canManage && toggleDay(d)}
                    disabled={!canManage}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      workingDays.includes(d)
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    } ${!canManage ? 'cursor-not-allowed opacity-70' : ''}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Session start times
              </label>
              <div className="flex flex-wrap gap-2">
                {SLOT_TIMES.map((t) => (
                  <span key={t} className="px-3 py-1.5 text-xs border border-foreground bg-foreground text-background">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Session length
              </label>
              <select disabled className="w-full h-10 px-3 text-sm bg-white border border-border">
                <option>2 hours (the flat-rate session)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Travel buffer after an in-person session
              </label>
              <select
                value={travelBuffer}
                onChange={(e) => canManage && setTravelBuffer(parseInt(e.target.value, 10))}
                disabled={!canManage}
                className="w-full h-10 px-3 text-sm bg-white border border-border disabled:opacity-70"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Minimum notice before a session
              </label>
              <select
                value={minNotice}
                onChange={(e) => canManage && setMinNotice(parseInt(e.target.value, 10))}
                disabled={!canManage}
                className="w-full h-10 px-3 text-sm bg-white border border-border disabled:opacity-70"
              >
                <option value={12}>12 hours</option>
                <option value={24}>24 hours</option>
                <option value={48}>48 hours</option>
              </select>
            </div>
            <ToggleRow label="Allow video sessions" on={allowVideo} onChange={setAllowVideo} canManage={canManage} />
            <ToggleRow label="Allow in-person sessions" on={allowInPerson} onChange={setAllowInPerson} canManage={canManage} />

            {canManage && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={onSaveAvailability}
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-camel text-white px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-camel/90 transition-colors disabled:opacity-60"
                >
                  {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                  Save availability
                </button>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Times and buffer are sample values. Set your real ones. The
              website only offers a slot when it is inside working hours,
              not blocked, and the stylist is free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Calendar cell ──────────────────────────────────────────────────────

function CalendarCell({
  date,
  time,
  bookings,
  blocked,
  canManage,
  isBlocking,
  onToggleBlock,
}: {
  date: string
  time: string
  bookings: Booking[]
  blocked: Blocked | null
  canManage: boolean
  isBlocking: boolean
  onToggleBlock: (date: string, time: string) => void
}) {
  if (bookings.length > 0) {
    return (
      <div className="space-y-1">
        {bookings.map((b) => {
          const s = BOOKING_STATUS[b.status] ?? BOOKING_STATUS.PAID
          return (
            <Link
              key={b.id}
              href={`/admin/services/consultations/requests?selected=${b.id}`}
              className={`block h-16 p-1.5 text-white text-[10px] leading-tight ${s.tone} hover:opacity-90 transition-opacity`}
              title={`${b.bookerName} · ${b.sessionMode}`}
            >
              <strong>{b.bookerName.split(' ')[0]}</strong>
              <br />
              {b.sessionMode === 'Video call' ? 'video' : (b.location || '')}
            </Link>
          )
        })}
      </div>
    )
  }

  if (blocked) {
    return (
      <button
        type="button"
        onClick={() => onToggleBlock(date, time)}
        disabled={!canManage || isBlocking}
        className="w-full h-16 text-[10px] text-muted-foreground cursor-pointer flex flex-col items-center justify-center gap-1 hover:bg-secondary/40 disabled:cursor-not-allowed"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #eee, #eee 6px, #e2e2e2 6px, #e2e2e2 12px)',
        }}
      >
        <Lock className="h-3 w-3" />
        Blocked
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onToggleBlock(date, time)}
      disabled={!canManage || isBlocking}
      className="w-full h-16 text-[10px] text-olive border border-green-600/30 hover:bg-olive/5 cursor-pointer flex items-center justify-center disabled:cursor-not-allowed"
    >
      {canManage ? <Unlock className="h-3 w-3" /> : 'Open'}
    </button>
  )
}

// ─── Toggle row ──────────────────────────────────────────────────────────

function ToggleRow({
  label,
  on,
  onChange,
  canManage,
}: {
  label: string
  on: boolean
  onChange: (v: boolean) => void
  canManage: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        onClick={() => canManage && onChange(!on)}
        disabled={!canManage}
        className={`relative h-5 w-9 rounded-full transition-colors disabled:opacity-70 ${
          on ? 'bg-olive' : 'bg-muted'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
            on ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block h-3 w-3 ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </span>
  )
}
