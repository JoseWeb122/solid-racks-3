"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Check } from "lucide-react";
import ProductCard from "./ProductCard";
import { products, getCollection, CATEGORY_LABEL, type Category, type Product } from "@/lib/products";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "best";
const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "best", label: "Best Selling" },
];
const PRICES = [
  { key: "u30", label: "Under $30", test: (p: number) => p < 30 },
  { key: "30-60", label: "$30 – $60", test: (p: number) => p >= 30 && p < 60 },
  { key: "60-90", label: "$60 – $90", test: (p: number) => p >= 60 && p < 90 },
  { key: "90", label: "$90 & above", test: (p: number) => p >= 90 },
];
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];

interface Filters {
  dept: string[];
  type: string[];
  price: string[];
  size: string[];
  color: string[];
  avail: string[];
}
const EMPTY: Filters = { dept: [], type: [], price: [], size: [], color: [], avail: [] };

function toggle(arr: string[], v: string) {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

function Group({ title, children, defaultOpen = true }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/10 py-5">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between font-display text-[11px] font-semibold uppercase tracking-[0.22em]">
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={1.5} />
      </button>
      {open && <div className="anim-fade-in mt-4">{children}</div>}
    </div>
  );
}

function CheckRow({ label, checked, onChange, count }: { label: string; checked: boolean; onChange: () => void; count?: number }) {
  return (
    <button onClick={onChange} className="group flex w-full items-center gap-3 py-1.5 text-left text-sm">
      <span className={`flex h-4 w-4 items-center justify-center border transition-colors ${checked ? "border-jet bg-jet" : "border-black/30 group-hover:border-jet"}`}>
        {checked && <Check className="h-3 w-3 text-gold-warm" strokeWidth={3} />}
      </span>
      <span className={checked ? "font-medium" : "text-black/75"}>{label}</span>
      {count !== undefined && <span className="ml-auto text-xs text-stone">{count}</span>}
    </button>
  );
}

export default function CollectionView({ slug }: { slug: string }) {
  const params = useSearchParams();
  const type = params.get("type");
  const dept = params.get("category");
  return <CollectionInner key={`${slug}-${type}-${dept}`} slug={slug} initialType={type} initialDept={dept} />;
}

