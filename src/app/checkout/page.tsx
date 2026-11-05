"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Lock, Check, CreditCard, Wallet, Smartphone, Info, ArrowRight, Package } from "lucide-react";
import Logo from "@/components/Logo";
import { useStore, shippingFor, type CartItem } from "@/lib/store";
import { getProductById, formatPrice } from "@/lib/products";

type Delivery = "standard" | "express";
type Payment = "card" | "paypal" | "applepay";
interface Form {
  email: string; phone: string; first: string; last: string; address: string; address2: string;
  city: string; state: string; zip: string; country: string;
}
const INIT: Form = { email: "", phone: "", first: "", last: "", address: "", address2: "", city: "", state: "", zip: "", country: "United States" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Form, ack: boolean) {
  const e: Partial<Record<keyof Form | "ack", string>> = {};
  if (!f.email.trim()) e.email = "Email is required.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (f.phone && !/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!f.first.trim()) e.first = "First name is required.";
  if (!f.last.trim()) e.last = "Last name is required.";
  if (!f.address.trim()) e.address = "Street address is required.";
  else if (f.address.trim().length < 5) e.address = "Enter a complete street address.";
  if (!f.city.trim()) e.city = "City is required.";
  if (!f.state.trim()) e.state = "State / region is required.";
  if (!f.zip.trim()) e.zip = "Postal code is required.";
  else if (!/^[A-Za-z0-9][A-Za-z0-9\- ]{2,9}$/.test(f.zip.trim())) e.zip = "Enter a valid postal code.";
  if (!ack) e.ack = "Please confirm you understand this is a demonstration order.";
  return e;
}

