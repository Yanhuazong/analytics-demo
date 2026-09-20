"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import DemoBanner from "@/components/DemoBanner";
import { getOrCreateUserId, setAuthLoggedIn } from "@/lib/auth";
import { trackEvent } from "@/lib/gtag";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getOrCreateUserId();
    setAuthLoggedIn(true);
    trackEvent("login", { method: "demo_password" });
    router.push("/account");
  }

  return (
    <>
      <DemoBanner>
        There&apos;s no real backend here — any email/password works. Submitting fires a{" "}
        <code>login</code> event and sets a pseudonymous GA4 <strong>User-ID</strong> (see{" "}
        <code>AuthUserIdSync</code>), never a real email or name.
      </DemoBanner>

      <section>
        <div className="container" style={{ maxWidth: 420 }}>
          <h1 className="section-title">Sign in</h1>
          <p className="section-sub">Demo only — nothing is verified or stored anywhere but your browser.</p>

          <form className="stacked" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email</label>
            <input type="email" id="login-email" placeholder="you@example.com" required />

            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" placeholder="anything works" required />

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 20 }}>
              Sign in
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
