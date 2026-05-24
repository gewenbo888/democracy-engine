"use client";

import { useState, useMemo } from "react";
import { useLang, t, T, Bi } from "./lang";
import { INFLUENCE_CHANNELS, ECONOMY_MODELS } from "./content";

/* ─── helpers ─────────────────────────────────────────────── */

/** Compute effective-influence shares for 10 deciles given a 0-100 skew value.
 *  Decile i (1..10): weight w_i = (i/10)^(1 + k), normalised to sum = 100.
 *  k scales linearly from 0 (skew=0) to 4 (skew=100).
 */
function computeInfluenceShares(skew: number): number[] {
  const k = (skew / 100) * 4;
  const raw = Array.from({ length: 10 }, (_, i) => Math.pow((i + 1) / 10, 1 + k));
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((w) => (w / sum) * 100);
}

/* ─── static labels ──────────────────────────────────────── */
const LABEL_INFLUENCE_LAB: Bi = { en: "Influence Lab", zh: "影响力实验室" };
const LABEL_SECTION: Bi = { en: "Section 06 — Democracy, Capitalism & Inequality", zh: "第06节 — 民主、资本主义与不平等" };
const LABEL_CHART_TITLE: Bi = { en: "Vote Share vs. Effective Influence by Wealth Decile", zh: "财富十分位的投票份额与实际影响力对比" };
const LABEL_VOTE: Bi = { en: "Formal vote share", zh: "形式投票份额" };
const LABEL_INFLUENCE: Bi = { en: "Effective influence", zh: "实际影响力" };
const LABEL_DECILE: Bi = { en: "Wealth decile (poorest → richest)", zh: "财富十分位（最穷 → 最富）" };
const LABEL_PERCENT: Bi = { en: "Share (%)", zh: "份额（%）" };
const LABEL_PRESET: Bi = { en: "Economy model preset", zh: "经济模型预设" };
const LABEL_SKEW_SLIDER: Bi = { en: "Influence skew", zh: "影响力偏斜度" };
const LABEL_GINI: Bi = { en: "Gini", zh: "基尼系数" };
const LABEL_TOP10: Bi = { en: "Top 10% hold", zh: "最富10%持有" };
const LABEL_OF_INFLUENCE: Bi = { en: "of effective influence", zh: "的实际影响力" };
const LABEL_CHANNELS_TITLE: Bi = { en: "How Money Becomes Political Voice", zh: "金钱如何变成政治声音" };
const LABEL_CAPTION: Bi = {
  en: "Where wealth is moderately spread, formal vote equality and effective influence stay roughly aligned. Where it concentrates to extremes, a society can hold scrupulously fair elections and still be governed largely in the interests of the few — democracy's quiet paradox.",
  zh: "哪里的财富适度分散，形式上的投票平等，与实际的影响力便大致对齐。哪里的财富集中到极端，一个社会可以举办一丝不苟的选举，却仍主要为少数人的利益所治理——这是民主无声的悖论。",
};

/* ─── decile labels ──────────────────────────────────────── */
const DECILE_LABELS = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"];
const DECILE_LABELS_ZH = ["第1", "第2", "第3", "第4", "第5", "第6", "第7", "第8", "第9", "第10"];

