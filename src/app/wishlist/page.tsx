"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, X, ShoppingBag } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useStore } from "@/lib/store";
import { getProductById, formatPrice, CATEGORY_LABEL, type Product } from "@/lib/products";

function WishItem({ product }: { product: Product }) {
  const { removeFromWishlist, addToCart, showToast } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string>(product.sizes.length === 1 ? product.sizes[0] : "");
  const [err, setErr] = useState(false);

  const move = () => {
    if (!size) return setErr(true);
    addToCart(product, color, size, 1, { silent: true });
    removeFromWishlist(product.id);
    showToast({ title: "Moved to your bag", message: `${product.name} — ${color}${size !== "One Size" ? ` / ${size}` : ""}`, image: product.images[0] });
  };

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-soft">
        <Link href={`/products/${product.slug}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        </Link>
        <button aria-label="Remove from wishlist" onClick={() => removeFromWishlist(product.id)} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-jet hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-stone">{CATEGORY_LABEL[product.category]}</p>
      <div className="flex items-start justify-between gap-2">
        <Link href={`/products/${product.slug}`} className="font-display text-sm font-semibold hover:text-gold-deep">{product.name}</Link>
        <p className="font-display text-sm">{formatPrice(product.price)}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <select value={color} onChange={(e) => setColor(e.target.value)} className="border border-black/15 bg-white px-2 py-2 text-xs outline-none focus:border-jet" aria-label="Color">
          {product.colors.map((c) => <option key={c.name}>{c.name}</option>)}
        </select>
        <select value={size} onChange={(e) => { setSize(e.target.value); setErr(false); }} aria-invalid={err} className={`border bg-white px-2 py-2 text-xs outline-none focus:border-jet ${err ? "border-[#b4402c]" : "border-black/15"}`} aria-label="Size">
          {product.sizes.length > 1 && <option value="">Size</option>}
          {product.sizes.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {err && <p className="field-error">Select a size first</p>}
      <button onClick={move} className="btn-primary mt-3 !py-3"><ShoppingBag className="h-3.5 w-3.5" />Move to Bag</button>
    </article>
  );
}

export default function WishlistPage() {
  const { wishlist, hydrated } = useStore();
  const items = wishlist.map(getProductById).filter((p): p is Product => !!p);

  return (
    <>
      <PageHeader eyebrow="Wishlist" title="Saved pieces">
        {hydrated ? `${items.length} ${items.length === 1 ? "item" : "items"} saved in this browser.` : "Loading your saved pieces..."}
      </PageHeader>
      <div className="mx-auto max-w-[1600px] px-4 py-14 md:px-8">
        {hydrated && items.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold"><Heart className="h-8 w-8 text-gold" strokeWidth={1.2} /></span>
            <p className="mt-8 font-display text-3xl font-bold uppercase tracking-tight">Nothing saved yet</p>
            <p className="mt-2 max-w-sm text-sm text-stone">Tap the heart on any piece to keep it here for later.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/collections/new-arrivals" className="btn-primary">Shop New Arrivals</Link>
              <Link href="/collections/best-sellers" className="btn-outline">Shop Best Sellers</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {items.map((p) => <WishItem key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
