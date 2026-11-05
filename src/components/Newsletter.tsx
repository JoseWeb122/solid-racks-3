"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function NewsletterForm({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const light = tone === "light";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return setError("Please enter your email address.");
    if (!EMAIL_RE.test(email.trim())) return setError("Please enter a valid email address.");
    setError("");
    setDone(true);
  };

  if (done) {
    return (
      <div className={`anim-scale-in flex items-start gap-3 ${compact ? "" : "border border-gold/40 p-5"}`}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-jet"><Check className="h-4 w-4" /></span>
        <div>
          <p className={`font-display text-sm font-semibold uppercase tracking-[0.18em] ${light ? "text-white" : "text-jet"}`}>You&apos;re on the list</p>
          <p className={`mt-1 text-xs ${light ? "text-white/60" : "text-stone"}`}>Demo confirmation for {email.trim()} — no email has been sent.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className={`flex ${compact ? "" : "flex-col gap-3 sm:flex-row sm:gap-0"} `}>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
          placeholder="Your email address"
          aria-label="Email address"
          aria-invalid={!!error}
          className={`min-w-0 flex-1 border bg-transparent px-4 py-3.5 text-sm outline-none transition-colors ${light ? "border-white/25 text-white placeholder:text-white/40 focus:border-gold" : "border-black/20 placeholder:text-black/40 focus:border-jet"} ${error ? "!border-[#d0634f]" : ""}`}
        />
        {compact ? (
          <button aria-label="Join the list" className={`flex w-12 items-center justify-center border border-l-0 transition-colors ${light ? "border-white/25 hover:bg-gold hover:text-jet" : "border-black/20 hover:bg-jet hover:text-white"}`}>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button className={`btn-primary ${light ? "btn-light" : ""}`}>Join the List</button>
        )}
      </div>
      {error && <p className="field-error !text-[#e07a66]">{error}</p>}
    </form>
  );
}
