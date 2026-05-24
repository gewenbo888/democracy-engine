"use client";

import { useState, useRef, useEffect } from "react";
import { T, t, useLang } from "./lang";
import { DIGITAL_CONCEPTS, GOV_MODES } from "./content";

/* ── per-mode animated schematic: citizens → decision ── */
type SchematicNode = { id: string; label: string; x: number; y: number; r: number; accent: string };
type SchematicEdge = { from: string; to: string; dashed?: boolean };

const SCHEMATICS: Record<string, { nodesEn: SchematicNode[]; nodesZh: SchematicNode[]; edges: SchematicEdge[] }> = {
  continuous: {
    nodesEn: [
      { id: "c1", label: "Citizen", x: 30, y: 20, r: 12, accent: "#3fd9c0" },
      { id: "c2", label: "Citizen", x: 70, y: 20, r: 12, accent: "#3fd9c0" },
      { id: "c3", label: "Citizen", x: 50, y: 50, r: 12, accent: "#3fd9c0" },
      { id: "d",  label: "Decision", x: 50, y: 82, r: 14, accent: "#6fe6d2" },
    ],
    nodesZh: [
      { id: "c1", label: "公民", x: 30, y: 20, r: 12, accent: "#3fd9c0" },
      { id: "c2", label: "公民", x: 70, y: 20, r: 12, accent: "#3fd9c0" },
      { id: "c3", label: "公民", x: 50, y: 50, r: 12, accent: "#3fd9c0" },
      { id: "d",  label: "决定", x: 50, y: 82, r: 14, accent: "#6fe6d2" },
    ],
    edges: [
      { from: "c1", to: "d" },
      { from: "c2", to: "d" },
      { from: "c3", to: "d" },
    ],
  },
  liquid: {
    nodesEn: [
      { id: "c1", label: "You", x: 15, y: 18, r: 11, accent: "#4f9fff" },
      { id: "c2", label: "Expert", x: 50, y: 18, r: 13, accent: "#7bb8ff" },
      { id: "c3", label: "Delegate", x: 83, y: 18, r: 12, accent: "#4f9fff" },
      { id: "hub", label: "Hub", x: 50, y: 55, r: 14, accent: "#a9d2ff" },
      { id: "d",  label: "Decision", x: 50, y: 86, r: 13, accent: "#4f9fff" },
    ],
    nodesZh: [
      { id: "c1", label: "你", x: 15, y: 18, r: 11, accent: "#4f9fff" },
      { id: "c2", label: "专家", x: 50, y: 18, r: 13, accent: "#7bb8ff" },
      { id: "c3", label: "受托人", x: 83, y: 18, r: 12, accent: "#4f9fff" },
      { id: "hub", label: "枢纽", x: 50, y: 55, r: 14, accent: "#a9d2ff" },
      { id: "d",  label: "决定", x: 50, y: 86, r: 13, accent: "#4f9fff" },
    ],
    edges: [
      { from: "c1", to: "hub", dashed: true },
      { from: "c2", to: "hub" },
      { from: "c3", to: "hub", dashed: true },
      { from: "hub", to: "d" },
    ],
  },
  assisted: {
    nodesEn: [
      { id: "c1", label: "Rep", x: 25, y: 18, r: 12, accent: "#7bb8ff" },
      { id: "c2", label: "Rep", x: 60, y: 18, r: 12, accent: "#7bb8ff" },
      { id: "ai", label: "AI", x: 80, y: 52, r: 13, accent: "#a9d2ff" },
      { id: "assembly", label: "Assembly", x: 38, y: 55, r: 15, accent: "#4f9fff" },
      { id: "d",  label: "Decision", x: 50, y: 86, r: 13, accent: "#7bb8ff" },
    ],
    nodesZh: [
      { id: "c1", label: "议员", x: 25, y: 18, r: 12, accent: "#7bb8ff" },
      { id: "c2", label: "议员", x: 60, y: 18, r: 12, accent: "#7bb8ff" },
      { id: "ai", label: "AI", x: 80, y: 52, r: 13, accent: "#a9d2ff" },
      { id: "assembly", label: "议会", x: 38, y: 55, r: 15, accent: "#4f9fff" },
      { id: "d",  label: "决定", x: 50, y: 86, r: 13, accent: "#7bb8ff" },
    ],
    edges: [
      { from: "c1", to: "assembly" },
      { from: "c2", to: "assembly" },
      { from: "ai", to: "assembly", dashed: true },
      { from: "assembly", to: "d" },
    ],
  },
  automated: {
    nodesEn: [
      { id: "targets", label: "Targets", x: 50, y: 16, r: 13, accent: "#e6b65c" },
      { id: "code", label: "Code", x: 50, y: 52, r: 16, accent: "#f0cd86" },
      { id: "policy", label: "Policy", x: 20, y: 82, r: 12, accent: "#e6b65c" },
      { id: "appeal", label: "Appeal?", x: 78, y: 82, r: 12, accent: "#69748f" },
    ],
    nodesZh: [
      { id: "targets", label: "目标", x: 50, y: 16, r: 13, accent: "#e6b65c" },
      { id: "code", label: "代码", x: 50, y: 52, r: 16, accent: "#f0cd86" },
      { id: "policy", label: "政策", x: 20, y: 82, r: 12, accent: "#e6b65c" },
      { id: "appeal", label: "上诉?", x: 78, y: 82, r: 12, accent: "#69748f" },
    ],
    edges: [
      { from: "targets", to: "code" },
      { from: "code", to: "policy" },
      { from: "code", to: "appeal", dashed: true },
    ],
  },
};

