/**
 * Shared constants and types for the consultation booking flow.
 *
 * Lives outside `src/actions/consultations.ts` (which is `'use server'`
 * and can only export async functions) so the wizard + confirmed page
 * can import these as plain values without pulling the server module
 * into the client bundle.
 */

// Prices (naira)
export const CONSULTATION_PRICE = 45000 // ₦45,000 — first two hours, flat
export const CONSULTATION_HOURLY_AFTER = 10000 // ₦10,000/hr after the first 2 hours

// Slot hold
export const CONSULTATION_HOLD_SECONDS = 10 * 60 // 10-minute slot hold

// Available time slots (Mon–Sat)
export const CONSULTATION_SLOT_TIMES = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] as const

// Service identity
export const CONSULTATION_SERVICE_NAME = 'Wardrobe & Style Consultation'
export const CONSULTATION_SERVICE_SLUG = 'wardrobe-consultation'

// Type used by getConsultationSlotsTaken
export type TakenSlot = { date: string; time: string }
