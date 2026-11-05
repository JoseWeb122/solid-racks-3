import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk.">
        Questions about an order, sizing, or the next drop? Send us a message and the Solid Racks team will get back to you.
      </PageHeader>
      <div className="bg-soft">
        <div className="mx-auto grid max-w-[1300px] gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow text-gold-deep">Get in touch</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight md:text-4xl">We&apos;re here to help.</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-black/65">Use the form to reach out. Before you do, you might find a quick answer in our help pages.</p>
            <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
              {[["Frequently Asked Questions", "/faq"], ["Shipping & Returns", "/shipping-returns"], ["Size Guide", "/size-guide"], ["Your Account", "/account"]].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="group flex items-center justify-between py-5 font-display text-sm font-semibold uppercase tracking-[0.12em] hover:text-gold-deep">
                    {l}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
