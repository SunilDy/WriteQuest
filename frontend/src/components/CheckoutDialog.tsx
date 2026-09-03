import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Download, Loader2, Lock, Mail, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { EASE } from "@/components/Reveal";
import { runCheckout, type CheckoutStage, type OrderResult } from "@/lib/checkout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Step = "form" | "working" | "success";

const STAGE_LABELS: Record<CheckoutStage, string> = {
  creating: "Creating your secure order…",
  processing: "Processing payment…",
  verifying: "Verifying & unlocking your kit…",
};

function SuccessView({ order }: { order: OrderResult }) {
  const [logOpen, setLogOpen] = useState(false);
  return (
    <div data-testid="order-success-container" className="pt-1">
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-ink">
          <PartyPopper className="size-6 text-paper" />
        </span>
        <div>
          <p className="font-heading text-2xl font-bold">The kit is yours.</p>
          <p className="text-sm text-ink-muted">Paid ₹{(order.amount_paise / 100).toLocaleString("en-IN")} · order confirmed</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-craft bg-parchment p-4">
        <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
          <span>ORDER</span>
          <span data-testid="order-id-value" className="font-semibold text-ink">{order.order_id}</span>
        </div>
        {order.payment_id && (
          <div className="mt-1.5 flex items-center justify-between font-mono text-xs text-ink-muted">
            <span>PAYMENT</span>
            <span className="font-semibold text-ink">{order.payment_id}</span>
          </div>
        )}
        <div className="mt-1.5 flex items-center justify-between font-mono text-xs text-ink-muted">
          <span>EMAIL</span>
          <span className="font-semibold text-ink">{order.email}</span>
        </div>
      </div>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-sepia">Your assets — unlocked</p>
      <div className="mt-2 space-y-2">
        {order.assets.map((asset) => (
          <div
            key={asset.name}
            data-testid={`asset-${asset.format.toLowerCase()}`}
            className="flex items-center justify-between gap-3 rounded-lg border border-craft bg-paper px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-ink">{asset.name}</p>
              <p className="text-xs text-ink-muted">{asset.note}</p>
            </div>
            <a
              data-testid={`asset-download-${asset.format.toLowerCase()}`}
              href={asset.url}
              onClick={(e) => {
                e.preventDefault();
                toast.info("MOCKED asset link — real download URLs are wired up when final files are added.");
              }}
              className="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 text-xs font-semibold text-parchment transition-colors duration-300 hover:bg-penred"
            >
              <Download className="size-3.5" />
              {asset.format}
            </a>
          </div>
        ))}
      </div>

      <button
        data-testid="delivery-log-toggle"
        onClick={() => setLogOpen(!logOpen)}
        className="mt-4 flex w-full items-center justify-between rounded-lg border border-dashed border-craft-dark px-4 py-2.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink"
      >
        <span className="flex items-center gap-2">
          <Mail className="size-3.5" /> Delivery log
        </span>
        <ChevronDown className={`size-4 transition-transform duration-300 ${logOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {logOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div data-testid="delivery-log" className="mt-2 space-y-2 rounded-lg bg-ink p-4 font-mono text-[11px] text-parchment/80">
              {order.delivery_log.map((entry, i) => (
                <div key={i}>
                  <span className="text-highlight">[{entry.status}]</span> {entry.channel} · {entry.detail}
                  <div className="text-parchment/40">{entry.timestamp}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 -rotate-1 font-hand text-lg text-penred">
        chapter one starts today. go.
      </p>
    </div>
  );
}

export function CheckoutDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<Step>("form");
  const [stage, setStage] = useState<CheckoutStage>("creating");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<OrderResult | null>(null);

  const reset = () => {
    setStep("form");
    setStage("creating");
    setOrder(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && step === "working") return;
    onOpenChange(next);
    if (!next) setTimeout(reset, 250);
  };

  const handleSubmit = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email — your kit is delivered there.");
      return;
    }
    setStep("working");
    try {
      const result = await runCheckout(email, setStage);
      setOrder(result);
      setStep("success");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment could not be completed. Try again.");
      setStep("form");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-testid="checkout-dialog"
        showCloseButton={step !== "working"}
        className="max-h-[92vh] overflow-y-auto border-craft bg-parchment sm:max-w-md"
      >
        {step === "form" && (
          <>
            <DialogTitle className="font-heading text-2xl font-bold">Where should the kit go?</DialogTitle>
            <DialogDescription className="text-ink-muted">
              One email. Instant access to the complete Blueprint Kit — ₹599, one-time.
            </DialogDescription>
            <div className="mt-2">
              <label htmlFor="checkout-email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-sepia">
                Email address
              </label>
              <Input
                id="checkout-email"
                data-testid="checkout-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="writer@yourstory.in"
                className="mt-2 h-12 rounded-lg border-craft-dark bg-paper text-base focus-visible:ring-penred/30"
              />
            </div>
            <Button
              data-testid="checkout-continue-button"
              onClick={handleSubmit}
              className="mt-2 h-14 w-full rounded-full bg-highlight text-base font-semibold text-ink transition-colors duration-300 hover:bg-highlight-deep"
            >
              Continue to payment — ₹599
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
              <Lock className="size-3" /> Secured by Razorpay · UPI, cards, netbanking
            </p>
          </>
        )}

        {step === "working" && (
          <div data-testid="checkout-processing" className="flex flex-col items-center py-10">
            <Loader2 className="size-10 animate-spin text-penred" />
            <p className="mt-6 font-heading text-xl font-semibold">{STAGE_LABELS[stage]}</p>
            <div className="mt-6 w-full space-y-2">
              {(Object.keys(STAGE_LABELS) as CheckoutStage[]).map((s, i) => {
                const currentIdx = ["creating", "processing", "verifying"].indexOf(stage);
                const done = i < currentIdx;
                const current = i === currentIdx;
                return (
                  <div key={s} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={`flex size-5 items-center justify-center rounded-full border ${
                        done ? "border-penred bg-penred text-paper" : current ? "border-penred" : "border-craft-dark"
                      }`}
                    >
                      {done && <Check className="size-3" />}
                    </span>
                    <span className={done || current ? "text-ink" : "text-ink-muted/60"}>{STAGE_LABELS[s]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === "success" && order && <SuccessView order={order} />}
      </DialogContent>
    </Dialog>
  );
}
