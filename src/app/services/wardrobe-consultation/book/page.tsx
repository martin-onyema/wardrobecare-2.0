import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ConsultationWizard } from './consultation-wizard'

export const metadata: Metadata = {
  title: 'Book Wardrobe & Style Consultation — Wardrobecare',
  description:
    'Book a 90-minute Wardrobe & Style Consultation. ₦45,000 for the first two hours, paid in full at booking. Additional hours +₦10,000/hr at the session.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/services/wardrobe-consultation/book' },
}

export default function BookConsultationPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-32 md:pt-44 pb-20 md:pb-28">
          {/* Header */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <a href="/services" className="hover:text-foreground transition-colors">Services</a>
            <span>/</span>
            <a href="/services/wardrobe-consultation" className="hover:text-foreground transition-colors">
              Wardrobe &amp; Style Consultation
            </a>
            <span>/</span>
            <span className="text-foreground">Book</span>
          </nav>

          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust mb-4">
            Booking — Wardrobe &amp; Style Consultation
          </p>
          <h1 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.05] mb-4">
            Let&apos;s set up your session
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
            5 short steps. Takes about 2 minutes.
          </p>

          {/* Wizard */}
          <div className="mt-12">
            <ConsultationWizard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
