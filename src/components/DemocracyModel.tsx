"use client";

import { useState } from "react";
import { T, useLang } from "./lang";
import { PILLARS, PROFILES, Profile } from "./content";

const SIZE = 460;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 158;
const N = PILLARS.length; // 7

function pt(i: number, value: number) {
  const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N;
  const r = (value / 100) * R;
  return [CX + r * Math.cos(ang), CY + r * Math.sin(ang)] as const;
}

function axisEnd(i: number, factor = 1) {
  const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N;
  return [CX + R * factor * Math.cos(ang), CY + R * factor * Math.sin(ang)] as const;
}

export default function DemocracyModel() {
  const { lang } = useLang();
  const [active, setActive] = useState<Record<Profile["key"], boolean>>({
    tribal: false,
    mass: true,
    fragile: true,
    networked: false,
  });

  const toggle = (k: Profile["key"]) => setActive((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className="holo rounded-2xl p-5 md:p-8">
      {/* formula */}
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-center">
        <span className="display text-lg text-ghost-50 md:text-xl">{lang === "zh" ? "民主稳定" : "Democratic Stability"}</span>
        <span className="display text-lg text-azure-400 md:text-xl">=</span>
        {PILLARS.map((p, i) => (
          <span key={p.sym} className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-azure-500/30 bg-ink-900 mono text-azure-300">{p.sym}</span>
            {i < PILLARS.length - 1 && <span className="azure-text display text-base">+</span>}
          </span>
        ))}
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-ghost-500">
        <T v={{
          en: "A working definition: the stability of a democracy is not any one term but the balance of seven — participation, legitimacy, information quality, institutional trust, power distribution, conflict resolution, and coordination capacity. Toggle the profiles and watch how differently each kind of polity raises them — and where a failing state caves in.",
          zh: "一个可操作的定义：一个民主政体的稳定，不在于任何单一项，而在于七项的平衡——参与、合法性、信息质量、制度信任、权力分布、冲突解决，与协调能力。切换各个剖面，看不同类型的政体如何以截然不同的方式立起它们——以及，一个失败的国家在何处塌陷。",
        }} />
      </p>

      <div className="mt-7 h-px rule-civic opacity-50" />

      {/* legend / toggles */}
      <div className="mt-6 mb-2 flex flex-wrap justify-center gap-3">
        {PROFILES.map((s) => (
          <button
            key={s.key}
            onClick={() => toggle(s.key)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition ${active[s.key] ? "text-ghost-50" : "text-ghost-500"}`}
            style={{ borderColor: active[s.key] ? s.accent : "rgba(149,162,194,0.2)", background: active[s.key] ? `${s.accent}1f` : "transparent" }}
            aria-pressed={active[s.key]}
          >
            <span className="h-3 w-3 rounded-sm" style={{ background: active[s.key] ? s.accent : "transparent", border: `1px solid ${s.accent}` }} />
            <span className={lang === "zh" ? "zh" : ""}><T v={s.name} /></span>
          </button>
        ))}
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* radar */}
        <div className="mx-auto w-full max-w-[460px]">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full">
            {/* grid rings */}
            {[0.25, 0.5, 0.75, 1].map((f, ri) => (
              <polygon
                key={ri}
                points={PILLARS.map((_, i) => axisEnd(i, f).join(",")).join(" ")}
                fill="none"
                stroke="rgba(149,162,194,0.16)"
                strokeWidth={1}
              />
            ))}
            {/* spokes + labels */}
            {PILLARS.map((p, i) => {
              const [ex, ey] = axisEnd(i);
              const [lx, ly] = axisEnd(i, 1.16);
              const anchor = Math.abs(lx - CX) < 12 ? "middle" : lx > CX ? "start" : "end";
              return (
                <g key={p.sym}>
                  <line x1={CX} y1={CY} x2={ex} y2={ey} stroke="rgba(149,162,194,0.16)" strokeWidth={1} />
                  <text
                    x={lx}
                    y={ly}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    className={lang === "zh" ? "zh" : "display"}
                    fill="#c4cfe6"
                    fontSize="11.5"
                  >
                    <tspan fill="#4f9fff" className="mono">{p.sym}</tspan>
                    <tspan dx="4">{p.name[lang]}</tspan>
                  </text>
                </g>
              );
            })}
            {/* profile polygons */}
            {PROFILES.filter((s) => active[s.key]).map((s) => {
              const pts = PILLARS.map((p, i) => pt(i, p[s.key]).join(",")).join(" ");
              return (
                <g key={s.key}>
                  <polygon points={pts} fill={`${s.accent}26`} stroke={s.accent} strokeWidth={1.8} />
                  {PILLARS.map((p, i) => {
                    const [x, y] = pt(i, p[s.key]);
                    return <circle key={i} cx={x} cy={y} r={2.6} fill={s.accent} />;
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* pillar list */}
        <div className="space-y-3">
          {PILLARS.map((p) => (
            <div key={p.sym} className="rounded-lg border border-azure-500/10 bg-ink-900/50 p-3">
              <div className="flex items-baseline gap-2">
                <span className="mono text-azure-400">{p.sym}</span>
                <span className={`text-sm text-ghost-100 ${lang === "zh" ? "zh" : "display"}`}><T v={p.name} /></span>
              </div>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-ghost-400"><T v={p.gloss} /></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
