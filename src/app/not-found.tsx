import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center bg-soft px-5 py-24 text-center text-jet">
      <Logo variant="monogram" size={36} />
      <p className="eyebrow mt-10 text-gold-deep">Error 404</p>
      <h1 className="mt-4 font-display text-5xl font-bold uppercase tracking-[-0.04em] md:text-7xl">Off the rack.</h1>
      <p className="mt-4 max-w-md text-sm text-black/60">The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to the collection.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">Back to Home</Link>
        <Link href="/collections/new-arrivals" className="btn-outline">New Arrivals</Link>
      </div>
    </section>
  );
}
