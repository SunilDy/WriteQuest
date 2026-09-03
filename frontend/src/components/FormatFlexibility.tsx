import { FileText, Table2, LayoutDashboard } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";

const FORMATS = [
  {
    icon: LayoutDashboard,
    name: "In Notion",
    desc: "The full hub-and-spoke system: a central Writing Dashboard with six linked sections, one dedicated plot database per framework, the scene planner, and one-click quick actions.",
  },
  {
    icon: FileText,
    name: "On paper",
    desc: "Printable workbooks that walk you through the same 4 frameworks beat by beat — pen-friendly, one spread at a time, no account needed.",
  },
  {
    icon: Table2,
    name: "In Excel",
    desc: "Prefer a spreadsheet? The Excel-sheet version lets you plan your draft beat by beat — no Notion required.",
  },
];

export function FormatFlexibility() {
  return (
    <section id="formats" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 05 — Notion, paper, or Excel"
          title={
            <>
              Plan the way <br className="hidden sm:block" />
              you already <span className="underline-pen">work</span>.
            </>
          }
          note="each format stands on its own — pick the one you'll actually open"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FORMATS.map((format, i) => (
            <Reveal key={format.name} delay={0.1 * i}>
              <div
                data-testid={`format-card-${i}`}
                className="group paper-shadow h-full rounded-xl border border-craft bg-paper p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-16px_rgba(31,32,34,0.25)]"
              >
                <span className="flex size-12 items-center justify-center rounded-lg border border-craft bg-parchment transition-colors duration-300 group-hover:border-penred/40">
                  <format.icon className="size-5 text-ink" />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-semibold leading-snug">{format.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{format.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-muted">
            A note on honesty: the hub-and-spoke dashboard described above is the Notion system. The
            printable workbooks and Excel version cover the same 4 frameworks in their own way — they
            don&rsquo;t mirror the Notion structure, and we won&rsquo;t pretend they do.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
