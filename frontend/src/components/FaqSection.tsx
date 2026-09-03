import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { EASE, Reveal, SectionHeading } from "@/components/Reveal";

const FAQS = [
  {
    q: "Do I need Notion to use this?",
    a: "No — the printable workbook and Excel-sheet version work without it, and they're included at the same price.",
  },
  {
    q: "Is this a subscription?",
    a: "No. One-time purchase, yours to keep.",
  },
  {
    q: "I write for OTT/screen, not novels — is this for me?",
    a: "Yes — Save the Cat and the Story Circle are screenwriting-grade frameworks, used as-is.",
  },
  {
    q: "What's included?",
    a: "Everything, at one price: the full Notion system across all 4 frameworks, the printable workbooks, the Excel-sheet version, and the explainer videos.",
  },
  {
    q: "What's your refund policy?",
    a: "We're finalizing the exact refund terms — this answer is a placeholder, not a promise. The confirmed policy will be published here before launch.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-craft bg-sepia-light py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 06 — Marginalia"
          title={
            <>
              Questions from the <span className="underline-pen">margins</span>.
            </>
          }
          note="asked by real writers, answered in plain ink"
        />

        <div className="mt-14 space-y-3" data-testid="faq-accordion">
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={faq.q} delay={0.05 * i}>
                <div
                  data-testid="faq-accordion-item"
                  className={`overflow-hidden rounded-lg border transition-colors duration-300 ${
                    open ? "paper-shadow border-ink bg-paper" : "border-craft bg-paper/70 hover:bg-paper"
                  }`}
                >
                  <button
                    data-testid={`faq-trigger-${i}`}
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-heading text-lg font-semibold leading-snug text-ink">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${open ? "border-penred bg-penred text-paper" : "border-craft-dark text-ink"}`}
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <p className="border-t border-craft px-6 py-5 text-sm leading-relaxed text-ink-muted sm:text-base">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
