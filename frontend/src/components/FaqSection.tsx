import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { EASE, Reveal, SectionHeading } from "@/components/Reveal";

const FAQS = [
  {
    q: "How is the kit delivered after I pay?",
    a: "Instantly. The moment your Razorpay payment succeeds, your confirmation screen unlocks direct access links to the Notion template, PDF workbook, Excel tracker, and videos — and a delivery email lands in your inbox as a backup.",
  },
  {
    q: "Do I need to be a Notion user?",
    a: "No. The Notion dashboard is the most popular format, but the same system ships as a printable PDF workbook and an Excel/Sheets tracker. Many writers print the workbook and never open Notion at all.",
  },
  {
    q: "I'm a beginner. Is this too advanced for me?",
    a: "The kit assumes nothing. The walkthrough videos set up your entire system in one sitting, and every worksheet explains its beat in plain language. Beginners get structure; experienced writers get speed.",
  },
  {
    q: "Does it work for screenplays and short stories too?",
    a: "Yes — that's exactly why four frameworks are unified. Save the Cat and the Story Circle map naturally to screenplays and episodes; Three-Act and the Hero's Journey anchor novels and longer arcs.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "Write one beat sheet with it. If you don't feel the fog lift, email us within 7 days of purchase for a full refund — no questions, no forms, no guilt trip.",
  },
  {
    q: "Is this a subscription?",
    a: "No. ₹599 once, forever. Every future update to the kit — new worksheets, new walkthroughs — lands in your inbox free.",
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
              Questions from the <span className="highlight-mark">margins</span>.
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
