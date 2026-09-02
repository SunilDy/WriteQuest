import { motion } from "motion/react";
import { Check, Lock, ShieldCheck, Zap, PenTool } from "lucide-react";
import { EASE, Reveal, SectionHeading } from "@/components/Reveal";

const INCLUDED = [
  "All 4 frameworks pre-mapped to one beat sheet",
  "Notion dashboard + printable workbook + Excel tracker",
  "6 video walkthroughs (under 90 minutes total)",
  "Scene & chapter template bank (DOCX)",
  "Lifetime updates — every future version free",
];

export function PricingSection({ onBuy }: { onBuy: () => void }) {
  return (
    <section id="pricing" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 05 — The Decision"
          title={
            <>
              One kit. One price. <br className="hidden sm:block" />
              <span className="highlight-mark">Zero</span> decision fatigue.
            </>
          }
          note="no tiers, no upsells, no 'pro' version waiting behind this one"
        />

        <div className="mt-16 flex justify-center">
          <Reveal className="w-full max-w-xl">
            <motion.div
              data-testid="pricing-card"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="paper-shadow-lg relative overflow-hidden rounded-2xl border-2 border-ink bg-paper"
            >
              <div className="tape-strip -top-1 left-1/2 -translate-x-1/2 -rotate-1" aria-hidden="true" />

              <div className="absolute right-5 top-5 rotate-6 rounded border-2 border-penred px-3 py-1 font-hand text-lg font-semibold text-penred">
                everything included
              </div>

              <div className="ruled-lines px-8 pb-8 pt-12 sm:px-10">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-sepia">The Complete Blueprint Kit</p>

                <div className="mt-6 flex items-end gap-4">
                  <span className="font-heading text-6xl font-bold tracking-tight text-ink sm:text-7xl">₹599</span>
                  <span className="pb-2">
                    <span className="strike-red block font-heading text-2xl text-ink-muted">₹2,645</span>
                    <span className="text-xs text-ink-muted">one-time · GST incl.</span>
                  </span>
                </div>

                <ul className="mt-8 space-y-3.5">
                  {INCLUDED.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-ink sm:text-base">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-highlight">
                        <Check className="size-3 text-ink" />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>

                <button
                  data-testid="checkout-button"
                  onClick={onBuy}
                  className="group mt-10 flex h-16 w-full items-center justify-center gap-3 rounded-full bg-ink text-lg font-semibold text-parchment transition-all duration-300 hover:bg-penred hover:shadow-[0_18px_44px_-12px_rgba(200,59,45,0.55)]"
                >
                  <PenTool className="size-5 transition-transform duration-300 group-hover:-rotate-12" />
                  Get the Complete Blueprint Kit
                </button>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-craft pt-6 text-center">
                  {[
                    { icon: Zap, label: "Instant delivery" },
                    { icon: ShieldCheck, label: "7-day refund" },
                    { icon: Lock, label: "Secure Razorpay" },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1.5">
                      <b.icon className="size-4 text-sepia" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">{b.label}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-center font-hand text-lg text-penred">
                  if it doesn't get you writing, you don't pay. simple.
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
