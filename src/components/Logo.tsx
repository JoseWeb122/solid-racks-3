import type { CSSProperties } from "react";

type Variant = "stacked" | "horizontal" | "monogram";
type Tone = "dark" | "light";
type Accent = "gold" | "mono";

interface LogoProps {
  variant?: Variant;
  tone?: Tone;
  accent?: Accent;
  /** base font size in px (controls the whole mark proportionally) */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * SOLID Racks wordmark.
 * SOLID — Space Grotesk 700, tight architectural tracking.
 * Racks — Allura script, set on a slight upward angle, tucked under the lower-right of SOLID.
 */
export default function Logo({ variant = "horizontal", tone = "dark", accent = "gold", size = 28, className = "", style }: LogoProps) {
  const solidColor = tone === "dark" ? "#080808" : "#FFFFFF";
  const racksColor = accent === "gold" ? (tone === "dark" ? "#A9823D" : "#C6A15B") : solidColor;

  if (variant === "monogram") {
    return (
      <span
        aria-label="Solid Racks monogram"
        role="img"
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width: size * 1.9, height: size * 1.9, fontSize: size, ...style }}
      >
        <span className="absolute inset-0 rounded-full" style={{ border: `1px solid ${racksColor}` }} />
        <span className="absolute rounded-full" style={{ inset: size * 0.12, border: `1px solid ${racksColor}`, opacity: 0.35 }} />
        <span className="font-display font-bold leading-none" style={{ color: solidColor, fontSize: "1em", letterSpacing: "-0.04em", transform: "translate(-0.14em,-0.06em)" }}>
          S
        </span>
        <span className="font-script absolute leading-none" style={{ color: racksColor, fontSize: "1.25em", transform: "translate(0.28em,0.2em) rotate(-8deg)" }}>
          R
        </span>
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <span
        aria-label="Solid Racks"
        role="img"
        className={`relative inline-block select-none leading-none ${className}`}
        style={{ fontSize: size, paddingBottom: "0.62em", paddingRight: "0.28em", ...style }}
      >
        <span className="font-display block font-bold uppercase" style={{ color: solidColor, letterSpacing: "-0.035em", lineHeight: 0.86 }}>
          SOLID
        </span>
        <span className="absolute block" style={{ left: "0.04em", bottom: "0.42em", width: "1.55em", height: "1px", background: racksColor, opacity: 0.8 }} />
        <span
          className="font-script absolute block whitespace-nowrap"
          style={{ color: racksColor, fontSize: "0.98em", right: "-0.02em", bottom: "-0.02em", transform: "rotate(-7deg)", lineHeight: 1, textShadow: tone === "light" ? "0 1px 12px rgba(0,0,0,0.25)" : undefined }}
        >
          Racks
        </span>
      </span>
    );
  }

  return (
    <span
      aria-label="Solid Racks"
      role="img"
      className={`relative inline-flex select-none items-baseline leading-none ${className}`}
      style={{ fontSize: size, ...style }}
    >
      <span className="font-display font-bold uppercase" style={{ color: solidColor, letterSpacing: "-0.035em" }}>
        SOLID
      </span>
      <span
        className="font-script whitespace-nowrap"
        style={{ color: racksColor, fontSize: "1.18em", marginLeft: "-0.06em", transform: "translateY(0.2em) rotate(-6deg)", display: "inline-block", lineHeight: 0.8 }}
      >
        Racks
      </span>
    </span>
  );
}
