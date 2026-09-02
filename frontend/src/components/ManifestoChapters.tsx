import { Reveal, SectionHeading } from "@/components/Reveal";

const CHAPTERS = [
  {
    number: "01",
    title: "Systems beat inspiration",
    body: "Inspiration is weather — it comes and goes. A system is climate. Writers who finish are not more inspired; they simply always know what the next beat is.",
    note: "muses are unreliable employees",
  },
  {
    number: "02",
    title: "Structure is a promise, not a prison",
    body: "A framework doesn't tell you what to write. It tells you what the reader is waiting for — and lets you decide how to deliver it, delay it, or subvert it.",
    note: "rules you can break on purpose",
  },
  {
    number: "03",
    title: "Beats before sentences",
    body: "Beautiful prose on a broken plot is decoration on a collapsing wall. Get the skeleton standing first; the kit makes every sentence land on a load-bearing beat.",
    note: "fix the spine, then the style",
  },
  {
    number: "04",
    title: "Finish ugly, but finish",
    body: "A rough completed draft can be revised into anything. A perfect half-draft can only be admired. The tracker exists for one reason: momentum you can see.",
    note: "done > perfect. every time.",
  },
  {
    number: "05",
    title: "Your notebook is the net",
    body: "Ideas arrive at 2 a.m., in rickshaws, mid-shower. The kit gives every spark a place to land — captured, sorted, and waiting at the exact beat where it belongs.",
    note: "catch everything. lose nothing.",
  },
];

export function ManifestoChapters() {
  return (
    <section id="manifesto" className="scroll-mt-20 border-y border-craft bg-sepia-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 02 — The Quiet Manifesto"
          title={
            <>
              Five principles for writers <br className="hidden sm:block" />
              who <span className="strike-red">dream</span> <span className="highlight-mark">finish</span>.
            </>
          }
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-craft bg-craft sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((ch, i) => (
            <Reveal
              key={ch.number}
              delay={0.08 * i}
              className={`group relative bg-paper p-8 transition-colors duration-500 hover:bg-highlight-soft/40 sm:p-10 ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div data-testid={`manifesto-chapter-${ch.number}`}>
                <span className="font-heading text-6xl font-bold text-craft-dark transition-colors duration-500 group-hover:text-penred/30">
                  {ch.number}
                </span>
                <h3 className="mt-5 font-heading text-2xl font-semibold leading-snug text-ink">{ch.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">{ch.body}</p>
                <p className="mt-5 inline-block -rotate-2 font-hand text-lg text-penred opacity-0 transition-all duration-500 group-hover:rotate-[-2deg] group-hover:opacity-100">
                  — {ch.note}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.4} className="relative flex flex-col justify-between bg-ink p-8 sm:p-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-highlight">Field Note</span>
              <p className="mt-5 font-heading text-2xl font-semibold italic leading-snug text-parchment">
                &ldquo;The kit doesn't write your book. It removes every excuse between you and the
                last page.&rdquo;
              </p>
            </div>
            <p className="mt-8 font-hand text-xl text-highlight">— from the WriteQuest workbook, p.3</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
