"use client";

import { useRef, useState, FormEvent } from "react";
import DemoBanner from "@/components/DemoBanner";
import { trackEvent } from "@/lib/gtag";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const formStarted = useRef(false);

  function handleFocusIn() {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent("form_start", { form_id: "contact_form", form_name: "Contact / Request Demo" });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackEvent("generate_lead", {
      method: "contact_form",
      value: 50,
      currency: "USD",
    });
    setSubmitted(true);
  }

  return (
    <>
      <DemoBanner>
        This form fires a custom <code>form_start</code> event the first time you click into any
        field, then <code>generate_lead</code> on submit.
      </DemoBanner>

      <section>
        <div className="container" style={{ maxWidth: 520 }}>
          <h1 className="section-title">Talk to us</h1>
          <p className="section-sub">Request a walkthrough — no real message is sent anywhere.</p>

          <form className="stacked" onFocus={handleFocusIn} onSubmit={handleSubmit}>
            <label htmlFor="c-name">Name</label>
            <input type="text" id="c-name" required disabled={submitted} />

            <label htmlFor="c-email">Work email</label>
            <input type="email" id="c-email" required disabled={submitted} />

            <label htmlFor="c-company">Company</label>
            <input type="text" id="c-company" disabled={submitted} />

            <label htmlFor="c-message">What are you hoping to learn?</label>
            <textarea id="c-message" rows={4} disabled={submitted} />

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 20 }} disabled={submitted}>
              Request a demo
            </button>
            {submitted && (
              <p className="form-msg">Thanks! (Demo only — no message was actually sent.)</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
