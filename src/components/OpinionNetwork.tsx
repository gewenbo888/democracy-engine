"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { T, useLang, t } from "./lang";
import { MEDIA_REGIMES, MEDIA_FORCES } from "./content";

/* ─── types ─────────────────────────────────────────────────── */
type Citizen = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opinion: number; // 0..1
  seed: number;
};

/* ─── helpers ───────────────────────────────────────────────── */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

// lerp between azure(0) and amber(1)
const AZURE: [number, number, number] = [79, 159, 255]; // #4f9fff
const AMBER: [number, number, number] = [230, 182, 92]; // #e6b65c
const MID: [number, number, number] = [149, 162, 194]; // #95a2c2

function opinionColor(op: number, alpha = 1): string {
  let r: number, g: number, b: number;
  if (op < 0.5) {
    const t2 = op / 0.5;
    r = Math.round(AZURE[0] + (MID[0] - AZURE[0]) * t2);
    g = Math.round(AZURE[1] + (MID[1] - AZURE[1]) * t2);
    b = Math.round(AZURE[2] + (MID[2] - AZURE[2]) * t2);
  } else {
    const t2 = (op - 0.5) / 0.5;
    r = Math.round(MID[0] + (AMBER[0] - MID[0]) * t2);
    g = Math.round(MID[1] + (AMBER[1] - MID[1]) * t2);
    b = Math.round(MID[2] + (AMBER[2] - MID[2]) * t2);
  }
  return alpha < 1
    ? `rgba(${r},${g},${b},${alpha.toFixed(2)})`
    : `rgb(${r},${g},${b})`;
}

function buildCitizens(count: number): Citizen[] {
  const arr: Citizen[] = [];
  for (let i = 0; i < count; i++) {
    const seed = (i * 2654435761) >>> 0;
    const r1 = ((seed ^ (seed >> 16)) * 0x45d9f3b) >>> 0;
    const r2 = ((r1 ^ (r1 >> 16)) * 0x45d9f3b) >>> 0;
    const r3 = ((r2 ^ (r2 >> 16)) * 0x45d9f3b) >>> 0;
    arr.push({
      x: (r1 >>> 0) / 4294967295,
      y: (r2 >>> 0) / 4294967295,
      vx: 0,
      vy: 0,
      opinion: (r3 >>> 0) / 4294967295,
      seed: i,
    });
  }
  return arr;
}

/* ─── metrics ───────────────────────────────────────────────── */
function computeMetrics(citizens: Citizen[]): { sharedReality: number; polarization: number } {
  const n = citizens.length;
  if (n === 0) return { sharedReality: 0, polarization: 0 };

  const mean = citizens.reduce((s, c) => s + c.opinion, 0) / n;
  const variance = citizens.reduce((s, c) => s + (c.opinion - mean) ** 2, 0) / n;
  // sharedReality: high when variance is low (everyone sees the same)
  const sharedReality = Math.max(0, 1 - variance * 8);

  // polarization: high when opinions cluster near 0 and 1
  const extremes = citizens.filter((c) => c.opinion < 0.2 || c.opinion > 0.8).length;
  const polarization = extremes / n;

  return { sharedReality, polarization };
}

/* ─── component ─────────────────────────────────────────────── */
const N_CITIZENS = 100;