/* ── per-mode console readout lines ── */
const MODE_LINES: Record<string, { en: string; zh: string }[]> = {
  continuous: [
    { en: "> channel: real-time public referendum", zh: "> 频道：实时全民公投" },
    { en: "> input: 4 812 093 votes received (3.1 s)", zh: "> 输入：4 812 093 票，已接收（3.1秒）" },
    { en: "> result: proposal_47b PASSED  [52.1 %]", zh: "> 结果：提案_47b 通过  [52.1%]" },
  ],
  liquid: [
    { en: "> your delegation: health_policy → @dr_chen", zh: "> 你的委托：医疗政策 → @陈医生" },
    { en: "> dr_chen votes: YES on motion_22 — relayed", zh: "> 陈医生投票：赞成动议22 ——已转达" },
    { en: "> revoke anytime: delegate --unset health_policy", zh: "> 随时可撤：delegate --unset 医疗政策" },
  ],
  assisted: [
    { en: "> ai_model: simulating budget_bill_2047 impacts", zh: "> AI模型：模拟2047年预算案的影响" },
    { en: "> summary: 1 204 091 comments condensed", zh: "> 摘要：1 204 091 条评论已汇总" },
    { en: "> assembly vote: PASS — humans made the call", zh: "> 议会表决：通过 ——由人类作出决定" },
  ],
  automated: [
    { en: "> rule_engine: co2_target = 380 ppm", zh: "> 规则引擎：碳排放目标 = 380 ppm" },
    { en: "> threshold exceeded — subsidy_rate += 2.4 %", zh: "> 超过阈值——补贴率 += 2.4%" },
    { en: "> appeal.log: 0 overrides in 14 days", zh: "> 上诉记录：14天内 0 次覆议" },
  ],
};

