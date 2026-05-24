"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { T, t, useLang } from "./lang";
import { LEGIT_REGIMES, LEGIT_METERS } from "./content";

/* ─── helpers ─── */
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

function computeMeters(part: number, legit: number, constraint: number) {
  const stability =
    100 *
    clamp01(
      0.42 * legit +
        0.30 * part +
        0.28 * constraint -
        0.45 * Math.max(0, 0.55 - legit)
    );
  const coercion =
    100 * clamp01((1 - legit) * (0.55 + 0.45 * (1 - part)));
  const tyranny =
    100 * clamp01((1 - constraint) * (0.45 + 0.55 * (1 - part)));
  return { stability, coercion, tyranny };
}

/* ─── Meter color config ─── */
const METER_CFG: Record<
  "stability" | "coercion" | "tyranny",
  { track: string; fill: string; glow: string }
> = {
  stability: {
    track: "#0d1322",
    fill: "linear-gradient(90deg,#3fd9c0,#4f9fff)",
    glow: "#3fd9c0",
  },
  coercion: {
    track: "#0d1322",
    fill: "linear-gradient(90deg,#95a2c2,#e6b65c)",
    glow: "#e6b65c",
  },
  tyranny: {
    track: "#0d1322",
    fill: "linear-gradient(90deg,#e6b65c,#c0392b)",
    glow: "#c0392b",
  },
};

/* ─── Map dims ─── */
const MAP_PAD = 36; // px padding inside the canvas square

