"use client";

import Link from "next/link";
import { useState } from "react";
import { X, Heart, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice, CATEGORY_LABEL, type Product } from "@/lib/products";
import VariantPicker from "./VariantPicker";

function QuickViewInner({ product }: { product: Product }) {
  const { setQuickView, addToCart, toggleWishlist, isWished } = useStore();
  const [color, setColor] = useState<string | null>(product.colors.length === 1 ? product.colors[0].name : null);
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [img, setImg] = useState(0);
  const [errors, setErrors] = useState<{ color?: boolean; size?: boolean }>({});
  const close = () => setQuickView(null);
  const wished = isWished(product.id);

  const add = () => {
    const e = { color: !color, size: !size };
    setErrors(e);
    if (e.color || e.size) return;
    addToCart(product, color!, size!);
    close();
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`}>
      <div className="anim-fade-in absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={close} />
      <div className="anim-scale-in relative grid max-h-[92dvh] w-full max-w-5xl overflow-y-auto bg-white md:grid-cols-2">
        <button aria-label="Close quick view" onClick={close} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:text-gold-deep">
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <div className="relative bg-soft">
          <div className="aspect-[4/5] overflow-hidden md:aspect-auto md:h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={img} src={product.images[img]} alt={product.name} className="anim-fade-in h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {product.images.map((_, i) => (
              <button key={i} aria-label={`Image ${i + 1}`} onClick={() => setImg(i)} className={`h-1.5 rounded-full transition-all ${img === i ? "w-8 bg-gold" : "w-3 bg-white/80"}`} />
            ))}
          </div>
        </div>
        <div className="flex flex-col p-6 md:p-10">
          <p className="eyebrow text-gold-deep">{CATEGORY_LABEL[product.category]} · {product.type}</p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">{product.name}</h2>
          <p className="mt-2 font-display text-xl">{formatPrice(product.price)}</p>
          <p className="mt-4 text-sm leading-relaxed text-black/70">{product.description}</p>
          <div className="mt-6">
            <VariantPicker product={product} color={color} size={size} onColor={(c) => { setColor(c); setErrors((e) => ({ ...e, color: false })); }} onSize={(s) => { setSize(s); setErrors((e) => ({ ...e, size: false })); }} errors={errors} />
          </div>
          <div className="mt-8 flex gap-3">
            <button onClick={add} className="btn-primary flex-1">Add to Bag — {formatPrice(product.price)}</button>
            <button aria-label="Toggle wishlist" onClick={() => toggleWishlist(product)} className={`flex w-14 items-center justify-center border transition-colors ${wished ? "border-gold text-gold-deep" : "border-black/15 hover:border-jet"}`}>
              <Heart className={`h-5 w-5 ${wished ? "anim-heart fill-gold text-gold" : ""}`} strokeWidth={1.5} />
            </button>
          </div>
          <Link href={`/products/${product.slug}`} onClick={close} className="link-underline mt-6 inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widest">
            View full details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function QuickView() {
  const { quickView } = useStore();
  if (!quickView) return null;
  return <QuickViewInner key={quickView.id} product={quickView} />;
}
