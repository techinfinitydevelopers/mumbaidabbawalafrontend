"use client";

import { useState } from "react";
import { EMAIL } from "@/data/contact";

/**
 * The waitlist sign-up.
 *
 * There is no list provider wired to this site, so the form does the one thing that
 * genuinely works without a backend: it hands the address to the brand's own inbox as a
 * pre-filled email. Nothing here pretends to have subscribed anyone — the confirmation
 * says an email has been opened, because that is what happened.
 *
 * >>> Replace with a real provider (Klaviyo, Mailchimp, a route handler) before launch.
 * The submit handler is the only thing that has to change; the markup can stay. <<<
 */
export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [handedOff, setHandedOff] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent("Waitlist — Perth launch");
    const body = encodeURIComponent(
      `Please add me to the Mumbai Dabbawala Perth waitlist.\n\nEmail: ${email}\n`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setHandedOff(true);
  }

  return (
    <form onSubmit={onSubmit} className="mt-phi-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Your email address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setHandedOff(false);
            }}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-[15px] border border-brand-red/15 bg-paper px-5 py-3.5 text-sm text-ink placeholder:text-ink/40 focus:border-brand-green focus:outline-none"
          />
        </label>

        {/* not the shared Button: that renders its label in a <span> the CSS owns, and a
            submit control here needs to stay a real <button type="submit"> inside the
            form. Same classes, so it matches every other button on the site. */}
        <button
          type="submit"
          className="btn btn-red shrink-0"
          aria-label="Join the waitlist"
        >
          <span className="px-7 py-3.5 text-[11px] font-bold uppercase leading-none tracking-[0.18em]">
            Join The Waitlist
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>

      <p aria-live="polite" className="mt-phi-2 text-phi-0 leading-relaxed text-ink/55">
        {handedOff
          ? `We've opened an email to ${EMAIL} with your address in it — send it and you're on the list.`
          : `No list software here yet, so this opens an email to ${EMAIL} with your address filled in.`}
      </p>
    </form>
  );
}
