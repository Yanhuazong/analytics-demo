"use client";

import { useSearchParams } from "next/navigation";

/**
 * Reads ?q= after a plain HTML form GET submit and shows what was
 * searched. Needs a <Suspense> boundary around it in blog/page.tsx —
 * useSearchParams() requires one for static export / prerendering.
 */
export default function SearchNote() {
  const query = useSearchParams().get("q");
  if (!query) return null;

  return (
    <p className="search-note">
      Showing results for &ldquo;{query}&rdquo; — check GA4&apos;s{" "}
      <code>view_search_results</code> event for this query.
    </p>
  );
}
