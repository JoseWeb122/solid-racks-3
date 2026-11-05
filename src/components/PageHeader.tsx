import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHeader({ eyebrow, title, children, crumb }: { eyebrow: string; title: ReactNode; children?: ReactNode; crumb?: string }) {
  return (
    <section className="relative overflow-hidden bg-soft text-jet">
      <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-script text-[16rem] leading-none text-gold/[0.12] md:text-[22rem]">Racks</div>
      <div className="relative mx-auto max-w-[1600px] px-5 py-16 md:px-8 md:py-24">
        <nav aria-label="Breadcrumb" className="mb-6 text-[11px] uppercase tracking-[0.2em] text-black/50">
          <Link href="/" className="hover:text-jet">Home</Link><span className="mx-2 text-gold">/</span><span className="text-black/80">{crumb ?? eyebrow}</span>
        </nav>
        <p className="eyebrow anim-fade-up text-gold-deep">{eyebrow}</p>
        <h1 className="anim-fade-up mt-3 font-display text-4xl font-bold uppercase leading-[0.9] tracking-[-0.04em] md:text-7xl" style={{ animationDelay: "100ms" }}>{title}</h1>
        {children && <div className="anim-fade-up mt-5 max-w-2xl text-sm text-black/60 md:text-base" style={{ animationDelay: "200ms" }}>{children}</div>}
      </div>
      <div className="gold-line h-px w-full opacity-70" />
    </section>
  );
}