export default function LegitimacySim() {
  const { lang } = useLang();

  /* slider state */
  const [part, setPart] = useState(0.5);
  const [legit, setLegit] = useState(0.5);
  const [constraint, setConstraint] = useState(0.5);
  const [active, setActive] = useState<string | null>(null);

  /* animated meter display values (smooth) */
  const [dispStab, setDispStab] = useState(50);
  const [dispCoer, setDispCoer] = useState(50);
  const [dispTyr, setDispTyr] = useState(50);

  const targetRef = useRef({ stability: 50, coercion: 50, tyranny: 50 });
  const dispRef = useRef({ stability: 50, coercion: 50, tyranny: 50 });
  const rafRef = useRef(0);

  /* recompute targets on slider change */
  useEffect(() => {
    const m = computeMeters(part, legit, constraint);
    targetRef.current = m;
  }, [part, legit, constraint]);

  /* lerp animation loop */
  useEffect(() => {
    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min(0.08, (now - last) / 1000);
      last = now;
      const speed = 1 - Math.pow(0.02, dt); // ~5 time constants/s
      const d = dispRef.current;
      const tgt = targetRef.current;
      d.stability += (tgt.stability - d.stability) * speed * 6;
      d.coercion += (tgt.coercion - d.coercion) * speed * 6;
      d.tyranny += (tgt.tyranny - d.tyranny) * speed * 6;
      setDispStab(d.stability);
      setDispCoer(d.coercion);
      setDispTyr(d.tyranny);
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function applyRegime(rg: (typeof LEGIT_REGIMES)[number]) {
    setPart(rg.participation);
    setLegit(rg.legitimacy);
    setConstraint(rg.constraint);
    setActive(rg.key);
  }

  const activeRegime = LEGIT_REGIMES.find((r) => r.key === active) ?? null;
  const dispVals = { stability: dispStab, coercion: dispCoer, tyranny: dispTyr };

  /* ─── 2-D map canvas ─── */
  const mapRef = useRef<HTMLCanvasElement>(null);
  const mapSize = useRef(0);

  // draw the map
  useEffect(() => {
    const canvas = mapRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const rect = canvas.getBoundingClientRect();
    const side = rect.width;
    mapSize.current = side;
    canvas.width = side * dpr;
    canvas.height = side * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pad = MAP_PAD;
    const inner = side - pad * 2;

    function toXY(c: number, p: number) {
      // x = constraint (left=0 → right=1), y = participation (bottom=0 → top=1)
      return {
        px: pad + c * inner,
        py: pad + (1 - p) * inner,
      };
    }

    // background
    ctx.clearRect(0, 0, side, side);
    ctx.fillStyle = "#05080f";
    ctx.fillRect(0, 0, side, side);

    // quadrant shading
    // upper-right: high participation + high constraint → stable self-rule (faint teal)
    const gradTeal = ctx.createLinearGradient(pad + inner * 0.5, pad, side - pad * 0.5, pad + inner * 0.5);
    gradTeal.addColorStop(0, "rgba(63,217,192,0.0)");
    gradTeal.addColorStop(1, "rgba(63,217,192,0.13)");
    ctx.fillStyle = gradTeal;
    ctx.fillRect(pad + inner * 0.45, pad, inner * 0.55 + pad * 0.6, inner * 0.55 + pad * 0.6);

    // lower-left: low participation + low constraint → arbitrary rule (faint amber)
    const gradAmber = ctx.createLinearGradient(pad, pad + inner * 0.45, pad + inner * 0.5, side);
    gradAmber.addColorStop(0, "rgba(230,182,92,0.14)");
    gradAmber.addColorStop(1, "rgba(230,182,92,0.0)");
    ctx.fillStyle = gradAmber;
    ctx.fillRect(0, pad + inner * 0.45, pad + inner * 0.55, inner * 0.55 + pad * 0.6);

    // grid lines
    ctx.strokeStyle = "rgba(148,162,194,0.10)";
    ctx.lineWidth = 0.8;
    for (let i = 1; i < 4; i++) {
      const frac = i / 4;
      ctx.beginPath();
      ctx.moveTo(pad + frac * inner, pad);
      ctx.lineTo(pad + frac * inner, pad + inner);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pad, pad + frac * inner);
      ctx.lineTo(pad + inner, pad + frac * inner);
      ctx.stroke();
    }

    // axes border
    ctx.strokeStyle = "rgba(148,162,194,0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(pad, pad, inner, inner);

    // axis labels — x: constraint, y: participation
    ctx.font = `10px 'JetBrains Mono', monospace`;
    ctx.fillStyle = "rgba(148,162,194,0.60)";
    ctx.textAlign = "center";
    ctx.fillText(lang === "zh" ? "← 无约束" : "← unconstrained", pad + inner * 0.22, side - 8);
    ctx.fillText(lang === "zh" ? "受约束 →" : "constrained →", pad + inner * 0.78, side - 8);
    ctx.save();
    ctx.translate(11, pad + inner * 0.5);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(lang === "zh" ? "↑ 参与" : "↑ participation", 0, 0);
    ctx.restore();

    // region labels
    ctx.font = `9px 'JetBrains Mono', monospace`;
    ctx.fillStyle = "rgba(63,217,192,0.60)";
    ctx.textAlign = "right";
    ctx.fillText(lang === "zh" ? "稳定自治" : "stable self-rule", pad + inner - 4, pad + 14);

    ctx.fillStyle = "rgba(230,182,92,0.65)";
    ctx.textAlign = "left";
    ctx.fillText(lang === "zh" ? "专断之治" : "arbitrary rule", pad + 4, pad + inner - 5);

    // regime dots
    for (const rg of LEGIT_REGIMES) {
      const { px, py } = toXY(rg.constraint, rg.participation);
      const isActive = rg.key === active;

      // glow ring if active
      if (isActive) {
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        const gl = ctx.createRadialGradient(px, py, 2, px, py, 12);
        gl.addColorStop(0, rg.accent + "66");
        gl.addColorStop(1, rg.accent + "00");
        ctx.fillStyle = gl;
        ctx.fill();
      }

      // dot
      ctx.beginPath();
      ctx.arc(px, py, isActive ? 7 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? rg.accent : rg.accent + "bb";
      ctx.fill();
      ctx.strokeStyle = isActive ? "#f5f8ff" : rg.accent + "55";
      ctx.lineWidth = isActive ? 1.5 : 0.8;
      ctx.stroke();

      // label
      const labelKey = lang === "zh" ? rg.name.zh : rg.name.en;
      ctx.font = isActive ? `bold 9.5px 'JetBrains Mono', monospace` : `9px 'JetBrains Mono', monospace`;
      ctx.fillStyle = isActive ? "#f5f8ff" : rg.accent + "cc";
      ctx.textAlign = px > pad + inner * 0.55 ? "right" : "left";
      const lx = px > pad + inner * 0.55 ? px - 9 : px + 9;
      ctx.fillText(labelKey, lx, py + 4);
    }

    // current position marker (bright azure cross + circle)
    const cur = toXY(constraint, part);
    ctx.strokeStyle = "#4f9fff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cur.px - 10, cur.py);
    ctx.lineTo(cur.px + 10, cur.py);
    ctx.moveTo(cur.px, cur.py - 10);
    ctx.lineTo(cur.px, cur.py + 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cur.px, cur.py, 6, 0, Math.PI * 2);
    ctx.strokeStyle = "#7bb8ff";
    ctx.lineWidth = 2;
    ctx.stroke();
    // inner fill
    ctx.beginPath();
    ctx.arc(cur.px, cur.py, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#4f9fff";
    ctx.fill();

    // pulse ring (static — rAF drives re-draw from outside)
    ctx.beginPath();
    ctx.arc(cur.px, cur.py, 11, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(79,159,255,0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [part, legit, constraint, active, lang]);

  // resize observer for map
  useEffect(() => {
    const canvas = mapRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      // trigger redraw by forcing a tiny state update; actual draw is in the effect above
      setPart((p) => p);
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="holo rounded-2xl p-5 md:p-7">
      {/* header */}
      <div className="mb-1 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="label-mono">
            {lang === "zh"
              ? "合法性模拟 · 权力 · 同意"
              : "legitimacy sim · power · consent"}
          </div>
          <h3 className={`mt-1 display text-2xl text-ghost-50 md:text-3xl ${lang === "zh" ? "zh" : ""}`}>
            <T v={{ en: "The Legitimacy Engine", zh: "合法性引擎" }} />
          </h3>
        </div>
      </div>

      {/* description line */}
      <p className="mt-2 text-sm leading-relaxed text-ghost-300 max-w-2xl">
        <T
          v={{
            en: "Drag the three dials or pick a regime. Participation, legitimacy source, and power constraints combine to determine how far a society can coordinate without force — and how close it sits to tyranny.",
            zh: "拖动三个旋钮，或选择一种政体。参与度、合法性来源与权力约束三者，共同决定一个社会能在多大程度上无需暴力地协调运转——以及它距离暴政有多近。",
          }}
        />
      </p>

      {/* regime presets */}
      <div className="mt-5 flex flex-wrap gap-2">
        {LEGIT_REGIMES.map((rg) => {
          const on = active === rg.key;
          return (
            <button
              key={rg.key}
              onClick={() => applyRegime(rg)}
              className={`rounded-full border px-3.5 py-1.5 text-[0.72rem] font-mono transition ${lang === "zh" ? "zh" : ""}`}
              style={{
                borderColor: on ? rg.accent : "rgba(148,162,194,0.22)",
                background: on ? `${rg.accent}22` : "transparent",
                color: on ? "#f5f8ff" : "#69748f",
              }}
            >
              <T v={rg.name} />
            </button>
          );
        })}
      </div>

      {/* regime description */}
      <p
        key={active ?? "none"}
        className="lang-fade mt-3 min-h-[2.2em] text-sm leading-relaxed text-ghost-300"
      >
        {activeRegime ? (
          <>
            <span
              className="mr-1 inline-block h-2 w-2 rounded-full"
              style={{ background: activeRegime.accent }}
            />
            <T v={activeRegime.desc} />
          </>
        ) : null}
      </p>

      <div className="my-5 h-px rule-civic opacity-40" />

      {/* main body: sliders + map */}
      <div className="grid gap-7 lg:grid-cols-[1fr_auto]">
        {/* left: sliders + meters */}
        <div className="flex flex-col gap-0">
          {/* sliders */}
          <div className="grid gap-5 sm:grid-cols-1">
            <SliderRow
              label={{ en: "Participation", zh: "参与度" }}
              note={{
                en: "How broadly citizens take part in choosing and checking power.",
                zh: "公民参与选择与制衡权力的广泛程度。",
              }}
              value={part}
              color="#4f9fff"
              leftLabel={{ en: "excluded", zh: "被排斥" }}
              rightLabel={{ en: "universal", zh: "普遍" }}
              onChange={(v) => {
                setPart(v);
                setActive(null);
              }}
            />
            <SliderRow
              label={{ en: "Legitimacy source", zh: "合法性来源" }}
              note={{
                en: "How strongly the basis of authority is accepted as rightful by those governed.",
                zh: "统治的基础被被治者接受为正当的强度。",
              }}
              value={legit}
              color="#3fd9c0"
              leftLabel={{ en: "disputed", zh: "有争议" }}
              rightLabel={{ en: "deep belief", zh: "深层信仰" }}
              onChange={(v) => {
                setLegit(v);
                setActive(null);
              }}
            />
            <SliderRow
              label={{ en: "Power constraints", zh: "权力约束" }}
              note={{
                en: "How far checks, rules, and institutions limit what any single holder of power can do.",
                zh: "制衡机制、规则与制度，在多大程度上限制任何单一权力持有者的行为。",
              }}
              value={constraint}
              color="#e6b65c"
              leftLabel={{ en: "unchecked", zh: "无制衡" }}
              rightLabel={{ en: "constrained", zh: "受约束" }}
              onChange={(v) => {
                setConstraint(v);
                setActive(null);
              }}
            />
          </div>

          <div className="mt-7 h-px rule-civic opacity-30" />

          {/* live meters */}
          <div className="mt-6">
            <div className="label-mono mb-4">
              {lang === "zh" ? "实时读数" : "live readings"}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {LEGIT_METERS.map((m) => {
                const val = dispVals[m.key];
                const cfg = METER_CFG[m.key];
                return (
                  <div
                    key={m.key}
                    className="rounded-xl border border-silver-500/12 bg-ink-900/50 p-4"
                  >
                    <div className="flex items-baseline justify-between">
                      <span
                        className={`text-sm text-ghost-100 ${lang === "zh" ? "zh" : "display"}`}
                      >
                        <T v={m.label} />
                      </span>
                      <span
                        className="mono text-sm tabular-nums"
                        style={{
                          color:
                            m.key === "stability"
                              ? "#3fd9c0"
                              : m.key === "coercion"
                              ? "#e6b65c"
                              : "#c0392b",
                        }}
                      >
                        {Math.round(val)}
                      </span>
                    </div>
                    <div
                      className="relative mt-2.5 h-2 overflow-hidden rounded-full"
                      style={{ background: cfg.track }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${val}%`,
                          background: cfg.fill,
                          boxShadow: `0 0 10px ${cfg.glow}88`,
                          transition: "width 60ms linear",
                        }}
                      />
                    </div>
                    <p className="mt-2 text-[0.70rem] leading-relaxed text-ghost-300">
                      <T v={m.note} />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* right: 2-D legitimacy map */}
        <div className="flex flex-col gap-2 lg:w-[320px] xl:w-[360px]">
          <div className="label-mono">
            {lang === "zh" ? "合法性图谱" : "legitimacy map"}
          </div>
          <div className="relative overflow-hidden rounded-xl border border-azure-500/15 bg-ink-950">
            <canvas
              ref={mapRef}
              className="block aspect-square w-full"
              aria-label={
                lang === "zh"
                  ? "合法性二维分布图"
                  : "2-D legitimacy distribution map"
              }
            />
          </div>
          {/* map legend */}
          <div className="flex gap-4 text-[0.68rem] font-mono text-ghost-500 mt-1 px-0.5">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "#4f9fff" }}
              />
              {lang === "zh" ? "当前状态" : "current state"}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full border border-ghost-500/40"
                style={{ background: "transparent" }}
              />
              {lang === "zh" ? "政体预设" : "regime preset"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slider sub-component ─── */
function SliderRow({
  label,
  note,
  value,
  color,
  leftLabel,
  rightLabel,
  onChange,
}: {
  label: { en: string; zh: string };
  note: { en: string; zh: string };
  value: number;
  color: string;
  leftLabel: { en: string; zh: string };
  rightLabel: { en: string; zh: string };
  onChange: (v: number) => void;
}) {
  const { lang } = useLang();
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span
          className={`text-sm text-ghost-100 ${lang === "zh" ? "zh" : "display"}`}
        >
          <T v={label} />
        </span>
        <span className="mono text-sm tabular-nums" style={{ color }}>
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={t(label, lang)}
        className="mt-2.5 w-full cursor-pointer appearance-none rounded-full bg-ink-700
                   [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                   [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
                   [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
        style={{ height: 6, accentColor: color }}
      />
      <div className="mt-1 flex justify-between text-[0.65rem] font-mono text-ghost-500">
        <span>
          <T v={leftLabel} />
        </span>
        <span>
          <T v={rightLabel} />
        </span>
      </div>
      <p className="mt-0.5 text-[0.70rem] leading-relaxed text-ghost-500">
        <T v={note} />
      </p>
    </div>
  );
}
