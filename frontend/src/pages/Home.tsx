import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { EditorialMarquee } from "@/components/EditorialMarquee";
import { WhoItsFor } from "@/components/WhoItsFor";
import { PeekInside } from "@/components/PeekInside";
import { FrameworkShowcase } from "@/components/FrameworkShowcase";
import { PricingSection } from "@/components/PricingSection";
import { FormatFlexibility } from "@/components/FormatFlexibility";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
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
        <WhoItsFor />
        <PeekInside />
        <FrameworkShowcase />
        <PricingSection onBuy={openCheckout} />
        <FormatFlexibility />
        <FaqSection />
        <FinalCta onBuy={openCheckout} />
      </main>
      <SiteFooter />
      <StickyMobileBar onBuy={openCheckout} />
      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  );
}
