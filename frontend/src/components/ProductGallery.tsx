import { useState } from "react";
import { motion } from "motion/react";
import { Maximize2, Check } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

function NotionMock() {
  return (
    <div className="flex h-full overflow-hidden rounded-md border border-craft bg-paper text-left">
      <div className="hidden w-1/3 border-r border-craft bg-sepia-light p-3 sm:block">
        <div className="mb-3 h-2 w-16 rounded bg-craft-dark" />
        {["Story Bible", "Beat Map", "Characters", "World Notes", "Draft Log"].map((s, i) => (
          <div key={s} className={`mb-2 rounded px-2 py-1.5 text-[10px] font-medium ${i === 1 ? "bg-highlight text-ink" : "text-ink-muted"}`}>
            {s}
          </div>
        ))}
      </div>
      <div className="flex-1 p-3">
        <div className="mb-2 h-3 w-32 rounded bg-ink/80" />
        <div className="mb-3 h-2 w-44 rounded bg-craft-dark" />
        {["Act I — Setup complete", "Catalyst lands on p.12", "Midpoint: false victory", "All Is Lost — strip everything", "Finale mirrors opening image"].map((t, i) => (
          <div key={t} className="mb-2 flex items-center gap-2">
            <span className={`flex size-3.5 items-center justify-center rounded-sm border ${i < 2 ? "border-penred bg-penred" : "border-craft-dark"}`}>
              {i < 2 && <Check className="size-2.5 text-paper" />}
            </span>
            <span className={`text-[10px] ${i < 2 ? "text-ink-muted line-through" : "text-ink"}`}>{t}</span>
          </div>
        ))}
        <div className="mt-3 rounded border border-dashed border-penred/50 bg-highlight-soft p-2">
          <span className="font-hand text-sm text-penred">next: write the Dark Night scene →</span>
        </div>
      </div>
    </div>
  );
}

function WorksheetMock() {
  return (
    <div className="ruled-lines h-full rounded-md border border-craft bg-paper p-4 text-left">
      <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.25em] text-sepia">Worksheet 04</div>
      <div className="mb-3 font-heading text-sm font-bold text-ink">The Catalyst — Beat Sheet</div>
      {["What breaks the ordinary world?", "Why can't she walk away?", "What does it cost her to say yes?"].map((q) => (
        <div key={q} className="mb-3">
          <div className="text-[10px] font-semibold text-ink">{q}</div>
          <div className="mt-1 border-b border-craft-dark/70 pb-1 font-hand text-xs text-ink-muted">…</div>
        </div>
      ))}
      <div className="mt-2 inline-block -rotate-2 font-hand text-sm text-penred">print me. write in pen.</div>
    </div>
  );
}

