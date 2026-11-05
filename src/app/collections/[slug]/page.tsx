import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CollectionView from "@/components/CollectionView";
import { collections, getCollection, products } from "@/lib/products";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  return { title: c ? c.title : "Collection", description: c?.description };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();
  const count = products.filter(c.filter).length;

  return (
    <>
      <section className="relative h-[52vh] min-h-[380px] overflow-hidden bg-jet text-white md:h-[62vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.image} alt={`${c.title} collection`} className="anim-hero-zoom absolute inset-0 h-full w-full object-cover" style={{ objectPosition: c.position }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-10 md:px-8 md:pb-14">
          <nav aria-label="Breadcrumb" className="mb-6 text-[11px] uppercase tracking-[0.2em] text-white/60">
            <Link href="/" className="hover:text-white">Home</Link> <span className="mx-2 text-gold">/</span> <span className="text-white">{c.title}</span>
          </nav>
          <p className="eyebrow anim-fade-up text-gold-warm">{c.eyebrow}</p>
          <h1 className="anim-fade-up mt-3 font-display text-5xl font-bold uppercase leading-[0.88] tracking-[-0.04em] md:text-8xl" style={{ animationDelay: "120ms" }}>{c.title}</h1>
          <div className="anim-fade-up mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between" style={{ animationDelay: "240ms" }}>
            <div className="max-w-xl">
              <p className="font-display text-lg md:text-xl">{c.headline}</p>
              <p className="mt-2 text-sm text-white/70">{c.description}</p>
            </div>
            <p className="eyebrow text-white/70"><span className="text-gold-warm">{count}</span> Pieces</p>
          </div>
        </div>
      </section>
      <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-black/10 px-4 py-3 md:justify-center md:px-8">
        {collections.map((x) => (
          <Link key={x.slug} href={`/collections/${x.slug}`} className={`shrink-0 px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${x.slug === c.slug ? "bg-jet text-white" : "text-black/60 hover:text-jet"}`}>
            {x.title}
          </Link>
        ))}
      </div>
      <Suspense fallback={<div className="h-96" />}>
        <CollectionView slug={c.slug} />
      </Suspense>
    </>
  );
}
