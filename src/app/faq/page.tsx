import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FaqList from "@/components/FaqList";

export const metadata: Metadata = { title: "FAQ" };

const GROUPS = [
  { title: "Orders", items: [
    { q: "Is this a live store?", a: "Not yet. This is a demonstration storefront showing how the Solid Racks online store will look and feel. You can add items to your bag and complete a simulated checkout, but no payment is taken and no order is shipped." },
    { q: "Can I change or cancel my order?", a: "In the live store, orders can be updated shortly after purchase by contacting the team. In this demo, orders are simulated, so there is nothing to change." },
    { q: "Do I need an account to check out?", a: "No — guest checkout will be available. Creating an account makes it easy to track orders and save addresses. The account area in this demo is simulated." },
  ] },
  { title: "Sizing & Fit", items: [
    { q: "How do Solid Racks pieces fit?", a: "Most tops are cut oversized with dropped shoulders. If you prefer a closer fit, we suggest sizing down. Every product page includes fit notes and a size guide." },
    { q: "Where can I find the size guide?", a: "Open the Size Guide from any product page, or visit the dedicated Size Guide page for full men's and women's measurements." },
  ] },
  { title: "Shipping & Returns", items: [
    { q: "How long does shipping take?", a: "The illustrative policy for this demo is 3–5 business days for standard delivery and 1–2 business days for express. Final policies will be confirmed at launch." },
    { q: "What is the return policy?", a: "The demo policy shows a 30-day return window for unworn items with tags attached. See Shipping & Returns for details." },
  ] },
  { title: "Product Care", items: [
    { q: "How should I wash my pieces?", a: "Machine wash cold, inside out, with similar colours. Avoid tumble drying to keep the shape, fit and embroidery looking sharp." },
  ] },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="Help" crumb="FAQ" title="Frequently asked">Quick answers about orders, sizing, shipping and care.</PageHeader>
      <div className="mx-auto grid max-w-[1300px] gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-3">
            {GROUPS.map((g) => <a key={g.title} href={`#${g.title.replace(/\W+/g, "-").toLowerCase()}`} className="block font-display text-sm font-semibold uppercase tracking-[0.15em] text-black/60 hover:text-gold-deep">{g.title}</a>)}
            <div className="!mt-10 bg-jet p-6 text-white">
              <p className="font-display text-lg font-bold uppercase">Still need help?</p>
              <Link href="/contact" className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-gold-warm underline underline-offset-4">Contact us</Link>
            </div>
          </div>
        </aside>
        <div className="space-y-16">
          {GROUPS.map((g) => (
            <section key={g.title} id={g.title.replace(/\W+/g, "-").toLowerCase()} className="scroll-mt-28">
              <p className="eyebrow mb-4 text-gold-deep">{g.title}</p>
              <FaqList items={g.items} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
