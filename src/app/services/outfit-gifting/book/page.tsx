import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GiftingWizard } from './gifting-wizard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Book Outfit Gifting — Wardrobecare',
  description: 'Give a complete styled outfit, curated for him, gift-wrapped and delivered. From ₦40,000.',
  robots: { index: false, follow: false },
}

export default function GiftingBookPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stone-50">
        <GiftingWizard />
      </main>
      <Footer />
    </>
  )
}
