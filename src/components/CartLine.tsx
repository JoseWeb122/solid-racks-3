"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useStore, type CartItem } from "@/lib/store";
import { getProductById, formatPrice } from "@/lib/products";

export default function CartLine({ item, large = false, onNavigate }: { item: CartItem; large?: boolean; onNavigate?: () => void }) {
  const { updateQty, removeFromCart } = useStore();
  const p = getProductById(item.productId);
  if (!p) return null;
  return (
    <div className={`flex gap-4 ${large ? "py-6" : "py-5"}`}>
      <Link href={`/products/${p.slug}`} onClick={onNavigate} className={`shrink-0 overflow-hidden bg-soft ${large ? "h-40 w-32" : "h-28 w-22"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/products/${p.slug}`} onClick={onNavigate} className={`block font-display font-semibold leading-snug hover:text-gold-deep ${large ? "text-base" : "text-sm"}`}>
              {p.name}
            </Link>
            <p className="mt-1 text-xs text-stone">
              {item.color}
              {item.size !== "One Size" ? ` · Size ${item.size}` : " · One Size"}
            </p>
            <p className="mt-1 text-xs text-stone">{formatPrice(p.price)} each</p>
          </div>
          <button aria-label={`Remove ${p.name}`} onClick={() => removeFromCart(item.key)} className="-mr-1 -mt-1 p-1 text-stone transition-colors hover:text-jet">
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-black/15">
            <button aria-label="Decrease quantity" onClick={() => updateQty(item.key, item.qty - 1)} className="flex h-9 w-9 items-center justify-center hover:bg-soft">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium tabular-nums">{item.qty}</span>
            <button aria-label="Increase quantity" onClick={() => updateQty(item.key, item.qty + 1)} disabled={item.qty >= 10} className="flex h-9 w-9 items-center justify-center hover:bg-soft disabled:opacity-30">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="font-display text-sm font-semibold tabular-nums">{formatPrice(p.price * item.qty)}</p>
        </div>
      </div>
    </div>
  );
}
