"use client";

import Link from "next/link";
import { ShoppingBag, X, ArrowRight } from "lucide-react";
import { useStore, FREE_SHIPPING_THRESHOLD, shippingFor } from "@/lib/store";
import { formatPrice } from "@/lib/products";
import CartLine from "./CartLine";
import Logo from "./Logo";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, cartCount, subtotal } = useStore();
  if (!cartOpen) return null;
  const shipping = shippingFor(subtotal);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const close = () => setCartOpen(false);

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="anim-fade-in absolute inset-0 bg-black/55 backdrop-blur-[2px]" onClick={close} />
      <aside className="anim-slide-right absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white">
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <div>
            <p className="font-display text-lg font-bold uppercase tracking-tight">Your Bag</p>
            <p className="text-xs text-stone">{cartCount} {cartCount === 1 ? "item" : "items"}</p>
          </div>
          <button aria-label="Close bag" onClick={close} className="-mr-2 p-2 hover:text-gold-deep"><X className="h-5 w-5" strokeWidth={1.5} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <Logo variant="monogram" size={34} />
            <p className="mt-8 font-display text-2xl font-bold uppercase tracking-tight">Your bag is empty</p>
            <p className="mt-2 max-w-xs text-sm text-stone">Start building your look. The essentials are waiting.</p>
            <div className="mt-8 flex w-full flex-col gap-3">
              <Link href="/collections/new-arrivals" onClick={close} className="btn-primary w-full">Shop New Arrivals</Link>
              <Link href="/collections/best-sellers" onClick={close} className="btn-outline w-full">Shop Best Sellers</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="border-b border-black/10 px-6 py-4">
              <p className="text-xs">
                {remaining > 0 ? (
                  <>You&apos;re <span className="font-semibold">{formatPrice(remaining)}</span> away from complimentary standard shipping <span className="text-stone">(demo)</span></>
                ) : (
                  <span className="font-semibold text-gold-deep">You&apos;ve unlocked complimentary standard shipping (demo)</span>
                )}
              </p>
              <div className="mt-2 h-[3px] w-full bg-soft">
                <div className="h-full bg-gold transition-all duration-700" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }} />
              </div>
            </div>
            <div className="flex-1 divide-y divide-black/10 overflow-y-auto px-6">
              {cart.map((item) => <CartLine key={item.key} item={item} onNavigate={close} />)}
            </div>
            <div className="border-t border-black/10 bg-soft px-6 py-5">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span className="tabular-nums">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-stone"><span>Estimated shipping</span><span className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
                <div className="flex justify-between border-t border-black/10 pt-3 font-display text-base font-bold"><span>Total</span><span className="tabular-nums">{formatPrice(subtotal + shipping)}</span></div>
              </div>
              <Link href="/checkout" onClick={close} className="btn-primary mt-5 w-full">Proceed to Checkout <ArrowRight className="h-4 w-4" /></Link>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link href="/cart" onClick={close} className="btn-outline !px-3 !py-3"><ShoppingBag className="h-3.5 w-3.5" />View Bag</Link>
                <button onClick={close} className="btn-outline !px-3 !py-3">Continue Shopping</button>
              </div>
              <p className="mt-3 text-center text-[11px] text-stone">Taxes calculated at checkout. Demo store — no real payments.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
