"use client";

import { useState, FormEvent } from "react";
import { trackEvent } from "@/lib/gtag";

export default function SiteFooter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackEvent("generate_lead", {
      method: "newsletter_signup",
      value: 5,
      currency: "USD",
    });
    setEmail("");
    setSubmitted(true);
  }

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <strong>Lumen Analytics</strong>
          <p>
            A fictional product built purely to demonstrate GA4 event tracking in a digital
            analytics class. Nothing here is a real company.
          </p>
        </div>
        <form className="newsletter" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email">Get the GA4 cheat sheet</label>
          <div className="input-row">
            <input
              type="email"
              id="newsletter-email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </div>
          {submitted && (
            <p className="form-msg">Thanks — check your inbox! (Demo only, no email was sent.)</p>
          )}
        </form>
      </div>
    </footer>
  );
}
