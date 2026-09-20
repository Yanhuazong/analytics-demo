"use client";

import { useEffect, useRef, FormEvent, FocusEvent } from "react";
import { useRouter } from "next/navigation";
import DemoBanner from "@/components/DemoBanner";
import { trackEvent } from "@/lib/gtag";
import { planToGaItem, type Plan } from "@/lib/plans";

export default function CheckoutClient({ plan }: { plan: Plan }) {
  const router = useRouter();
  const paymentInfoFired = useRef(false);

  useEffect(() => {
    trackEvent("begin_checkout", {
      currency: "USD",
      value: plan.price,
      items: [planToGaItem(plan)],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan.slug]);

  function handleCardBlur(e: FocusEvent<HTMLInputElement>) {
    if (paymentInfoFired.current || !e.target.value.trim()) return;
    paymentInfoFired.current = true;
    trackEvent("add_payment_info", {
      currency: "USD",
      value: plan.price,
      payment_type: "demo_card",
      items: [planToGaItem(plan)],
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const transactionId = "T" + Date.now();

    trackEvent("purchase", {
      transaction_id: transactionId,
      currency: "USD",
      value: plan.price,
      items: [planToGaItem(plan)],
    });

    // Unlike a classic multi-page site, router.push() here is a client-side
    // transition, not a full page unload — so there's no risk of losing the
    // in-flight analytics beacon and no need for gtag's event_callback trick.
    router.push(`/thank-you?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&txn=${transactionId}`);
  }

  return (
    <>
      <DemoBanner>
        This page fires <code>begin_checkout</code> on load, <code>add_payment_info</code> when
        you enter a card number, and <code>purchase</code> on submit. No real payment is processed.
      </DemoBanner>

      <section>
        <div className="container" style={{ maxWidth: 520 }}>
          <h1 className="section-title">Checkout</h1>
          <p className="section-sub">You&apos;re subscribing to the plan you picked on the pricing page.</p>

          <div className="checkout-summary">
            <strong>{plan.name} plan</strong> — ${plan.price}/mo
          </div>

          <form className="stacked" onSubmit={handleSubmit}>
            <label htmlFor="cc-name">Name on card</label>
            <input type="text" id="cc-name" required />

            <label htmlFor="cc-email">Email</label>
            <input type="email" id="cc-email" required />

            <label htmlFor="cc-number">Card number (demo only — do not enter a real card)</label>
            <input type="text" id="cc-number" placeholder="4242 4242 4242 4242" required onBlur={handleCardBlur} />

            <label htmlFor="cc-country">Country</label>
            <select id="cc-country" defaultValue="United States">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
              <option>Other</option>
            </select>

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 20 }}>
              Complete purchase
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