/* ── ModeSchematic: draws the per-mode SVG diagram ── */
function ModeSchematic({ modeKey, accent }: { modeKey: string; accent: string }) {
  const { lang } = useLang();
  const schema = SCHEMATICS[modeKey];
  if (!schema) return null;
  const nodes = lang === "zh" ? schema.nodesZh : schema.nodesEn;
  const edges = schema.edges;

  const getNode = (id: string) => nodes.find((n) => n.id === id);

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full"
      style={{ height: 120 }}
      aria-hidden="true"
    >
      {/* edges */}
      {edges.map((e, i) => {
        const a = getNode(e.from);
        const b = getNode(e.to);
        if (!a || !b) return null;
        return (
          <line
            key={i}
            x1={a.x} y1={a.y}
            x2={b.x} y2={b.y}
            stroke={accent}
            strokeOpacity={0.5}
            strokeWidth={0.9}
            strokeDasharray={e.dashed ? "2 3" : undefined}
            className={e.dashed ? undefined : "flow"}
          />
        );
      })}
      {/* nodes */}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x} cy={n.y} r={n.r}
            fill={`${n.accent}18`}
            stroke={n.accent}
            strokeWidth={0.8}
            className="pulse"
          />
          <text
            x={n.x} y={n.y + 0.5}
            textAnchor="middle" dominantBaseline="middle"
            fontSize={lang === "zh" ? 4.8 : 3.8}
            fill={n.accent}
            fontFamily="JetBrains Mono, monospace"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── TensionBar: splits "A vs. B" into two colored halves ── */
function TensionBar({ tension, accent }: { tension: { en: string; zh: string }; accent: string }) {
  const { lang } = useLang();
  const raw = tension[lang];
  const sep = lang === "zh" ? " vs. " : " vs. ";
  const parts = raw.split(sep);
  const left = parts[0] ?? raw;
  const right = parts[1] ?? "";

  return (
    <div className="mt-3 flex items-center gap-1 rounded-md border border-ink-600 bg-ink-950/70 px-2.5 py-1.5">
      <span className="mono text-[0.62rem] leading-snug" style={{ color: accent }}>
        {left}
      </span>
      {right && (
        <>
          <span className="mono text-[0.6rem] text-ghost-500/60 px-0.5">vs.</span>
          <span className="mono text-[0.62rem] leading-snug text-amber-400">
            {right}
          </span>
        </>
      )}
    </div>
  );
}

/* ── TickerLine: scrolling status line inside the console ── */
function TickerLine({ modeKey, accent }: { modeKey: string; accent: string }) {
  const { lang } = useLang();
  const tickers: Record<string, { en: string; zh: string }> = {
    continuous: { en: "▸ LIVE · all eligible citizens · 4 812 093 participants online · referendum active", zh: "▸ 实况 · 全体合格公民 · 4 812 093 人在线 · 公投进行中" },
    liquid:     { en: "▸ DELEGATION MESH · 2 114 active delegate chains · revocable at any time · trust audited", zh: "▸ 委托网络 · 2 114 条活跃委托链 · 随时可撤 · 信任已审计" },
    assisted:   { en: "▸ AI FORECAST READY · 1.2M comments parsed · policy impact model v3.2 loaded · humans decide", zh: "▸ AI预测就绪 · 1.2M条评论已解析 · 政策影响模型v3.2已加载 · 由人类决定" },
    automated:  { en: "▸ RULE ENGINE v2.4 · 38 live policy rules · 0 manual overrides today · audit log open", zh: "▸ 规则引擎 v2.4 · 38 条活跃政策规则 · 今日0次人工覆议 · 审计日志开放" },
  };
  const text = (tickers[modeKey] ?? tickers.assisted)[lang];

  return (
    <div className="overflow-hidden rounded-sm" style={{ borderTop: `1px solid ${accent}22` }}>
      <div className="flex whitespace-nowrap ticker py-1">
        <span className="mono text-[0.6rem] tracking-wide px-4" style={{ color: `${accent}99` }}>
          {text}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;{text}
        </span>
      </div>
    </div>
  );
}