export default function OpinionNetwork() {
  const { lang } = useLang();
  const zh = lang === "zh";

  // preset selection
  const [presetKey, setPresetKey] = useState<string>(MEDIA_REGIMES[0].key);
  const activePreset = MEDIA_REGIMES.find((r) => r.key === presetKey) ?? MEDIA_REGIMES[0];

  // slider params (0..1)
  const [diversity, setDiversity] = useState(activePreset.diversity);
  const [homophily, setHomophily] = useState(activePreset.homophily);
  const [amplification, setAmplification] = useState(activePreset.amplification);

  // live metrics displayed in UI
  const [sharedReality, setSharedReality] = useState(0.5);
  const [polarization, setPolarization] = useState(0.2);

  // smooth animated metric bars
  const srAnimRef = useRef(0.5);
  const polAnimRef = useRef(0.2);

  // refs for hot-path animation state
  const citizensRef = useRef<Citizen[]>(buildCitizens(N_CITIZENS));
  const diversityRef = useRef(diversity);
  const homophilyRef = useRef(homophily);
  const amplificationRef = useRef(amplification);

  diversityRef.current = diversity;
  homophilyRef.current = homophily;
  amplificationRef.current = amplification;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef(0);
  const tickRef = useRef(0);
  const langRef = useRef(lang);
  langRef.current = lang;

  // apply preset params
  const applyPreset = useCallback((key: string) => {
    const r = MEDIA_REGIMES.find((m) => m.key === key);
    if (!r) return;
    setPresetKey(key);
    setDiversity(r.diversity);
    setHomophily(r.homophily);
    setAmplification(r.amplification);
  }, []);

  // main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let metricsUpdateCounter = 0;

    const tick = () => {
      const parent = canvas.parentElement;
      const cssW = parent ? parent.clientWidth : 640;
      const cssH = 340;
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      const pw = Math.round(cssW * dpr);
      const ph = Math.round(cssH * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
        canvas.style.width = `${cssW}px`;
        canvas.style.height = `${cssH}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const citizens = citizensRef.current;
      const div = diversityRef.current;
      const hom = homophilyRef.current;
      const amp = amplificationRef.current;
      tickRef.current++;

      // ── opinion update (bounded-confidence style) ────────────
      const baseRadius = 0.05 + div * 0.55; // listening radius in opinion-space
      const stepSize = 0.018;

      for (let i = 0; i < citizens.length; i++) {
        const a = citizens[i];
        let sum = 0;
        let count = 0;

        for (let j = 0; j < citizens.length; j++) {
          if (i === j) continue;
          const b = citizens[j];
          const opDiff = Math.abs(a.opinion - b.opinion);
          // homophily narrows actual listening radius based on similarity
          const effectiveRadius = baseRadius * (1 - hom * 0.7 * opDiff);
          if (opDiff < effectiveRadius) {
            sum += b.opinion;
            count++;
          }
        }

        if (count > 0) {
          const avg = sum / count;
          let nudge = (avg - a.opinion) * stepSize;

          // amplification: pushes toward extremes
          if (amp > 0.01) {
            const poleDir = a.opinion < 0.5 ? -1 : 1;
            const extremePull = amp * 0.012 * poleDir;
            nudge += extremePull;
          }

          a.opinion = Math.max(0, Math.min(1, a.opinion + nudge));
        }

        // slow spatial drift for visual liveliness
        const t0 = tickRef.current * 0.008;
        const wobbleX = Math.sin(t0 + a.seed * 2.1) * 0.0008;
        const wobbleY = Math.cos(t0 * 0.7 + a.seed * 1.4) * 0.0008;
        a.x = Math.max(0.02, Math.min(0.98, a.x + wobbleX));
        a.y = Math.max(0.02, Math.min(0.98, a.y + wobbleY));
      }

      // ── drawing ──────────────────────────────────────────────
      ctx.clearRect(0, 0, cssW, cssH);

      // bg gradient
      const bg = ctx.createLinearGradient(0, 0, 0, cssH);
      bg.addColorStop(0, "#080c18");
      bg.addColorStop(1, "#05080f");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cssW, cssH);

      // connection lines between mutually influencing nodes
      const connRadius = baseRadius * 0.9;
      ctx.lineWidth = 0.7;
      for (let i = 0; i < citizens.length; i++) {
        const a = citizens[i];
        for (let j = i + 1; j < citizens.length; j++) {
          const b = citizens[j];
          const opDiff = Math.abs(a.opinion - b.opinion);
          if (opDiff > connRadius) continue;
          const px = cssW * 0.02 + a.x * cssW * 0.96;
          const py = cssH * 0.04 + a.y * cssH * 0.92;
          const qx = cssW * 0.02 + b.x * cssW * 0.96;
          const qy = cssH * 0.04 + b.y * cssH * 0.92;
          const distPx = Math.hypot(px - qx, py - qy);
          if (distPx > 90) continue;
          const alpha = (1 - opDiff / connRadius) * 0.18 * (1 - distPx / 90);
          if (alpha < 0.02) continue;
          const midOp = (a.opinion + b.opinion) / 2;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(qx, qy);
          ctx.strokeStyle = opinionColor(midOp, alpha);
          ctx.stroke();
        }
      }

      // nodes
      for (const c of citizens) {
        const px = cssW * 0.02 + c.x * cssW * 0.96;
        const py = cssH * 0.04 + c.y * cssH * 0.92;
        const col = opinionColor(c.opinion);
        const glow = opinionColor(c.opinion, 0.35);

        // glow halo
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // node
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
      }

      // ── update metrics every 6 frames ───────────────────────
      metricsUpdateCounter++;
      if (metricsUpdateCounter >= 6) {
        metricsUpdateCounter = 0;
        const { sharedReality: sr, polarization: pol } = computeMetrics(citizens);
        srAnimRef.current += (sr - srAnimRef.current) * 0.08;
        polAnimRef.current += (pol - polAnimRef.current) * 0.08;
        setSharedReality(srAnimRef.current);
        setPolarization(polAnimRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sliderCls =
    "w-full appearance-none h-1 rounded-full bg-ink-700 cursor-pointer outline-none";

  const bi = {
    title: { en: "OPINION NETWORK", zh: "舆论网络" },
    sub: { en: "Self-rule is only as good as what the people can know", zh: "自治的好坏，不过等于人民所能知晓的好坏" },
    desc: {
      en: "Each node is a citizen holding an opinion between azure (0) and amber (1). Each frame, nodes nudge toward neighbors they can hear — shaped by the media regime's diversity, homophily, and amplification. Watch one shared reality converge or shatter.",
      zh: "每个节点是一位持有某种观点的公民，颜色从蔚蓝（0）到琥珀（1）。每一帧，节点向它能听见的邻居靠拢——由媒体制度的多样性、同质性与放大效应塑造。看一幅共同的现实，如何汇聚，或如何破碎。",
    },
    diversity: { en: "Exposure diversity", zh: "接触多样性" },
    homophily: { en: "Homophily", zh: "同质偏好" },
    amplification: { en: "Amplification", zh: "极端放大" },
    sharedReality: { en: "Shared reality", zh: "共享现实" },
    polarization: { en: "Polarization", zh: "极化程度" },
    presets: { en: "MEDIA REGIME", zh: "媒体制度" },
    forces: { en: "FORCES ON PUBLIC OPINION", zh: "作用于公共舆论的力量" },
  };

  return (
    <div className="holo w-full rounded-2xl p-5 md:p-8">
      {/* header */}
      <div className="mb-1 flex items-center gap-3">
        <span className="label-mono azure-text"><T v={bi.title} /></span>
        <span className="rule-civic h-px flex-1 opacity-40" />
      </div>
      <p className="mb-1 text-sm font-medium text-ghost-200">
        <T v={bi.sub} />
      </p>
      <p className="mb-6 max-w-2xl text-xs leading-relaxed text-ghost-500">
        <T v={bi.desc} />
      </p>

      {/* preset pills */}
      <div className="mb-4">
        <div className="label-mono mb-2 text-ghost-500"><T v={bi.presets} /></div>
        <div className="flex flex-wrap gap-2">
          {MEDIA_REGIMES.map((r) => {
            const on = r.key === presetKey;
            return (
              <button
                key={r.key}
                onClick={() => applyPreset(r.key)}
                className={`rounded-full border px-3 py-1 font-mono text-xs transition ${
                  on
                    ? "border-azure-500/60 bg-azure-500/20 text-azure-300"
                    : "border-azure-500/20 text-ghost-500 hover:text-azure-400"
                }`}
                style={on ? { boxShadow: `0 0 18px -6px ${r.accent}` } : undefined}
                aria-pressed={on}
              >
                <span style={{ color: on ? r.accent : undefined }}>
                  <T v={r.name} />
                </span>
              </button>
            );
          })}
        </div>
        {/* active preset description */}
        <p
          className="mt-2 text-[0.7rem] leading-relaxed transition-all"
          style={{ color: activePreset.accent + "cc" }}
        >
          <T v={activePreset.desc} />
        </p>
      </div>

      {/* main grid: canvas + controls */}
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
        {/* canvas */}
        <div className="relative overflow-hidden rounded-xl border border-azure-500/10 bg-ink-950">
          <canvas ref={canvasRef} className="block w-full" aria-hidden />
          {/* opinion spectrum legend */}
          <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-center gap-2">
            <span className="mono text-[0.55rem] text-azure-400">0</span>
            <div
              className="h-1 flex-1 rounded-full"
              style={{
                background: `linear-gradient(to right, #4f9fff, #95a2c2, #e6b65c)`,
              }}
            />
            <span className="mono text-[0.55rem] text-amber-500">1</span>
          </div>
        </div>

        {/* right panel: sliders + metrics */}
        <div className="flex flex-col gap-5">
          {/* sliders */}
          <div className="rounded-xl border border-azure-500/10 bg-ink-900/60 p-4">
            <div className="label-mono mb-3 text-ghost-400">
              {zh ? "参数" : "PARAMETERS"}
            </div>

            {[
              { label: bi.diversity, val: diversity, set: setDiversity, color: "#4f9fff" },
              { label: bi.homophily, val: homophily, set: setHomophily, color: "#e6b65c" },
              { label: bi.amplification, val: amplification, set: setAmplification, color: "#f0cd86" },
            ].map(({ label, val, set, color }) => (
              <div key={label.en} className="mb-3 last:mb-0">
                <div className="mb-1 flex justify-between">
                  <span className="text-[0.67rem] text-ghost-400"><T v={label} /></span>
                  <span className="mono text-[0.67rem]" style={{ color }}>
                    {Math.round(val * 100)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(val * 100)}
                  onChange={(e) => set(+e.target.value / 100)}
                  className={sliderCls}
                  style={{ accentColor: color }}
                  aria-label={t(label, lang)}
                />
              </div>
            ))}
          </div>

          {/* live metrics */}
          <div className="rounded-xl border border-azure-500/10 bg-ink-900/60 p-4">
            <div className="label-mono mb-3 text-ghost-400">
              {zh ? "实时指标" : "LIVE METRICS"}
            </div>

            {[
              {
                label: bi.sharedReality,
                val: sharedReality,
                color: "#4f9fff",
                bg: "#4f9fff",
              },
              {
                label: bi.polarization,
                val: polarization,
                color: "#e6b65c",
                bg: "#e6b65c",
              },
            ].map(({ label, val, color, bg }) => (
              <div key={label.en} className="mb-4 last:mb-0">
                <div className="mb-1.5 flex justify-between">
                  <span className="text-[0.67rem] text-ghost-300"><T v={label} /></span>
                  <span className="mono text-[0.67rem]" style={{ color }}>
                    {Math.round(val * 100)}
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                    style={{
                      width: `${val * 100}%`,
                      background: bg,
                      boxShadow: `0 0 8px ${bg}88`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* media forces */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="label-mono text-ghost-400"><T v={bi.forces} /></span>
          <span className="rule-civic h-px flex-1 opacity-25" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MEDIA_FORCES.map((f) => (
            <div
              key={f.key}
              className="flex gap-3 rounded-xl border p-3.5 transition hover:bg-ink-800/50"
              style={{
                borderColor: f.good ? "#3fd9c044" : "#e6b65c44",
                background: f.good ? "#3fd9c008" : "#e6b65c08",
              }}
            >
              {/* icon badge */}
              <div
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold"
                style={{
                  background: f.good ? "#3fd9c022" : "#e6b65c22",
                  color: f.good ? "#3fd9c0" : "#e6b65c",
                  border: `1px solid ${f.good ? "#3fd9c044" : "#e6b65c44"}`,
                }}
              >
                {f.good ? "↑" : "↓"}
              </div>
              <div className="min-w-0">
                <div
                  className="mb-0.5 text-[0.7rem] font-semibold leading-tight"
                  style={{ color: f.good ? "#6fe6d2" : "#f0cd86" }}
                >
                  <T v={f.name} />
                </div>
                <div className="text-[0.65rem] leading-relaxed text-ghost-500">
                  <T v={f.effect} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mono mt-6 text-center text-[0.58rem] tracking-widest text-ghost-500/50">
        {zh
          ? "共识 ← — — 一个共享的现实 — — → 极化"
          : "CONSENSUS  ←—  ONE SHARED REALITY  —→  POLARIZATION"}
      </p>
    </div>
  );
}
