"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUBJECTS = ["Order question", "Sizing & fit", "Shipping & returns", "Collaborations", "Something else"];

export default function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = "Please enter your name.";
    if (!f.email.trim()) er.email = "Email is required.";
    else if (!EMAIL_RE.test(f.email.trim())) er.email = "Enter a valid email address.";
    if (!f.subject) er.subject = "Please choose a subject.";
    if (f.message.trim().length < 10) er.message = "Your message should be at least 10 characters.";
    setErrors(er);
    if (!Object.keys(er).length) setSent(true);
  };

  if (sent) {
    return (
      <div className="anim-scale-in flex flex-col items-start border border-gold/50 bg-white p-8 md:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-jet"><Check className="h-6 w-6 text-gold" /></span>
        <h3 className="mt-6 font-display text-2xl font-bold uppercase tracking-tight">Message received — demo</h3>
        <p className="mt-3 text-sm text-black/65">Thanks, {f.name.split(" ")[0]}. This is a simulated contact form, so your message has not been sent anywhere. When the store launches, this form will connect to the Solid Racks team.</p>
        <button onClick={() => { setSent(false); setF({ name: "", email: "", subject: "", message: "" }); }} className="btn-outline mt-8">Send another message</button>
      </div>
    );
  }

  const input = (k: keyof typeof f, label: string, type = "text") => (
    <div>
      <label htmlFor={k} className="label">{label}</label>
      <input id={k} type={type} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!errors[k]} className="input" />
      {errors[k] && <p className="field-error">{errors[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-5 bg-white p-6 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        {input("name", "Name")}
        {input("email", "Email", "email")}
      </div>
      <div>
        <label htmlFor="subject" className="label">Subject</label>
        <select id="subject" value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} aria-invalid={!!errors.subject} className="input">
          <option value="">Select a subject</option>
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
        {errors.subject && <p className="field-error">{errors.subject}</p>}
      </div>
      <div>
        <label htmlFor="message" className="label">Message</label>
        <textarea id="message" rows={6} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} aria-invalid={!!errors.message} className="input resize-none" />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>
      <button className="btn-primary w-full sm:w-auto">Send Message</button>
      <p className="text-[11px] text-stone">Demo form — submissions are validated locally and not transmitted.</p>
    </form>
  );
}
