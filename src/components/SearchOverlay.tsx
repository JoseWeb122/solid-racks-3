"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowRight, Clock } from "lucide-react";
import { useStore } from "@/lib/store";
import { searchProducts, formatPrice, CATEGORY_LABEL, products } from "@/lib/products";

const SUGGESTED = [
  { label: "Men", href: "/collections/men" },
  { label: "Women", href: "/collections/women" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
];
const POPULAR = ["Hoodie", "Cargo", "Tee", "Jacket", "Cap", "Bag"];
const SESSION_KEY = "sr-recent-searches";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecent(JSON.parse(sessionStorage.getItem(SESSION_KEY) || "[]"));
    } catch { /* ignore */ }
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const results = searchProducts(q);
  const close = () => { setSearchOpen(false); setQ(""); };
  const remember = (term: string) => {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recent.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, 5);
    setRecent(next);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
  };
  const submit = (term: string) => {
    remember(term);
    close();
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };
  const trending = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="anim-fade-in absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
      <div className="anim-scale-in relative max-h-[100dvh] overflow-y-auto bg-white">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-6 md:px-8 md:pt-10">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-gold-deep">Search Solid Racks</p>
            <button aria-label="Close search" onClick={close} className="-mr-2 p-2 hover:text-gold-deep"><X className="h-5 w-5" strokeWidth={1.5} /></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) submit(q); }} className="mt-4 flex items-center gap-4 border-b-2 border-jet pb-3">
            <Search className="h-6 w-6 shrink-0" strokeWidth={1.5} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search hoodies, cargos, caps..."
              className="w-full bg-transparent font-display text-2xl font-medium tracking-tight outline-none placeholder:text-black/25 md:text-4xl"
              aria-label="Search products"
            />
            {q && <button type="button" onClick={() => setQ("")} className="text-xs uppercase tracking-widest text-stone hover:text-jet">Clear</button>}
          </form>

          {!q.trim() ? (
            <div className="mt-8 grid gap-10 md:grid-cols-12">
              <div className="space-y-8 md:col-span-4">
                {recent.length > 0 && (
                  <div>
                    <p className="eyebrow mb-3 text-stone">Recent searches</p>
                    <div className="flex flex-wrap gap-2">
                      {recent.map((r) => (
                        <button key={r} onClick={() => setQ(r)} className="inline-flex items-center gap-1.5 border border-black/10 px-3 py-2 text-xs hover:border-gold">
                          <Clock className="h-3 w-3 text-stone" />{r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="eyebrow mb-3 text-stone">Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR.map((t) => (
                      <button key={t} onClick={() => setQ(t)} className="border border-black/10 px-3 py-2 text-xs hover:border-gold hover:text-gold-deep">{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-3 text-stone">Suggested collections</p>
                  <ul className="space-y-2">
                    {SUGGESTED.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} onClick={close} className="group inline-flex items-center gap-2 font-display text-lg font-semibold hover:text-gold-deep">
                          {s.label}<ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:col-span-8">
                <p className="eyebrow mb-3 text-stone">Trending now</p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {trending.map((p) => (
                    <Link key={p.id} href={`/products/${p.slug}`} onClick={close} className="group">
                      <div className="aspect-[3/4] overflow-hidden bg-soft">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <p className="mt-2 text-xs font-medium">{p.name}</p>
                      <p className="text-xs text-stone">{formatPrice(p.price)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl font-bold uppercase">No results for “{q}”</p>
              <p className="mt-2 text-sm text-stone">Try a different keyword — like “hoodie”, “black” or “bag”.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {SUGGESTED.map((s) => (
                  <Link key={s.href} href={s.href} onClick={close} className="border border-black/15 px-4 py-2 text-xs uppercase tracking-widest hover:border-gold">{s.label}</Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-stone">{results.length} {results.length === 1 ? "result" : "results"}</p>
                <button onClick={() => submit(q)} className="link-underline text-xs font-semibold uppercase tracking-widest">View all results</button>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {results.slice(0, 12).map((p) => (
                  <Link key={p.id} href={`/products/${p.slug}`} onClick={() => { remember(q); close(); }} className="group">
                    <div className="aspect-[3/4] overflow-hidden bg-soft">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <p className="mt-2 text-[10px] uppercase tracking-widest text-stone">{CATEGORY_LABEL[p.category]}</p>
                    <p className="text-xs font-medium">{p.name}</p>
                    <p className="text-xs text-stone">{formatPrice(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
