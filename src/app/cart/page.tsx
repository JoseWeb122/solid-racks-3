"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CartLine from "@/components/CartLine";
import ProductCard from "@/components/ProductCard";
import Logo from "@/components/Logo";
import { useStore, shippingFor, FREE_SHIPPING_THRESHOLD } from "@/lib/store";
import { formatPrice, products } from "@/lib/products";

export default function CartPage() {
  const { cart, cartCount, subtotal, hydrated, clearCart } = useStore();
  const shipping = shippingFor(subtotal);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const inCart = new Set(cart.map((i) => i.productId));
  const suggestions = products.filter((p) => !inCart.has(p.id) && p.category === "accessories").slice(0, 4);

  return (
    <>
      <PageHeader eyebrow="Shopping Bag" title="Your Bag">{hydrated ? `${cartCount} ${cartCount === 1 ? "item" : "items"}` : ""}</PageHeader>
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
        {hydrated && cart.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Logo variant="monogram" size={40} />
            <p className="mt-10 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">Your bag is empty</p>
            <p className="mt-3 max-w-sm text-sm text-stone">Nothing here yet. Discover oversized hoodies, heavyweight tees and the details that finish the look.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/collections/men" className="btn-primary">Shop Men</Link>
              <Link href="/collections/women" className="btn-primary">Shop Women</Link>
              <Link href="/collections/accessories" className="btn-outline">Shop Accessories</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div>
              <div className="flex items-center justify-between border-b-2 border-jet pb-3">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.2em]">Items</p>
                {cart.length > 0 && <button onClick={clearCart} className="text-xs text-stone underline underline-offset-4 hover:text-jet">Remove all</button>}
              </div>
              <div className="divide-y divide-black/10">
                {cart.map((i) => <CartLine key={i.key} item={i} large />)}
              </div>
              <Link href="/collections/new-arrivals" className="link-underline mt-6 inline-block text-xs font-semibold uppercase tracking-widest">← Continue Shopping</Link>
            </div>
            <aside className="h-fit bg-soft p-6 md:p-8 lg:sticky lg:top-28">
              <p className="font-display text-lg font-bold uppercase tracking-tight">Order Summary</p>
              <div className="mt-5">
                <p className="text-xs">{remaining > 0 ? <>Add <b>{formatPrice(remaining)}</b> for complimentary standard shipping.</> : <span className="font-semibold text-gold-deep">Complimentary standard shipping unlocked.</span>}</p>
                <div className="mt-2 h-[3px] bg-white"><div className="h-full bg-gold transition-all duration-700" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }} /></div>
              </div>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span className="tabular-nums">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-stone"><span>Estimated shipping</span><span className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
                <div className="flex justify-between text-stone"><span>Taxes</span><span>Calculated at checkout</span></div>
                <div className="flex justify-between border-t border-black/10 pt-4 font-display text-lg font-bold"><span>Total</span><span className="tabular-nums">{formatPrice(subtotal + shipping)}</span></div>
              </div>
              <Link href="/checkout" className="btn-primary mt-6 w-full">Proceed to Checkout <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/collections/best-sellers" className="btn-outline mt-3 w-full">Continue Shopping</Link>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone"><Lock className="h-3 w-3" />Demonstration checkout — no payment is processed.</p>
            </aside>
          </div>
        )}
        {suggestions.length > 0 && (
          <section className="mt-24">
            <p className="eyebrow text-gold-deep">Finish the look</p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">Add the details</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {suggestions.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