function ExcelMock() {
  const rows = [
    ["Beat", "Page", "Done"],
    ["Opening Image", "1", "✓"],
    ["Catalyst", "12", "✓"],
    ["Midpoint", "55", "—"],
    ["All Is Lost", "75", "—"],
  ];
  return (
    <div className="h-full overflow-hidden rounded-md border border-craft bg-paper text-left">
      <div className="flex gap-1 border-b border-craft bg-sepia-light px-2 py-1.5">
        <span className="size-2 rounded-full bg-penred/70" />
        <span className="size-2 rounded-full bg-highlight" />
        <span className="size-2 rounded-full bg-craft-dark" />
      </div>
      <table className="w-full border-collapse text-[10px]">
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`border border-craft px-2 py-1.5 ${
                    ri === 0 ? "bg-ink font-semibold text-parchment" : ci === 2 && cell === "✓" ? "bg-highlight-soft text-ink" : "text-ink-muted"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-2 py-2 font-mono text-[9px] text-sepia">auto-calculates page targets from your word count</div>
    </div>
  );
}

function VideoMock() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-md border border-craft bg-ink p-4 text-left">
      <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-highlight">Walkthrough 03 / 06</div>
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-parchment">
          <span className="ml-0.5 inline-block border-y-[6px] border-l-[9px] border-y-transparent border-l-ink" />
        </span>
        <div>
          <div className="text-xs font-semibold text-parchment">Mapping the Midpoint</div>
          <div className="text-[10px] text-parchment/60">12:40 — false victories & doubled stakes</div>
        </div>
      </div>
      <div className="h-1 w-full rounded bg-parchment/20">
        <div className="h-1 w-2/3 rounded bg-penred" />
      </div>
    </div>
  );
}

const ITEMS = [
  {
    id: "notion",
    title: "Notion Master Dashboard",
    format: "NOTION",
    desc: "Every beat, character, and subplot in one calm command centre. Duplicate it and start in ninety seconds.",
    annotations: ["Pre-linked beat map across all 4 frameworks", "Draft log with momentum streaks", "Character arcs tied to story beats"],
    Mock: NotionMock,
  },
  {
    id: "workbook",
    title: "Printable Plotting Workbook",
    format: "PDF",
    desc: "120 pages of guided worksheets for pen-and-paper thinkers. One beat per spread, zero blank-page panic.",
    annotations: ["A4 + US Letter versions included", "Guided prompts per beat", "Margin space for red-pen revisions"],
    Mock: WorksheetMock,
  },
  {
    id: "excel",
    title: "Excel Beat Tracker",
    format: "XLSX",
    desc: "Type your target word count once — the tracker places every beat on its page and shows your pacing drift.",
    annotations: ["Auto page-targets per beat", "Progress bars per act", "Works in Google Sheets too"],
    Mock: ExcelMock,
  },
  {
    id: "video",
    title: "Video Walkthrough Series",
    format: "VIDEO",
    desc: "Six short sessions that set up your whole system in one sitting. No fluff, no filler, no forty-hour course.",
    annotations: ["6 sessions · under 90 minutes total", "Setup → first finished outline", "Lifetime access to updates"],
    Mock: VideoMock,
  },
];

export function ProductGallery() {
  const [openId, setOpenId] = useState<string | null>(null);
  const activeItem = ITEMS.find((i) => i.id === openId);

  return (
    <section id="preview" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 03 — Evidence, Not Promises"
          title={
            <>
              Look inside the kit <br className="hidden sm:block" />
              before you <span className="highlight-mark">commit</span>.
            </>
          }
          note="every screenshot is the actual tool — not a render"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.id} delay={0.08 * i}>
              <div
                data-testid={`gallery-card-${item.id}`}
                className="group paper-shadow relative rounded-xl border border-craft bg-paper p-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-16px_rgba(31,32,34,0.25)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <item.Mock />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
                  <button
                    data-testid={`gallery-zoom-trigger-${item.id}`}
                    onClick={() => setOpenId(item.id)}
                    aria-label={`Zoom ${item.title}`}
                    className="absolute bottom-3 right-3 flex size-10 translate-y-2 items-center justify-center rounded-full bg-ink text-parchment opacity-0 transition-all duration-300 hover:bg-penred group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Maximize2 className="size-4" />
                  </button>
                </div>
                <div className="p-3">
                  <span className="rounded border border-craft-dark bg-parchment px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-sepia">
                    {item.format}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={openId !== null} onOpenChange={(open) => !open && setOpenId(null)}>
        <DialogContent
          data-testid="gallery-zoom-modal"
          className="max-h-[90vh] overflow-y-auto border-craft bg-parchment sm:max-w-3xl"
        >
          {activeItem && (
            <>
              <DialogTitle className="font-heading text-2xl font-semibold">{activeItem.title}</DialogTitle>
              <DialogDescription className="text-ink-muted">{activeItem.desc}</DialogDescription>
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="paper-shadow-lg mt-2 h-80 rounded-lg border border-craft bg-paper p-3 sm:h-96"
              >
                <activeItem.Mock />
              </motion.div>
              <ul className="mt-2 space-y-2">
                {activeItem.annotations.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-ink-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-penred" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="-rotate-1 font-hand text-lg text-penred">zoom all you want — it's really this simple.</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
