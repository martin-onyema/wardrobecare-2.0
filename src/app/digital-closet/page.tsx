import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { NotifyForm } from './notify-form'
import {
  ArrowRight,
  Camera,
  Check,
  Image as ImageIcon,
  Lock,
  Plus,
  Scissors,
  Sparkles,
  UserRound,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Digital Closet & Capsule Wardrobe — Coming Soon · Wardrobecare',
  description:
    'Catalogue what you own, get wear suggestions, care reminders, and a built-out capsule wardrobe. The closet comes first — a place to hold and organize what you own. The capsule wardrobe is what forms once it is built up. One subscription, tied to your Wardrobe & Style Consultation or started fresh on your own.',
  alternates: { canonical: '/digital-closet' },
  openGraph: {
    title: 'Digital Closet & Capsule Wardrobe — Coming Soon',
    description:
      'Catalogue what you own, get wear suggestions, care reminders, and a built-out capsule wardrobe. Join the waitlist to be first to know when it launches.',
    type: 'website',
  },
}

// ─── Sample data (illustrative — clearly labeled as samples in the UI) ──────

const SAMPLE_OUTFITS = [
  { num: 1, label: 'Office', desc: 'Navy blazer, white shirt, grey trouser' },
  { num: 2, label: 'Church', desc: 'Cream kaftan, brown loafers' },
  { num: 3, label: 'Friday Casual', desc: 'Olive overshirt, dark denim' },
  { num: 4, label: 'Date Night', desc: 'Black polo, tailored chino' },
  { num: 5, label: 'Wedding Guest', desc: 'Senator, brown accessories' },
]

const SAMPLE_WARDROBE = [
  { label: 'Shirts/Tops', count: '3 pieces' },
  { label: 'Trousers', count: '2 pieces' },
  { label: 'Footwear', count: '2 pairs' },
  { label: 'Traditional Wear', count: '1 piece' },
]

