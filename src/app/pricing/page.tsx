"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DemoBanner from "@/components/DemoBanner";
import { PLAN_LIST, planToGaItem } from "@/lib/plans";
import { trackEvent } from "@/lib/gtag";
import type { Plan } from "@/lib/plans";

export default function PricingPage() {
  const router = useRouter();

  useEffect(() => {
    trackEvent("view_item_list", {
      item_list_id: "pricing_page",
      item_list_name: "Pricing Page",
      items: PLAN_LIST.map(planToGaItem),
    });
  }, []);

  function choosePlan(plan: Plan) {
    const item = planToGaItem(plan);

    trackEvent("select_item", {
      item_list_id: "pricing_page",
      item_list_name: "Pricing Page",
      items: [item],
    });

    trackEvent("add_to_cart", {
      currency: "USD",
      value: plan.price,
      items: [item],
    });

    router.push(`/checkout/${plan.slug}`);
  }

  return (
    <>
      <DemoBanner>
        This page fires <code>view_item_list</code> on load, then <code>select_item</code> +{" "}
        <code>add_to_cart</code> when you choose a plan.
      </DemoBanner>

      <section>
        <div className="container">
          <h1 className="section-title">Simple, transparent pricing</h1>
          <p className="section-sub">Choose a plan to walk through the checkout funnel end to end.</p>

          <div className="grid-3">
            {PLAN_LIST.map((plan) => (
              <div
                key={plan.slug}
                className={`card pricing-card${plan.slug === "pro" ? " featured" : ""}`}
              >
                {plan.slug === "pro" && <span className="badge">Most popular</span>}
                <h3>{plan.name}</h3>
                <div className="price">
                  ${plan.price}
                  <span>/mo</span>
                </div>
                <ul>{planFeatures(plan.slug).map((f) => <li key={f}>{f}</li>)}</ul>
                <button
                  className={`btn btn-block ${plan.slug === "pro" ? "btn-primary" : "btn-dark"}`}
                  onClick={() => choosePlan(plan)}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function planFeatures(slug: string): string[] {
  switch (slug) {
    case "starter":
      return ["1 website", "10k events/mo", "7-day data retention"];
    case "pro":
      return ["5 websites", "250k events/mo", "14-month retention", "Funnel exploration"];
    case "business":
      return ["Unlimited websites", "2M events/mo", "Custom retention", "Priority support"];
    default:
      return [];
  }
}
