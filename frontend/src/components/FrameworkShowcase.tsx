import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { EASE, Reveal, SectionHeading } from "@/components/Reveal";

interface Beat {
  index: string;
  name: string;
  detail: string;
  mark: string;
}

interface Framework {
  id: string;
  number: string;
  name: string;
  origin: string;
  thesis: string;
  note: string;
  beats: Beat[];
}

const FRAMEWORKS: Framework[] = [
  {
    id: "three-act",
    number: "01",
    name: "Three-Act Structure",
    origin: "Aristotle → Syd Field",
    thesis: "The spine. Beginning, confrontation, resolution — the load-bearing wall every other framework hangs on.",
    note: "— start here if your draft has no shape yet",
    beats: [
      { index: "I.1", name: "The Ordinary World", detail: "Establish who your protagonist is before the story breaks their routine.", mark: "p.1–10" },
      { index: "I.2", name: "Inciting Incident", detail: "The event that makes the old life impossible to continue.", mark: "~12%" },
      { index: "II.1", name: "First Plot Point", detail: "The protagonist commits. The door locks behind them.", mark: "~25%" },
      { index: "II.2", name: "Midpoint", detail: "Stakes double. A false victory — or a false defeat.", mark: "~50%" },
      { index: "II.3", name: "Crisis", detail: "Everything is stripped away. The lowest moment of the book.", mark: "~75%" },
      { index: "III.1", name: "Climax & Resolution", detail: "The final confrontation, then the new equilibrium.", mark: "~90–100%" },
    ],
  },
  {
    id: "heros-journey",
    number: "02",
    name: "The Hero's Journey",
    origin: "Joseph Campbell",
    thesis: "The mythic layer. Departure, initiation, return — the shape of transformation itself.",
    note: "— the emotional undercurrent of every epic",
    beats: [
      { index: "H.1", name: "Call to Adventure", detail: "A summons out of the ordinary world — and the first, human refusal.", mark: "Departure" },
      { index: "H.2", name: "Meeting the Mentor", detail: "Guidance, a gift, or the push across the threshold.", mark: "Departure" },
      { index: "H.3", name: "Crossing the Threshold", detail: "The hero enters the special world. No way back.", mark: "Departure" },
      { index: "H.4", name: "Tests, Allies, Enemies", detail: "The world reveals its rules — and its dangers.", mark: "Initiation" },
      { index: "H.5", name: "The Ordeal", detail: "The hero faces their greatest fear and dies — symbolically.", mark: "Initiation" },
      { index: "H.6", name: "Resurrection & Return", detail: "Purified by the ordeal, the hero brings the elixir home.", mark: "Return" },
    ],
  },
  {
    id: "save-the-cat",
    number: "03",
    name: "Save the Cat",
    origin: "Blake Snyder",
    thesis: "The page-precision layer. Fifteen beats, mapped to exact page ranges — ruthless, reliable pacing.",
    note: "— screenwriters swear by it; novelists steal it",
    beats: [
      { index: "S.1", name: "Opening Image", detail: "A snapshot of 'before' — the thesis of the whole story in one frame.", mark: "p.1" },
      { index: "S.2", name: "Catalyst", detail: "The telegram, the knock, the discovery. Life changes direction.", mark: "p.12" },
      { index: "S.3", name: "Debate", detail: "The last chance to walk away. Doubt gets its scene.", mark: "p.12–25" },
      { index: "S.4", name: "Fun & Games", detail: "The promise of the premise — the trailer moments live here.", mark: "p.30–55" },
      { index: "S.5", name: "All Is Lost", detail: "The whiff of death. Everything the hero built collapses.", mark: "p.75" },
      { index: "S.6", name: "Finale & Final Image", detail: "The lesson applied, the world transformed — 'after' mirrors 'before'.", mark: "p.85–110" },
    ],
  },
  {
    id: "story-circle",
    number: "04",
    name: "The Story Circle",
    origin: "Dan Harmon",
    thesis: "The engine layer. Eight steps of need and change — perfect for episodes, chapters, and character arcs.",
    note: "— run every subplot through this loop",
    beats: [
      { index: "C.1", name: "You — Comfort Zone", detail: "A character in a situation of familiar order.", mark: "Step 1" },
      { index: "C.2", name: "Need — A Desire", detail: "Something is missing. The want that starts the engine.", mark: "Step 2" },
      { index: "C.3", name: "Go — Unfamiliar Situation", detail: "They cross into chaos to chase the need.", mark: "Step 3" },
      { index: "C.4", name: "Search — Adaptation", detail: "Trial and error. The world pushes back.", mark: "Step 4" },
      { index: "C.5", name: "Find — Get What They Wanted", detail: "The object is seized — but every find has a price.", mark: "Step 5" },
      { index: "C.6", name: "Take, Return, Change", detail: "They pay the price, go home altered — and the circle resets.", mark: "Steps 6–8" },
    ],
  },
];

