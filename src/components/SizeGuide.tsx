"use client";

import { useState } from "react";
import { X, Ruler } from "lucide-react";
import { useStore } from "@/lib/store";
import Logo from "./Logo";

const MEN = {
  head: ["Size", "Chest (in)", "Waist (in)", "Hip (in)", "Length (in)"],
  rows: [["S", "36–38", "29–31", "36–38", "27"], ["M", "38–40", "31–33", "38–40", "28"], ["L", "40–43", "33–36", "40–43", "29"], ["XL", "43–46", "36–39", "43–46", "30"], ["XXL", "46–49", "39–42", "46–49", "31"]],
};
const WOMEN = {
  head: ["Size", "US", "Bust (in)", "Waist (in)", "Hip (in)"],
  rows: [["XS", "0–2", "31–32", "24–25", "34–35"], ["S", "4–6", "33–34", "26–27", "36–37"], ["M", "8–10", "35–36", "28–29", "38–39"], ["L", "12–14", "37–39", "30–32", "40–42"], ["XL", "16", "40–42", "33–35", "43–45"]],
};

export function SizeTables() {
  const [tab, setTab] = useState<"men" | "women">("men");
  const t = tab === "men" ? MEN : WOMEN;
  return (
    <div>
      <div className="mb-6 inline-flex border border-black/15 p-1">
        {(["men", "women"] as const).map((k) => (
          <button key={k} onClick={() => setTab(k)} className={`px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${tab === k ? "bg-jet text-white" : "hover:text-gold-deep"}`}>
            {k === "men" ? "Men" : "Women"}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[440px] text-left text-sm">
          <thead>
            <tr className="border-b-2 border-jet">
              {t.head.map((h) => <th key={h} className="py-3 pr-4 font-display text-[11px] font-semibold uppercase tracking-[0.18em]">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r) => (
              <tr key={r[0]} className="border-b border-black/10 hover:bg-soft">
                {r.map((c, i) => <td key={i} className={`py-3.5 pr-4 tabular-nums ${i === 0 ? "font-display font-bold" : "text-black/70"}`}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[["Chest / Bust", "Measure around the fullest part, keeping the tape level."], ["Waist", "Measure around your natural waistline, keeping the tape comfortably loose."], ["Hip", "Stand with feet together and measure around the fullest part of your hips."]].map(([h, d]) => (
          <div key={h} className="border-l-2 border-gold bg-soft p-4">
            <p className="font-display text-sm font-semibold">{h}</p>
            <p className="mt-1 text-xs leading-relaxed text-black/60">{d}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-stone">Measurements are illustrative for this demonstration store. Most Solid Racks tops are cut oversized — size down for a closer fit. Accessories are one size.</p>
    </div>
  );
}

export default function SizeGuideModal() {
  const { sizeGuideOpen, setSizeGuideOpen } = useStore();
  if (!sizeGuideOpen) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-label="Size guide">
      <div className="anim-fade-in absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={() => setSizeGuideOpen(false)} />
      <div className="anim-scale-in relative max-h-[90dvh] w-full max-w-2xl overflow-y-auto bg-white p-6 md:p-10">
        <button aria-label="Close size guide" onClick={() => setSizeGuideOpen(false)} className="absolute right-4 top-4 p-2 hover:text-gold-deep"><X className="h-5 w-5" strokeWidth={1.5} /></button>
        <div className="flex items-center gap-4">
          <Logo variant="monogram" size={20} />
          <div>
            <p className="eyebrow flex items-center gap-2 text-gold-deep"><Ruler className="h-3.5 w-3.5" />Find your fit</p>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Size Guide</h2>
          </div>
        </div>
        <div className="mt-8"><SizeTables /></div>
      </div>
    </div>
  );
}
