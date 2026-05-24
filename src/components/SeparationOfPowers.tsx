"use client";

import { useState, useId } from "react";
import { useLang, t, T } from "./lang";
import { BRANCHES, CONST_PILLARS, POWER_REGIMES } from "./content";

/* ─── SVG canvas constants ─────────────────────────────────── */
const W = 680;
const H = 400;
const CX = W / 2;
const CY = H / 2 - 10;

// Triangle vertex positions at rest (balanced state)
// Top = Legislature, Bottom-Left = Executive, Bottom-Right = Judiciary
const REST: [number, number][] = [
  [CX, CY - 148],       // Legislature (top)
  [CX - 148, CY + 100], // Executive (bottom-left)
  [CX + 148, CY + 100], // Judiciary (bottom-right)
];

// Node radius at rest
const R_REST = 52;

/* ─── helpers ──────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Compute distorted node positions & sizes as concentration rises.
 *  At high concentration the Executive node (index 1) swells and
 *  the other two shrink and drift toward it. */
function distortedLayout(conc: number) {
  // t = 0 at conc=0, t=1 at conc=100
  const t = conc / 100;

  // Executive (index 1) is the dominant node
  const domX = CX - 20; // slight leftward pull for natural feel
  const domY = CY + 20;

  return REST.map(([rx, ry], i) => {
    const isDom = i === 1;
    if (isDom) {
      // swells and moves to near-center
      const x = lerp(rx, domX, t * 0.55);
      const y = lerp(ry, domY, t * 0.45);
      const r = lerp(R_REST, R_REST * 1.85, t);
      return { x, y, r };
    } else {
      // shrinks and drifts toward dominant node
      const x = lerp(rx, domX + (rx - domX) * 0.25, t * 0.7);
      const y = lerp(ry, domY + (ry - domY) * 0.25, t * 0.7);
      const r = lerp(R_REST, R_REST * 0.52, t);
      return { x, y, r };
    }
  });
}