function CollectionInner({ slug, initialType, initialDept }: { slug: string; initialType: string | null; initialDept: string | null }) {
  const config = getCollection(slug)!;
  const base = useMemo(() => products.filter(config.filter), [config]);

  const [filters, setFilters] = useState<Filters>(() => ({
    ...EMPTY,
    type: initialType ? [initialType] : [],
    dept: initialDept ? [initialDept] : [],
  }));
  const [sort, setSort] = useState<SortKey>("featured");
  const [drawer, setDrawer] = useState(false);

  const mixed = new Set(base.map((p) => p.category)).size > 1;
  const types = [...new Set(base.map((p) => p.type))];
  const sizes = SIZE_ORDER.filter((s) => base.some((p) => p.sizes.includes(s)));
  const colors = [...new Map(base.flatMap((p) => p.colors).map((c) => [c.name, c])).values()];

  const result = useMemo(() => {
    const match = (p: Product) =>
      (!filters.dept.length || filters.dept.includes(p.category)) &&
      (!filters.type.length || filters.type.includes(p.type)) &&
      (!filters.price.length || PRICES.some((r) => filters.price.includes(r.key) && r.test(p.price))) &&
      (!filters.size.length || p.sizes.some((s) => filters.size.includes(s))) &&
      (!filters.color.length || p.colors.some((c) => filters.color.includes(c.name))) &&
      (!filters.avail.length || filters.avail.includes(p.availability));
    const list = base.filter(match);
    const sorted = [...list];
    switch (sort) {
      case "newest": sorted.sort((a, b) => b.added - a.added); break;
      case "price-asc": sorted.sort((a, b) => a.price - b.price); break;
      case "price-desc": sorted.sort((a, b) => b.price - a.price); break;
      case "best": sorted.sort((a, b) => a.sales - b.sales); break;
      default: sorted.sort((a, b) => a.featured - b.featured || a.sales - b.sales);
    }
    return sorted;
  }, [base, filters, sort]);

  const activeCount = Object.values(filters).reduce((n, a) => n + a.length, 0);
  const clear = () => setFilters(EMPTY);
  const set = (k: keyof Filters, v: string) => setFilters((f) => ({ ...f, [k]: toggle(f[k], v) }));

  const chips: { k: keyof Filters; v: string; label: string }[] = [
    ...filters.dept.map((v) => ({ k: "dept" as const, v, label: CATEGORY_LABEL[v as Category] ?? v })),
    ...filters.type.map((v) => ({ k: "type" as const, v, label: v })),
    ...filters.price.map((v) => ({ k: "price" as const, v, label: PRICES.find((p) => p.key === v)?.label ?? v })),
    ...filters.size.map((v) => ({ k: "size" as const, v, label: `Size ${v}` })),
    ...filters.color.map((v) => ({ k: "color" as const, v, label: v })),
    ...filters.avail.map((v) => ({ k: "avail" as const, v, label: v === "in-stock" ? "In stock" : "Few left" })),
  ];

  const panel = (
    <div>
      {mixed && (
        <Group title="Department">
          {(["men", "women", "accessories"] as Category[]).filter((c) => base.some((p) => p.category === c)).map((c) => (
            <CheckRow key={c} label={CATEGORY_LABEL[c]} checked={filters.dept.includes(c)} onChange={() => set("dept", c)} count={base.filter((p) => p.category === c).length} />
          ))}
        </Group>
      )}
      <Group title="Category">
        {types.map((t) => <CheckRow key={t} label={t} checked={filters.type.includes(t)} onChange={() => set("type", t)} count={base.filter((p) => p.type === t).length} />)}
      </Group>
      <Group title="Price">
        {PRICES.filter((r) => base.some((p) => r.test(p.price))).map((r) => (
          <CheckRow key={r.key} label={r.label} checked={filters.price.includes(r.key)} onChange={() => set("price", r.key)} count={base.filter((p) => r.test(p.price)).length} />
        ))}
      </Group>
      <Group title="Size">
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((s) => (
            <button key={s} onClick={() => set("size", s)} className={`h-10 border text-xs font-medium transition-colors ${s === "One Size" ? "col-span-2" : ""} ${filters.size.includes(s) ? "border-jet bg-jet text-white" : "border-black/15 hover:border-jet"}`}>
              {s}
            </button>
          ))}
        </div>
      </Group>
      <Group title="Color">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
          {colors.map((c) => {
            const on = filters.color.includes(c.name);
            return (
              <button key={c.name} onClick={() => set("color", c.name)} className="flex items-center gap-2.5 text-left text-sm">
                <span className={`h-5 w-5 shrink-0 rounded-full border border-black/15 ${on ? "ring-2 ring-gold ring-offset-2" : ""}`} style={{ background: c.hex }} />
                <span className={on ? "font-medium" : "text-black/75"}>{c.name}</span>
              </button>
            );
          })}
        </div>
      </Group>
      <Group title="Availability">
        <CheckRow label="In stock" checked={filters.avail.includes("in-stock")} onChange={() => set("avail", "in-stock")} count={base.filter((p) => p.availability === "in-stock").length} />
        <CheckRow label="Few left" checked={filters.avail.includes("low-stock")} onChange={() => set("avail", "low-stock")} count={base.filter((p) => p.availability === "low-stock").length} />
      </Group>
      {activeCount > 0 && (
        <button onClick={clear} className="mt-6 w-full border border-black/15 py-3 text-xs font-semibold uppercase tracking-widest hover:border-jet">Clear all filters ({activeCount})</button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-24 md:px-8">
      {/* Toolbar */}
      <div className="sticky top-16 z-30 -mx-4 flex items-center justify-between gap-3 border-b border-black/10 bg-white/95 px-4 py-3 backdrop-blur md:top-20 md:-mx-8 md:px-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setDrawer(true)} className="flex items-center gap-2 border border-black/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] lg:hidden">
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} /> Filter{activeCount ? ` (${activeCount})` : ""}
          </button>
          <p className="text-xs text-stone"><span className="font-semibold text-jet">{result.length}</span> {result.length === 1 ? "product" : "products"}</p>
        </div>
        <label className="relative flex items-center gap-2">
          <span className="hidden text-[11px] uppercase tracking-[0.18em] text-stone sm:inline">Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="cursor-pointer appearance-none border border-black/15 bg-white py-2.5 pl-3 pr-9 text-xs font-medium outline-none focus:border-jet" aria-label="Sort products">
            {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5" />
        </label>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-40">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-bold uppercase tracking-[0.18em]">Filters</p>
              {activeCount > 0 && <button onClick={clear} className="text-xs text-stone underline underline-offset-4 hover:text-jet">Clear all</button>}
            </div>
            {panel}
          </div>
        </aside>

        <div>
          {chips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {chips.map((c) => (
                <button key={`${c.k}-${c.v}`} onClick={() => set(c.k, c.v)} className="inline-flex items-center gap-1.5 bg-soft px-3 py-1.5 text-xs hover:bg-black/10">
                  {c.label} <X className="h-3 w-3" />
                </button>
              ))}
              <button onClick={clear} className="ml-1 text-xs font-semibold uppercase tracking-widest text-gold-deep hover:text-jet">Clear filters</button>
            </div>
          )}
          {result.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-black/15 px-6 py-24 text-center">
              <p className="font-display text-2xl font-bold uppercase">No matches found</p>
              <p className="mt-2 max-w-sm text-sm text-stone">No products match the selected filters. Try removing a few to see more of the collection.</p>
              <button onClick={clear} className="btn-primary mt-8">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14">
              {result.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 3} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="anim-fade-in absolute inset-0 bg-black/55" onClick={() => setDrawer(false)} />
          <div className="anim-slide-left absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-white">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <p className="font-display text-base font-bold uppercase tracking-[0.12em]">Filters</p>
              <button aria-label="Close filters" onClick={() => setDrawer(false)} className="-mr-2 p-2"><X className="h-5 w-5" strokeWidth={1.5} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">{panel}</div>
            <div className="grid grid-cols-2 gap-3 border-t border-black/10 p-4">
              <button onClick={clear} className="btn-outline !px-2">Clear</button>
              <button onClick={() => setDrawer(false)} className="btn-primary !px-2">Show {result.length}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
