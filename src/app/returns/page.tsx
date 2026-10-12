export const dynamic = 'force-dynamic'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Returns & Exchanges — Wardrobecare',
  description: 'Return and exchange policy for Wardrobecare Clothing orders.',
}

export default function ReturnsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-16 md:py-24">
          {/* Hero */}
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust mb-4">
            Customer Care
          </p>
          <h1 className="font-display text-4xl md:text-5xl tracking-[-0.02em] mb-6">
            Return &amp; Exchange Policy
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-4">
            At Wardrobecare, we want every customer fully satisfied with their purchase. If something isn&apos;t right, we&apos;re happy to help with an exchange under the conditions below.
          </p>
          <p className="font-mono text-xs text-muted-foreground mb-12">
            Last updated — to be confirmed
          </p>

          {/* Note */}
          <div className="bg-secondary/40 border-l-3 border-camel p-5 mb-12" style={{ borderLeftWidth: '3px' }}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Please note:</span> Wardrobecare offers exchanges only — not cash refunds. A change-of-mind exchange can be issued as wallet credit instead of a straight exchange.
            </p>
          </div>

          {/* Split nav */}
          <div className="flex flex-wrap gap-4 border-b border-border mb-12 pb-3 text-sm text-muted-foreground">
            <a href="#exchange-period" className="hover:text-foreground transition-colors">Exchange Period</a>
            <a href="#condition" className="hover:text-foreground transition-colors">Condition of Items</a>
            <a href="#eligible" className="hover:text-foreground transition-colors">Eligible Reasons</a>
            <a href="#non-returnable" className="hover:text-foreground transition-colors">Non-Returnable Items</a>
            <a href="#process" className="hover:text-foreground transition-colors">Exchange Process</a>
            <a href="#delivery" className="hover:text-foreground transition-colors">Delivery Costs</a>
            <a href="#refund" className="hover:text-foreground transition-colors">Refund Policy</a>
          </div>

          {/* 1. Exchange Period */}
          <section id="exchange-period" className="mb-12">
            <h2 className="font-display text-xl mb-4">1. Exchange Period</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Two different windows apply, depending on the reason:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs text-camel mt-1">—</span>
                <span><span className="text-foreground font-medium">Wrong size, wrong item, or defective/damaged item:</span> request an exchange within <span className="text-foreground font-medium">48 hours</span> of receiving it.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs text-camel mt-1">—</span>
                <span><span className="text-foreground font-medium">Change of mind:</span> request within a shorter <span className="text-foreground font-medium">24-hour window</span> from delivery.</span>
              </li>
            </ul>
          </section>

          {/* 2. Condition of Items */}
          <section id="condition" className="mb-12">
            <h2 className="font-display text-xl mb-4">2. Condition of Items</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              To qualify for an exchange, items must be:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> Unworn, unused, and unwashed</li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> In the original condition received</li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> Complete with all tags and packaging intact</li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> Free of damage, stains, or alterations</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              Wardrobecare reserves the right to decline exchanges if these conditions aren&apos;t met.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              If the replacement size or item is out of stock, Wardrobecare cannot guarantee a specific turnaround time for the exchange. Where a size exchange results from measurements or sizing information the customer provided, Wardrobecare is not responsible for delays in resolving it.
            </p>
          </section>

          {/* 3. Eligible Reasons */}
          <section id="eligible" className="mb-12">
            <h2 className="font-display text-xl mb-4">3. Eligible Reasons for Exchange</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> Wrong size</li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> Wrong item delivered</li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> Defective or damaged item (must be reported immediately upon delivery)</li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> Change of mind — within 24 hours, subject to the condition requirements above</li>
            </ul>
          </section>

          {/* 4. Non-Returnable Items */}
          <section id="non-returnable" className="mb-12">
            <h2 className="font-display text-xl mb-4">4. Non-Returnable Items</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              The following cannot be returned or exchanged:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> Innerwear and underwear items</li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> Items purchased on clearance or final sale</li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground"><span className="font-mono text-xs text-camel mt-1">—</span> Customized or altered items</li>
            </ul>
          </section>

          {/* 5. Exchange Process */}
          <section id="process" className="mb-12">
            <h2 className="font-display text-xl mb-4">5. Exchange Process</h2>
            <ol className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs text-camel mt-1">01</span>
                Contact us within the applicable window — 48 hours for wrong size, wrong item, or damage; 24 hours for a change of mind.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs text-camel mt-1">02</span>
                Send your order number, reason for exchange, and photos of the item if applicable.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs text-camel mt-1">03</span>
                Our team reviews the request and provides instructions for returning the item.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs text-camel mt-1">04</span>
                All returned items are inspected before an exchange is approved.
              </li>
            </ol>
          </section>

          {/* 6. Delivery Costs */}
          <section id="delivery" className="mb-12">
            <h2 className="font-display text-xl mb-4">6. Delivery Costs</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              If the exchange is due to a Wardrobecare error, we cover the delivery cost. If it&apos;s due to size preference or a change of mind, the customer covers the delivery cost.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For a change-of-mind exchange specifically, you can choose between a straight exchange for another item, or store credit deposited to your Wardrobecare wallet for a future purchase.
            </p>
          </section>

          {/* 7 & 8. Inspection & Refund Policy */}
          <section id="refund" className="mb-12">
            <h2 className="font-display text-xl mb-4">7 &amp; 8. Inspection &amp; Refund Policy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              All returned items are inspected before an exchange is approved. Wardrobecare does not currently offer refunds — only exchanges for eligible items.
            </p>
          </section>

          {/* 9. Availability of Replacement */}
          <section className="mb-16">
            <h2 className="font-display text-xl mb-4">9. Availability of Replacement</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Exchanges are subject to product availability. If the requested item is unavailable, a store credit may be issued instead.
            </p>
          </section>

          {/* Contact CTA */}
          <section className="bg-foreground text-background p-8 md:p-10">
            <h2 className="font-display text-xl mb-4">Need to start an exchange?</h2>
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
