import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PenTool } from "lucide-react";
import { EASE } from "@/components/Reveal";

export function StickyMobileBar({ onBuy }: { onBuy: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="sticky-mobile-bar"
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-craft-dark bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
        >
          <div className="flex h-[68px] items-center justify-between gap-3 px-4">
            <div>
              <p className="font-heading text-xl font-bold leading-none">₹599</p>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                <span className="strike-red">₹2,645</span> · one-time
              </p>
            </div>
            <button
              data-testid="sticky-mobile-buy-button"
              onClick={onBuy}
              className="flex h-12 min-w-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-parchment transition-colors duration-300 active:bg-penred"
            >
              <PenTool className="size-4" />
              Get the Blueprint Kit
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
