"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "./lang";
import { COORD_ENTITIES } from "./content";

/**
 * SECTION 10 — COORDINATION SCALE (the thesis made visible)
 * How many minds can be turned into one legitimate decision under each system,
 * on a LOG scale — band consensus (150) → networked & planetary (8 billion).
 */

// log range: 150 .. 8e9
const LO = Math.log10(150);   // ≈ 2.18
const HI = Math.log10(8e9);   // ≈ 9.90
const SPAN = HI - LO;
const logFrac = (n: number) => (Math.log10(n) - LO) / SPAN; // 0..1

const SUP_MAP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const toSuper = (n: number) =>
  Math.abs(n)
    .toString()
    .split("")
    .map((d) => SUP_MAP[+d])
    .join("");

/** Compact, bilingual-aware count label */
function fmtCount(n: number, zh: boolean): string {
  if (zh) {
    if (n >= 1e8) return `${+(n / 1e8).toFixed(n % 1e8 === 0 ? 0 : 1)}亿`;
    if (n >= 1e4) return `${+(n / 1e4).toFixed(n % 1e4 === 0 ? 0 : 1)}万`;
    return n.toLocaleString("zh-CN");
  }
  if (n >= 1e9) return `${+(n / 1e9).toFixed(n % 1e9 === 0 ? 0 : 1)}B`;
  if (n >= 1e6) return `${+(n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1)}M`;
  if (n >= 1e3) return `${+(n / 1e3).toFixed(0)}K`;
  return n.toLocaleString("en-US");
}

// Axis tick positions (log10 values) to display along the bottom
const AXIS_TICKS: { exp: number; label: string }[] = [
  { exp: 2, label: "10²" },
  { exp: 4, label: "10⁴" },
  { exp: 6, label: "10⁶" },
  { exp: 8, label: "10⁸" },
  { exp: 9.9, label: "10¹⁰" },
];

export default function CoordinationScale() {
  const { lang } = useLang();
  const zh = lang === "zh";
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Slight delay so the CSS transition fires visibly
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      ref={containerRef}
      className="holo w-full rounded-2xl p-5 md:p-8"
      style={{ background: "linear-gradient(160deg, #0d1322 0%, #080c18 100%)" }}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <span className="label-mono azure-text">
          {zh
            ? "自治的半径 · 对数刻度"
            : "THE RADIUS OF SELF-RULE · LOG SCALE"}
        </span>
        <span
          className="h-px flex-1 opacity-40"
          style={{ background: "linear-gradient(90deg,#4f9fff55,transparent)" }}
        />
      </div>

      <p className="mb-8 max-w-2xl text-xs leading-relaxed"
         style={{ color: "#97a3bf" }}>
        <T
          v={{
            en: "A circle of kin holds together by memory alone — roughly 150 people, the Dunbar ceiling. A constitutional nation can bind three hundred million strangers under one self-rule. In principle, a networked planet could reach all eight billion. Each step needed the same lever: rules strong enough that minds who have never met can act as though they trust one another.",
            zh: "一个血亲圈，仅凭记忆便能维系——大约一百五十人，邓巴上限。一个宪政民族，能把三亿陌生人约束在同一套自治之下。原则上，一个联网的行星可以触及全部八十亿人。每一步都需要同一根杠杆：足够强韧的规则，让素未谋面的心智，得以表现得仿佛彼此可以信任。",
          }}
        />
      </p>

      {/* ── Bars ────────────────────────────────────────────── */}
      <div className="space-y-5">
        {COORD_ENTITIES.map((e, i) => {
          const frac = logFrac(e.count);
          const pct = Math.max(frac * 100, 2);
          const isLast = i === COORD_ENTITIES.length - 1;
          const exp = Math.round(Math.log10(e.count));
          const delay = `${i * 90}ms`;

          return (
            <div key={e.name.en}>
              {/* Name + count */}
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span
                  className={`font-medium leading-tight ${zh ? "text-sm" : "text-sm"}`}
                  style={{
                    color: isLast ? e.accent : "#e6ecfa",
                    textShadow: isLast ? `0 0 20px ${e.accent}88` : undefined,
                    fontFamily: isLast ? undefined : undefined,
                  }}
                >
                  <T v={e.name} />
                </span>
                <span
                  className="mono shrink-0 text-[0.7rem] tabular-nums"
                  style={{ color: e.accent }}
                >
                  {fmtCount(e.count, zh)}
                </span>
              </div>

              {/* Bar track */}
              <div className="relative">
                <div
                  className={`w-full overflow-hidden rounded-full ${isLast ? "h-5" : "h-3"}`}
                  style={{ background: "#141d33" }}
                >
                  <div
                    className={isLast ? "pulse" : ""}
                    style={{
                      height: "100%",
                      borderRadius: "9999px",
                      width: mounted ? `${pct}%` : "0%",
                      transition: `width 700ms cubic-bezier(0.22,1,0.36,1) ${delay}`,
                      background: isLast
                        ? `linear-gradient(90deg, ${e.accent}cc, ${e.accent}, #d4f0ff)`
                        : `linear-gradient(90deg, ${e.accent}44, ${e.accent}cc)`,
                      boxShadow: `0 0 ${isLast ? 28 : 14}px -3px ${e.accent}${isLast ? "bb" : "77"}`,
                    }}
                  />
                </div>

                {/* Order-of-magnitude label riding bar end */}
                <span
                  className="mono pointer-events-none absolute top-0 flex h-full items-center text-[0.52rem] font-bold"
                  style={{
                    left: `calc(${pct}% - 2.1rem)`,
                    color: "#f5f8ff",
                    mixBlendMode: "screen",
                    opacity: mounted ? 1 : 0,
                    transition: `opacity 400ms ease ${delay}`,
                  }}
                >
                  10{toSuper(exp)}
                </span>
              </div>

              {/* Gloss */}
              <p
                className="mt-1 text-[0.65rem] leading-snug"
                style={{ color: "#69748f" }}
              >
                <T v={e.gloss} />
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Log axis ────────────────────────────────────────── */}
      <div className="relative mt-4 h-5">
        {/* base line */}
        <div
          className="absolute inset-x-0 top-1/2 h-px"
          style={{ background: "#1d2944" }}
        />
        {AXIS_TICKS.map(({ exp, label }) => {
          const pos = ((exp - LO) / SPAN) * 100;
          return (
            <div
              key={exp}
              className="absolute top-0 flex flex-col items-center"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-2 w-px" style={{ background: "#4f9fff44" }} />
              <span
                className="mono text-[0.5rem] mt-0.5"
                style={{ color: "#69748f" }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Thesis caption ──────────────────────────────────── */}
      <div
        className="mt-8 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#4f9fff55,transparent)" }}
      />
      <p
        className="mt-5 text-center text-sm leading-relaxed"
        style={{ color: "#c4cfe6" }}
      >
        <T
          v={{
            en: "The reach of self-rule has always been set by the rules a civilization could make stick. Better rules, larger trust — more strangers deciding together.",
            zh: "自治的半径，始终由一个文明所能让其生效的规则之半径所设定。更好的规则，更大的信任——更多陌生人共同做出决定。",
          }}
        />
      </p>
      <p
        className="mono mt-3 text-center text-[0.6rem] tracking-widest"
        style={{ color: "#4f9fff99" }}
      >
        {zh ? "150 人  ——→  80 亿人" : "150  ——→  8,000,000,000"}
      </p>
    </div>
  );
}