const SAMPLE_GAPS = [
  { item: 'A tan or brown blazer', why: 'Nothing bridges Outfit 3 (casual) and Outfit 1 (office)' },
  { item: 'A plain white t-shirt, fitted', why: 'Layers under Outfit 3\'s overshirt' },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DigitalClosetPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* ─── Hero ─── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 md:py-28">
            <div className="max-w-3xl">
              <span className="inline-block font-mono text-[10px] uppercase tracking-[0.18em] bg-foreground text-background px-2.5 py-1 mb-6">
                Coming Soon
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.05]">
                Digital Closet &amp; Capsule Wardrobe
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed">
                The closet comes first — a place to hold and organize what you own. The capsule
                wardrobe is what forms once it&apos;s built up. One subscription, tied to your
                Wardrobe &amp; Style Consultation or started fresh on your own.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Managing ─── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Managing
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { name: 'Femi', relation: 'Husband' },
                  { name: 'David', relation: 'Son' },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="inline-flex items-center gap-2 border border-border px-4 py-2 bg-card"
                  >
                    <UserRound className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{p.name}</span>
                    <span className="text-xs text-muted-foreground">({p.relation})</span>
                  </div>
                ))}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 border border-dashed border-border px-4 py-2 hover:border-foreground transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span className="text-sm text-muted-foreground">Add Someone</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                New here? Here&apos;s how it works
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
              {[
                { n: '01', title: 'Start Free', body: '7 days, no cost, whether you\'ve had a Consultation or just found this page.' },
                { n: '02', title: 'Look Around', body: 'See a sample closet below so you know what it looks like before adding anything.' },
                { n: '03', title: 'Go Annual to Add Your Own', body: 'Subscribing unlocks adding your real pieces and building your own combinations.' },
                { n: '04', title: 'Send Photos, We Clean Them Up', body: 'Snap what you own — we turn it into a proper catalog photo. Details below.' },
              ].map((s) => (
                <div key={s.n}>
                  <p className="font-mono text-xs text-camel mb-2">{s.n}</p>
                  <h3 className="font-display text-lg tracking-tight mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-10 max-w-2xl leading-relaxed italic">
              Didn&apos;t come through a Consultation? You don&apos;t need one to start — whether
              you found this while shopping the site or came across it directly, the path in is the
              same either way.
            </p>
          </div>
        </section>

        {/* ─── Trial / Annual callout ─── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-20">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
                  Start free for 7 days.
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Explore the closet at no cost. Adding your own pieces and reshuffling
                  combinations both require the Annual plan — see why below.
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex items-end">
                <a
                  href="#waitlist"
                  className="group inline-flex items-center justify-center gap-3 bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors w-fit"
                >
                  Join the Waitlist
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Locked Trial — Add Your Existing Pieces ─── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <div className="flex items-start gap-3 mb-8">
              <Lock className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  Locked — Trial
                </p>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                  Add Your Existing Pieces
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                  During your free trial, you can look around — building your own capsule wardrobe
                  from your existing clothes unlocks once you subscribe annually.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 lg:gap-10">
              {[
                { n: '01', title: 'Sort by Category', body: 'List what you own — shirts/tops, trousers, footwear, and so on.' },
                { n: '02', title: 'Tag Colour & Occasion', body: 'A quick tag for each piece — what it is, and when you\'d wear it.' },
                { n: '03', title: 'We Find Combinations', body: 'Your capsule wardrobe builds itself from what you\'ve added.' },
              ].map((s) => (
                <div key={s.n} className="opacity-50">
                  <p className="font-mono text-xs text-camel mb-2">{s.n}</p>
                  <h3 className="font-display text-lg tracking-tight mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Unlocked Annual — Add Your Existing Pieces ─── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <div className="flex items-start gap-3 mb-8">
              <Check className="h-5 w-5 text-olive mt-1" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-olive mb-2">
                  Unlocked — Annual Subscriber
                </p>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                  Add Your Existing Pieces
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                  Once you&apos;re on the Annual plan, the walkthrough above becomes fully usable —
                  add as many pieces as you own, any time.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 lg:gap-10">
              {[
                { n: '01', title: 'Sort by Category', body: 'List what you own — shirts/tops, trousers, footwear, and so on.' },
                { n: '02', title: 'Tag Colour & Occasion', body: 'A quick tag for each piece — what it is, and when you\'d wear it.' },
                { n: '03', title: 'We Find Combinations', body: 'Your capsule wardrobe builds itself from what you\'ve added.' },
              ].map((s) => (
                <div key={s.n}>
                  <p className="font-mono text-xs text-camel mb-2">{s.n}</p>
                  <h3 className="font-display text-lg tracking-tight mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Starting From Zero? AI Build You a Plan ─── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-6">
                <span className="inline-block font-mono text-[10px] uppercase tracking-[0.18em] bg-camel text-foreground px-2.5 py-1 mb-6">
                  Included with Annual
                </span>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
                  Starting from zero? Let AI build you a plan
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  No existing pieces to add yet? Answer a short quiz and get a complete, itemised
                  capsule wardrobe plan — what to buy, not just what you already own. Previously a
                  separate ₦15,000 one-time purchase; now included in the Annual subscription, no
                  extra fee.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  How it works: answer a few questions about your lifestyle, body type, and budget —
                  about 2 minutes. We generate a full capsule plan on the spot, rooted in the same
                  principles our stylists use with in-person clients. Buy the pieces directly, or
                  hand the list to Personal Shopping to source it for you.
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  Not just a chatbot. Every plan can be reviewed by a Wardrobecare stylist directly —
                  if something doesn&apos;t feel right, a real person checks it before you buy
                  anything.
                </p>
              </div>

              {/* Sample AI chat */}
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="border border-border bg-card">
                  <div className="px-5 py-4 border-b border-border">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Wardrobecare Styling Assistant
                    </p>
                  </div>
                  <div className="px-5 py-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-7 w-7 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Assistant</p>
                        <p className="text-sm text-foreground leading-relaxed">
                          What best describes your day-to-day? Office, hybrid, or mostly casual?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 ml-12">
                      <div className="flex-1 border border-border bg-background px-3 py-2">
                        <p className="text-sm text-foreground leading-relaxed">
                          Hybrid — office 3 days, casual the rest
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-7 w-7 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Assistant</p>
                        <p className="text-sm text-foreground leading-relaxed">
                          Got it. What&apos;s your rough budget for building this out?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 ml-12">
                      <div className="flex-1 border border-border bg-background px-3 py-2">
                        <p className="text-sm text-foreground leading-relaxed">
                          Around ₦200,000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── From Your Photo to a Product Photo ─── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-3">
              From your photo to a product photo
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed mb-10">
              You send a normal phone photo of something you own. Here&apos;s what happens to it
              before it appears in your closet.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
              {[
                { icon: Camera, title: 'You Snap It', body: 'Guided frame overlay in-app: plain background, natural light, item laid flat or worn.' },
                { icon: Scissors, title: 'Background Removed', body: 'Automated background removal isolates the item, same as our product photography.' },
                { icon: ImageIcon, title: 'Colour & Light Corrected', body: 'Automatic correction so colour reads true, matching site-standard product shots.' },
                { icon: Check, title: 'Staff Spot-Check', body: 'A quick human review before it\'s saved — catches anything the automation missed.' },
              ].map((s, i) => (
                <div key={s.title}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 border border-border bg-background flex items-center justify-center">
                      <s.icon className="h-4 w-4 text-foreground" />
                    </div>
                    {i < 3 && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
                    )}
                  </div>
                  <h3 className="font-display text-base tracking-tight mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Femi's Outfits Example ─── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <div className="flex items-baseline justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                  Femi&apos;s Outfits Example
                </h2>
                <p className="text-sm text-muted-foreground mt-2">7 combinations</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed mb-10">
              This is a sample closet, so you can see what yours will look like — numbered exactly
              as they&apos;d be during your consultation, the same numbers you&apos;d find on your
              wardrobe rail.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {SAMPLE_OUTFITS.map((o) => (
                <div key={o.num} className="border border-border p-5 bg-card">
                  <p className="font-mono text-xs text-camel mb-3">
                    Outfit {o.num}
                  </p>
                  <h3 className="font-display text-base tracking-tight mb-1">
                    {o.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {o.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Discover New Combinations ─── */}
        <section className="border-b border-border bg-foreground text-background">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                Discover New Combinations Example
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-background/60">
                Annual Only
              </span>
            </div>
            <p className="text-sm md:text-base text-background/70 max-w-2xl leading-relaxed mb-10">
              outfit matching guide
            </p>
            <p className="text-sm md:text-base text-background/70 max-w-2xl leading-relaxed mb-10">
              New pairings from pieces you already own, with the styling logic explained.
            </p>
            <div className="border border-background/20 p-6 md:p-8 max-w-2xl">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-display text-xl tracking-tight">
                  Neutral Anchor + One Accent
                </h3>
                <button
                  type="button"
                  className="font-mono text-[10px] uppercase tracking-[0.15em] text-background/80 border border-background/30 px-3 py-1.5 hover:bg-background/10 transition-colors"
                >
                  Shuffle
                </button>
              </div>
              <p className="text-sm text-background/80 mb-2">
                White shirt, black trouser, black shoe
              </p>
              <p className="text-sm text-background/60 leading-relaxed">
                A safe, reliable pairing — neutrals always work together, no colour-matching risk.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Femi's Wardrobe Example ─── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <div className="flex items-baseline justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                  Femi&apos;s Wardrobe Example
                </h2>
                <p className="text-sm text-muted-foreground mt-2">by category</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {SAMPLE_WARDROBE.map((w) => (
                <div key={w.label} className="border border-border p-5 bg-card">
                  <p className="font-display text-base tracking-tight mb-1">{w.label}</p>
                  <p className="text-sm text-muted-foreground">{w.count}</p>
                </div>
              ))}
            </div>
            <div className="border-l-2 border-camel pl-5 max-w-2xl">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Where fusion pieces go: a standalone fusion top or bottom (an agbada-cut jacket,
                a print-fabric trouser) files under Shirts/Tops or Trousers, same as any Western
                piece. A complete fusion outfit or classic native wear — agbada, kaftan, senator —
                files under Traditional Wear.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Wardrobe Gaps Example ─── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <div className="mb-10">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                Wardrobe Gaps Example
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                from Femi&apos;s latest consultation
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {SAMPLE_GAPS.map((g, i) => (
                <div key={i} className="border border-border p-5 bg-background">
                  <p className="font-display text-base tracking-tight mb-2">{g.item}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Subscription ─── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <div className="mb-10">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight">Subscription</h2>
            </div>
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  Base Plan
                </p>
                <h3 className="font-display text-2xl tracking-tight mb-3">Annual</h3>
                <p className="font-mono text-3xl md:text-4xl text-rust font-bold mb-4">
                  ₦50,000<span className="text-base text-muted-foreground font-normal"> / year</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
                  Included as the standard next step after a Wardrobe &amp; Style Consultation,
                  or subscribed to directly.
                </p>

                <div className="space-y-3">
                  <div className="border-l-2 border-camel pl-4 py-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-camel mb-1">
                      Earn Free Time
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Any additional purchase after your Consultation adds a free month to your
                      subscription.
                    </p>
                  </div>
                  <div className="border-l-2 border-camel pl-4 py-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-camel mb-1">
                      Earn Free Time
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Spend ₦500,000+ in a single order and get 3 months free.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex items-end">
                <a
                  href="#waitlist"
                  className="group inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors w-fit"
                >
                  Join the Waitlist
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Waitlist ─── */}
        <section id="waitlist" className="bg-secondary/40">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-3">
                Be the first to know when this opens
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10">
                Leave your details and we&apos;ll notify you as soon as the free trial is
                available.
              </p>
              <div className="mx-auto max-w-md">
                <NotifyForm />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Disclaimer ─── */}
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10">
            <p className="text-xs text-muted-foreground text-center italic">
              No pricing shown above is final — this page previews what the product will look
              like once it launches.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
