import { Reveal, SectionHeading } from "@/components/Reveal";
import { StoryArcMark } from "@/components/StoryArc";

const FRAMEWORKS = [
  {
    id: "three-act",
    number: "01",
    name: "Three-Act Structure",
    caption: "Beginning, confrontation, resolution — the spine your draft hangs on.",
  },
  {
    id: "heros-journey",
    number: "02",
    name: "The Hero's Journey",
    caption: "Departure, initiation, return — the shape of transformation itself.",
  },
  {
    id: "save-the-cat",
    number: "03",
    name: "Save the Cat",
    caption: "Fifteen beats on exact page marks — ruthless, reliable pacing.",
  },
  {
    id: "story-circle",
    number: "04",
    name: "The Story Circle",
    caption: "Eight steps of need and change — built for episodes and character arcs.",
  },
];

export function FrameworkShowcase() {
  return (
    <section id="frameworks" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 03 — How you'll actually use it"
          title={
            <>
              Pick your structure. <br className="hidden sm:block" />
              The kit does the <span className="underline-pen">scaffolding</span>.
            </>
          }
          note="each framework gets its own dedicated database — and its own todo list"
        />

        <Reveal className="mt-14">
          <div className="paper-shadow relative overflow-hidden rounded-xl border border-craft bg-paper" data-testid="framework-diagram">
            <div className="tape-strip -top-1 left-16 -rotate-3" aria-hidden="true" />
            <div className="ruled-lines px-6 pb-4 pt-10 sm:px-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sepia">
                One story arc — four ways to walk it
              </p>
              <StoryArcMark className="mx-auto mt-4 w-full max-w-2xl" />
            </div>
            <div className="grid gap-px border-t border-craft bg-craft sm:grid-cols-2 lg:grid-cols-4">
              {FRAMEWORKS.map((fw) => (
                <div key={fw.id} data-testid={`framework-caption-${fw.id}`} className="group bg-paper p-6 transition-colors duration-300 hover:bg-sepia-light">
                  <span className="font-mono text-xs tracking-[0.2em] text-penred">{fw.number}</span>
                  <h3 className="mt-2 font-heading text-lg font-semibold leading-snug">{fw.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{fw.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Whichever one you choose, the kit hands you a checklist built from that framework&rsquo;s own
            language — so &ldquo;what do I write next?&rdquo; always has an answer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
