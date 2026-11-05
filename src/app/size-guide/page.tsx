import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SizeTables } from "@/components/SizeGuide";

export const metadata: Metadata = { title: "Size Guide" };

export default function SizeGuidePage() {
  return (
    <>
      <PageHeader eyebrow="Find your fit" crumb="Size Guide" title="Size Guide">
        Most Solid Racks tops are cut oversized. Use the charts below to find your size — or size down for a closer fit.
      </PageHeader>
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_320px]">
        <SizeTables />
        <aside className="h-fit space-y-4">
          {[["Oversized fit", "Hoodies, sweatshirts and tees are designed with a relaxed, boxy shape and dropped shoulders."], ["Bottoms", "Cargos and sweatpants are relaxed through the leg. Choose your usual waist size."], ["Accessories", "Caps are adjustable. Beanies, bags, socks and totes are one size."]].map(([t, d]) => (
            <div key={t} className="border-l-2 border-gold bg-soft p-6">
              <p className="font-display text-sm font-bold uppercase tracking-[0.12em]">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-black/65">{d}</p>
            </div>
          ))}
          <Link href="/contact" className="btn-primary w-full">Ask about fit</Link>
        </aside>
      </div>
    </>
  );
}
