import { motion } from "motion/react";
import { Check, Lock, Zap, Package, PenTool } from "lucide-react";
import { EASE, Reveal, SectionHeading } from "@/components/Reveal";

const INCLUDED = [
  "The full Notion system across all 4 frameworks",
  "The printable workbooks",
  "The Excel-sheet version",
  "The explainer videos that walk you through every template",
];

export function PricingSection({ onBuy }: { onBuy: () => void }) {
  return (
    <section id="pricing" className="scroll-mt-20 border-y border-craft bg-sepia-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 04 — The offer"
          title={
            <>
              One offer. One price. <br className="hidden sm:block" />
              <span className="underline-pen">Everything</span> included.
            </>
          }
          note="no tiers to compare — there's nothing to decide except 'today or later'"
        />

        <div className="mt-16 flex justify-center">
          <Reveal className="w-full max-w-xl">
            <motion.div
              data-testid="pricing-card"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="paper-shadow-lg relative overflow-hidden rounded-2xl border-2 border-ink bg-sepia-light"
            >
              <div className="tape-strip -top-1 left-1/2 -translate-x-1/2 -rotate-1" aria-hidden="true" />

              <div className="absolute right-5 top-5 rotate-6 rounded border-2 border-penred px-3 py-1 font-hand text-lg font-semibold text-penred">
                everything included
              </div>

              <div className="ruled-lines px-8 pb-8 pt-12 sm:px-10">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-sepia">The Complete Blueprint Kit</p>
                <p className="mt-4 max-w-md text-sm italic leading-relaxed text-ink-muted sm:text-base">
                  Every way to plan your novel — Notion, paper, and spreadsheet — plus the videos that walk
                  you through every template. Everything, one price.
                </p>

                <div className="mt-8 flex items-end gap-3">
                  <span className="font-heading text-6xl font-bold tracking-tight text-ink sm:text-7xl">₹599</span>
                  <span className="pb-2 text-xs text-ink-muted">one-time purchase</span>
                </div>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-sepia" data-testid="pricing-trust-microcopy">
                  No subscription · One-time purchase · Instant access
                </p>

                <ul className="mt-8 space-y-3.5">
                  {INCLUDED.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-ink sm:text-base">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-ink bg-paper">
                        <Check className="size-3 text-ink" />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>

                <button
                  data-testid="checkout-button"
                  onClick={onBuy}
                  className="group mt-10 flex h-16 w-full items-center justify-center gap-3 rounded-full bg-highlight text-lg font-semibold text-ink transition-all duration-300 hover:bg-highlight-deep hover:shadow-[0_18px_44px_-12px_rgba(31,32,34,0.4)]"
                >
                  <PenTool className="size-5 transition-transform duration-300 group-hover:-rotate-12" />
                  Get the Blueprint Kit
                </button>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-craft-dark pt-6 text-center">
                  {[
                    { icon: Zap, label: "Instant access" },
                    { icon: Lock, label: "Secure Razorpay" },
                    { icon: Package, label: "Yours to keep" },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1.5">
                      <b.icon className="size-4 text-sepia" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
