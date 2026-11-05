"use client";

import { Check, X } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Toaster() {
  const { toasts, dismissToast } = useStore();
  return (
    <div className="pointer-events-none fixed inset-x-3 bottom-3 z-[100] flex flex-col items-end gap-3 sm:inset-x-auto sm:right-6 sm:bottom-6" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="anim-scale-in pointer-events-auto flex w-full items-center gap-4 border-l-2 border-gold bg-jet p-3 pr-4 text-white shadow-2xl sm:w-96">
          {t.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.image} alt="" className="h-16 w-12 shrink-0 object-cover" />
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-jet"><Check className="h-5 w-5" /></span>
          )}
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-gold-warm"><Check className="h-3.5 w-3.5" />{t.title}</p>
            {t.message && <p className="mt-1 truncate text-sm text-white/85">{t.message}</p>}
            {t.action && (
              <button onClick={() => { t.action!.onClick(); dismissToast(t.id); }} className="mt-1 text-xs font-semibold uppercase tracking-widest text-white underline underline-offset-4 hover:text-gold-warm">
                {t.action.label}
              </button>
            )}
          </div>
          <button aria-label="Dismiss" onClick={() => dismissToast(t.id)} className="self-start p-1 text-white/50 hover:text-white"><X className="h-4 w-4" /></button>
        </div>
      ))}
    </div>
  );
}
