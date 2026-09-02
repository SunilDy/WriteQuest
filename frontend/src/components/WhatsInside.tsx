import { FileText, Table2, LayoutDashboard, MonitorPlay, PenLine, RefreshCw } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";

const CONTENTS = [
  { icon: LayoutDashboard, format: "NOTION", name: "Master Story Dashboard", detail: "Beat map, story bible, character arcs, draft log", value: "₹899" },
  { icon: FileText, format: "PDF", name: "Plotting Workbook · 120 pages", detail: "One guided spread per beat, print-ready A4 + Letter", value: "₹599" },
  { icon: Table2, format: "XLSX", name: "Beat & Word-Count Tracker", detail: "Auto page targets, pacing drift, act progress", value: "₹399" },
  { icon: MonitorPlay, format: "VIDEO", name: "6 Setup Walkthroughs", detail: "Full system live in under 90 minutes", value: "₹449" },
  { icon: PenLine, format: "DOCX", name: "Scene & Chapter Templates", detail: "Opening lines, cliffhangers, transition banks", value: "₹299" },
  { icon: RefreshCw, format: "∞", name: "Lifetime Updates", detail: "Every future revision of the kit, free, forever", value: "—" },
];

export function WhatsInside() {
  return (
    <section id="inside" className="scroll-mt-20 border-y border-craft bg-parchment-deep py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Chapter 04 — The Inventory"
            title={
              <>
                Everything in the box. <br className="hidden sm:block" />
                <span className="highlight-mark">Nothing</span> held back.
              </>
            }
          />
          <Reveal delay={0.2}>
            <div className="rounded-lg border border-craft-dark bg-paper px-6 py-4 text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sepia">Combined value</p>
              <p className="font-heading text-3xl font-bold text-ink">
                <span className="strike-red">₹2,645</span>
              </p>
              <p className="mt-1 font-hand text-lg text-penred">yours for ₹599. that's the whole trick.</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-craft bg-craft sm:grid-cols-2 lg:grid-cols-3">
          {CONTENTS.map((item, i) => (
            <Reveal key={item.name} delay={0.06 * i} className="group bg-paper p-7 transition-colors duration-300 hover:bg-highlight-soft/40">
              <div data-testid={`inside-item-${item.format.toLowerCase().replace(/[^a-z0-9]/g, "") || "updates"}-${i}`}>
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-md border border-craft bg-parchment transition-colors duration-300 group-hover:border-penred/40">
                    <item.icon className="size-5 text-ink" />
                  </span>
                  <span className="rounded border border-craft-dark bg-parchment px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-sepia">
                    {item.format}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold leading-snug">{item.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
                <p className="mt-4 font-mono text-xs text-ink-muted">
                  Value: <span className="strike-red">{item.value}</span>
                  <span className="ml-2 font-semibold text-penred">included</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
