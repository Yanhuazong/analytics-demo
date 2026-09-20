import { notFound } from "next/navigation";
import { PLANS } from "@/lib/plans";
import CheckoutClient from "./CheckoutClient";

// Required for static export (output: "export"): tells Next.js which
// /checkout/[plan] paths exist at build time, since there's no server
// to resolve arbitrary params at request time.
export function generateStaticParams() {
  return Object.keys(PLANS).map((slug) => ({ plan: slug }));
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan: slug } = await params;
  const plan = PLANS[slug];
  if (!plan) notFound();

  return <CheckoutClient plan={plan} />;
}
