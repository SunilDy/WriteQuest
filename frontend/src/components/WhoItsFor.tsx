import { MoveRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";

const AUDIENCES = [
  {
    q: "Aspiring novelist with a half-finished draft?",
    a: "Turn it into a finished manuscript.",
  },
  {
    q: "Switching into screenwriting?",
    a: "Save the Cat and the Story Circle, ready to use.",
  },
  {
    q: "Writing on Pratilipi or Matrubharti?",
    a: "Turn your series into a real book.",
  },
];

export function WhoItsFor() {
  return (
    <section id="who" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 01 — Who it's for"
          title={
            <>
              Written for the writer <br className="hidden sm:block" />
              who&rsquo;s <span className="underline-pen">almost</span> there.
            </>
          }
          note="if any of these sound like you, this kit was made for your desk"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {AUDIENCES.map((item, i) => (
            <Reveal key={item.q} delay={0.1 * i}>
              <div
                data-testid={`audience-card-${i}`}
                className="group paper-shadow relative h-full rounded-xl border border-craft bg-paper p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-16px_rgba(31,32,34,0.25)]"
              >
                <span className="font-heading text-4xl font-bold text-craft-dark transition-colors duration-300 group-hover:text-penred/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-ink sm:text-2xl">
                  {item.q}
                </h3>
                <p className="mt-4 flex items-start gap-2 text-base leading-relaxed text-ink-muted">
                  <MoveRight className="mt-1 size-4 shrink-0 text-penred transition-transform duration-300 group-hover:translate-x-1" />
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
