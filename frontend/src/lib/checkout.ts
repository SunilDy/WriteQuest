import { apiGet, apiPost } from "./api";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export interface CheckoutConfig {
  key_id: string | null;
  amount_paise: number;
  currency: string;
  mock: boolean;
  product: string;
}

export interface AssetLink {
  name: string;
  format: string;
  url: string;
  note: string;
}

export interface DeliveryLogEntry {
  channel: string;
  status: string;
  timestamp: string;
  detail: string;
}

export interface OrderResult {
  order_id: string;
  payment_id?: string;
  amount_paise: number;
  currency: string;
  email: string;
  status: string;
  mock: boolean;
  assets: AssetLink[];
  delivery_log: DeliveryLogEntry[];
}

interface CreatedOrder {
  order_id: string;
  amount_paise: number;
  currency: string;
  mock: boolean;
  key_id: string | null;
}

export const getCheckoutConfig = () => apiGet<CheckoutConfig>("/checkout/config");

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type CheckoutStage = "creating" | "processing" | "verifying";

export async function runCheckout(
  email: string,
  onStage: (stage: CheckoutStage) => void,
): Promise<OrderResult> {
  onStage("creating");
  const order = await apiPost<CreatedOrder>("/checkout/create-order", { email });

  if (order.mock) {
    onStage("processing");
    await delay(1500);
    onStage("verifying");
    await delay(600);
    return apiPost<OrderResult>("/checkout/verify", {
      order_id: order.order_id,
      payment_id: `pay_mock_${Math.random().toString(36).slice(2, 12)}`,
      signature: "mock_signature",
      email,
    });
  }

  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) throw new Error("Could not load Razorpay checkout");

  return new Promise<OrderResult>((resolve, reject) => {
    const rzp = new window.Razorpay!({
      key: order.key_id,
      amount: order.amount_paise,
      currency: order.currency,
      name: "Writer's Quest",
      description: "Complete Blueprint Kit",
      order_id: order.order_id,
      prefill: { email },
      theme: { color: "#1F2022" },
      handler: async (response: { razorpay_payment_id: string; razorpay_signature: string }) => {
        try {
          onStage("verifying");
          const result = await apiPost<OrderResult>("/checkout/verify", {
            order_id: order.order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            email,
          });
          resolve(result);
        } catch (err) {
          reject(err);
        }
      },
      modal: { ondismiss: () => reject(new Error("Payment window closed before completing")) },
    });
    onStage("processing");
    rzp.open();
  });
}
