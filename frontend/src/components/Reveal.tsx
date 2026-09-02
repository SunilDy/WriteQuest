import { motion } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: ReactNode;
  note?: string;
}) {
  return (
    <div className="relative max-w-3xl">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-sepia">{eyebrow}</p>
        <h2 className="mt-4 font-heading text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {note && (
        <Reveal delay={0.15}>
          <p className="mt-4 -rotate-2 font-hand text-xl text-penred sm:text-2xl">{note}</p>
        </Reveal>
      )}
    </div>
  );
}
