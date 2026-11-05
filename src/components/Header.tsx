"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { useStore } from "@/lib/store";
import { products, formatPrice } from "@/lib/products";

type MegaKey = "men" | "women" | "accessories" | "new-arrivals";

const NAV: { key: MegaKey; label: string; href: string; links: { label: string; href: string }[]; image: string; tagline: string }[] = [
  {
    key: "men", label: "Men", href: "/collections/men", image: "/images/col-men.jpg", tagline: "Everyday essentials with an urban edge.",
    links: [
      { label: "Shop All Men", href: "/collections/men" },
      { label: "Hoodies", href: "/collections/men?type=Hoodies" },
      { label: "Tees", href: "/collections/men?type=Tees" },
      { label: "Sweatshirts", href: "/collections/men?type=Sweatshirts" },
      { label: "Pants", href: "/collections/men?type=Pants" },
      { label: "Jackets", href: "/collections/men?type=Jackets" },
    ],
  },
  {
    key: "women", label: "Women", href: "/collections/women", image: "/images/col-women.jpg", tagline: "Modern silhouettes. Effortless expression.",
    links: [
      { label: "Shop All Women", href: "/collections/women" },
      { label: "Hoodies", href: "/collections/women?type=Hoodies" },
      { label: "Tees", href: "/collections/women?type=Tees" },
      { label: "Pants", href: "/collections/women?type=Pants" },
      { label: "Jackets", href: "/collections/women?type=Jackets" },
      { label: "Sets", href: "/collections/women?type=Sets" },
    ],
  },
  {
    key: "new-arrivals", label: "New Arrivals", href: "/collections/new-arrivals", image: "/images/hero.jpg", tagline: "Fresh pieces. New energy.",
    links: [
      { label: "All New Arrivals", href: "/collections/new-arrivals" },
      { label: "New for Men", href: "/collections/new-arrivals?category=men" },
      { label: "New for Women", href: "/collections/new-arrivals?category=women" },
      { label: "New Accessories", href: "/collections/new-arrivals?category=accessories" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
    ],
  },
  {
    key: "accessories", label: "Accessories", href: "/collections/accessories", image: "/images/col-accessories.jpg", tagline: "Finish your look with the right details.",
    links: [
      { label: "Shop All Accessories", href: "/collections/accessories" },
      { label: "Headwear", href: "/collections/accessories?type=Headwear" },
      { label: "Bags", href: "/collections/accessories?type=Bags" },
      { label: "Socks", href: "/collections/accessories?type=Socks" },
    ],
  },
];

function Announcement() {
  const items = Array.from({ length: 8 });
  return (
    <div className="relative z-50 h-9 overflow-hidden bg-jet text-white">
      <div className="flex h-full w-max animate-marquee items-center">
        {items.map((_, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-8 font-display text-[10px] font-medium tracking-[0.3em]">
            THE STREETWEAR EDIT
            <span className="mx-4 inline-block h-px w-8 bg-gold" />
            <span className="text-gold-warm">DISCOVER THE SOLID RACKS COLLECTION</span>
            <span className="ml-8 inline-block h-1 w-1 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { cartCount, wishlist, setCartOpen, setSearchOpen, hydrated } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<MegaKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<MegaKey | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // close menus on route change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMega(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const transparent = isHome && !scrolled && !mega;
  const fg = transparent ? "text-white" : "text-jet";
  const activeNav = NAV.find((n) => n.key === mega);
  const newItems = products.filter((p) => p.isNew).slice(0, 3);

  return (
    <>
      <Announcement />
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,color] duration-500 ${
          transparent ? "bg-transparent" : "bg-white/95 shadow-[0_1px_0_rgba(8,8,8,0.08)] backdrop-blur-md"
        } ${fg}`}
        onMouseLeave={() => setMega(null)}
      >
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-20 md:px-8">
          {/* Left */}
          <div className="flex items-center">
            <button aria-label="Open menu" onClick={() => setMobileOpen(true)} className="-ml-2 p-2 lg:hidden">
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="p-2 lg:hidden">
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
              {NAV.map((n) => (
                <Link
                  key={n.key}
                  href={n.href}
                  onMouseEnter={() => setMega(n.key)}
                  onFocus={() => setMega(n.key)}
                  data-active={pathname.startsWith(n.href) || mega === n.key}
                  className="link-underline py-7 font-display text-[11px] font-semibold uppercase tracking-[0.18em] xl:tracking-[0.22em]"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center logo */}
          <Link href="/" aria-label="Solid Racks home" className="flex items-center justify-center px-2" onMouseEnter={() => setMega(null)}>
            <span className="hidden md:inline-flex"><Logo variant="horizontal" tone={transparent ? "light" : "dark"} size={40} /></span>
            <span className="inline-flex md:hidden"><Logo variant="horizontal" tone={transparent ? "light" : "dark"} size={27} /></span>
          </Link>

          {/* Right */}
          <div className="flex items-center justify-end gap-0.5 md:gap-2" onMouseEnter={() => setMega(null)}>
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="hidden p-2 transition-colors hover:text-gold lg:block">
              <Search className="h-[19px] w-[19px]" strokeWidth={1.5} />
            </button>
            <Link aria-label="Account" href="/account" className="hidden p-2 transition-colors hover:text-gold sm:block">
              <User className="h-[19px] w-[19px]" strokeWidth={1.5} />
            </Link>
            <Link aria-label="Wishlist" href="/wishlist" className="relative p-2 transition-colors hover:text-gold">
              <Heart className="h-[19px] w-[19px]" strokeWidth={1.5} />
              {hydrated && wishlist.length > 0 && (
                <span key={wishlist.length} className="anim-bump absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-jet">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button aria-label={`Shopping bag, ${cartCount} items`} onClick={() => setCartOpen(true)} className="relative p-2 transition-colors hover:text-gold">
              <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.5} />
              {hydrated && cartCount > 0 && (
                <span key={cartCount} className={`anim-bump absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold ${transparent ? "bg-white text-jet" : "bg-jet text-white"}`}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {activeNav && (
          <div className="anim-fade-in absolute inset-x-0 top-full hidden border-t border-black/5 bg-white text-jet shadow-2xl lg:block">
            <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-10 px-8 py-10">
              <div className="col-span-3">
                <p className="eyebrow mb-5 text-gold-deep">{activeNav.label}</p>
                <ul className="space-y-3">
                  {activeNav.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group inline-flex items-center gap-2 font-display text-lg font-medium tracking-tight hover:text-gold-deep">
                        {l.label}
                        <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-5">
                <p className="eyebrow mb-5 text-stone">Just Landed</p>
                <div className="grid grid-cols-3 gap-4">
                  {newItems.map((p) => (
                    <Link key={p.id} href={`/products/${p.slug}`} className="group">
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
              <Link href={activeNav.href} className="group relative col-span-4 block h-72 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeNav.image} alt={activeNav.label} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-display text-2xl font-bold uppercase tracking-tight">{activeNav.label}</p>
                  <p className="mt-1 text-sm text-white/80">{activeNav.tagline}</p>
                  <span className="eyebrow mt-4 inline-flex items-center gap-2 text-gold-warm">Shop now <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="anim-fade-in absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="anim-slide-left absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-jet text-white">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <Logo variant="horizontal" tone="light" size={26} />
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="-mr-2 p-2"><X className="h-5 w-5" strokeWidth={1.5} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="divide-y divide-white/10">
                {NAV.map((n) => (
                  <li key={n.key}>
                    <button
                      onClick={() => setMobileSub(mobileSub === n.key ? null : n.key)}
                      className="flex w-full items-center justify-between py-5 font-display text-2xl font-bold uppercase tracking-tight"
                    >
                      {n.label}
                      <ChevronDown className={`h-5 w-5 text-gold transition-transform ${mobileSub === n.key ? "rotate-180" : ""}`} strokeWidth={1.5} />
                    </button>
                    {mobileSub === n.key && (
                      <ul className="anim-fade-in space-y-3 pb-5 pl-1">
                        {n.links.map((l) => (
                          <li key={l.href}><Link href={l.href} onClick={() => setMobileOpen(false)} className="text-sm text-white/75 hover:text-gold-warm">{l.label}</Link></li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li><Link href="/collections/best-sellers" className="block py-5 font-display text-2xl font-bold uppercase tracking-tight">Best Sellers</Link></li>
              </ul>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <Link href="/account" className="flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest"><User className="h-4 w-4" />Account</Link>
                <Link href="/wishlist" className="flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest"><Heart className="h-4 w-4" />Wishlist</Link>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-white/60">
                <li><Link href="/about">Our Story</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/shipping-returns">Shipping &amp; Returns</Link></li>
                <li><Link href="/size-guide">Size Guide</Link></li>
              </ul>
            </div>
            <div className="border-t border-white/10 p-5">
              <p className="eyebrow text-gold">Own your everyday.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
