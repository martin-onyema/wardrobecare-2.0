import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export const metadata = {
  title: 'Shipping & Delivery',
  description:
    'Shipping and delivery information for Wardrobecare — retail orders and scheduled service bookings.',
}

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-16 md:py-24">
          {/* Hero */}
          <p className="text-[11px] uppercase tracking-[0.25em] text-rust mb-3">
            Customer Care
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] mb-6">
            Shipping &amp; Delivery Information
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-4">
            Wardrobecare operates two ways: shipped retail orders, and scheduled in-person or
            virtual services. Delivery and timing work differently for each — here&apos;s what
            to expect from both.
          </p>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.12em]">
            Last updated — to be confirmed
          </p>

          {/* Split nav */}
          <div className="mt-12 grid grid-cols-2 border-b border-border">
            <a
              href="#retail"
              className="text-center py-4 text-xs uppercase tracking-[0.2em] font-medium border-b-2 border-rust text-foreground"
            >
              Retail Orders
            </a>
            <a
              href="#services"
              className="text-center py-4 text-xs uppercase tracking-[0.2em] font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
            >
              Service Bookings
            </a>
          </div>

          {/* TOC chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { label: 'Payment on Delivery', href: '#payment' },
              { label: 'Delivery Timeline', href: '#timeline' },
              { label: 'What to Expect', href: '#expect' },
              { label: 'Your Responsibilities', href: '#responsibilities' },
              { label: 'Additional Fees', href: '#fees' },
              { label: 'Service Bookings', href: '#services' },
            ].map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className="text-[11px] uppercase tracking-[0.06em] bg-muted/40 border border-border px-3 py-1.5 rounded-full text-foreground hover:bg-muted transition-colors"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          {/* Retail Orders section */}
          <div id="retail" className="mt-20 scroll-mt-32">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Section
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mb-3">
              Retail Orders
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-12">
              Applies to physical items purchased through the Wardrobecare shop — clothing,
              footwear, accessories, and gifted outfits.
            </p>

            <div className="space-y-12">
              {/* Payment on Delivery */}
              <section id="payment" className="scroll-mt-32">
                <h3 className="font-display text-xl mb-3">Payment on Delivery</h3>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  We accept Cash on Delivery (COD), which can be completed by:
                </p>
                <ul className="list-disc pl-5 text-sm text-foreground leading-relaxed mb-3 space-y-1">
                  <li>Cash at hand</li>
                  <li>Bank transfer</li>
                  <li>Mobile transfer</li>
                  <li>Online transfer</li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For any transfer method, please have evidence of a completed transaction ready
                  once your order has been confirmed by you or your representative.
                </p>
              </section>

              {/* Delivery Timeline */}
              <section id="timeline" className="scroll-mt-32 border-t border-border pt-12">
                <h3 className="font-display text-xl mb-3">Delivery Timeline</h3>
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  <strong className="font-medium">Estimated delivery: 1 hour to 3 working days</strong>{' '}
                  for most Lagos locations, and{' '}
                  <strong className="font-medium">up to 7 working days</strong> for further
                  locations.
                </p>
                <div className="border border-border border-l-2 border-l-rust bg-muted/40 px-4 py-3 text-sm text-foreground my-4">
                  This is an estimate, not a guaranteed delivery date. Estimates factor in order
                  processing, transit to the delivery provider, and transit to your address.
                </div>
                <ul className="list-disc pl-5 text-sm text-foreground leading-relaxed space-y-1">
                  <li>
                    <strong className="font-medium">Order processing:</strong> typically 1–2 days,
                    though some orders ship within an hour and others may take up to 5 days.
                  </li>
                  <li>
                    <strong className="font-medium">Transit time:</strong> time for your order to
                    leave our distribution point and reach the local delivery carrier.
                  </li>
                </ul>
              </section>

              {/* What to Expect */}
              <section id="expect" className="scroll-mt-32 border-t border-border pt-12">
                <h3 className="font-display text-xl mb-3">What to Expect</h3>
                <p className="text-sm text-foreground leading-relaxed">
                  Once your order is ready, our delivery partner will contact you on the phone
                  number provided to confirm timing. Deliveries are made{' '}
                  <strong className="font-medium">between 8am and 6pm</strong> on your selected
                  day, with a call ahead to confirm an approximate arrival window.
                </p>
              </section>

              {/* Your Responsibilities */}
              <section id="responsibilities" className="scroll-mt-32 border-t border-border pt-12">
                <h3 className="font-display text-xl mb-3">Your Responsibilities</h3>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  <strong className="font-medium">Who needs to be present?</strong> You or a
                  representative aged 18 or older must be available to receive the order at the
                  agreed time. If no one is available, a re-delivery fee may apply.
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  <strong className="font-medium">On delivery:</strong> Sign the delivery note in
                  front of the courier to confirm receipt. Examine your order immediately for
                  damage or errors. If anything is missing, damaged, or incorrect, keep the
                  item(s), note the issue on the delivery note, and contact us within{' '}
                  <strong className="font-medium">48 hours</strong>.
                </p>
              </section>

              {/* Additional Fees */}
              <section id="fees" className="scroll-mt-32 border-t border-border pt-12">
                <h3 className="font-display text-xl mb-3">Additional Fees</h3>
                <p className="text-sm text-foreground leading-relaxed">
                  Extra charges may apply if standard delivery conditions aren&apos;t met — for
                  example, an inaccessible address, being unavailable at the scheduled time, or
                  a change of delivery address after your order has begun processing.
                </p>
              </section>
            </div>
          </div>

          {/* Service Bookings section */}
          <div id="services" className="mt-20 scroll-mt-32 border-t border-border pt-16">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Section
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mb-3">
              Service Bookings
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-12">
              Applies to Wardrobecare&apos;s styling and consultation services. These are
              scheduled, not shipped — timing depends on the service itself.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  tag: 'Virtual or In-Person',
                  title: 'Wardrobe & Style Consultation',
                  body: 'No delivery involved. Your session is confirmed by phone or WhatsApp once booked, with a fixed date and time — in person or by video call.',
                },
                {
                  tag: 'Sourced & Delivered',
                  title: 'Personal Shopping',
                  body: 'Once your brief is approved and sourced pieces are ready, delivery follows the same Retail Order process above — including COD and delivery windows.',
                },
                {
                  tag: 'On-Site Visit',
                  title: 'Home Fitting',
                  body: 'A stylist travels to your home or office at the scheduled time. If you need to reschedule, contact us at least 24 hours ahead where possible.',
                },
                {
                  tag: 'Sourced & Delivered',
                  title: 'Outfit Gifting',
                  body: 'The finished, gift-wrapped outfit is delivered the same way as a retail order, on the date you specify — directly to the recipient or to you.',
                },
                {
                  tag: 'Coming Soon',
                  title: 'Premium Sourcing',
                  body: 'Not yet bookable. Once live, sourced items will be delivered the same way as a retail order.',
                },
                {
                  tag: 'Coming Soon',
                  title: 'Traditional Wear Consultation',
                  body: 'Not yet bookable. Delivery and scheduling details will be published here once the service opens.',
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="border border-border p-5 flex flex-col"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-rust mb-2">
                    {s.tag}
                  </span>
                  <h4 className="font-display text-base mb-2">{s.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact block */}
          <div className="mt-20 border-t border-border pt-12">
            <h3 className="font-display text-xl mb-4">Questions About Your Order or Booking</h3>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.06em] text-muted-foreground mb-1">
                  Phone / WhatsApp
                </p>
                <p className="text-sm text-foreground">+234 XXX XXX XXXX</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.06em] text-muted-foreground mb-1">
                  Email
                </p>
                <p className="text-sm text-foreground">hello@wardrobecare.com</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.06em] text-muted-foreground mb-1">
                  Hours
                </p>
                <p className="text-sm text-foreground">Mon–Sat, 9am–6pm (Lagos time)</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-foreground text-background px-6 py-12 text-center">
            <h4 className="font-display text-lg mb-5">
              Questions about an order or booking?
            </h4>
            <Link
              href="/contact"
              className="inline-block bg-background text-foreground px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-rust hover:text-background transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
