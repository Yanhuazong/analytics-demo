import { Suspense } from "react";
import DemoBanner from "@/components/DemoBanner";
import SearchNote from "./SearchNote";

export default function BlogPage() {
  return (
    <>
      <DemoBanner>
        Nothing custom fires on this page — scrolling to 90%, clicking an outbound link,
        downloading the file, and searching below are all captured automatically by GA4&apos;s{" "}
        <strong>Enhanced Measurement</strong> (Admin &gt; Data Streams &gt; your stream).
      </DemoBanner>

      <section>
        <div className="container article">
          <form className="search-box" action="/blog" method="GET">
            <input type="text" name="q" placeholder="Search articles (try 'funnel')" />
            <button type="submit" className="btn btn-dark">
              Search
            </button>
          </form>
          <Suspense fallback={null}>
            <SearchNote />
          </Suspense>

          <h1>Why &ldquo;just add more events&rdquo; isn&apos;t an analytics strategy</h1>
          <p>
            <em>Posted by the Lumen team · 6 min read</em>
          </p>

          <p>
            Every analytics rollout eventually hits the same wall: someone asks for &ldquo;all the
            data,&rdquo; engineering adds forty events in a sprint, and six months later nobody can
            find the three numbers that actually matter. This article is about avoiding that wall —
            and, not coincidentally, about scrolling far enough down the page to see it happen in a
            Google Analytics 4 report in real time.
          </p>

          <h2>Start with the decision, not the data</h2>
          <p>
            Before you name a single event, write down the decision it should inform. &ldquo;Did
            the new pricing page increase upgrades?&rdquo; is a decision. &ldquo;Track everything on
            the pricing page&rdquo; is not. The first gives you a funnel: view the plans, pick one,
            start checkout, enter payment, complete the purchase. The second gives you a spreadsheet
            nobody opens.
          </p>
          <p>
            In GA4 terms, that funnel maps almost directly onto the standard ecommerce events —{" "}
            <code>view_item_list</code>, <code>select_item</code>, <code>add_to_cart</code>,{" "}
            <code>begin_checkout</code>, <code>add_payment_info</code>, and <code>purchase</code> —
            which is exactly what this demo site&apos;s pricing and checkout pages fire, in that
            order, as you click through them.
          </p>

          <h2>Let the platform do the boring parts</h2>
          <p>
            Modern GA4 properties already track scroll depth, outbound clicks, site search, and
            file downloads out of the box through Enhanced Measurement. You don&apos;t need a
            developer to instrument &ldquo;did they scroll&rdquo; or &ldquo;did they click a link to
            another site&rdquo; — you need to know those signals are switched on, and know where to
            find them in the Events report afterward.
          </p>
          <p>
            That&apos;s worth sitting with for a second: the three things below this paragraph — an
            outbound link, a file download, and the search box above — are not wired up with any
            custom JavaScript on this page at all.
          </p>

          <div className="reading-list">
            <strong>Recommended reading (outbound links)</strong>
            <a href="https://support.google.com/analytics/answer/9216061" target="_blank" rel="noopener">
              Google&apos;s official guide to GA4 Enhanced Measurement events
            </a>
            <a href="https://support.google.com/analytics/answer/9267735" target="_blank" rel="noopener">
              Understanding the GA4 events model
            </a>
            <a href="https://nextjs.org/docs/app/guides/third-party-libraries" target="_blank" rel="noopener">
              Next.js docs — third-party libraries (Google Analytics section)
            </a>
          </div>

          <h2>Name events like a person, not a database column</h2>
          <p>
            Compare <code>generate_lead</code> to <code>form_submission_type_3</code>. A teammate
            reading the Events report six months from now should be able to guess what happened
            without opening the source code. This demo site sticks to GA4&apos;s recommended event
            names wherever one exists, and only invents a custom name — like{" "}
            <code>campaign_link_click</code> — when there genuinely isn&apos;t a standard one.
          </p>

          <h2>Conversions are a label, not a different kind of event</h2>
          <p>
            In GA4, any event can become a &ldquo;Key event&rdquo; (GA4&apos;s current term for a
            conversion) with one toggle in Admin — no separate tracking code required. On this site,{" "}
            <code>purchase</code> and <code>generate_lead</code> are the two events worth marking as
            Key events, because they&apos;re the two moments that represent real business value: a
            paid subscriber and a sales lead.
          </p>

          <h2>Try it yourself</h2>
          <p>
            Grab the cheat sheet below, then go run the checkout funnel on the{" "}
            <a href="/pricing">pricing page</a> and watch the events land in GA4 Realtime as you go.
          </p>

          <div className="download-box">
            <p>
              <strong>GA4 event-naming cheat sheet</strong> (demo PDF)
            </p>
            <a href="/sample-whitepaper.pdf" className="btn btn-primary" download>
              Download PDF
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