export function FrameworkShowcase() {
  const [active, setActive] = useState(FRAMEWORKS[0]);

  return (
    <section id="frameworks" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 01 — The Four Engines"
          title={
            <>
              Four legendary frameworks. <br className="hidden sm:block" />
              One <span className="highlight-mark">unified</span> beat map.
            </>
          }
          note="stop choosing between systems — they're the same skeleton, seen from four sides"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="flex flex-col gap-2" role="tablist" aria-label="Story frameworks">
              {FRAMEWORKS.map((fw) => {
                const selected = fw.id === active.id;
                return (
                  <button
                    key={fw.id}
                    role="tab"
                    aria-selected={selected}
                    data-testid={`framework-tab-${fw.id}`}
                    onClick={() => setActive(fw)}
                    className={`group relative rounded-lg border p-5 text-left transition-all duration-300 ${
                      selected
                        ? "paper-shadow-lg -translate-y-0.5 border-ink bg-paper"
                        : "border-craft bg-paper/60 hover:-translate-y-0.5 hover:border-craft-dark hover:bg-paper"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className={`font-mono text-xs tracking-[0.2em] ${selected ? "text-penred" : "text-sepia"}`}>
                        {fw.number}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-sepia/70">{fw.origin}</span>
                    </div>
                    <p className="mt-2 font-heading text-xl font-semibold text-ink">{fw.name}</p>
                    <p className={`mt-1 text-sm leading-relaxed transition-colors ${selected ? "text-ink-muted" : "text-ink-muted/70"}`}>
                      {fw.thesis}
                    </p>
                    {selected && <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-penred" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="paper-shadow relative overflow-hidden rounded-xl border border-craft bg-paper"
                data-testid="framework-beat-panel"
              >
                <div className="flex items-center justify-between border-b border-craft bg-sepia-light px-6 py-4 sm:px-8">
                  <p className="font-heading text-lg font-semibold">{active.name} — key beats</p>
                  <p className="hidden font-hand text-lg text-penred sm:block">{active.note}</p>
                </div>
                <ol className="ruled-lines divide-y divide-craft/70">
                  {active.beats.map((beat, i) => (
                    <motion.li
                      key={beat.index}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 * i, ease: EASE }}
                      className="group flex gap-5 px-6 py-4 transition-colors duration-300 hover:bg-highlight-soft/50 sm:px-8"
                    >
                      <span className="mt-0.5 font-mono text-xs font-medium text-penred">{beat.index}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-ink">{beat.name}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{beat.detail}</p>
                      </div>
                      <span className="hidden shrink-0 rounded border border-craft-dark bg-parchment px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sepia sm:block">
                        {beat.mark}
                      </span>
                    </motion.li>
                  ))}
                </ol>
                <div className="flex items-center gap-2 border-t border-craft bg-sepia-light px-6 py-3 sm:px-8">
                  <Check className="size-4 text-penred" />
                  <p className="text-xs text-ink-muted">
                    All four frameworks come pre-mapped to one another inside the kit's master beat sheet.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
