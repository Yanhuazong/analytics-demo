import { Suspense } from "react";
import DemoBanner from "@/components/DemoBanner";
import ThankYouContent from "./ThankYouContent";

export default function ThankYouPage() {
  return (
    <>
      <DemoBanner>
        The <code>purchase</code> event already fired on the checkout page. This page just sends a
        normal <code>page_view</code> — a good landing page to mark as a Key Event destination.
      </DemoBanner>

      <section>
        <div className="container">
          <Suspense fallback={<div className="thankyou-box">Loading…</div>}>
            <ThankYouContent />
          </Suspense>
        </div>
      </section>
    </>
  );
}
