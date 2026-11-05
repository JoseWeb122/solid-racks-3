"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Eye, Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice, CATEGORY_LABEL, type Product } from "@/lib/products";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { toggleWishlist, isWished, addToCart, setQuickView, hydrated } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [sizesOpen, setSizesOpen] = useState(false);
  const wished = hydrated && isWished(product.id);
  const oneSize = product.sizes.length === 1;
  const href = `/products/${product.slug}`;

  const quickAdd = () => {
    if (oneSize) addToCart(product, color, product.sizes[0]);
    else setSizesOpen((v) => !v);
  };

  return (
    <article className="group relative" onMouseLeave={() => setSizesOpen(false)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-soft">
        <Link href={href} aria-label={product.name} className="block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.06] md:group-hover:opacity-0"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[1]}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 hidden h-full w-full scale-[1.06] object-cover opacity-0 transition-all duration-[1200ms] ease-out group-hover:scale-100 group-hover:opacity-100 md:block"
          />
        </Link>

        {/* Labels */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.isNew && <span className="bg-white px-2.5 py-1 font-display text-[9px] font-bold uppercase tracking-[0.2em] text-jet">New</span>}
          {product.isBestSeller && <span className="bg-jet px-2.5 py-1 font-display text-[9px] font-bold uppercase tracking-[0.2em] text-gold-warm">Best Seller</span>}
          {product.availability === "low-stock" && <span className="bg-white/85 px-2.5 py-1 font-display text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8a3b2a]">Few left</span>}
        </div>

        {/* Wishlist */}
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-all hover:scale-110"
        >
          <Heart key={String(wished)} className={`h-4 w-4 ${wished ? "anim-heart fill-gold text-gold" : "text-jet"}`} strokeWidth={1.6} />
        </button>

        {/* Quick actions */}
        <div className="absolute inset-x-2 bottom-2 flex flex-col gap-1.5 transition-all duration-500 md:inset-x-3 md:bottom-3 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
          {sizesOpen && (
            <div className="anim-fade-in bg-white p-2 shadow-lg">
              <p className="mb-1.5 text-center text-[10px] uppercase tracking-[0.2em] text-stone">Select size · {color}</p>
              <div className="grid grid-cols-5 gap-1">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => { addToCart(product, color, s); setSizesOpen(false); }} className="h-8 border border-black/10 font-display text-[11px] font-semibold hover:border-jet hover:bg-jet hover:text-white">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-1.5">
            <button onClick={quickAdd} className="flex h-10 flex-1 items-center justify-center gap-1.5 bg-jet font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold hover:text-jet">
              <Plus className="h-3.5 w-3.5" /> Quick Add
            </button>
            <button aria-label="Quick view" onClick={() => setQuickView(product)} className="flex h-10 w-10 items-center justify-center bg-white text-jet transition-colors hover:bg-gold">
              <Eye className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 md:mt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone">{CATEGORY_LABEL[product.category]} · {product.type}</p>
            <Link href={href} className="mt-1 block font-display text-[13px] font-semibold leading-snug hover:text-gold-deep md:text-sm">{product.name}</Link>
          </div>
          <p className="shrink-0 font-display text-[13px] font-medium md:text-sm">{formatPrice(product.price)}</p>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <button
              key={c.name}
              aria-label={`Color ${c.name}`}
              title={c.name}
              onClick={() => setColor(c.name)}
              className={`h-4 w-4 rounded-full border border-black/15 transition-all ${color === c.name ? "ring-1 ring-gold ring-offset-2" : ""}`}
              style={{ background: c.hex }}
            />
          ))}
          <span className="ml-1 text-[11px] text-stone">{product.colors.length} colors</span>
        </div>
      </div>
    </article>
  );
}
