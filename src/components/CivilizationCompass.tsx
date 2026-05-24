"use client";

import { useState } from "react";
import { T, useLang, t } from "./lang";
import { CIV_AXES, CIVILIZATIONS } from "./content";

const SIZE = 460;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 162; // outer radius of the 100-value ring
const N = CIV_AXES.length; // 6 spokes
const RINGS = [25, 50, 75, 100]; // concentric value rings

/* spoke angle (radians), spoke 0 pointing straight up */
function angle(i: number) {
  return -Math.PI / 2 + (i / N) * Math.PI * 2;
}
function point(i: number, value: number) {
  const r = (value / 100) * R;
  const a = angle(i);
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

export default function CivilizationCompass() {
  const { lang } = useLang();

  // default: show "modern" + "athens" + "rome"
  const [shown, setShown] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    CIVILIZATIONS.forEach((c) => {
      init[c.key] = c.key === "modern" || c.key === "athens" || c.key === "rome";
    });
    return init;
  });

  // which civilization is "focused" for basis text — default to "modern"
  const [focused, setFocused] = useState<string>("modern");

  const toggle = (key: string) => {
    setShown((s) => ({ ...s, [key]: !s[key] }));
    setFocused(key);
  };

  const handleFocus = (key: string) => {
    setFocused(key);
    if (!shown[key]) setShown((s) => ({ ...s, [key]: true }));
  };

  const visible = CIVILIZATIONS.filter((c) => shown[c.key]);
  const focusedCiv = CIVILIZATIONS.find((c) => c.key === focused) ?? CIVILIZATIONS[CIVILIZATIONS.length - 1];

  return (
    <div className="holo rounded-2xl p-5 md:p-8">
      {/* header */}
      <div className="label-mono">Civilization Comparison · 文明比较</div>
      <h3 className={`display mt-1 text-2xl text-ghost-50 md:text-3xl ${lang === "zh" ? "zh" : ""}`}>
        <T v={{ en: "How should the many be heard?", zh: "众人，应当如何被听见？" }} />
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ghost-300">
        <T
          v={{
            en: "Six traditions of asking the many — compared structurally, not ranked. Each tradition is a different answer to the same ancient question about how collective decisions should be made and who gets a voice.",
            zh: "征询众人的六种传统——结构性地比较，而非排名。每一种传统，都是对同一古老问题的不同回答：集体决策应如何作出，以及谁有发言权。",
          }}
        />
      </p>

      <div className="my-5 h-px rule-civic" />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        {/* ============ radar ============ */}
        <div className="mx-auto w-full max-w-[460px]">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="w-full"
            role="img"
            aria-label="civilization comparison radar"
          >
            <defs>
              <radialGradient id="civCompassFace" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#101828" />
                <stop offset="72%" stopColor="#080d1c" />
                <stop offset="100%" stopColor="#050810" />
              </radialGradient>
            </defs>

            {/* compass face */}
            <circle
              cx={CX}
              cy={CY}
              r={R + 26}
              fill="url(#civCompassFace)"
              stroke="#4f9fff"
              strokeOpacity={0.22}
              strokeWidth={1.5}
            />
            <circle
              cx={CX}
              cy={CY}
              r={R + 14}
              fill="none"
              stroke="#95a2c2"
              strokeOpacity={0.15}
              strokeWidth={1}
            />

            {/* concentric value rings */}
            {RINGS.map((rv) => (
              <circle
                key={rv}
                cx={CX}
                cy={CY}
                r={(rv / 100) * R}
                fill="none"
                stroke="#95a2c2"
                strokeOpacity={rv === 100 ? 0.28 : 0.1}
                strokeWidth={1}
              />
            ))}

            {/* ring labels (25, 50, 75) */}
            {[25, 50, 75].map((rv) => (
              <text
                key={rv}
                x={CX + 4}
                y={CY - (rv / 100) * R + 3}
                fontSize={8}
                fill="#69748f"
                textAnchor="start"
              >
                {rv}
              </text>
            ))}

            {/* tick marks around the rim */}
            {Array.from({ length: 72 }).map((_, k) => {
              const a = (k / 72) * Math.PI * 2;
              const major = k % 12 === 0;
              const r1 = R + 14;
              const r2 = R + (major ? 24 : 19);
              return (
                <line
                  key={k}
                  x1={CX + r1 * Math.cos(a)}
                  y1={CY + r1 * Math.sin(a)}
                  x2={CX + r2 * Math.cos(a)}
                  y2={CY + r2 * Math.sin(a)}
                  stroke={major ? "#4f9fff" : "#7e8aa6"}
                  strokeOpacity={major ? 0.5 : 0.2}
                  strokeWidth={major ? 1.4 : 0.7}
                />
              );
            })}

            {/* spokes + axis labels */}
            {CIV_AXES.map((ax, i) => {
              const tip = point(i, 100);
              const lp = point(i, 128);
              const a = angle(i);
              const anchor =
                Math.abs(Math.cos(a)) < 0.25
                  ? "middle"
                  : Math.cos(a) > 0
                  ? "start"
                  : "end";
              const label = t(ax, lang);
              // split at " & " or "与" for Chinese multi-word wrapping
              const words =
                lang === "zh"
                  ? label.split("与").map((w, wi, arr) =>
                      wi < arr.length - 1 ? w + "与" : w
                    )
                  : label.split(" & ").map((w, wi, arr) =>
                      wi < arr.length - 1 ? w + " &" : w
                    );
              return (
                <g key={i}>
                  <line
                    x1={CX}
                    y1={CY}
                    x2={tip.x}
                    y2={tip.y}
                    stroke="#7bb8ff"
                    strokeOpacity={0.15}
                    strokeWidth={1}
                  />
                  <text
                    x={lp.x}
                    y={lp.y}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    className={lang === "zh" ? "zh" : ""}
                    fontSize={10.5}
                    fill="#b8c2dc"
                  >
                    {words.length > 1 ? (
                      words.map((w, wi) => (
                        <tspan
                          key={wi}
                          x={lp.x}
                          dy={wi === 0 ? -(words.length - 1) * 6 : 12}
                        >
                          {w}
                        </tspan>
                      ))
                    ) : (
                      label
                    )}
                  </text>
                </g>
              );
            })}

            {/* civilization polygons — draw non-focused ones first */}
            {visible
              .filter((c) => c.key !== focused)
              .map((c) => {
                const pts = c.axes.map((v, i) => point(i, v));
                const d = pts.map((p) => `${p.x},${p.y}`).join(" ");
                return (
                  <g key={c.key}>
                    <polygon
                      points={d}
                      fill={c.accent}
                      fillOpacity={0.08}
                      stroke={c.accent}
                      strokeOpacity={0.55}
                      strokeWidth={1.5}
                    />
                    {pts.map((p, i) => (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={2.5}
                        fill={c.accent}
                        fillOpacity={0.7}
                        stroke="#060912"
                        strokeWidth={0.8}
                      />
                    ))}
                  </g>
                );
              })}

            {/* focused civilization drawn on top, brighter */}
            {visible
              .filter((c) => c.key === focused)
              .map((c) => {
                const pts = c.axes.map((v, i) => point(i, v));
                const d = pts.map((p) => `${p.x},${p.y}`).join(" ");
                return (
                  <g key={c.key}>
                    <polygon
                      points={d}
                      fill={c.accent}
                      fillOpacity={0.15}
                      stroke={c.accent}
                      strokeOpacity={0.95}
                      strokeWidth={2.5}
                    />
                    {pts.map((p, i) => (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={3.5}
                        fill={c.accent}
                        stroke="#060912"
                        strokeWidth={1}
                      />
                    ))}
                  </g>
                );
              })}

            {/* center seal */}
            <circle cx={CX} cy={CY} r={4} fill="#4f9fff" fillOpacity={0.85} />
            <circle
              cx={CX}
              cy={CY}
              r={9}
              fill="none"
              stroke="#4f9fff"
              strokeOpacity={0.35}
              strokeWidth={1}
              strokeDasharray="3 5"
            />
          </svg>

          {/* axis key */}
          <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1">
            {CIV_AXES.map((ax, i) => (
              <span key={i} className="mono text-[0.65rem] text-ghost-500">
                <span className="text-silver-400">{i + 1}</span>{" "}
                {t(ax, lang)}
              </span>
            ))}
          </div>
        </div>

        {/* ============ legend + basis ============ */}
        <div>
          <div className="mb-3 label-mono">
            <T v={{ en: "Traditions · select to compare", zh: "传统 · 选择以比较" }} />
          </div>

          <div className="space-y-1.5">
            {CIVILIZATIONS.map((c) => {
              const active = shown[c.key];
              const isFocused = focused === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => (isFocused ? toggle(c.key) : handleFocus(c.key))}
                  className="block w-full rounded-lg border px-3 py-2.5 text-left transition"
                  style={{
                    borderColor: active
                      ? isFocused
                        ? c.accent
                        : `${c.accent}88`
                      : "rgba(149,162,194,0.12)",
                    background: active
                      ? isFocused
                        ? `${c.accent}1a`
                        : `${c.accent}0d`
                      : "transparent",
                    opacity: active ? 1 : 0.48,
                  }}
                  aria-pressed={active}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        background: c.accent,
                        boxShadow:
                          isFocused && active
                            ? `0 0 8px ${c.accent}`
                            : "none",
                      }}
                    />
                    <span
                      className={`display text-sm ${lang === "zh" ? "zh" : ""}`}
                      style={{
                        color: active
                          ? isFocused
                            ? c.accent
                            : `${c.accent}cc`
                          : "#7e8aa6",
                      }}
                    >
                      <T v={c.name} />
                    </span>
                    {!active && (
                      <span className="ml-auto font-mono text-[0.62rem] text-ghost-500">
                        + show
                      </span>
                    )}
                  </div>

                  {/* basis description — shown when this civ is focused and visible */}
                  {isFocused && active && (
                    <p
                      className={`mt-1.5 pl-5 text-[0.73rem] leading-relaxed text-ghost-300 lang-fade ${lang === "zh" ? "zh" : ""}`}
                    >
                      <T v={c.basis} />
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* focused civ basis if it's hidden — show it anyway */}
          {!shown[focusedCiv.key] && (
            <div
              className="mt-3 rounded-lg border border-silver-500/20 bg-ink-800/60 p-3"
              style={{ borderColor: `${focusedCiv.accent}30` }}
            >
              <div
                className={`text-[0.73rem] font-semibold ${lang === "zh" ? "zh" : ""}`}
                style={{ color: focusedCiv.accent }}
              >
                <T v={focusedCiv.name} />
              </div>
              <p
                className={`mt-1 text-[0.73rem] leading-relaxed text-ghost-300 ${lang === "zh" ? "zh" : ""}`}
              >
                <T v={focusedCiv.basis} />
              </p>
            </div>
          )}

          {/* axis scores for focused civ */}
          {shown[focusedCiv.key] && (
            <div className="mt-4">
              <div className="mb-2 label-mono" style={{ color: focusedCiv.accent }}>
                <T v={focusedCiv.name} /> ·{" "}
                <T v={{ en: "axis scores", zh: "各轴得分" }} />
              </div>
              <div className="space-y-1.5">
                {CIV_AXES.map((ax, i) => {
                  const val = focusedCiv.axes[i];
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-4 text-right mono text-[0.65rem] text-silver-500">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="mb-0.5 flex justify-between">
                          <span
                            className={`text-[0.65rem] text-ghost-400 ${lang === "zh" ? "zh" : ""}`}
                          >
                            {t(ax, lang)}
                          </span>
                          <span
                            className="mono text-[0.65rem]"
                            style={{ color: focusedCiv.accent }}
                          >
                            {val}
                          </span>
                        </div>
                        <div className="h-1 w-full rounded-full bg-ink-700">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${val}%`,
                              background: focusedCiv.accent,
                              opacity: 0.75,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <p className="mt-4 text-[0.66rem] leading-relaxed text-ghost-500">
            <T
              v={{
                en: "Scores reflect structural features — breadth, representation, deliberation, constraints, continuity, and peaceful transfer — not a ranking of civilizations.",
                zh: "得分反映结构性特征——广度、代表性、协商、约束、延续与和平移交——而非对文明的排名。",
              }}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
