"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getProductById, type Product } from "./products";

export interface CartItem {
  key: string;
  productId: string;
  color: string;
  size: string;
  qty: number;
}

export interface Toast {
  id: number;
  title: string;
  message?: string;
  image?: string;
  action?: { label: string; onClick: () => void };
}

interface StoreValue {
  hydrated: boolean;
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product, color: string, size: string, qty?: number, opts?: { silent?: boolean }) => void;
  updateQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  wishlist: string[];
  isWished: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  recentlyViewed: string[];
  addRecentlyViewed: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  sizeGuideOpen: boolean;
  setSizeGuideOpen: (v: boolean) => void;
  toasts: Toast[];
  showToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const KEYS = { cart: "sr-cart-v1", wish: "sr-wishlist-v1", recent: "sr-recent-v1" };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecent] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(read<CartItem[]>(KEYS.cart, []).filter((i) => getProductById(i.productId)));
    setWishlist(read<string[]>(KEYS.wish, []).filter((id) => getProductById(id)));
    setRecent(read<string[]>(KEYS.recent, []));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem(KEYS.cart, JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(KEYS.wish, JSON.stringify(wishlist)); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(KEYS.recent, JSON.stringify(recentlyViewed)); }, [recentlyViewed, hydrated]);

  // Lock body scroll when an overlay is open
  useEffect(() => {
    const locked = cartOpen || searchOpen || !!quickView || sizeGuideOpen;
    document.body.style.overflow = locked ? "hidden" : "";
  }, [cartOpen, searchOpen, quickView, sizeGuideOpen]);

  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const showToast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3800);
  }, []);

  const addToCart = useCallback<StoreValue["addToCart"]>((product, color, size, qty = 1, opts) => {
    const key = `${product.id}__${color}__${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(10, i.qty + qty) } : i));
      return [...prev, { key, productId: product.id, color, size, qty }];
    });
    if (!opts?.silent) {
      showToast({
        title: "Added to your bag",
        message: `${product.name} — ${color}${size !== "One Size" ? ` / ${size}` : ""}`,
        image: product.images[0],
        action: { label: "View bag", onClick: () => setCartOpen(true) },
      });
    }
  }, [showToast]);

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) => (qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty: Math.min(10, qty) } : i))));
  }, []);
  const removeFromCart = useCallback((key: string) => setCart((prev) => prev.filter((i) => i.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const has = prev.includes(product.id);
      showToast({
        title: has ? "Removed from wishlist" : "Saved to wishlist",
        message: product.name,
        image: product.images[0],
      });
      return has ? prev.filter((id) => id !== product.id) : [product.id, ...prev];
    });
  }, [showToast]);
  const removeFromWishlist = useCallback((id: string) => setWishlist((prev) => prev.filter((x) => x !== id)), []);
  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const addRecentlyViewed = useCallback((id: string) => {
    setRecent((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const { cartCount, subtotal } = useMemo(() => {
    let count = 0, sub = 0;
    for (const i of cart) {
      const p = getProductById(i.productId);
      if (!p) continue;
      count += i.qty;
      sub += p.price * i.qty;
    }
    return { cartCount: count, subtotal: sub };
  }, [cart]);

  const value: StoreValue = {
    hydrated, cart, cartCount, subtotal, addToCart, updateQty, removeFromCart, clearCart,
    wishlist, isWished, toggleWishlist, removeFromWishlist, recentlyViewed, addRecentlyViewed,
    cartOpen, setCartOpen, searchOpen, setSearchOpen, quickView, setQuickView, sizeGuideOpen, setSizeGuideOpen,
    toasts, showToast, dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const FREE_SHIPPING_THRESHOLD = 150;
export const shippingFor = (subtotal: number, method: "standard" | "express" = "standard") => {
  if (subtotal === 0) return 0;
  if (method === "express") return 18;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8;
};
