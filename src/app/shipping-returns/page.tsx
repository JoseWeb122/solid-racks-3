import Link from "next/link";
import type { Metadata } from "next";
import { Truck, Zap, RotateCcw, PackageCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Shipping & Returns" };

export default function ShippingPage() {
  return (
    <>
      <PageHeader eyebrow="Customer Care" crumb="Shipping & Returns" title="Shipping & Returns">
        Illustrative policies for this demonstration store. Final terms will be confirmed when Solid Racks launches online.
      </PageHeader>
      <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
        <section id="shipping" className="scroll-mt-28">
          <p className="eyebrow text-gold-deep">Shipping</p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">Delivery options</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[[Truck, "Standard", "3–5 business days", "$8 · Free on orders over $150"], [Zap, "Express", "1–2 business days", "$18 flat rate"]].map(([I, t, d, p]) => {
              const Icon = I as typeof Truck;
              return (
                <div key={t as string} className="border border-black/10 p-8">
                  <Icon className="h-6 w-6 text-gold-deep" strokeWidth={1.4} />
                  <p className="mt-6 font-display text-xl font-bold uppercase">{t as string}</p>
                  <p className="mt-1 text-sm text-black/65">{d as string}</p>
                  <p className="mt-4 font-display text-sm font-semibold">{p as string}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-black/65">Orders are typically processed within 1–2 business days. You&apos;ll receive tracking details once your order ships (not applicable to demo orders).</p>
        </section>

        <section id="returns" className="mt-20 scroll-mt-28">
          <p className="eyebrow text-gold-deep">Returns</p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">30-day returns</h2>
          <div className="mt-8 grid gap-px bg-black/10 md:grid-cols-3">
            {[["01", "Request", "Start a return within 30 days of delivery from your account or by contacting us."], ["02", "Pack", "Items must be unworn, unwashed and with original tags attached."], ["03", "Refund", "Refunds are issued to the original payment method once your return is inspected."]].map(([n, t, d]) => (
              <div key={n} className="bg-white p-8">
                <p className="font-display text-sm text-gold-deep">{n}</p>
                <p className="mt-4 font-display text-xl font-bold uppercase">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/65">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-4 bg-soft p-6">
            <RotateCcw className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
            <p className="text-sm text-black/70">Exchanges for a different size or colour are welcome, subject to availability. Final sale items cannot be returned.</p>
          </div>
          <div className="mt-4 flex items-start gap-4 bg-soft p-6">
            <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
            <p className="text-sm text-black/70">Need help? Visit our <Link href="/faq" className="underline underline-offset-4">FAQ</Link> or <Link href="/contact" className="underline underline-offset-4">contact the team</Link>.</p>
          </div>
        </section>
      </div>
    </>
  );
}
