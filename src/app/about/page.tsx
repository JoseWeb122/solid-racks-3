import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { EDITORIAL } from "@/lib/products";

export const metadata: Metadata = { title: "Our Story", description: "Solid Racks — modern streetwear and urban essentials for men and women." };

const PILLARS = [
  { n: "01", t: "Confidence", d: "Pieces with presence. Bold silhouettes that let you walk in and own the room." },
  { n: "02", t: "Individuality", d: "No uniform. Just foundations you style your own way — every day, every fit." },
  { n: "03", t: "Everyday Premium", d: "Considered details and heavyweight feel, made for the life you actually live." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative -mt-0 h-[78vh] min-h-[520px] overflow-hidden bg-jet text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/story.jpg" alt="Solid Racks editorial portrait" className="anim-hero-zoom absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-14 md:justify-center md:px-8 md:pb-0">
          <p className="eyebrow anim-fade-up text-gold">About Solid Racks</p>
          <h1 className="anim-fade-up mt-5 font-display text-5xl font-bold uppercase leading-[0.88] tracking-[-0.04em] md:text-8xl" style={{ animationDelay: "120ms" }}>
            Your style.<br /><span className="gold-text">Your statement.</span>
          </h1>
          <p className="anim-fade-up mt-6 max-w-md text-white/70" style={{ animationDelay: "240ms" }}>Fashion is more than what you put on. It&apos;s how you show up.</p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto grid max-w-[1300px] items-center gap-14 px-5 md:grid-cols-2 md:px-8">
          <Reveal>
            <p className="eyebrow text-gold-deep">Who we are</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] md:text-5xl">Modern streetwear. Built around you.</h2>
            <div className="mt-8 space-y-5 leading-relaxed text-black/70">
              <p>Solid Racks is about embracing your individuality through modern streetwear, everyday essentials, and urban-inspired fashion — for men and women.</p>
              <p>We focus on the pieces you reach for most: oversized hoodies, heavyweight tees, relaxed cargos, structured outerwear and the accessories that finish a look. Clean foundations, bold silhouettes, and small gold details that make them unmistakably ours.</p>
              <p className="font-script text-4xl text-gold-deep">Keep it classic. Make it bold. Make it yours.</p>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={EDITORIAL.about} alt="Model in black hoodie" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-8 -left-4 bg-white p-6 shadow-xl md:-left-10"><Logo variant="stacked" size={44} /></div>
          </Reveal>
        </div>
      </section>

      <section className="bg-soft py-20 text-jet md:py-28">
        <div className="mx-auto max-w-[1300px] px-5 md:px-8">
          <Reveal><p className="eyebrow text-gold-deep">What we stand for</p></Reveal>
          <div className="mt-12 grid gap-px bg-black/10 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} delay={i * 120} className="bg-white p-8 md:p-10">
                <p className="font-display text-sm text-gold-deep">{p.n}</p>
                <h3 className="mt-6 font-display text-3xl font-bold uppercase tracking-tight">{p.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-black/60">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1300px] px-5 md:px-8">
          <Reveal>
            <p className="eyebrow text-gold-deep">The identity</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-[-0.03em] md:text-5xl">SOLID. <span className="font-script font-normal normal-case tracking-normal text-gold-deep">Racks.</span></h2>
            <p className="mt-4 max-w-2xl text-black/65">SOLID — bold, powerful, unmistakable. Racks — elegant, handwritten, expressive. Two sides of one identity, set in black, white and gold.</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="flex aspect-square items-center justify-center bg-white ring-1 ring-black/10"><Logo variant="stacked" size={48} accent="mono" /></div>
            <div className="flex aspect-square items-center justify-center bg-jet"><Logo variant="stacked" tone="light" size={48} accent="mono" /></div>
            <div className="flex aspect-square items-center justify-center bg-jet"><Logo variant="stacked" tone="light" size={48} /></div>
            <div className="flex aspect-square items-center justify-center bg-soft"><Logo variant="stacked" size={48} /></div>
            <div className="col-span-2 flex h-40 items-center justify-center bg-rich"><Logo variant="horizontal" tone="light" size={40} /></div>
            <div className="flex h-40 items-center justify-center bg-white ring-1 ring-black/10"><Logo variant="monogram" size={36} /></div>
            <div className="flex h-40 items-center justify-center bg-jet"><Logo variant="monogram" tone="light" size={36} /></div>
          </div>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <Link href="/collections/men" className="btn-primary">Shop Men <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/collections/women" className="btn-primary">Shop Women <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/collections/accessories" className="btn-outline">Shop Accessories</Link>
          </div>
        </div>
      </section>
    </>
  );
}
