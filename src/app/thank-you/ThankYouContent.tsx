"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Pro";
  const price = searchParams.get("price") || "29";
  const txn = searchParams.get("txn") || "";

  return (
    <div className="thankyou-box">
      <div className="big-check">✅</div>
      <h1>You&apos;re all set!</h1>
      <p>
        You subscribed to the {plan} plan for ${price}/mo.
      </p>
      {txn && (
        <p style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}>Confirmation: {txn}</p>
      )}
      <Link href="/" className="btn btn-primary" style={{ marginTop: 16 }}>
        Back to home
      </Link>
    </div>
  );
}