export default function DigitalGovernance() {
  const { lang } = useLang();
  const [modeKey, setModeKey] = useState<string>("assisted");
  const mode = GOV_MODES.find((m) => m.key === modeKey) ?? GOV_MODES[2];
  const lines = MODE_LINES[mode.key] ?? [];

  return (
    <div className="holo rounded-2xl p-5 md:p-8">
      {/* ── header ── */}
      <div className="label-mono">Digital Democracy · 数字民主 · Section 08</div>
      <h3 className={`display mt-1 text-2xl text-ghost-50 md:text-3xl ${lang === "zh" ? "zh" : ""}`}>
        <T v={{ en: "When participation becomes continuous and computable", zh: "当参与变得连续，且可被计算" }} />
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ghost-300">
        <T
          v={{
            en: "The tools that could make governance more transparent and informed are the same tools that could automate manipulation. The question is who writes the code — and who can audit it.",
            zh: "那些本可让治理更透明、更知情的工具，与那些本可把操纵自动化的工具，是同一批工具。问题在于：谁来写那段代码——以及，谁能审计它。",
          }}
        />
      </p>

      <div className="my-7 h-px rule-civic" />

      {/* ══════════════════════════════════════════════════
          BLOCK A — Digital Concepts Grid
      ══════════════════════════════════════════════════ */}
      <div className="mb-4 label-mono">
        {lang === "zh" ? "数字概念阵列" : "Digital Concept Array"}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DIGITAL_CONCEPTS.map((c) => (
          <div
            key={c.key}
            className="holo flex flex-col rounded-xl border-l-2 p-4 rise-in"
            style={{ borderLeftColor: c.accent }}
          >
            {/* name */}
            <div
              className={`display text-base font-semibold ${lang === "zh" ? "zh" : ""}`}
              style={{ color: c.accent }}
            >
              <T v={c.name} />
            </div>

            {/* status pip */}
            <div className="mt-1.5 flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full pulse"
                style={{ background: c.accent }}
              />
              <span className="mono text-[0.58rem] tracking-widest uppercase text-ghost-500">
                {lang === "zh" ? "运行中" : "active"}
              </span>
            </div>

            {/* gloss */}
            <p className={`mt-2.5 flex-1 text-[0.78rem] leading-relaxed text-ghost-300 ${lang === "zh" ? "zh" : ""}`}>
              <T v={c.gloss} />
            </p>

            {/* tension bar */}
            <TensionBar tension={c.tension} accent={c.accent} />
          </div>
        ))}
      </div>

      <div className="my-8 h-px rule-civic opacity-60" />

      {/* ══════════════════════════════════════════════════
          BLOCK B — Governance Mode Console
      ══════════════════════════════════════════════════ */}
      <div className="mb-4">
        <div className="label-mono">
          {lang === "zh" ? "治理模式控制台" : "Governance Mode Console"}
        </div>
        <div className={`display mt-1 text-lg text-ghost-50 ${lang === "zh" ? "zh" : ""}`}>
          <T v={{ en: "Four futures of self-rule", zh: "自治的四种未来" }} />
        </div>
      </div>

      {/* mode pills */}
      <div className="mb-5 flex flex-wrap gap-2">
        {GOV_MODES.map((m) => {
          const active = m.key === modeKey;
          return (
            <button
              key={m.key}
              onClick={() => setModeKey(m.key)}
              className="rounded-full border px-3.5 py-1.5 text-xs transition-all duration-200 font-mono"
              style={{
                color: active ? "#05080f" : m.accent,
                background: active ? m.accent : `${m.accent}14`,
                borderColor: active ? m.accent : `${m.accent}50`,
                boxShadow: active ? `0 0 16px -4px ${m.accent}88` : undefined,
              }}
              aria-pressed={active}
            >
              <span className={lang === "zh" ? "zh" : ""}>
                <T v={m.name} />
              </span>
            </button>
          );
        })}
      </div>

      {/* console panel */}
      <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${mode.accent}28` }}>
        {/* title bar */}
        <div
          className="flex items-center justify-between gap-2 px-4 py-2.5"
          style={{ background: `${mode.accent}0d`, borderBottom: `1px solid ${mode.accent}20` }}
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: "#b8893f" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: "#caa75e" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: mode.accent }} />
            <span className="mono ml-2 text-[0.6rem] uppercase tracking-wider text-ghost-500">
              governance.console // {mode.key}.sh
            </span>
          </div>
          <span
            className="mono text-[0.6rem] uppercase tracking-widest pulse"
            style={{ color: mode.accent }}
          >
            {lang === "zh" ? "● 运行中" : "● running"}
          </span>
        </div>

        {/* main console body — left: readout, right: schematic */}
        <div className="grid gap-0 md:grid-cols-[1fr_180px]">
          {/* terminal readout */}
          <div className="p-4 md:p-5 bg-ink-950/60">
            {/* mode header line */}
            <div className="mono text-[0.72rem]" style={{ color: mode.accent }}>
              {lang === "zh" ? "$ 模式 = " : "$ mode = "}
              <span className="font-semibold">{mode.name[lang]}</span>
            </div>

            {/* output lines */}
            <div key={mode.key} className="lang-fade mt-3 space-y-2">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`mono text-[0.78rem] leading-relaxed text-ghost-200 ${lang === "zh" ? "zh" : ""}`}
                >
                  {line[lang]}
                </div>
              ))}
              {/* blinking caret */}
              <div className="mono text-[0.78rem]" style={{ color: mode.accent }}>
                <span className="caret">▋</span>
              </div>
            </div>
          </div>

          {/* schematic diagram */}
          <div
            className="hidden md:flex flex-col items-center justify-center p-4"
            style={{ borderLeft: `1px solid ${mode.accent}18`, background: `${mode.accent}06` }}
          >
            <div className="mono text-[0.55rem] uppercase tracking-wider text-ghost-500 mb-1">
              {lang === "zh" ? "流程图" : "flow map"}
            </div>
            <ModeSchematic modeKey={mode.key} accent={mode.accent} />
          </div>
        </div>

        {/* ticker bar */}
        <TickerLine modeKey={mode.key} accent={mode.accent} />
      </div>

      {/* logic + cost cards */}
      <div key={`meta-${mode.key}`} className="lang-fade mt-4 grid gap-3 sm:grid-cols-2">
        {/* logic */}
        <div
          className="rounded-lg border border-l-2 bg-ink-800/60 p-4"
          style={{
            borderColor: "rgba(255,255,255,0.05)",
            borderLeftColor: mode.accent,
          }}
        >
          <div className="label-mono" style={{ color: mode.accent }}>
            {lang === "zh" ? "逻辑" : "LOGIC"}
          </div>
          <p className={`mt-1.5 text-sm leading-relaxed text-ghost-200 ${lang === "zh" ? "zh" : ""}`}>
            <T v={mode.logic} />
          </p>
        </div>

        {/* cost / trade-off */}
        <div
          className="rounded-lg border border-l-2 bg-ink-800/60 p-4"
          style={{
            borderColor: "rgba(255,255,255,0.05)",
            borderLeftColor: "#e6b65c",
          }}
        >
          <div className="label-mono text-amber-400">
            {lang === "zh" ? "代价" : "TRADE-OFF"}
          </div>
          <p className={`mt-1.5 text-sm leading-relaxed text-ghost-200 ${lang === "zh" ? "zh" : ""}`}>
            <T v={mode.cost} />
          </p>
        </div>
      </div>

      {/* bottom note */}
      <p className="mt-6 text-center text-[0.72rem] leading-relaxed text-ghost-500">
        <T
          v={{
            en: "The question is not whether democracy becomes digital — but who writes the code, who audits it, and whether participation deepens or is merely simulated.",
            zh: "问题不在于民主是否会变得数字化——而在于：谁来写那段代码，谁能审计它，以及——参与，是变得更深了，还是仅仅被模拟了出来。",
          }}
        />
      </p>
    </div>
  );
}