function Section({ n, title, children, done }: { n: number; title: string; children: ReactNode; done?: boolean }) {
  return (
    <section className="border-b border-black/10 py-8 first:pt-0">
      <div className="mb-6 flex items-center gap-3">
        <span className={`flex h-7 w-7 items-center justify-center rounded-full font-display text-xs font-bold transition-colors ${done ? "bg-gold text-jet" : "bg-jet text-white"}`}>
          {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : n}
        </span>
        <h2 className="font-display text-lg font-bold uppercase tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function OrderSummary({ items, subtotal, shipping, compact = false }: { items: CartItem[]; subtotal: number; shipping: number; compact?: boolean }) {
  const tax = Math.round(subtotal * 0.0 * 100) / 100;
  return (
    <div>
      <div className={`divide-y divide-black/10 ${compact ? "" : "max-h-[380px] overflow-y-auto pr-1"}`}>
        {items.map((i) => {
          const p = getProductById(i.productId)!;
          return (
            <div key={i.key} className="flex items-center gap-4 py-4">
              <div className="relative h-20 w-16 shrink-0 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-jet px-1 text-[10px] font-bold text-white">{i.qty}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-stone">{i.color}{i.size !== "One Size" ? ` · ${i.size}` : ""}</p>
              </div>
              <p className="text-sm tabular-nums">{formatPrice(p.price * i.qty)}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 space-y-2.5 border-t border-black/10 pt-4 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span className="tabular-nums">{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
        <div className="flex justify-between text-stone"><span>Estimated tax</span><span>{tax === 0 ? "—" : formatPrice(tax)}</span></div>
        <div className="flex items-baseline justify-between border-t border-black/10 pt-4 font-display text-xl font-bold"><span>Total</span><span className="tabular-nums">{formatPrice(subtotal + shipping)}</span></div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { cart, subtotal, clearCart, hydrated } = useStore();
  const [form, setForm] = useState<Form>(INIT);
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [delivery, setDelivery] = useState<Delivery>("standard");
  const [payment, setPayment] = useState<Payment>("card");
  const [ack, setAck] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState<{ number: string; items: CartItem[]; subtotal: number; shipping: number; form: Form; delivery: Delivery; payment: Payment } | null>(null);

  const shipping = shippingFor(subtotal, delivery);
  const errors = validate(form, ack);
  const show = (k: keyof Form | "ack") => (submitted || (k !== "ack" && touched[k as keyof Form])) && errors[k];

  const field = (k: keyof Form, label: string, opts: { type?: string; optional?: boolean; auto?: string; className?: string } = {}) => (
    <div className={opts.className}>
      <label htmlFor={k} className="label">{label}{opts.optional && <span className="ml-1 font-normal normal-case tracking-normal text-stone">(optional)</span>}</label>
      <input
        id={k}
        type={opts.type ?? "text"}
        autoComplete={opts.auto}
        value={form[k]}
        onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
        onBlur={() => setTouched((t) => ({ ...t, [k]: true }))}
        aria-invalid={!!show(k)}
        className="input"
      />
      {show(k) && <p className="field-error">{errors[k]}</p>}
    </div>
  );

  const contactDone = !errors.email && !errors.phone && !!form.email;
  const shipDone = !errors.first && !errors.last && !errors.address && !errors.city && !errors.state && !errors.zip && !!form.first;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      const first = Object.keys(errors)[0];
      document.getElementById(first)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const number = `SR-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrder({ number, items: cart, subtotal, shipping, form, delivery, payment });
      clearCart();
      setProcessing(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  };

  if (order) {
    return (
      <div className="bg-soft">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <div className="anim-scale-in bg-white p-8 text-center md:p-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-jet"><Check className="h-9 w-9 text-gold" strokeWidth={2} /></div>
            <p className="eyebrow mt-8 text-gold-deep">Demo order confirmed</p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] md:text-5xl">Thank you, {order.form.first}.</h1>
            <p className="mx-auto mt-4 max-w-md text-sm text-black/60">Your demonstration order has been placed. This is a simulated checkout — no payment was taken, no order will be shipped and no confirmation email was sent.</p>
            <div className="mx-auto mt-8 inline-flex flex-col items-center border border-gold/50 px-8 py-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone">Demo order number</span>
              <span className="mt-1 font-display text-2xl font-bold tracking-wider">{order.number}</span>
            </div>
            <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
              <div><p className="label">Ship to</p><p className="text-sm text-black/70">{order.form.first} {order.form.last}<br />{order.form.address}{order.form.address2 ? `, ${order.form.address2}` : ""}<br />{order.form.city}, {order.form.state} {order.form.zip}<br />{order.form.country}</p></div>
              <div><p className="label">Delivery</p><p className="text-sm text-black/70">{order.delivery === "express" ? "Express · 1–2 business days" : "Standard · 3–5 business days"}</p></div>
              <div><p className="label">Payment</p><p className="text-sm text-black/70">{order.payment === "card" ? "Card" : order.payment === "paypal" ? "PayPal" : "Apple Pay"} (demo — not charged)</p></div>
            </div>
            <div className="mt-10 bg-soft p-5 text-left md:p-6"><OrderSummary items={order.items} subtotal={order.subtotal} shipping={order.shipping} compact /></div>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className="btn-primary">Back to Home</Link>
              <Link href="/collections/new-arrivals" className="btn-outline">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="border-b border-black/10">
        <div className="mx-auto flex max-w-[1300px] items-center justify-between px-5 py-5 md:px-8">
          <p className="eyebrow text-gold-deep">Checkout</p>
          <p className="flex items-center gap-1.5 text-xs text-stone"><Lock className="h-3.5 w-3.5" />Demo checkout</p>
        </div>
      </div>
      <div className="bg-jet px-5 py-3 text-center text-xs text-white/80">
        <Info className="mr-1.5 inline h-3.5 w-3.5 text-gold" />This is a frontend demonstration. No real payment details are collected and no orders are fulfilled.
      </div>

      {hydrated && cart.length === 0 ? (
        <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
          <Logo variant="monogram" size={36} />
          <h1 className="mt-8 font-display text-3xl font-bold uppercase tracking-tight">Your bag is empty</h1>
          <p className="mt-2 text-sm text-stone">Add a few pieces before heading to checkout.</p>
          <Link href="/collections/best-sellers" className="btn-primary mt-8">Shop Best Sellers</Link>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mx-auto grid max-w-[1300px] gap-10 px-5 py-10 md:px-8 lg:grid-cols-[1fr_420px] lg:gap-16 lg:py-14">
          <div>
            <details className="mb-8 bg-soft p-4 lg:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-display text-sm font-semibold">Order summary <span>{formatPrice(subtotal + shipping)}</span></summary>
              <div className="mt-4"><OrderSummary items={cart} subtotal={subtotal} shipping={shipping} /></div>
            </details>

            <Section n={1} title="Contact information" done={contactDone}>
              <div className="grid gap-4 sm:grid-cols-2">
                {field("email", "Email", { type: "email", auto: "email" })}
                {field("phone", "Phone", { type: "tel", optional: true, auto: "tel" })}
              </div>
            </Section>

            <Section n={2} title="Shipping address" done={shipDone}>
              <div className="grid gap-4 sm:grid-cols-2">
                {field("first", "First name", { auto: "given-name" })}
                {field("last", "Last name", { auto: "family-name" })}
                {field("address", "Street address", { auto: "address-line1", className: "sm:col-span-2" })}
                {field("address2", "Apartment, suite, etc.", { optional: true, auto: "address-line2", className: "sm:col-span-2" })}
                {field("city", "City", { auto: "address-level2" })}
                {field("state", "State / Region", { auto: "address-level1" })}
                {field("zip", "Postal code", { auto: "postal-code" })}
                <div>
                  <label htmlFor="country" className="label">Country</label>
                  <select id="country" value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} className="input">
                    {["United States", "Canada", "United Kingdom", "Australia", "Other"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </Section>

            <Section n={3} title="Delivery method" done>
              <div className="space-y-3">
                {([["standard", "Standard delivery", "3–5 business days", shippingFor(subtotal, "standard")], ["express", "Express delivery", "1–2 business days", 18]] as const).map(([k, l, d, price]) => (
                  <label key={k} className={`flex cursor-pointer items-center gap-4 border p-4 transition-colors ${delivery === k ? "border-jet bg-soft" : "border-black/15 hover:border-black/40"}`}>
                    <input type="radio" name="delivery" checked={delivery === k} onChange={() => setDelivery(k)} className="h-4 w-4 accent-[#080808]" />
                    <div className="flex-1"><p className="text-sm font-semibold">{l}</p><p className="text-xs text-stone">{d}</p></div>
                    <p className="font-display text-sm font-semibold">{price === 0 ? "Free" : formatPrice(price)}</p>
                  </label>
                ))}
              </div>
            </Section>

            <Section n={4} title="Payment method" done>
              <div className="grid gap-3 sm:grid-cols-3">
                {([["card", "Card", CreditCard], ["paypal", "PayPal", Wallet], ["applepay", "Apple Pay", Smartphone]] as const).map(([k, l, Icon]) => (
                  <button type="button" key={k} onClick={() => setPayment(k)} className={`flex flex-col items-center gap-2 border p-5 transition-all ${payment === k ? "border-jet bg-soft shadow-[inset_0_-2px_0_#C6A15B]" : "border-black/15 hover:border-black/40"}`} aria-pressed={payment === k}>
                    <Icon className="h-6 w-6" strokeWidth={1.4} />
                    <span className="text-sm font-semibold">{l}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-3 border border-dashed border-gold/60 bg-[#fbf8f1] p-4 text-xs leading-relaxed text-black/70">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                <p><b>Demonstration only.</b> Payment method selection is shown for design purposes. No card numbers or payment credentials are requested, stored, or processed.</p>
              </div>
            </Section>

            <Section n={5} title="Review & place order">
              <div className="grid gap-4 bg-soft p-5 text-sm sm:grid-cols-3">
                <div><p className="label">Contact</p><p className="break-words text-black/70">{form.email || "—"}</p></div>
                <div><p className="label">Ship to</p><p className="text-black/70">{form.first || form.address ? <>{form.first} {form.last}<br />{form.address}<br />{form.city}{form.city && ","} {form.state} {form.zip}</> : "—"}</p></div>
                <div><p className="label">Method</p><p className="text-black/70">{delivery === "express" ? "Express" : "Standard"} · {payment === "card" ? "Card" : payment === "paypal" ? "PayPal" : "Apple Pay"}</p></div>
              </div>
              <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm" id="ack">
                <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#080808]" />
                <span>I understand this is a <b>demonstration checkout</b> and no real order or payment will be made.</span>
              </label>
              {show("ack") && <p className="field-error">{errors.ack}</p>}
              {submitted && Object.keys(errors).length > 0 && (
                <p className="mt-4 border-l-2 border-[#b4402c] bg-[#fbeeea] px-4 py-3 text-xs text-[#8a3b2a]">Please fix the highlighted fields above to continue.</p>
              )}
              <button disabled={processing} className="btn-primary mt-6 w-full !py-5">
                {processing ? "Placing demo order..." : <>Place Demo Order — {formatPrice(subtotal + shipping)} <ArrowRight className="h-4 w-4" /></>}
              </button>
              <Link href="/cart" className="mt-4 block text-center text-xs text-stone underline underline-offset-4 hover:text-jet">Return to bag</Link>
            </Section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 bg-soft p-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-lg font-bold uppercase tracking-tight">Order summary</p>
                <Package className="h-5 w-5 text-gold-deep" strokeWidth={1.4} />
              </div>
              <OrderSummary items={cart} subtotal={subtotal} shipping={shipping} />
            </div>
          </aside>
        </form>
      )}
    </div>
  );
}
