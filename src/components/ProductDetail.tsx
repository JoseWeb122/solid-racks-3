"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck, ChevronDown, Ruler } from "lucide-react";
import { useStore } from "@/lib/store";
import { products, getProduct, getProductById, formatPrice, CATEGORY_LABEL, type Product } from "@/lib/products";
import VariantPicker from "./VariantPicker";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      {/* Mobile swipe gallery */}
      <div className="relative md:hidden">
        <div ref={scroller} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
          {product.images.map((src, i) => (
            <div key={src} className="aspect-[4/5] w-full shrink-0 snap-center bg-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${product.name} — view ${i + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {product.images.map((_, i) => <span key={i} className={`h-1 rounded-full transition-all ${active === i ? "w-7 bg-gold" : "w-3 bg-white/80"}`} />)}
        </div>
      </div>

      {/* Desktop gallery */}
      <div className="hidden gap-4 md:flex">
        <div className="flex w-20 shrink-0 flex-col gap-3">
          {product.images.map((src, i) => (
            <button key={src} onClick={() => setActive(i)} aria-label={`View image ${i + 1}`} className={`aspect-[3/4] overflow-hidden bg-soft transition-all ${active === i ? "ring-1 ring-gold ring-offset-2" : "opacity-60 hover:opacity-100"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <div
          className="relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden bg-soft"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
          onMouseLeave={() => setZoom(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={active}
            src={product.images[active]}
            alt={product.name}
            className="anim-fade-in h-full w-full object-cover transition-transform duration-300 ease-out"
            style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
          />
          <p className="pointer-events-none absolute bottom-4 left-4 bg-white/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em]">{active + 1} / {product.images.length}</p>
        </div>
      </div>
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/10">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 font-display text-xs font-semibold uppercase tracking-[0.2em]" aria-expanded={open}>
        {title}<ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={1.5} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden text-sm leading-relaxed text-black/70">{children}</div>
      </div>
    </div>
  );
}

function Rail({ title, eyebrow, items }: { title: string; eyebrow: string; items: Product[] }) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-20">
      <Reveal>
        <p className="eyebrow text-gold-deep">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-[-0.03em] md:text-5xl">{title}</h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {items.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const { addToCart, toggleWishlist, isWished, addRecentlyViewed, recentlyViewed, setSizeGuideOpen, hydrated } = useStore();
  const [color, setColor] = useState<string | null>(product.colors.length === 1 ? product.colors[0].name : null);
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [errors, setErrors] = useState<{ color?: boolean; size?: boolean }>({});
  const [added, setAdded] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const wished = hydrated && isWished(product.id);

  useEffect(() => { addRecentlyViewed(product.id); }, [product.id, addRecentlyViewed]);

  const add = () => {
    const e = { color: !color, size: !size };
    setErrors(e);
    if (e.color || e.size) {
      pickerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    addToCart(product, color!, size!, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const completeLook = product.completeLook.map(getProductById).filter((p): p is Product => !!p);
  const alsoLike = products.filter((p) => p.category === product.category && p.id !== product.id && !product.completeLook.includes(p.id)).sort((a, b) => a.sales - b.sales);
  const recent = hydrated ? recentlyViewed.filter((id) => id !== product.id).map(getProductById).filter((p): p is Product => !!p) : [];

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-0 pt-0 md:px-8 md:pt-6">
        <nav aria-label="Breadcrumb" className="hidden pb-6 text-[11px] uppercase tracking-[0.2em] text-stone md:block">
          <Link href="/" className="hover:text-jet">Home</Link><span className="mx-2 text-gold">/</span>
          <Link href={`/collections/${product.category}`} className="hover:text-jet">{CATEGORY_LABEL[product.category]}</Link><span className="mx-2 text-gold">/</span>
          <span className="text-jet">{product.name}</span>
        </nav>
        <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12 lg:gap-20">
          <Gallery product={product} />
          <div className="px-5 md:px-0">
            <div className="md:sticky md:top-28">
              <div className="flex flex-wrap items-center gap-2">
                <p className="eyebrow text-gold-deep">{CATEGORY_LABEL[product.category]} · {product.type}</p>
                {product.isNew && <span className="bg-soft px-2 py-0.5 font-display text-[9px] font-bold uppercase tracking-[0.2em]">New</span>}
                {product.isBestSeller && <span className="bg-jet px-2 py-0.5 font-display text-[9px] font-bold uppercase tracking-[0.2em] text-gold-warm">Best Seller</span>}
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.03em] md:text-5xl">{product.name}</h1>
              <div className="mt-4 flex items-center gap-4">
                <p className="font-display text-2xl">{formatPrice(product.price)}</p>
                {product.availability === "low-stock" ? (
                  <span className="flex items-center gap-1.5 text-xs text-[#8a3b2a]"><span className="h-1.5 w-1.5 rounded-full bg-[#c0573f]" />Few left</span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-stone"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />In stock</span>
                )}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-black/70 md:text-base">{product.description}</p>

              <div ref={pickerRef} className="mt-8 border-t border-black/10 pt-8">
                <VariantPicker
                  product={product}
                  color={color}
                  size={size}
                  onColor={(c) => { setColor(c); setErrors((e) => ({ ...e, color: false })); }}
                  onSize={(s) => { setSize(s); setErrors((e) => ({ ...e, size: false })); }}
                  errors={errors}
                />
              </div>

              <div className="mt-8 flex gap-3">
                <div className="flex items-center border border-black/15">
                  <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-14 w-11 items-center justify-center hover:bg-soft"><Minus className="h-4 w-4" /></button>
                  <span className="w-8 text-center font-display font-semibold tabular-nums">{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))} className="flex h-14 w-11 items-center justify-center hover:bg-soft"><Plus className="h-4 w-4" /></button>
                </div>
                <button onClick={add} className="btn-primary flex-1 !py-0">
                  {added ? "Added to Bag ✓" : `Add to Bag — ${formatPrice(product.price * qty)}`}
                </button>
                <button aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} onClick={() => toggleWishlist(product)} className={`flex w-14 items-center justify-center border transition-colors ${wished ? "border-gold" : "border-black/15 hover:border-jet"}`}>
                  <Heart key={String(wished)} className={`h-5 w-5 ${wished ? "anim-heart fill-gold text-gold" : ""}`} strokeWidth={1.5} />
                </button>
              </div>
              {(errors.color || errors.size) && (
                <p className="field-error">Please select {[errors.color && "a color", errors.size && "a size"].filter(Boolean).join(" and ")} before adding to your bag.</p>
              )}

              <div className="mt-8 grid grid-cols-3 gap-2 bg-soft p-4 text-center">
                {[[Truck, "Free standard shipping over $150*"], [RotateCcw, "30-day returns*"], [ShieldCheck, "Secure demo checkout"]].map(([Icon, label], i) => {
                  const I = Icon as typeof Truck;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 px-1">
                      <I className="h-5 w-5 text-gold-deep" strokeWidth={1.5} />
                      <p className="text-[11px] leading-snug text-black/70">{label as string}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px] text-stone">*Illustrative policies for this demonstration store.</p>

              <div className="mt-6">
                <Accordion title="Product Details" defaultOpen>
                  <ul className="list-disc space-y-1.5 pl-5">{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
                </Accordion>
                <Accordion title="Fabric & Fit">
                  <p>{product.fabric}</p>
                  <p className="mt-2">{product.fit}</p>
                  {product.sizes.length > 1 && (
                    <button onClick={() => setSizeGuideOpen(true)} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-jet underline underline-offset-4"><Ruler className="h-3.5 w-3.5" />Open size guide</button>
                  )}
                </Accordion>
                <Accordion title="Delivery & Returns">
                  <p>Standard delivery 3–5 business days. Express delivery 1–2 business days. Unworn items can be returned within 30 days.</p>
                  <Link href="/shipping-returns" className="mt-2 inline-block text-xs font-semibold uppercase tracking-widest text-jet underline underline-offset-4">Shipping & returns</Link>
                </Accordion>
                <Accordion title="Care">
                  <p>Machine wash cold, inside out, with similar colours. Do not tumble dry. Reshape while damp and dry flat to preserve the fit and embroidery.</p>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky add bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold">{product.name}</p>
          <p className="text-xs text-stone">{formatPrice(product.price)}{color ? ` · ${color}` : ""}{size && size !== "One Size" ? ` · ${size}` : ""}</p>
        </div>
        <button onClick={add} className="btn-primary !px-5 !py-3">{added ? "Added ✓" : "Add to Bag"}</button>
      </div>

      <div className="mt-10 bg-soft">
        <Rail eyebrow="Style it with" title="Complete the Look" items={completeLook} />
      </div>
      <Rail eyebrow="More from the collection" title="You May Also Like" items={alsoLike} />
      {recent.length > 0 && (
        <div className="border-t border-black/10 pb-16">
          <Rail eyebrow="Your history" title="Recently Viewed" items={recent} />
        </div>
      )}
    </>
  );
}
