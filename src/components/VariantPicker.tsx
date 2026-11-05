"use client";

import { Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";

interface Props {
  product: Product;
  color: string | null;
  size: string | null;
  onColor: (c: string) => void;
  onSize: (s: string) => void;
  errors?: { color?: boolean; size?: boolean };
}

export default function VariantPicker({ product, color, size, onColor, onSize, errors }: Props) {
  const { setSizeGuideOpen } = useStore();
  const oneSize = product.sizes.length === 1;
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="label !mb-0">Color{color && <span className="ml-2 font-normal normal-case tracking-normal text-stone">— {color}</span>}</p>
          {errors?.color && <p className="text-xs text-[#b4402c]">Please select a color</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((c) => {
            const active = color === c.name;
            return (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                aria-pressed={active}
                onClick={() => onColor(c.name)}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-all ${active ? "ring-2 ring-gold ring-offset-2" : "ring-1 ring-black/15 hover:ring-black/40"}`}
              >
                <span className="h-9 w-9 rounded-full border border-black/10" style={{ background: c.hex }} />
                {active && <Check className={`absolute h-4 w-4 ${["White", "Cream", "Natural", "Stone", "Sand"].includes(c.name) ? "text-jet" : "text-white"}`} strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="label !mb-0">Size{size && <span className="ml-2 font-normal normal-case tracking-normal text-stone">— {size}</span>}</p>
          {errors?.size ? (
            <p className="text-xs text-[#b4402c]">Please select a size</p>
          ) : !oneSize ? (
            <button type="button" onClick={() => setSizeGuideOpen(true)} className="link-underline text-xs font-medium underline-offset-4">Size Guide</button>
          ) : null}
        </div>
        <div className={`grid gap-2 ${oneSize ? "grid-cols-1" : "grid-cols-5"}`}>
          {product.sizes.map((s) => {
            const active = size === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={() => onSize(s)}
                className={`h-12 border font-display text-sm font-medium transition-all ${active ? "border-jet bg-jet text-white shadow-[inset_0_-2px_0_#C6A15B]" : errors?.size ? "border-[#b4402c]/50 hover:border-jet" : "border-black/15 hover:border-jet"}`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