/* ─── component ──────────────────────────────────────────── */
export default function InfluenceLab() {
  const { lang } = useLang();

  const [selectedModel, setSelectedModel] = useState<string | null>("liberal");
  const [skew, setSkew] = useState(55);
  const [gini, setGini] = useState(42);

  /* sync skew/gini when a preset is clicked */
  function selectModel(key: string) {
    const m = ECONOMY_MODELS.find((e) => e.key === key);
    if (!m) return;
    setSelectedModel(key);
    setSkew(m.influenceSkew);
    setGini(m.gini);
  }

  /* deselect preset if slider is moved manually */
  function handleSkewChange(v: number) {
    setSkew(v);
    setSelectedModel(null);
  }

  const influenceShares = useMemo(() => computeInfluenceShares(skew), [skew]);

  const top10pct = influenceShares[9].toFixed(1);

  const selectedDesc = ECONOMY_MODELS.find((m) => m.key === selectedModel)?.desc;

  /* bar chart max for y-axis */
  const maxInfluence = Math.max(...influenceShares, 10);
  const yMax = Math.ceil(maxInfluence / 10) * 10 + 5;

  const decileLabels = lang === "zh" ? DECILE_LABELS_ZH : DECILE_LABELS;

  return (
    <section className="w-full bg-ink-900 text-ghost-100 py-16 px-4 md:px-8">
      {/* ── Header ── */}
      <div className="max-w-5xl mx-auto mb-10">
        <p className="label-mono text-ghost-500 mb-1">
          <T v={LABEL_SECTION} />
        </p>
        <h2 className="display text-3xl md:text-4xl font-bold azure-text mb-1">
          <T v={LABEL_INFLUENCE_LAB} />
        </h2>
        <div className="rule-civic mt-3 mb-6" />
      </div>

      {/* ── Main panel ── */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

        {/* LEFT — chart + controls */}
        <div className="flex flex-col gap-6">

          {/* Metric headline */}
          <div className="flex flex-wrap items-end gap-6">
            <div className="bg-ink-800 rounded-xl px-6 py-4 flex flex-col gap-1 border border-amber-500/20">
              <span className="label-mono text-ghost-500 text-xs">
                <T v={LABEL_TOP10} />
              </span>
              <span className="text-4xl font-bold amber-text mono leading-none">
                {top10pct}%
              </span>
              <span className="text-ghost-500 text-xs">
                <T v={LABEL_OF_INFLUENCE} />
              </span>
            </div>
            <div className="bg-ink-800 rounded-xl px-6 py-4 flex flex-col gap-1 border border-silver-500/20">
              <span className="label-mono text-ghost-500 text-xs">
                <T v={LABEL_GINI} /> ≈
              </span>
              <span className="text-4xl font-bold text-ghost-200 mono leading-none">
                {gini}
              </span>
            </div>
            {selectedDesc && (
              <p className="flex-1 text-ghost-400 text-sm leading-relaxed max-w-sm">
                {t(selectedDesc, lang)}
              </p>
            )}
          </div>

          {/* Chart title */}
          <h3 className="text-ghost-300 text-sm font-medium">
            <T v={LABEL_CHART_TITLE} />
          </h3>

          {/* Bar chart — SVG */}
          <InfluenceChart
            influenceShares={influenceShares}
            yMax={yMax}
            decileLabels={decileLabels}
            lang={lang}
          />

          {/* Legend */}
          <div className="flex gap-5 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#4f9fff] opacity-60" />
              <span className="text-xs text-ghost-400">
                <T v={LABEL_VOTE} /> (10% each)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#e6b65c]" />
              <span className="text-xs text-ghost-400">
                <T v={LABEL_INFLUENCE} />
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — controls */}
        <div className="flex flex-col gap-6">

          {/* Preset pills */}
          <div>
            <p className="label-mono text-ghost-500 text-xs mb-3">
              <T v={LABEL_PRESET} />
            </p>
            <div className="flex flex-col gap-2">
              {ECONOMY_MODELS.map((m) => {
                const active = selectedModel === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => selectModel(m.key)}
                    className={[
                      "rounded-full font-mono text-xs px-4 py-2 border transition text-left",
                      active
                        ? "border-azure-500/60 bg-azure-500/20 text-azure-300"
                        : "border-azure-500/30 text-ghost-500 hover:text-azure-400",
                    ].join(" ")}
                    style={active ? { borderColor: m.accent + "80" } : {}}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-2"
                      style={{ background: m.accent }}
                    />
                    {t(m.name, lang)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skew slider */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="label-mono text-ghost-500 text-xs">
                <T v={LABEL_SKEW_SLIDER} />
              </span>
              <span className="mono text-amber-400 text-xs">{skew}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={skew}
              onChange={(e) => handleSkewChange(Number(e.target.value))}
              className="w-full accent-amber-500"
              aria-label={t(LABEL_SKEW_SLIDER, lang)}
            />
            <div className="flex justify-between mt-1">
              <span className="text-ghost-500 text-[10px]">equal</span>
              <span className="text-amber-500 text-[10px]">concentrated</span>
            </div>
          </div>

          {/* Gini slider */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="label-mono text-ghost-500 text-xs">
                <T v={LABEL_GINI} />
              </span>
              <span className="mono text-ghost-300 text-xs">{gini}</span>
            </div>
            <input
              type="range"
              min={20}
              max={70}
              value={gini}
              onChange={(e) => { setGini(Number(e.target.value)); setSelectedModel(null); }}
              className="w-full accent-azure-500"
              aria-label={t(LABEL_GINI, lang)}
            />
            <div className="flex justify-between mt-1">
              <span className="text-ghost-500 text-[10px]">20 — equal</span>
              <span className="text-ghost-500 text-[10px]">70 — unequal</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Channels ── */}
      <div className="max-w-5xl mx-auto mt-14">
        <h3 className="display text-lg font-semibold text-ghost-200 mb-6">
          <T v={LABEL_CHANNELS_TITLE} />
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {INFLUENCE_CHANNELS.map((ch) => (
            <ChannelCard key={ch.key} channel={ch} lang={lang} />
          ))}
        </div>
      </div>

      {/* ── Caption ── */}
      <div className="max-w-5xl mx-auto mt-10">
        <div className="rule-civic mb-5" />
        <p className="text-ghost-400 text-sm leading-relaxed">
          <T v={LABEL_CAPTION} />
        </p>
      </div>
    </section>
  );
}

/* ─── Chart subcomponent ─────────────────────────────────── */

function InfluenceChart({
  influenceShares,
  yMax,
  decileLabels,
  lang,
}: {
  influenceShares: number[];
  yMax: number;
  decileLabels: string[];
  lang: "en" | "zh";
}) {
  const W = 600;
  const H = 260;
  const PAD = { top: 14, right: 16, bottom: 52, left: 46 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const groupW = chartW / 10;
  const barW = (groupW - 6) / 2;

  const yScale = (v: number) => chartH - (v / yMax) * chartH;
  const yTicks = Array.from({ length: Math.floor(yMax / 10) + 1 }, (_, i) => i * 10).filter(
    (v) => v <= yMax
  );

  /* axis labels bilingual */
  const xAxisLabel = lang === "zh" ? "财富十分位（最穷 → 最富）" : "Wealth decile (poorest → richest)";
  const yAxisLabel = lang === "zh" ? "份额 (%)" : "Share (%)";

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto min-w-[340px]"
        aria-label={lang === "zh" ? "财富十分位影响力图表" : "Influence by wealth decile chart"}
        role="img"
      >
        {/* grid lines */}
        {yTicks.map((tick) => (
          <line
            key={tick}
            x1={PAD.left}
            x2={PAD.left + chartW}
            y1={PAD.top + yScale(tick)}
            y2={PAD.top + yScale(tick)}
            stroke="#1d2944"
            strokeWidth={1}
          />
        ))}

        {/* y-axis tick labels */}
        {yTicks.map((tick) => (
          <text
            key={tick}
            x={PAD.left - 6}
            y={PAD.top + yScale(tick) + 4}
            textAnchor="end"
            fontSize={9}
            fill="#69748f"
            fontFamily="monospace"
          >
            {tick}
          </text>
        ))}

        {/* y-axis label */}
        <text
          x={10}
          y={PAD.top + chartH / 2}
          textAnchor="middle"
          fontSize={9}
          fill="#69748f"
          fontFamily="monospace"
          transform={`rotate(-90, 10, ${PAD.top + chartH / 2})`}
        >
          {yAxisLabel}
        </text>

        {/* bars */}
        {influenceShares.map((influence, i) => {
          const gx = PAD.left + i * groupW;
          const voteH = (10 / yMax) * chartH;
          const infH = (influence / yMax) * chartH;

          return (
            <g key={i}>
              {/* vote bar */}
              <rect
                x={gx + 3}
                y={PAD.top + yScale(10)}
                width={barW}
                height={voteH}
                fill="#4f9fff"
                fillOpacity={0.45}
                rx={2}
              />
              {/* influence bar */}
              <rect
                x={gx + 3 + barW + 2}
                y={PAD.top + yScale(influence)}
                width={barW}
                height={infH}
                fill={influence > 15 ? "#e6b65c" : influence > 10.5 ? "#f0cd86" : "#e6b65c"}
                fillOpacity={0.85}
                rx={2}
              />
              {/* x-axis label */}
              <text
                x={gx + groupW / 2}
                y={PAD.top + chartH + 14}
                textAnchor="middle"
                fontSize={9}
                fill={i === 9 ? "#f0cd86" : "#69748f"}
                fontFamily="monospace"
                fontWeight={i === 9 ? "bold" : "normal"}
              >
                {decileLabels[i]}
              </text>
              {/* value label on top bar (top decile + maybe middle ones) */}
              {(i === 9 || i === 8 || i === 0) && (
                <text
                  x={gx + 3 + barW + 2 + barW / 2}
                  y={PAD.top + yScale(influence) - 3}
                  textAnchor="middle"
                  fontSize={8}
                  fill="#f0cd86"
                  fontFamily="monospace"
                >
                  {influence.toFixed(1)}%
                </text>
              )}
            </g>
          );
        })}

        {/* x-axis baseline */}
        <line
          x1={PAD.left}
          x2={PAD.left + chartW}
          y1={PAD.top + chartH}
          y2={PAD.top + chartH}
          stroke="#1d2944"
          strokeWidth={1.5}
        />

        {/* x-axis label */}
        <text
          x={PAD.left + chartW / 2}
          y={H - 6}
          textAnchor="middle"
          fontSize={9}
          fill="#69748f"
          fontFamily="monospace"
        >
          {xAxisLabel}
        </text>

        {/* 10% reference line */}
        <line
          x1={PAD.left}
          x2={PAD.left + chartW}
          y1={PAD.top + yScale(10)}
          y2={PAD.top + yScale(10)}
          stroke="#4f9fff"
          strokeOpacity={0.5}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <text
          x={PAD.left + chartW - 2}
          y={PAD.top + yScale(10) - 3}
          textAnchor="end"
          fontSize={8}
          fill="#4f9fff"
          fillOpacity={0.7}
          fontFamily="monospace"
        >
          10%
        </text>
      </svg>
    </div>
  );
}

/* ─── Channel card ───────────────────────────────────────── */

function ChannelCard({
  channel,
  lang,
}: {
  channel: { key: string; name: Bi; mechanism: Bi; accent: string };
  lang: "en" | "zh";
}) {
  return (
    <div
      className="bg-ink-800 rounded-xl p-4 border border-white/5 flex flex-col gap-2 hover:border-white/10 transition"
      style={{ borderLeftColor: channel.accent + "70", borderLeftWidth: 3 }}
    >
      <span
        className="label-mono text-xs font-semibold"
        style={{ color: channel.accent }}
      >
        {t(channel.name, lang)}
      </span>
      <p className="text-ghost-400 text-xs leading-relaxed">
        {t(channel.mechanism, lang)}
      </p>
    </div>
  );
}
