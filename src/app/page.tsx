import DemoBanner from "@/components/DemoBanner";
import TrackedLink from "@/components/TrackedLink";

export default function HomePage() {
  return (
    <>
      <DemoBanner>
        This is a teaching demo — no real purchases, emails, or payments happen here. Open the
        DevTools console to watch <code>trackEvent()</code> calls fire.
      </DemoBanner>

      <section className="hero">
        <div className="container">
          <h1>Analytics your whole team will actually read.</h1>
          <p>Lumen turns raw event data into plain-English answers. Start free, upgrade when it clicks.</p>
          <TrackedLink
            href="/pricing"
            className="btn btn-primary"
            eventName="cta_click"
            eventParams={{ cta_id: "hero_pricing", cta_text: "See pricing" }}
          >
            See pricing
          </TrackedLink>{" "}
          <TrackedLink
            href="/contact"
            className="btn btn-outline"
            eventName="cta_click"
            eventParams={{ cta_id: "hero_demo", cta_text: "Request a demo" }}
          >
            Request a demo
          </TrackedLink>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="section-title">Marketing campaign simulator</h2>
          <p className="section-sub">
            Each link below reloads this page with different UTM parameters — click a few, then
            check <strong>Reports &gt; Acquisition &gt; Traffic acquisition</strong> in GA4 to see
            them show up as separate sources/mediums.
          </p>
          <div className="campaign-links">
            <TrackedLink
              href="/?utm_source=newsletter&utm_medium=email&utm_campaign=fall_launch"
              eventName="campaign_link_click"
              eventParams={{ link_id: "newsletter" }}
            >
              Email newsletter link
              <small>utm_source=newsletter&amp;utm_medium=email</small>
            </TrackedLink>
            <TrackedLink
              href="/?utm_source=linkedin&utm_medium=social&utm_campaign=fall_launch"
              eventName="campaign_link_click"
              eventParams={{ link_id: "linkedin" }}
            >
              LinkedIn post link
              <small>utm_source=linkedin&amp;utm_medium=social</small>
            </TrackedLink>
            <TrackedLink
              href="/?utm_source=google&utm_medium=cpc&utm_campaign=fall_launch"
              eventName="campaign_link_click"
              eventParams={{ link_id: "google_ads" }}
            >
              Google Ads link
              <small>utm_source=google&amp;utm_medium=cpc</small>
            </TrackedLink>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="section-title">What you get</h2>
          <p className="section-sub">Three reasons analytics teams switch to Lumen.</p>
          <div className="grid-3">
            <div className="card">
              <h3>Realtime by default</h3>
              <p>Every event shows up in seconds, not hours. No more refreshing yesterday&apos;s report.</p>
            </div>
            <div className="card">
              <h3>Funnels without SQL</h3>
              <p>Drag and drop the steps that matter — from first visit to paid conversion.</p>
            </div>
            <div className="card">
              <h3>Built for teaching</h3>
              <p>Clear event names, clear parameters. Exactly what a classroom needs to explore.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