/** Arrow path between two node edges */
function edgePath(
  x1: number, y1: number,
  x2: number, y2: number,
  r1: number, r2: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const sx = x1 + ux * (r1 + 4);
  const sy = y1 + uy * (r1 + 4);
  const ex = x2 - ux * (r2 + 4);
  const ey = y2 - uy * (r2 + 4);
  // Slight curve outward
  const perpX = -uy * 28;
  const perpY = ux * 28;
  const mx = (sx + ex) / 2 + perpX;
  const my = (sy + ey) / 2 + perpY;
  return `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
}

/* ─── small sub-components ─────────────────────────────────── */
interface NodeProps {
  x: number;
  y: number;
  r: number;
  accent: string;
  label: string;
  role: string;
  dominance: number; // 0..1
  isLang: "en" | "zh";
}
function BranchNode({ x, y, r, accent, label, role, dominance, isLang }: NodeProps) {
  const isDominant = dominance > 0.5;
  return (
    <g style={{ transition: "all 0.8s cubic-bezier(0.2,0.7,0.2,1)" }} transform={`translate(${x},${y})`}>
      {/* glow ring */}
      <circle
        cx={0} cy={0} r={r + 12}
        fill={accent}
        opacity={isDominant ? 0.18 * dominance : 0.06}
        style={{ transition: "all 0.8s ease" }}
      />
      {/* main circle */}
      <circle
        cx={0} cy={0} r={r}
        fill={`${accent}18`}
        stroke={accent}
        strokeWidth={isDominant ? 2.5 : 1.5}
        opacity={isDominant ? 1 : Math.max(0.3, 1 - dominance * 0.65)}
        style={{ transition: "all 0.8s ease" }}
      />
      {/* amber pulse overlay when dominant */}
      {isDominant && (
        <circle
          cx={0} cy={0} r={r * 0.9}
          fill="#e6b65c"
          opacity={0.08 + dominance * 0.12}
          className="pulse"
          style={{ transition: "opacity 0.8s ease" }}
        />
      )}
      {/* label */}
      <text
        x={0} y={r < 38 ? -r - 10 : -8}
        textAnchor="middle"
        fill={isDominant ? "#f0cd86" : accent}
        fontSize={r < 38 ? 11 : 13}
        className="display"
        opacity={Math.max(0.35, 1 - dominance * 0.5 + (isDominant ? 0.5 : 0))}
        style={{ transition: "all 0.8s ease" }}
      >
        {label}
      </text>
      {/* role — only show when not too shrunken */}
      {r > 30 && (
        <text
          x={0} y={6}
          textAnchor="middle"
          fill="#97a3bf"
          fontSize={Math.max(7, 9 * (r / R_REST))}
          className={isLang === "zh" ? "zh" : "mono"}
          opacity={Math.max(0, 1 - dominance * 0.8)}
          style={{ transition: "all 0.8s ease" }}
        >
          <tspan x={0} dy={0}>{role.split(" ").slice(0, 4).join(" ")}</tspan>
          {role.split(" ").length > 4 && (
            <tspan x={0} dy={14}>{role.split(" ").slice(4).join(" ")}</tspan>
          )}
        </text>
      )}
    </g>
  );
}

/* ─── PILLAR ICONS (simple inline SVG paths) ──────────────── */
const PILLAR_ICONS: Record<string, string> = {
  constitution: "M8 2h8l2 2v16a1 1 0 01-1 1H7a1 1 0 01-1-1V4l2-2zm0 0v3h8V2M8 10h8M8 14h6",
  press:        "M3 5h18M3 9h18M3 13h12M3 17h8",
  civil:        "M12 3l7 4v5c0 4.5-3 8.5-7 10C8 20.5 5 16.5 5 12V7l7-4z",
  rights:       "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
};

export default function SeparationOfPowers() {
  const { lang } = useLang();
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState<string>("parliamentary");

  const regime = POWER_REGIMES.find((r) => r.key === sel)!;
  const conc = regime.concentration; // 0..100
  const t0 = conc / 100;

  // How much "checks-and-balances" remain (fades arrows at high concentration)
  const checksStrength = Math.max(0, 1 - t0 * 1.05);

  // Layout
  const nodes = distortedLayout(conc);

  // Dominance per node for visual treatment
  const dominance = nodes.map((_, i) => (i === 1 ? t0 : 0));

  // Arrow pairs [from, to]
  const arrows: [number, number][] = [[0, 1], [1, 0], [1, 2], [2, 1], [0, 2], [2, 0]];

  return (
    <div className="space-y-8">
      {/* INTRO */}
      <p className="max-w-3xl text-sm leading-relaxed text-ghost-300">
        <T v={{
          en: "Democracy is not just an election. It is an architecture: three branches that each check the others, held in place by a constitution, a free press, a professional civil service, and rights no majority can dissolve. Select a regime below to watch that architecture hold — or collapse.",
          zh: "民主不只是一场选举。它是一种架构：三个部门互相制衡，由宪法、自由媒体、职业文官制度，以及任何多数都无法解散的权利，将其固定于原位。在下方选择一种政体，看这架构如何维系——或崩塌。",
        }} />
      </p>

      {/* REGIME SELECTOR PILLS */}
      <div className="flex flex-wrap gap-2">
        {POWER_REGIMES.map((r) => (
          <button
            key={r.key}
            onClick={() => setSel(r.key)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition ${
              sel === r.key
                ? "text-azure-300"
                : "text-ghost-500 hover:text-azure-400"
            }`}
            style={{
              borderColor: sel === r.key ? r.accent : "rgba(149,162,194,0.2)",
              background: sel === r.key ? `${r.accent}22` : "transparent",
            }}
          >
            <T v={r.name} />
          </button>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* ── SVG TRIANGLE DIAGRAM ── */}
        <div className="holo rounded-2xl p-3 lg:col-span-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label={t({ en: "Separation of powers diagram", zh: "权力分立示意图" }, lang)}>
            <defs>
              {/* Arrow markers per branch accent */}
              {BRANCHES.map((b) => (
                <marker
                  key={b.key}
                  id={`${uid}-ah-${b.key}`}
                  markerWidth="7" markerHeight="7"
                  refX="5.5" refY="3" orient="auto"
                >
                  <path d="M0,0 L6,3 L0,6 Z" fill={b.accent} />
                </marker>
              ))}
              {/* Radial glow for dominant node */}
              <radialGradient id={`${uid}-dom-glow`}>
                <stop offset="0%" stopColor="#e6b65c" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#e6b65c" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Dominant-power glow behind everything */}
            <ellipse
              cx={nodes[1].x}
              cy={nodes[1].y}
              rx={nodes[1].r * 1.6 * (1 + t0 * 0.8)}
              ry={nodes[1].r * 1.4 * (1 + t0 * 0.8)}
              fill={`url(#${uid}-dom-glow)`}
              opacity={t0 * 0.9}
              style={{ transition: "all 0.8s ease" }}
            />

            {/* Check-and-balance arrows */}
            {arrows.map(([from, to], k) => {
              const n0 = nodes[from];
              const n1 = nodes[to];
              const fromBranch = BRANCHES[from];
              const path = edgePath(n0.x, n0.y, n1.x, n1.y, n0.r, n1.r);
              // Arrows involving the dominant node fade more aggressively
              const involvesDom = from === 1 || to === 1;
              const opacity = involvesDom
                ? checksStrength * 0.75
                : checksStrength * 0.85;
              return (
                <path
                  key={k}
                  d={path}
                  fill="none"
                  stroke={fromBranch.accent}
                  strokeWidth={1.6 - t0 * 0.8}
                  strokeDasharray="5 4"
                  className="flow"
                  markerEnd={`url(#${uid}-ah-${fromBranch.key})`}
                  opacity={opacity}
                  style={{ transition: "opacity 0.8s ease, stroke-width 0.8s ease" }}
                />
              );
            })}

            {/* Branch nodes */}
            {BRANCHES.map((b, i) => (
              <BranchNode
                key={b.key}
                x={nodes[i].x}
                y={nodes[i].y}
                r={nodes[i].r}
                accent={b.accent}
                label={t(b.name, lang)}
                role={t(b.role, lang)}
                dominance={dominance[i]}
                isLang={lang}
              />
            ))}

            {/* Header label */}
            <text x={CX} y={22} textAnchor="middle" className="mono" fill="#dcc183" fontSize="10" letterSpacing="2.5">
              {lang === "zh" ? "制衡架构" : "CHECKS & BALANCES"}
            </text>
            <text x={CX} y={37} textAnchor="middle" className="mono" fill="#69748f" fontSize="9">
              {lang === "zh"
                ? `制衡强度 ${Math.round(checksStrength * 100)}%`
                : `check strength ${Math.round(checksStrength * 100)}%`}
            </text>

            {/* Branch name labels outside nodes at rest positions when very small */}
            {nodes.map((n, i) => {
              if (n.r >= 38) return null;
              const b = BRANCHES[i];
              // Place label away from center
              const dx = REST[i][0] - CX;
              const dy = REST[i][1] - CY;
              const len = Math.sqrt(dx * dx + dy * dy) || 1;
              const lx = n.x + (dx / len) * (n.r + 20);
              const ly = n.y + (dy / len) * (n.r + 16);
              return (
                <text
                  key={b.key}
                  x={lx} y={ly}
                  textAnchor="middle"
                  fill={b.accent}
                  fontSize={10}
                  className="display"
                  opacity={0.6}
                  style={{ transition: "all 0.8s ease" }}
                >
                  {t(b.name, lang)}
                </text>
              );
            })}
          </svg>
        </div>

        {/* ── RIGHT PANEL: GAUGE + READOUT ── */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Concentration gauge */}
          <div className="holo rounded-xl p-4">
            <div className="label-mono mb-3">{lang === "zh" ? "权力集中度" : "Power concentration"}</div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${conc}%`,
                  background: `linear-gradient(90deg, #4f9fff, ${regime.accent})`,
                  boxShadow: `0 0 14px ${regime.accent}99`,
                  transition: "width 0.8s cubic-bezier(0.2,0.7,0.2,1)",
                }}
              />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[0.6rem] uppercase tracking-wider text-ghost-500">
              <span>{lang === "zh" ? "分散" : "Dispersed"}</span>
              <span style={{ color: regime.accent }} className="text-xs font-semibold">{conc}</span>
              <span>{lang === "zh" ? "绝对" : "Absolute"}</span>
            </div>

            {/* Verbal scale */}
            <div className="mt-3 text-xs" style={{ color: regime.accent }}>
              <T v={regime.name} />
            </div>
          </div>

          {/* Checked by */}
          <div className="holo rounded-xl p-4">
            <div className="label-mono mb-2">{lang === "zh" ? "约束来自" : "Checked by"}</div>
            <p className="text-sm leading-relaxed" style={{ color: "#d8def0" }}>
              <T v={regime.checks} />
            </p>
          </div>

          {/* Description */}
          <div className="rounded-xl border border-azure-500/10 bg-ink-900/50 p-4">
            <p className="text-sm leading-relaxed text-ghost-300">
              <T v={regime.desc} />
            </p>
          </div>

          {/* Concentration signal */}
          {conc >= 70 && (
            <div className="rise-in rounded-xl border border-amber-500/25 bg-amber-500/6 p-3">
              <p className="text-xs leading-relaxed text-amber-400">
                <T v={{
                  en: "At this level of concentration, written rules exist but bend to the ruler. Checks are nominal; removal requires internal elite consensus, not the public will.",
                  zh: "在这种集中程度下，成文规则虽存在，却向统治者弯曲。制衡徒具名义；撤换需要精英内部的共识，而非公众的意志。",
                }} />
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CONST_PILLARS — supporting scaffold */}
      <div>
        <div className="label-mono mb-3">
          {lang === "zh" ? "宪政的四根支柱" : "The four constitutional pillars"}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONST_PILLARS.map((p) => (
            <div
              key={p.key}
              className="holo rounded-xl p-4 transition hover:border-azure-500/30"
            >
              {/* icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="#4f9fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 h-6 w-6 opacity-80">
                <path d={PILLAR_ICONS[p.key] ?? "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"} />
              </svg>
              <div className={`text-sm font-medium text-ghost-100 ${lang === "zh" ? "zh" : "display"}`}>
                <T v={p.name} />
              </div>
              <p className={`mt-1 text-xs leading-relaxed text-ghost-400 ${lang === "zh" ? "zh" : ""}`}>
                <T v={p.role} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BRANCH LEGEND */}
      <div>
        <div className="label-mono mb-3">
          {lang === "zh" ? "三权各司其职" : "The three branches"}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {BRANCHES.map((b) => (
            <div
              key={b.key}
              className="rounded-lg border bg-ink-900/40 p-3"
              style={{ borderColor: `${b.accent}28` }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: b.accent }} />
                <span className={`text-sm font-medium ${lang === "zh" ? "zh" : "display"}`} style={{ color: b.accent }}>
                  <T v={b.name} />
                </span>
              </div>
              <p className="text-xs leading-relaxed text-ghost-400">
                <T v={b.role} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
