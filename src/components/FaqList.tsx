"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q}>
            <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-6 py-6 text-left">
              <span className="font-display text-base font-semibold md:text-lg">{it.q}</span>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${on ? "rotate-45 border-gold bg-gold text-jet" : "border-black/20"}`}>
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div className={`grid transition-all duration-300 ${on ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <p className="overflow-hidden pr-12 text-sm leading-relaxed text-black/65">{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
