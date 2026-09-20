"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import DemoBanner from "@/components/DemoBanner";
import { useIsLoggedIn, useUserId, useMemberSince, setAuthLoggedIn } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const loggedIn = useIsLoggedIn();
  const userId = useUserId();
  const memberSince = useMemberSince();

  function handleSignOut() {
    setAuthLoggedIn(false);
    router.push("/");
  }

  return (
    <>
      <DemoBanner>
        This page is only meaningful once you&apos;re &ldquo;signed in&rdquo; — it fires a normal{" "}
        <code>page_view</code>, but because logging in set a User-ID, this hit (and every hit
        since, across the whole app) is attributed to that pseudonymous ID. Check GA4&apos;s{" "}
        <strong>Admin &gt; Property &gt; Reporting Identity</strong> / User-ID reports.
      </DemoBanner>

      <section>
        <div className="container">
          {!loggedIn ? (
            <div className="card" style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
              <h2>You&apos;re not signed in</h2>
              <p>This page is gated — sign in first to see it.</p>
              <Link href="/login" className="btn btn-primary">
                Sign in
              </Link>
            </div>
          ) : (
            <div className="thankyou-box">
              <h1>Your account</h1>
              <p>
                Signed in as <strong>{userId}</strong>
              </p>
              <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>
                Member since {memberSince}
              </p>
              <button type="button" className="btn btn-dark" style={{ marginTop: 16 }} onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
