import { Asterisk } from "lucide-react";

const QUOTES = [
  "A whole is that which has a beginning, a middle, and an end — Aristotle",
  "Story is about eternal, universal forms — Robert McKee",
  "The first draft is just you telling yourself the story — Terry Pratchett",
  "Structure is not a formula. It is a promise — WriteQuest Manifesto",
  "You can fix a bad page. You can't fix a blank one — Jodi Picoult",
  "Every villain is the hero of their own story — WriteQuest Field Notes",
];

export function EditorialMarquee() {
  const items = [...QUOTES, ...QUOTES];
  return (
    <section
      data-testid="editorial-marquee"
      aria-hidden="true"
      className="overflow-hidden border-y border-craft bg-parchment-deep py-5"
    >
      <div className="marquee-track flex w-max items-center">
        {items.map((quote, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap font-heading text-lg italic text-ink-muted/80 sm:text-xl">
              {quote}
            </span>
            <Asterisk className="mx-8 size-4 shrink-0 text-penred/60" />
          </span>
        ))}
      </div>
    </section>
  );
}
