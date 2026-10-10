export const dynamic = 'force-dynamic'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Privacy & Confidentiality — Wardrobecare',
  description: 'How Wardrobecare collects, uses, and protects your personal information when you use our site and services.',
}

export default function PrivacyPage() {
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
            Privacy &amp; Confidentiality
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-4">
            How Wardrobecare collects, uses, and protects your personal information when you use our site and services.
          </p>
          <p className="font-mono text-xs text-muted-foreground mb-12">
            Last updated — to be confirmed
          </p>

          {/* Split nav */}
          <div className="flex flex-wrap gap-4 border-b border-border mb-12 pb-3 text-sm text-muted-foreground">
            <a href="#data-we-collect" className="hover:text-foreground transition-colors">Data We Collect</a>
            <a href="#how-we-use" className="hover:text-foreground transition-colors">How We Use It</a>
            <a href="#disclosure" className="hover:text-foreground transition-colors">Disclosure</a>
            <a href="#third-parties" className="hover:text-foreground transition-colors">Third Parties</a>
            <a href="#security" className="hover:text-foreground transition-colors">Security &amp; Cookies</a>
            <a href="#your-rights" className="hover:text-foreground transition-colors">Your Rights</a>
          </div>

          {/* Data We Collect */}
          <section id="data-we-collect" className="mb-12">
            <h2 className="font-display text-xl mb-4">Data We Collect</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When you place an order or use the Site, we may collect personal information including your name, gender, date of birth, email address, postal and delivery addresses, phone number, and payment details.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              You can browse the Site anonymously without providing personal details — we cannot identify you unless you&apos;ve created an account and logged in.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section id="how-we-use" className="mb-12">
            <h2 className="font-display text-xl mb-4">How We Use Your Information</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use your information to process orders and service bookings, manage your account, verify payments, coordinate delivery or in-person appointments, and improve how we style and shop for you. With your consent, we may also send you updates about services, new arrivals, or styling offers you might find useful. You can opt out of these communications at any time.
            </p>
          </section>

          {/* Disclosure of Your Information */}
          <section id="disclosure" className="mb-12">
            <h2 className="font-display text-xl mb-4">Disclosure of Your Information</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may share personal information to fulfill legal requirements, protect rights and safety, or facilitate delivery (for example, sharing your name and address with a courier). We do not sell your personal data to third parties without consent, except where required by law or necessary to provide our services.
            </p>
          </section>

          {/* Third Parties */}
          <section id="third-parties" className="mb-12">
            <h2 className="font-display text-xl mb-4">Third Parties</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We share only what&apos;s needed with the people who help us serve you — couriers for delivery, payment processors for transactions, and (where a service calls for it) external tailors for alterations work. We don&apos;t sell your personal data, and we don&apos;t have a network of affiliated companies to share it with — Wardrobecare is a single business. The Site may contain links to other sites; we aren&apos;t responsible for their privacy practices.
            </p>
          </section>

          {/* Security & Cookies */}
          <section id="security" className="mb-12">
            <h2 className="font-display text-xl mb-4">Security &amp; Cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use encryption, firewalls, and secure servers to protect your information, though no method of transmission is 100% secure. Cookies are used for convenience (e.g. remembering your cart) — not for targeted advertising. This site may use Google Analytics to understand site usage.
            </p>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="mb-12">
            <h2 className="font-display text-xl mb-4">Your Rights</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You have the right to request access to the personal data we hold about you, correct any inaccuracies free of charge, and ask us to stop using your data for direct marketing at any time.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section className="mb-16">
            <h2 className="font-display text-xl mb-4">Changes to This Policy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may amend this Privacy Policy at any time by posting updated terms on this page.
            </p>
          </section>

          {/* Contact CTA */}
          <section className="bg-foreground text-background p-8 md:p-10">
            <h2 className="font-display text-xl mb-4">Questions about your data?</h2>
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
