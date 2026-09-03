import { PenTool } from "lucide-react";
import { scrollToSection } from "@/components/SiteHeader";

export function SiteFooter() {
  return (
    <footer data-testid="site-footer" className="border-t border-craft bg-ink py-14 text-parchment">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-md bg-parchment text-ink">
                <PenTool className="size-4" />
              </span>
              <span className="font-heading text-lg font-bold">WriteQuest</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-parchment/60">
              A quiet, execution-focused toolkit for storytellers who would rather finish a draft
              than collect another course.
            </p>
            <p className="mt-4 font-hand text-xl text-highlight">now go write the scene.</p>
          </div>

          <nav className="flex gap-16" aria-label="Footer">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-parchment/40">The Kit</p>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                {[
                  { label: "Who it's for", id: "who" },
                  { label: "Peek inside", id: "preview" },
                  { label: "Frameworks", id: "frameworks" },
                  { label: "Pricing", id: "pricing" },
                  { label: "FAQ", id: "faq" },
                ].map((l) => (
                  <button
                    key={l.id}
                    data-testid={`footer-link-${l.id}`}
                    onClick={() => scrollToSection(l.id)}
                    className="w-fit text-parchment/70 transition-colors duration-300 hover:text-highlight"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-parchment/40">Promise</p>
              <div className="mt-4 flex flex-col gap-2.5 text-sm text-parchment/70">
                <span>One-time purchase</span>
                <span>Instant access</span>
                <span>Yours to keep</span>
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-parchment/15 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/40">
          <span>© 2026 WriteQuest. All stories reserved.</span>
          <span>Made for the ones who finish.</span>
        </div>
      </div>
    </footer>
  );
}
