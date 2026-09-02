import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { EditorialMarquee } from "@/components/EditorialMarquee";
import { FrameworkShowcase } from "@/components/FrameworkShowcase";
import { ManifestoChapters } from "@/components/ManifestoChapters";
import { ProductGallery } from "@/components/ProductGallery";
import { WhatsInside } from "@/components/WhatsInside";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { SiteFooter } from "@/components/SiteFooter";
import { CheckoutDialog } from "@/components/CheckoutDialog";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const openCheckout = () => setCheckoutOpen(true);

  return (
    <div className="min-h-screen bg-parchment font-sans text-ink antialiased">
      <SiteHeader onBuy={openCheckout} />
      <main>
        <Hero onBuy={openCheckout} />
        <EditorialMarquee />
        <FrameworkShowcase />
        <ManifestoChapters />
        <ProductGallery />
        <WhatsInside />
        <PricingSection onBuy={openCheckout} />
        <FaqSection />
      </main>
      <SiteFooter />
      <StickyMobileBar onBuy={openCheckout} />
      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  );
}
