"use client";

import { useLang, t, T } from "./lang";
import { GOVERNANCE_SCALES, FUTURES } from "./content";

const HORIZON_TINT: Record<string, string> = {
  near: "#4f9fff", emerging: "#3fd9c0", speculative: "#7bb8ff",
  needed: "#e6b65c", open: "#a9d2ff",
  近期: "#4f9fff", 新兴: "#3fd9c0", 推想: "#7bb8ff", 亟需: "#e6b65c", 未决: "#a9d2ff",
};

export default function FutureGov() {
  const { lang } = useLang();
  const n = GOVERNANCE_SCALES.length;

  return (
    <div className="space-y-10">
      {/* the growing unit of self-government */}
      <div className="holo rounded-2xl p-5 md:p-7">
        <div className="label-mono">The growing unit of self-rule · 自治单位的增长</div>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ghost-400">
          <T v={{
            en: "The scale at which a people can legitimately decide together has climbed relentlessly — from a circle of kin to, perhaps, a planet. Each rung needed a new mechanism to make consent work at a larger size.",
            zh: "一个民族能合法地共同决定的尺度，一直在无情地攀升——从一个血亲的圆圈，到，或许，一颗行星。每一级，都需要一种新的机制，好让「同意」在更大的尺寸上奏效。",
          }} />
        </p>

        <div className="mt-6 space-y-2.5">
          {GOVERNANCE_SCALES.map((s, i) => {
            const width = 30 + (i / (n - 1)) * 70; // ascending reach
            return (
              <div key={s.key} className="flex items-center gap-3">
                <div className="w-24 shrink-0 text-right">
                  <div className="text-sm" style={{ color: s.accent }}>
                    <span className={lang === "zh" ? "zh" : "display"}>{t(s.name, lang)}</span>
                  </div>
                  <div className="font-mono text-[0.6rem] text-ghost-500">{t(s.reach, lang)}</div>
                </div>
                <div className="relative flex-1">
                  <div
                    className="rise-in flex h-11 items-center rounded-lg px-3"
                    style={{
                      width: `${width}%`,
                      background: `linear-gradient(90deg, ${s.accent}33, ${s.accent}0d)`,
                      borderLeft: `2px solid ${s.accent}`,
                      animationDelay: `${i * 90}ms`,
                    }}
                  >
                    <span className="truncate text-[0.78rem] leading-tight text-ghost-200">{t(s.mechanism, lang)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ghost-500">
          <span>← face-to-face</span>
          <span>planetary →</span>
        </div>
      </div>

      {/* the prototypes being built */}
      <div>
        <div className="label-mono">What is being prototyped · 正在试制的形态</div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURES.map((f, i) => {
            const tint = HORIZON_TINT[t(f.horizon, lang)] || f.accent;
            return (
              <div key={i} className="holo rounded-xl p-5" style={{ borderTopColor: f.accent, borderTopWidth: 2 }}>
                <div className="flex items-center justify-between">
                  <span className={`display text-base text-ghost-50 ${lang === "zh" ? "zh" : ""}`}><T v={f.name} /></span>
                  <span className="rounded-full px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider"
                        style={{ color: tint, background: `${tint}1a`, border: `1px solid ${tint}40` }}>
                    <T v={f.horizon} />
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ghost-300"><T v={f.desc} /></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
