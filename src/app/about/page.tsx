export const dynamic = 'force-dynamic'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About — Wardrobecare Clothing',
  description: "A distinguished men's fashion and personal-shopping business, built in Lagos since 2003.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-16 md:py-24">
          {/* Hero */}
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust mb-4">
            About Wardrobecare
          </p>
          <h1 className="font-display text-4xl md:text-5xl tracking-[-0.02em] mb-6">
            A distinguished men&apos;s fashion and personal-shopping business, built in Lagos since 2003.
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-12">
            Wardrobecare exists to take the guesswork out of dressing well — through personal styling, wardrobe consultancy, and a curated retail edit, built around how you actually live.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-16 border-y border-border py-8">
            <div>
              <p className="font-display text-3xl md:text-4xl text-rust mb-1">2003</p>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">Founded</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl text-rust mb-1">6</p>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">Core Services</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl text-rust mb-1">Lagos</p>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">Based &amp; Serving Nigeria</p>
            </div>
          </div>

          {/* Our Story */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Our Story</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                Wardrobecare began in 2003 with a simple belief: that dressing well shouldn&apos;t require guesswork, and that every man deserves a wardrobe that actually works for his life — not just what happens to be on a rack.
              </p>
              <p>
                What started as personal styling has grown into a full consultancy — wardrobe consultations, personal shopping, home fittings, gifting, and a curated retail edit — all built around the same principle: service comes first, and the clothes follow from there.
              </p>
              <p>
                Today, Wardrobecare works with clients across Lagos and beyond, in person and through phone and video consultations, helping men build wardrobes with intention rather than impulse.
              </p>
            </div>
          </section>

          {/* What We Believe */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-8">What We Believe</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border-l-2 border-camel pl-5">
                <p className="font-mono text-xs text-camel mb-2">01</p>
                <h3 className="font-display text-lg mb-2">Service First</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Styling and consultation come before the sale — not the other way around.
                </p>
              </div>
              <div className="border-l-2 border-camel pl-5">
                <p className="font-mono text-xs text-camel mb-2">02</p>
                <h3 className="font-display text-lg mb-2">Fit Over Everything</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The right fit outperforms the highest price tag, every time.
                </p>
              </div>
              <div className="border-l-2 border-camel pl-5">
                <p className="font-mono text-xs text-camel mb-2">03</p>
                <h3 className="font-display text-lg mb-2">Dress With Intention</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every piece should earn its place in your wardrobe — nothing bought on impulse.
                </p>
              </div>
              <div className="border-l-2 border-camel pl-5">
                <p className="font-mono text-xs text-camel mb-2">04</p>
                <h3 className="font-display text-lg mb-2">Plain, Honest Guidance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No jargon, no inflated claims — just clear advice you can actually use.
                </p>
              </div>
            </div>
          </section>

          {/* Founder */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Founder &amp; Stylist</h2>
            <div className="bg-secondary/40 border border-border p-8 md:p-10">
              <p className="font-display text-2xl mb-3">Olawunmi</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Olawunmi founded Wardrobecare in 2003 and remains the vision and driving force behind the business, now based in Lagos. He works directly with clients through in-person sessions, phone calls, and video consultations. His approach blends hands-on styling experience with a practical, plain-English philosophy: dressing well should be accessible, not intimidating.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-foreground text-background p-8 md:p-10">
            <h2 className="font-display text-2xl mb-4">
              Ready to build a wardrobe that works for you?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href="/services/wardrobe-consultation/book"
                className="group inline-flex items-center justify-center gap-3 bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors"
              >
                Book a Consultation
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-3 border border-background/40 px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-background/10 transition-colors"
              >
                Explore Services
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
