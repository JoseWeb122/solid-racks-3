import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/Newsletter";
import Logo from "@/components/Logo";
import { products, EDITORIAL, getProductById } from "@/lib/products";

const COLLECTION_CARDS = [
  { title: "Men", text: "Everyday essentials with an urban edge.", cta: "Shop Men", href: "/collections/men", image: "/images/col-men.jpg", pos: "center 30%" },
  { title: "Women", text: "Modern silhouettes. Effortless expression.", cta: "Shop Women", href: "/collections/women", image: "/images/col-women.jpg", pos: "center 30%" },
  { title: "Accessories", text: "Finish your look with the right details.", cta: "Shop Accessories", href: "/collections/accessories", image: "/images/col-accessories.jpg", pos: "center" },
  { title: "New Arrivals", text: "Fresh pieces. New energy.", cta: "Explore New Arrivals", href: "/collections/new-arrivals", image: EDITORIAL.newArrivalsCard, pos: "center 30%" },
];

const REVIEWS = [
  { name: "Jordan", product: "p01", rating: 5, text: "The oversized fit is exactly right — heavy, structured and it holds its shape. The gold embroidery is subtle but you notice it." },
  { name: "Aaliyah", product: "p06", rating: 5, text: "Cropped length is perfect with high-waist pants. Feels premium and the cream colour is so clean. Already eyeing the set." },
  { name: "Marcus", product: "p03", rating: 4, text: "Cargos with a proper taper. Comfortable all day and the hardware details make them feel elevated, not basic." },
];

function SectionHeading({ eyebrow, title, sub, align = "left", tone = "dark" }: { eyebrow: string; title: string; sub?: string; align?: "left" | "center"; tone?: "dark" | "light" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className={`eyebrow ${tone === "dark" ? "text-gold-deep" : "text-gold"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] md:text-6xl ${tone === "light" ? "text-white" : ""}`}>{title}</h2>
      {sub && <p className={`mt-4 text-sm md:text-base ${tone === "dark" ? "text-black/60" : "text-white/60"} ${align === "center" ? "mx-auto" : ""} max-w-xl`}>{sub}</p>}
    </div>
  );
}

