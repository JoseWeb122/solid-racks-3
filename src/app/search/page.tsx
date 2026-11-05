"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";
import { searchProducts, collections, products } from "@/lib/products";

function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const [value, setValue] = useState(q);
  const results = searchProducts(q);

  return (
    <>
      <PageHeader eyebrow="Search" title={q ? <>Results for <span className="text-gold-deep">“{q}”</span></> : "Search the store"}>
        {q ? `${results.length} ${results.length === 1 ? "product" : "products"} found.` : "Search by product name, category, colour or keyword."}
      </PageHeader>
      <div className="mx-auto max-w-[1600px] px-4 py-12 md:px-8">
        <form onSubmit={(e) => { e.preventDefault(); const v = String(new FormData(e.currentTarget).get("q") ?? value); router.push(`/search?q=${encodeURIComponent(v.trim())}`); }} className="mx-auto mb-14 flex max-w-2xl items-center gap-3 border-b-2 border-jet pb-3">
          <Search className="h-5 w-5" strokeWidth={1.5} />
          <input name="q" key={q} defaultValue={q} onChange={(e) => setValue(e.target.value)} placeholder="Search hoodies, cargos, bags..." className="flex-1 bg-transparent font-display text-xl outline-none placeholder:text-black/30" aria-label="Search products" />
          <button className="eyebrow hover:text-gold-deep">Search</button>
        </form>
        {q && results.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center">
            {q && (
              <>
                <p className="font-display text-2xl font-bold uppercase">No results for “{q}”</p>
                <p className="mt-2 text-sm text-stone">Check the spelling or try a broader term.</p>
              </>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {collections.map((c) => (
                <Link key={c.slug} href={`/collections/${c.slug}`} className="border border-black/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest hover:border-gold hover:text-gold-deep">{c.title}</Link>
              ))}
            </div>
            <p className="eyebrow mb-8 mt-16 text-stone">You might like</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 text-left md:grid-cols-4 md:gap-x-6">
              {products.filter((p) => p.isBestSeller).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="h-96" />}>
      <SearchResults />
    </Suspense>
  );
}
