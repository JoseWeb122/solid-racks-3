import PageHeader from "./PageHeader";

export default function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHeader eyebrow="Legal" crumb={title} title={title}>Placeholder content for the Solid Racks demonstration storefront. Final legal text will be provided before launch.</PageHeader>
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.h}>
              <p className="font-display text-xs text-gold-deep">0{i + 1}</p>
              <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight">{s.h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-black/65">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