export default function HomePage() {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 6);
  const newArrivals = products.filter((p) => p.isNew).sort((a, b) => b.added - a.added);

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative -mt-16 h-[100svh] min-h-[640px] overflow-hidden bg-jet text-white md:-mt-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero.jpg" alt="Solid Racks streetwear campaign — models in oversized hoodie and heavyweight tee in concrete architecture" className="anim-hero-zoom absolute inset-0 h-full w-full object-cover object-[78%_center] md:object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30" />
        <div className="grain absolute inset-0" />

        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-24 md:justify-center md:px-8 md:pb-0 md:pt-20">
          <p className="eyebrow anim-fade-up flex items-center gap-3 text-gold-warm" style={{ animationDelay: "200ms" }}>
            <span className="h-px w-10 bg-gold" /> The New Urban Standard
          </p>
          <h1 className="anim-fade-up mt-5 font-display text-[15vw] font-bold uppercase leading-[0.86] tracking-[-0.05em] sm:text-[12vw] md:text-[9vw] xl:text-[8.5rem]" style={{ animationDelay: "350ms" }}>
            Own your
            <br />
            <span className="gold-text">Everyday.</span>
          </h1>
          <p className="anim-fade-up mt-6 max-w-md text-sm leading-relaxed text-white/75 md:text-base" style={{ animationDelay: "550ms" }}>
            Streetwear made for your movement. Discover modern essentials, bold silhouettes, and everyday pieces that define your own style.
          </p>
          <div className="anim-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "700ms" }}>
            <Link href="/collections/men" className="btn-primary btn-light">Shop the Collection <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/collections/new-arrivals" className="btn-outline text-white">Explore New Arrivals</Link>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden origin-bottom-right rotate-90 translate-x-[-1rem] md:block">
          <p className="eyebrow whitespace-nowrap text-white/60">Solid Racks <span className="text-gold">—</span> Est. Your Style.</p>
        </div>
        <p className="eyebrow absolute bottom-7 left-5 text-[9px] text-white/50 md:hidden">Solid Racks <span className="text-gold">—</span> Est. Your Style.</p>

        <a href="#intro" aria-label="Scroll to content" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="eyebrow text-[9px] text-white/60">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/20"><span className="scroll-dot absolute left-0 top-0 h-3 w-px bg-gold" /></span>
        </a>
      </section>

      {/* ───────── BRAND INTRO ───────── */}
      <section id="intro" className="bg-white py-20 md:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:gap-20 md:px-8">
          <Reveal className="relative order-2 md:order-1">
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/intro.jpg" alt="Model in oversized cream hoodie against raw concrete" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -right-2 bg-jet px-6 py-5 md:-right-10">
              <Logo variant="stacked" tone="light" size={34} />
            </div>
          </Reveal>
          <Reveal className="order-1 md:order-2" delay={150}>
            <p className="eyebrow text-gold-deep">Welcome to Solid Racks</p>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] md:text-6xl">
              More than a look.
              <br />
              <span className="font-script text-6xl font-normal normal-case tracking-normal text-gold-deep md:text-8xl">It&apos;s your expression.</span>
            </h2>
            <div className="mt-8 h-px w-16 bg-gold" />
            <p className="mt-8 max-w-lg text-base leading-relaxed text-black/65">
              Built around modern urban fashion, Solid Racks brings together everyday streetwear and contemporary essentials for men and women. Find your fit, express your style, and make every look your own.
            </p>
            <Link href="/collections/new-arrivals" className="btn-primary mt-10">Discover Our Collection <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── SHOP BY COLLECTION ───────── */}
      <section className="bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Shop by Collection" title="Find your fit." sub="Different expressions. One solid identity." />
            <Link href="/collections/best-sellers" className="link-underline self-start font-display text-xs font-semibold uppercase tracking-[0.22em] md:self-auto">View best sellers</Link>
          </Reveal>
          <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
            {COLLECTION_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 100} className="w-[78%] shrink-0 snap-start md:w-auto">
                <Link href={c.href} className="group relative block aspect-[3/4.3] overflow-hidden bg-jet">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={`${c.title} collection`} loading="lazy" className="h-full w-full object-cover opacity-90 transition-all duration-[1400ms] ease-out group-hover:scale-110 group-hover:opacity-100" style={{ objectPosition: c.pos }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-700 group-hover:from-black/90" />
                  <div className="absolute inset-0 border border-gold/0 transition-all duration-700 group-hover:inset-3 group-hover:border-gold/60" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-7">
                    <p className="eyebrow text-[9px] text-gold-warm">0{i + 1}</p>
                    <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-[-0.03em] md:text-4xl">{c.title}</h3>
                    <p className="mt-2 text-sm text-white/75">{c.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 border-b border-gold pb-1 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors group-hover:text-gold-warm">
                      {c.cta} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── BEST SELLERS ───────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8">
          <Reveal className="flex flex-col items-center text-center">
            <Logo variant="monogram" size={18} />
            <div className="mt-6"><SectionHeading eyebrow="Best Sellers" title="The Solid Selection" sub="The pieces everyone reaches for — signature fits, everyday staples, and the details that finish the look." align="center" /></div>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14">
            {bestSellers.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 100}><ProductCard product={p} /></Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href="/collections/best-sellers" className="btn-primary">Shop All Best Sellers <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* ───────── BRAND STORY ───────── */}
      <section className="relative overflow-hidden bg-soft text-jet">
        <div className="grid min-h-[80vh] md:grid-cols-2">
          <div className="relative order-2 flex items-center px-5 py-20 md:order-1 md:px-16 lg:px-24">
            <Reveal>
              <p className="eyebrow text-gold-deep">The Solid Racks Story</p>
              <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-[-0.04em] md:text-7xl">
                Your style.
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #A9823D" }}>Your statement.</span>
              </h2>
              <div className="mt-10 space-y-5 text-base leading-relaxed text-black/65">
                <p className="font-display text-xl text-jet">Fashion is more than what you put on. It&apos;s how you show up.</p>
                <p>Solid Racks is about embracing your individuality through modern streetwear, everyday essentials, and urban-inspired fashion.</p>
                <p className="font-script text-4xl text-gold-deep">Keep it classic. Make it bold. Make it yours.</p>
              </div>
              <Link href="/about" className="btn-primary mt-10">Explore Solid Racks <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>
          <div className="relative order-1 min-h-[60vh] md:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/story.jpg" alt="Black and white portrait in oversized black hoodie with gold chain" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
          </div>
        </div>
      </section>

      {/* ───────── NEW ARRIVALS RAIL ───────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Just Landed" title="New Arrivals" sub="Fresh pieces. New energy." />
            <Link href="/collections/new-arrivals" className="link-underline self-start font-display text-xs font-semibold uppercase tracking-[0.22em] md:self-auto">Shop all new</Link>
          </Reveal>
          <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:-mx-8 md:gap-6 md:px-8">
            {newArrivals.map((p) => (
              <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[32%] lg:w-[23%]"><ProductCard product={p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CAMPAIGN ───────── */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden bg-jet text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/campaign.jpg" alt="Black and white street campaign — models in oversized streetwear at night" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="grain absolute inset-0" />
        <div className="absolute inset-6 border border-gold/30 md:inset-10" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <p className="eyebrow text-gold">The Latest Drop</p>
            <h2 className="mt-6 font-display text-[13vw] font-bold uppercase leading-[0.85] tracking-[-0.05em] md:text-[8vw] xl:text-[8rem]">
              Not made
              <br />
              to blend in.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm text-white/75 md:text-base">Discover the pieces that bring your everyday style to life.</p>
            <Link href="/collections/new-arrivals" className="btn-primary btn-light mt-10">Shop the Latest Drop <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── REVIEWS ───────── */}
      <section className="bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <Reveal><SectionHeading eyebrow="Reviews" title="The Solid Racks Experience" align="center" /></Reveal>
          <p className="mt-3 text-center text-xs text-stone">Illustrative sample reviews for demonstration purposes.</p>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r, i) => {
              const p = getProductById(r.product)!;
              return (
                <Reveal key={r.name} delay={i * 120}>
                  <figure className="flex h-full flex-col bg-white p-8 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] md:p-10">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`h-4 w-4 ${s < r.rating ? "fill-gold text-gold" : "text-black/15"}`} />
                      ))}
                    </div>
                    <blockquote className="mt-6 flex-1 font-display text-lg leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
                    <figcaption className="mt-8 flex items-center gap-4 border-t border-black/10 pt-6">
                      <Link href={`/products/${p.slug}`} className="h-14 w-11 shrink-0 overflow-hidden bg-soft">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.images[2]} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                      </Link>
                      <div>
                        <p className="font-display text-sm font-semibold">{r.name}</p>
                        <Link href={`/products/${p.slug}`} className="text-xs text-stone hover:text-gold-deep">{p.name}</Link>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── NEWSLETTER ───────── */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <Logo variant="stacked" size={40} />
            <h2 className="mt-10 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] md:text-6xl">Get in on the next drop.</h2>
            <p className="mx-auto mt-5 max-w-lg text-sm text-black/60 md:text-base">Be first to discover new arrivals, exclusive collections, and the latest from Solid Racks.</p>
            <div className="mx-auto mt-10 max-w-xl text-left"><NewsletterForm /></div>
            <p className="mt-4 text-[11px] text-stone">Demo signup — your email stays in this browser and nothing is sent.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
