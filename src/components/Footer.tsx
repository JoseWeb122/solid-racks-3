"use client";

import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./Newsletter";
import { useStore } from "@/lib/store";

const COLS = [
  { title: "Shop", links: [["Men", "/collections/men"], ["Women", "/collections/women"], ["New Arrivals", "/collections/new-arrivals"], ["Accessories", "/collections/accessories"], ["Best Sellers", "/collections/best-sellers"]] },
  { title: "Customer Care", links: [["Contact", "/contact"], ["FAQs", "/faq"], ["Size Guide", "/size-guide"], ["Shipping", "/shipping-returns#shipping"], ["Returns", "/shipping-returns#returns"]] },
  { title: "About", links: [["Our Story", "/about"], ["Our Collections", "/collections/new-arrivals"], ["Account", "/account"], ["Wishlist", "/wishlist"]] },
];

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram")
    return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>;
  if (name === "TikTok")
    return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M16.5 3c.3 2.2 1.7 3.8 4 4v3.1c-1.5 0-2.9-.4-4-1.2v6.3a6.2 6.2 0 1 1-6.2-6.2c.3 0 .6 0 .9.1v3.2a3 3 0 1 0 2.2 2.9V3h3.1z" /></svg>;
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v1.7H7.5v3.2h2.8V21H14v-9.3h2.8l.4-3.2H14z" /></svg>;
}

export default function Footer() {
  const { showToast } = useStore();
  return (
    <footer className="relative overflow-hidden bg-jet text-white">
      <div className="gold-line h-px w-full opacity-60" />
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="stacked" tone="light" size={84} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">Modern streetwear and urban essentials for men and women. Keep it classic. Make it bold. Make it yours.</p>
            <div className="mt-6 flex gap-3">
              {["Instagram", "TikTok", "Facebook"].map((s) => (
                <button
                  key={s}
                  aria-label={s}
                  onClick={() => showToast({ title: `${s} — coming soon`, message: "Social profiles will be linked when the store launches." })}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-gold hover:text-gold"
                >
                  <SocialIcon name={s} />
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="eyebrow mb-5 text-gold">{c.title}</p>
                <ul className="space-y-3">
                  {c.links.map(([l, h]) => (
                    <li key={l}><Link href={h} className="text-sm text-white/70 transition-colors hover:text-white">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow mb-5 text-gold">Newsletter</p>
            <p className="mb-4 text-sm text-white/70">Stay connected with the latest drops.</p>
            <NewsletterForm tone="light" compact />
          </div>
        </div>

        <div className="pointer-events-none mt-20 select-none overflow-hidden">
          <p className="whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.8] tracking-[-0.06em] text-white/[0.04] lg:text-[15vw]">SOLID</p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} Solid Racks. All rights reserved. Demonstration storefront.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Logo variant="monogram" tone="light" size={12} />
          </div>
        </div>
      </div>
    </footer>
  );
}
