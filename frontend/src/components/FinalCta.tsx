import { ArrowRight, PenTool } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { StoryArcMark } from "@/components/StoryArc";

export function FinalCta({ onBuy }: { onBuy: () => void }) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-parchment lg:py-32" data-testid="final-cta">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true">
        <StoryArcMark className="h-full w-full" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-parchment/50">The last page of this page</p>
          <h2 className="mt-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            You have a story.
            <br />
            You don&rsquo;t have a system.
          </h2>
          <p className="mt-6 font-hand text-2xl text-highlight">— you already have the story. this is the part that was missing.</p>
        </Reveal>
        <Reveal delay={0.15}>
          <button
            data-testid="final-cta-button"
            onClick={onBuy}
            className="group mt-10 inline-flex h-16 items-center gap-3 rounded-full bg-highlight px-10 text-lg font-semibold text-ink transition-all duration-300 hover:-translate-y-1 hover:bg-highlight-deep hover:shadow-[0_20px_50px_-12px_rgba(242,226,159,0.4)]"
          >
            <PenTool className="size-5 transition-transform duration-300 group-hover:-rotate-12" />
            Get the Blueprint Kit
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-parchment/50">
            ₹599 · No subscription · One-time purchase · Instant access
          </p>
        </Reveal>
      </div>
    </section>
  );
}
