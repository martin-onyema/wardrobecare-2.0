export const dynamic = 'force-dynamic'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Terms & Conditions — Wardrobecare',
  description: 'The terms that apply when you access, register with, or make a purchase on the Wardrobecare website.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-16 md:py-24">
          {/* Hero */}
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust mb-4">
            Legal
          </p>
          <h1 className="font-display text-4xl md:text-5xl tracking-[-0.02em] mb-6">
            Terms &amp; Conditions
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-4">
            The terms that apply when you access, register with, or make a purchase on the Wardrobecare website.
          </p>
          <p className="font-mono text-xs text-muted-foreground mb-12">
            Last updated — to be confirmed
          </p>

          {/* Split nav */}
          <div className="flex flex-wrap gap-4 border-b border-border mb-12 pb-3 text-sm text-muted-foreground">
            <a href="#introduction" className="hover:text-foreground transition-colors">Introduction</a>
            <a href="#eligibility" className="hover:text-foreground transition-colors">Eligibility</a>
            <a href="#account" className="hover:text-foreground transition-colors">Your Account</a>
            <a href="#availability" className="hover:text-foreground transition-colors">Site Availability</a>
          </div>

          {/* Introduction */}
          <section id="introduction" className="mb-12">
            <h2 className="font-display text-xl mb-4">Introduction</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Welcome to the Wardrobecare website and application. By accessing the Site, you agree to comply with these Terms &amp; Conditions. We may update these terms at any time — continued use of the Site after changes are posted means you accept them.
            </p>
          </section>

          {/* Eligibility */}
          <section id="eligibility" className="mb-12">
            <h2 className="font-display text-xl mb-4">Eligibility</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              You confirm that you are at least 18 years of age, or are accessing the Site under the supervision of a parent or legal guardian. We reserve the right to limit or withdraw access if we believe a user is under 18.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We grant you a non-transferable, revocable license to use the Site for the purpose of shopping for personal items and booking services. Any breach of these terms may result in immediate revocation of this license.
            </p>
          </section>

          {/* Your Account & Registration */}
          <section id="account" className="mb-12">
            <h2 className="font-display text-xl mb-4">Your Account &amp; Registration</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Registering an account lets you track orders, save addresses, and build a wishlist. You&apos;re responsible for keeping your login details confidential and for all activity under your account. Please notify us immediately of any unauthorized use.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs text-camel mt-1">—</span>
                Provide accurate, current, and complete information when registering
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs text-camel mt-1">—</span>
                Keep your registration details up to date
              </li>
            </ul>
          </section>

          {/* Site Availability */}
          <section id="availability" className="mb-16">
            <h2 className="font-display text-xl mb-4">Site Availability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We aim to keep the Site accessible at all times, but reserve the right to make changes, perform maintenance, or temporarily suspend access without notice.
            </p>
          </section>

          {/* Contact CTA */}
          <section className="bg-foreground text-background p-8 md:p-10">
            <h2 className="font-display text-xl mb-4">Questions about these terms?</h2>
            <Link
              href="/shipping"
              className="group inline-flex items-center justify-center gap-3 bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors"
            >
              Contact Us
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
