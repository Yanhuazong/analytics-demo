"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/gtag";

/**
 * GA4's base snippet only fires page_view once, on the initial script
 * load — it has no idea when Next.js swaps the page client-side (no full
 * reload = no re-fired snippet). This tracks App Router navigations and
 * sends page_view manually, mirroring the pattern from Next.js's own docs:
 * https://nextjs.org/docs/app/guides/third-party-libraries#google-analytics
 *
 * The <GoogleAnalytics> component's initial gtag('config', ...) call
 * already sends a page_view for the very first page load, so the first
 * run of this effect is skipped — otherwise the landing page would be
 * double-counted. Every navigation after that has no other page_view
 * source, so it's sent manually here.
 *
 * Rendered inside a <Suspense> boundary in layout.tsx because
 * useSearchParams() requires one for static export / prerendering.
 */
export default function GAPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    const query = searchParams.toString();
    trackEvent("page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams.toString()]);

  return null;
}
