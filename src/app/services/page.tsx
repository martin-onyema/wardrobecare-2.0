import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ServiceEnquiryForm } from '@/components/services/service-enquiry-form'
import { SERVICES, SERVICE_GROUPS } from '@/lib/services-data'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services — Personal Shopping, Wardrobe & Style Consultations, Home Fittings & Gifting',
  description:
    'Five ways to work with Wardrobecare — from a combined wardrobe & style consultation to fully sourced personal shopping, in-home fittings, outfit gifting, and traditional wear styling. Lagos and nationwide.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Wardrobecare Services — A more personal way to dress well.',
    description:
      'Wardrobe & style consultations, personal shopping, home fittings, outfit gifting, and traditional wear styling. Built around you.',
    type: 'website',
    images: [
      {
        url: 'https://wardrobecare.com.ng/services/hero.jpg',
        alt: 'A curated rail of distinguished menswear pieces',
      },
    ],
  },
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* ─── Hero — split layout with working background image ─── */}
        <section className="relative overflow-hidden border-b border-border/60">
          {/* Background image — properly z-indexed so it's actually visible */}
          <div className="absolute inset-0">
            <Image
              src="/services/hero.jpg"
              alt="Distinguished menswear editorial image"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40" />
          </div>

          {/* Content — z-10 so it sits above the image */}
          <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-10 py-24 md:py-32 lg:py-40 text-background">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust mb-6">
                Wardrobecare Services · Lagos · Est. 2003
              </p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em]">
                A more personal way to dress well.
              </h1>
              <p className="text-base md:text-lg text-background/85 mt-8 max-w-2xl leading-relaxed">
                Five ways to work with us — from a combined wardrobe &amp; style consultation to
                fully sourced personal shopping, in-home fittings, outfit gifting, and traditional
                wear styling. Built around you.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="#book"
                  className="group inline-flex items-center gap-3 bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors"
                >
                  Book a Consultation
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#services"
                  className="group inline-flex items-center gap-2 border border-background/40 px-7 py-4 text-[11px] uppercase tracking-[0.2em] text-background hover:bg-background/10 transition-colors"
                >
                  Explore Services
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Intro — compact, two-column ─── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust mb-4">
                  Five Ways to Work With Us
                </p>
                <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
                  From one-off consultations to fully sourced, in-home styling.
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Wardrobecare is more than a shop. It&apos;s a styling partner — for one
                  outfit, one occasion, or your entire wardrobe. Whether you need a single piece
                  sourced, a full seasonal refresh, or someone to come fit you at home, we have a
                  service built for it.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mt-6">
                  Every engagement starts with a brief and ends with you looking — and feeling —
                  exactly the way you want to. No guesswork. No second trips. No buyer&apos;s
                  remorse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Grouped Services ─── */}
        <section id="services" className="pb-24 md:pb-32 bg-background">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            {SERVICE_GROUPS.map((group, gIdx) => (
              <div
                key={group.label}
                className={gIdx > 0 ? 'mt-20 md:mt-24' : ''}
              >
                {/* Group header — serif title left, monospace tag right */}
                <div className="flex items-baseline justify-between border-b border-border pb-5 mb-10">
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                    {group.label}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage">
                    {group.description}
                  </span>
                </div>

                {/* Group cards — wide horizontal cards, not the old 3-col grid */}
                <div className="space-y-4">
                  {group.services.map((service) => {
                    const isComingSoon = service.comingSoon === true
                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className={[
                          'group block border border-border/70 bg-card hover:border-foreground transition-all duration-300',
                          isComingSoon ? 'opacity-60 hover:opacity-100' : '',
                        ].join(' ')}
                      >
                        <div className="grid md:grid-cols-12 gap-0">
                          {/* Image — left, 4/12 on desktop, full on mobile */}
                          <div className="md:col-span-4 relative aspect-[4/3] md:aspect-auto md:min-h-[260px] overflow-hidden bg-muted">
                            <Image
                              src={service.image}
                              alt={service.imageAlt}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className={[
                                'object-cover',
                                isComingSoon
                                  ? 'grayscale'
                                  : 'transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]',
                              ].join(' ')}
                            />
                            <div className="absolute top-4 left-4">
                              <span className="font-display text-lg text-background mix-blend-difference">
                                {service.number}
                              </span>
                            </div>
                            {service.badge && (
                              <div className="absolute top-4 right-4">
                                <span className="font-mono text-[10px] uppercase tracking-[0.15em] bg-background/95 text-foreground px-2.5 py-1.5">
                                  {service.badge}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Body — right, 8/12 on desktop */}
                          <div className="md:col-span-8 p-7 md:p-10 flex flex-col">
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage mb-3">
                              {service.category}
                            </p>
                            <h4 className="font-display text-2xl md:text-3xl tracking-tight leading-tight">
                              {service.name}
                            </h4>
                            <p className="text-sm md:text-base text-muted-foreground mt-4 leading-relaxed line-clamp-2">
                              {service.tagline}
                            </p>

                            {/* Price + arrow row, pushed to bottom */}
                            <div className="mt-auto pt-6 flex items-baseline justify-between border-t border-border/60 mt-6">
                              <div>
                                {isComingSoon ? (
                                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-sage">
                                    Not bookable yet
                                  </span>
                                ) : (
                                  <div className="flex items-baseline gap-3">
                                    <span className="font-mono text-sm text-rust font-semibold">
                                      {service.priceLabel}
                                    </span>
                                    <span className="font-mono text-[11px] text-muted-foreground">
                                      · {service.priceUnit}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {!isComingSoon && (
                                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground group-hover:gap-3 transition-all">
                                  View
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Booking CTA ─── */}
        <section id="book" className="py-20 md:py-32 bg-secondary/40 border-y border-border/60">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left: copy */}
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust mb-6">
                  Book a Consultation
                </p>
                <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
                  Tell us what you need.
                  <br />
                  <span className="text-muted-foreground">We&apos;ll handle the rest.</span>
                </h2>
                <p className="text-base text-muted-foreground mt-8 max-w-md leading-relaxed">
                  Fill out the form and we&apos;ll be in touch within 24 hours to plan the next step —
                  whether that&apos;s a quick WhatsApp call, a home visit, or sourcing a specific piece.
                </p>
                <div className="mt-10 space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-rust" />
                    <p>No deposit required to enquire.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-rust" />
                    <p>We respond to every enquiry within 24 hours.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-rust" />
                    <p>Services available in Lagos, Abuja, and nationwide.</p>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="lg:col-span-7 lg:col-start-6 bg-background p-8 md:p-12 border border-border/60">
                <ServiceEnquiryForm />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Cross-link to Shop ─── */}
        <section className="py-20 md:py-28 bg-foreground text-background">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-background/60 mb-3">
                Prefer to browse yourself?
              </p>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight">
                Explore the Shop.
              </h3>
              <p className="text-sm text-background/70 mt-3 max-w-md">
                Five hundred curated pieces across clothing, footwear, accessories, and fragrance.
                Filter by category, size, and price.
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors flex-shrink-0"
            >
              Shop the Collection
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
