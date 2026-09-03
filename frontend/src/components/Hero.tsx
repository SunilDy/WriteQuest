import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { ArrowRight, ArrowDown, Flame } from "lucide-react";
import { EASE } from "@/components/Reveal";
import { scrollToSection } from "@/components/SiteHeader";
import { StoryArcMark } from "@/components/StoryArc";

function MaskedLine({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function TiltNotebook() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [9, -9]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-11, 11]), { stiffness: 120, damping: 18 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="relative"
      style={{ perspective: 1200 }}
    >
      <div className="spotlight-warm absolute -inset-16 -z-10" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="paper-shadow-lg relative rounded-lg border border-craft bg-paper"
        data-testid="hero-notebook-card"
      >
        <div className="tape-strip -top-3 left-10 -rotate-6" aria-hidden="true" />
        <div className="tape-strip -top-2 right-12 rotate-3" aria-hidden="true" />

        <div className="rounded-t-lg border-b border-craft bg-parchment px-6 pb-2 pt-6 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sepia">The shape of every finished draft</p>
          <StoryArcMark className="mt-2 h-40 w-full sm:h-44" />
        </div>

        <div className="ruled-lines relative px-6 pb-8 pt-5 sm:px-8">
          <div className="absolute bottom-4 left-4 top-4 w-px bg-penred/40" aria-hidden="true" />
          <p className="pl-5 font-mono text-[10px] uppercase tracking-[0.3em] text-sepia">Beat Sheet — Draft 03</p>
          <p className="mt-4 pl-5 font-hand text-2xl leading-snug text-ink sm:text-3xl">
            Chapter One — the call arrives quietly, on an ordinary Tuesday…
          </p>
          <p className="mt-4 pl-5 font-hand text-xl text-penred sm:text-2xl">
            ← she almost ignores it. don't let her.
          </p>
        </div>

        <motion.div
          style={{ transform: "translateZ(50px)" }}
          className="paper-shadow absolute -right-4 top-16 w-44 rotate-3 rounded-md border border-craft bg-highlight-soft p-3 sm:-right-8"
          data-testid="hero-annotation-card"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sepia">Beat 4 — Catalyst</p>
          <p className="mt-1 font-hand text-lg leading-tight text-ink">This changes everything.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero({ onBuy }: { onBuy: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pb-24 pt-32 sm:pt-40 lg:pb-32">
      <div className="ruled-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-craft-dark bg-paper px-4 py-1.5"
          >
            <Flame className="size-3.5 text-penred" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-sepia">
              The beat-by-beat system for finishing your book
            </span>
          </motion.div>

          <h1
            data-testid="hero-headline"
            className="mt-8 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            <MaskedLine delay={0.35}>You have a story.</MaskedLine>
            <MaskedLine delay={0.55}>
              You don&rsquo;t have a <span className="underline-pen">system</span>.
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
            className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            data-testid="hero-subhead"
          >
            Four proven story structures — Three-Act, Hero&rsquo;s Journey, Save the Cat, and the Story
            Circle — turned into one guided, checklist-driven toolkit. Plan your novel or script beat by
            beat, in Notion, on paper, or in Excel.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, rotate: -4 }}
            animate={{ opacity: 1, rotate: -2 }}
            transition={{ duration: 0.8, delay: 1.25, ease: EASE }}
            className="mt-5 font-hand text-xl text-penred sm:text-2xl"
          >
            — no 40-hour video course. just the work, in order.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-button"
              onClick={onBuy}
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-highlight px-8 text-base font-semibold text-ink transition-all duration-300 hover:-translate-y-1 hover:bg-highlight-deep hover:shadow-[0_16px_40px_-10px_rgba(31,32,34,0.35)]"
            >
              Get the Blueprint Kit
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
            <button
              data-testid="hero-preview-button"
              onClick={() => scrollToSection("preview")}
              className="group inline-flex h-14 items-center gap-2 rounded-full border border-craft-dark bg-paper px-6 text-base font-medium text-ink transition-all duration-300 hover:-translate-y-1 hover:border-ink"
            >
              Peek inside the system
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-sepia"
            data-testid="hero-credibility-markers"
          >
            <span>4 proven structures</span>
            <span>Notion, paper, or Excel</span>
            <span>₹599 one-time</span>
            <span>Instant access</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: cardY }} className="lg:col-span-5 lg:pt-10">
          <TiltNotebook />
        </motion.div>
      </div>
    </section>
  );
}
