import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Who it's for", id: "who" },
  { label: "Peek inside", id: "preview" },
  { label: "Frameworks", id: "frameworks" },
  { label: "FAQ", id: "faq" },
];

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader({ onBuy }: { onBuy: () => void }) {
  return (
    <header
      data-testid="site-header"
      className="fixed inset-x-0 top-0 z-50 border-b border-craft bg-parchment/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          data-testid="header-brand-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-ink text-parchment">
            <PenTool className="size-4" />
          </span>
          <span className="font-heading text-lg font-bold tracking-tight">WriteQuest</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <button
              key={item.id}
              data-testid={`nav-link-${item.id}`}
              onClick={() => scrollToSection(item.id)}
              className="group relative text-sm font-medium text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-penred transition-[width] duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <Button
          data-testid="header-buy-button"
          onClick={onBuy}
          className="h-10 rounded-full bg-highlight px-5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-highlight-deep hover:shadow-lg"
        >
          Get the Blueprint Kit
        </Button>
      </div>
    </header>
  );
}
