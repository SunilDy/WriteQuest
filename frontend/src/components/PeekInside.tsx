import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Maximize2, Check, Plus } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

function BrowserChrome({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-craft bg-paper text-left">
      <div className="flex items-center gap-2 border-b border-craft bg-sepia-light px-3 py-2">
        <span className="flex gap-1">
          <span className="size-2 rounded-full bg-penred/70" />
          <span className="size-2 rounded-full bg-craft-dark" />
          <span className="size-2 rounded-full bg-craft" />
        </span>
        <span className="ml-1 flex-1 truncate rounded bg-parchment px-2 py-0.5 font-mono text-[9px] text-sepia">
          notion.so/writequest · {title}
        </span>
      </div>
      <div className="flex-1 p-3">{children}</div>
    </div>
  );
}

function Chip({ children, tone = "craft" }: { children: ReactNode; tone?: "craft" | "ink" | "red" }) {
  const styles = {
    craft: "border-craft-dark bg-parchment text-ink-muted",
    ink: "border-ink bg-ink text-parchment",
    red: "border-penred/50 bg-paper text-penred",
  } as const;
  return (
    <span className={`inline-block rounded-sm border px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em] ${styles[tone]}`}>
      {children}
    </span>
  );
}

function PlotMock() {
  const rows = [
    { fw: "Three-Act", stages: ["Setup", "Confrontation", "Resolution"] },
    { fw: "Hero's Journey", stages: ["Departure", "Initiation", "Return"] },
    { fw: "Save the Cat", stages: ["Catalyst", "Fun & Games", "Finale"] },
    { fw: "Story Circle", stages: ["Need", "Search", "Change"] },
  ];
  return (
    <BrowserChrome title="Plot Development">
      <div className="mb-2 h-2.5 w-28 rounded bg-ink/80" />
      {rows.map((r) => (
        <div key={r.fw} className="mb-2 rounded border border-craft p-2">
          <div className="mb-1.5 text-[10px] font-semibold text-ink">{r.fw}</div>
          <div className="flex flex-wrap gap-1">
            {r.stages.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      ))}
    </BrowserChrome>
  );
}

function WorldMock() {
  const rows = [
    { name: "The Port City", tag: "Location" },
    { name: "Monsoon of '74", tag: "Era" },
    { name: "The Old Quarter", tag: "Location" },
    { name: "The Ferry Strike", tag: "Event" },
  ];
  return (
    <BrowserChrome title="World Building">
      <div className="mb-2 h-2.5 w-24 rounded bg-ink/80" />
      {rows.map((r) => (
        <div key={r.name} className="mb-1.5 flex items-center justify-between rounded border border-craft px-2 py-1.5">
          <span className="text-[10px] font-medium text-ink">{r.name}</span>
          <Chip tone="red">{r.tag}</Chip>
        </div>
      ))}
      <p className="mt-2 font-hand text-xs text-penred">its own space — not mixed with characters or research</p>
    </BrowserChrome>
  );
}

function CharacterMock() {
  const chars = [
    { name: "Meera", role: "Protagonist", arc: "Doubter → decides" },
    { name: "Abbas", role: "Mentor", arc: "Hides the letter" },
    { name: "The Inspector", role: "Antagonist", arc: "Believes he's right" },
  ];
  return (
    <BrowserChrome title="Character Development">
      <div className="mb-2 h-2.5 w-24 rounded bg-ink/80" />
      {chars.map((c) => (
        <div key={c.name} className="mb-1.5 rounded border border-craft p-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-ink">{c.name}</span>
            <Chip tone="ink">{c.role}</Chip>
          </div>
          <div className="mt-1 font-hand text-xs text-ink-muted">{c.arc}</div>
        </div>
      ))}
    </BrowserChrome>
  );
}

function RepoMock() {
  const notes = ["2 a.m. idea: the letter", "what if the map is wrong?", "dialogue fragment — the platform scene", "title???"];
  return (
    <BrowserChrome title="Information Repository">
      <div className="mb-2 h-2.5 w-32 rounded bg-ink/80" />
      <div className="flex flex-wrap gap-1.5">
        {notes.map((n, i) => (
          <span
            key={n}
            className={`rounded border border-craft-dark bg-parchment px-2 py-1 font-hand text-xs text-ink ${i % 2 ? "rotate-1" : "-rotate-1"}`}
          >
            {n}
          </span>
        ))}
      </div>
      <p className="mt-2 font-hand text-xs text-penred">dump it here. sort it later. add often.</p>
    </BrowserChrome>
  );
}

function ResearchMock() {
  const rows = [
    { note: "Railway timetables, 1974", src: "Archive scan" },
    { note: "Monsoon arrival dates", src: "Dataset" },
    { note: "Interview: ferry workers", src: "Field notes" },
  ];
  return (
    <BrowserChrome title="Research Notes">
      <div className="mb-2 h-2.5 w-24 rounded bg-ink/80" />
      {rows.map((r) => (
        <div key={r.note} className="mb-1.5 flex items-center justify-between rounded border border-craft px-2 py-1.5">
          <span className="text-[10px] font-medium text-ink">{r.note}</span>
          <Chip>{r.src}</Chip>
        </div>
      ))}
      <p className="mt-2 font-hand text-xs text-penred">in service of the story — not raw ideas</p>
    </BrowserChrome>
  );
}

function PublishingMock() {
  const items = [
    { t: "Lock the final blurb", done: true },
    { t: "Cover brief to designer", done: true },
    { t: "Launch-week plan", done: false },
    { t: "Reader outreach list", done: false },
  ];
  return (
    <BrowserChrome title="Publishing & Marketing">
      <div className="mb-2 h-2.5 w-28 rounded bg-ink/80" />
      {items.map((it) => (
        <div key={it.t} className="mb-1.5 flex items-center gap-2">
          <span className={`flex size-3.5 items-center justify-center rounded-sm border ${it.done ? "border-penred bg-penred" : "border-craft-dark"}`}>
            {it.done && <Check className="size-2.5 text-paper" />}
          </span>
          <span className={`text-[10px] ${it.done ? "text-ink-muted line-through" : "text-ink"}`}>{it.t}</span>
        </div>
      ))}
      <p className="mt-2 font-hand text-xs text-penred">the one section that goes past the draft</p>
    </BrowserChrome>
  );
}

const SECTIONS = [
  {
    id: "plot",
    title: "Plot Development",
    desc: "Not one shared database — one dedicated database per framework, each structured around that framework's own stages.",
    annotations: [
      "Separate databases for Three-Act, Hero's Journey, Save the Cat, and the Story Circle",
      "Each database uses its own framework's stages and vocabulary",
      "Pick the structure that fits your story — nothing is merged or forced",
    ],
    Mock: PlotMock,
  },
  {
    id: "world",
    title: "World Building",
    desc: "A dedicated space for the story's world — kept separate from character work and research on purpose.",
    annotations: ["Locations, eras, and events in their own database", "Separate from characters and research", "Built for worlds that grow over drafts"],
    Mock: WorldMock,
  },
  {
    id: "character",
    title: "Character Development",
    desc: "A dedicated database for building out characters — roles, arcs, and the details that make them people.",
    annotations: ["One entry per character, with role and arc", "Room for contradictions — that's where characters live", "Its own database, not a page buried in notes"],
    Mock: CharacterMock,
  },
  {
    id: "repository",
    title: "Information Repository",
    desc: "The catch-all for rough notes and half-formed ideas — meant to be added to casually and often.",
    annotations: ["Zero-friction capture for 2 a.m. ideas", "No structure required on the way in", "Sort it later — or never"],
    Mock: RepoMock,
  },
  {
    id: "research",
    title: "Research Notes",
    desc: "Kept separate from the Information Repository on purpose: research gathered in service of the story, not raw ideas.",
    annotations: ["Sources stay attached to what you found", "Separated from idea capture by design", "Built for verification, not brainstorming"],
    Mock: ResearchMock,
  },
  {
    id: "publishing",
    title: "Publishing & Marketing",
    desc: "Plans the launch after the draft is done — the one part of the product that goes past planning into publishing.",
    annotations: ["Launch checklists for after the draft", "Blurb, cover, and outreach planning", "The bridge from finished manuscript to published book"],
    Mock: PublishingMock,
  },
];

const TOOLS = [
  {
    title: "Scene Planner",
    desc: "Connects chapters and scenes — a Kanban view (Not Started / In Progress / Done) and an Acts table view, with scenes rolling up under acts.",
  },
  {
    title: "Quick Action Buttons",
    desc: "One-click add — Research Note, New Chapter, New Character, World Building Info, Information — without leaving the page you're on.",
  },
  {
    title: "Chapters Database",
    desc: "Where the manuscript itself gets written, chapter by chapter.",
  },
  {
    title: "Todo Lists",
    desc: "Generated per framework from that framework's own vocabulary — Story Circle todos reference the inciting incident and flat arc — each with a status checkbox and tags.",
  },
];

export function PeekInside() {
  const [openId, setOpenId] = useState<string | null>(null);
  const activeItem = SECTIONS.find((s) => s.id === openId);

  return (
    <section id="preview" className="scroll-mt-20 border-y border-craft bg-parchment-deep py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Chapter 02 — Peek inside the system"
          title={
            <>
              One Writing Dashboard. <br className="hidden sm:block" />
              Six linked <span className="underline-pen">sections</span>.
            </>
          }
          note="this is the Notion system — the actual screens, in browser chrome"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((item, i) => (
            <Reveal key={item.id} delay={0.06 * i}>
              <div
                data-testid={`gallery-card-${item.id}`}
                className="group paper-shadow relative h-full rounded-xl border border-craft bg-paper p-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-16px_rgba(31,32,34,0.25)]"
              >
                <div className="relative h-52 overflow-hidden">
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sepia">
                    Section {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-sepia">Tools that cut across all of it</p>
        </Reveal>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-craft bg-craft sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool, i) => (
            <Reveal key={tool.title} delay={0.06 * i} className="group bg-paper p-7 transition-colors duration-300 hover:bg-sepia-light">
              <div data-testid={`tool-card-${i}`}>
                <span className="flex size-9 items-center justify-center rounded-md border border-craft bg-parchment font-mono text-xs font-semibold text-penred">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold leading-snug">{tool.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{tool.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-6 flex items-center gap-2 text-sm text-ink-muted">
            <Plus className="size-4 text-penred" />
            Quick actions work from any page — add a chapter, character, or research note without losing your place.
          </p>
        </Reveal>
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
