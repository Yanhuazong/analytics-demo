export type Plan = {
  slug: string;
  itemId: string;
  name: string;
  price: number;
};

export const PLANS: Record<string, Plan> = {
  starter: { slug: "starter", itemId: "plan_starter", name: "Starter", price: 9 },
  pro: { slug: "pro", itemId: "plan_pro", name: "Pro", price: 29 },
  business: { slug: "business", itemId: "plan_business", name: "Business", price: 79 },
};

export const PLAN_LIST: Plan[] = Object.values(PLANS);

export function planToGaItem(plan: Plan) {
  return {
    item_id: plan.itemId,
    item_name: plan.name,
    price: plan.price,
    item_category: "subscription",
    quantity: 1,
  };
}
