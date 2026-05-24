"use client";

import { useState, useId } from "react";
import { DEMO_EPOCHS } from "./content";
import { T, useLang } from "./lang";

/**
 * An ascending ladder of the eight epochs through which collective
 * decision-making externalized and scaled — from the whispered consensus
 * of a band of kin to the networked participation of millions. Each rung
 * marks one step further out of a single human head and into something
 * durable, public, and shared.
 */
export default function DemocracyLadder() {
  const { lang } = useLang();
  const n = DEMO_EPOCHS.length;
  const [active, setActive] = useState(n - 1);
  const uid = useId().replace(/:/g, "");

  // ── SVG geometry ──────────────────────────────────────────────────────
  const W = 720;
  const rowH = 66;
  const padTop = 36;
  const padBottom = 36;
  const H = padTop + padBottom + (n - 1) * rowH;

  // The spine marches rightward as epochs climb — staircase of rising scale.
  const spineX = 108;      // x of the lowest node
  const stepX  = 28;       // each epoch steps right by this much
  const nameGap = 22;      // gap between node and epoch name label

  const xy = (i: number) => ({
    x: spineX + i * stepX,
    y: H - padBottom - i * rowH,
  });

  // Gradient-stop glow dots along the spine path
  const spinePath = DEMO_EPOCHS.map((_, i) => {
    const p = xy(i);
    return `${i === 0 ? "M" : "L"}${p.x},${p.y}`;
  }).join(" ");

  const cur = DEMO_EPOCHS[active];

  // Scale label — shows the rough social reach of each epoch
  const scaleLabels: Record<string, { en: string; zh: string }> = {
    band:     { en: "~50 people",   zh: "约50人" },
    council:  { en: "hundreds",     zh: "数百人" },
    assembly: { en: "thousands",    zh: "数千人" },
    republic: { en: "tens of thousands", zh: "数万人" },
    estates:  { en: "whole estates", zh: "各等级" },
    const:    { en: "millions",     zh: "数百万人" },
    mass:     { en: "all adults",   zh: "所有成年人" },
    network:  { en: "anyone online", zh: "网络中的任何人" },
  };

  return (
    <div className="holo rounded-2xl p-5 md:p-7">

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="label-mono mb-1">
            {lang === "zh" ? "集体决策的阶梯" : "The Ladder of Collective Decision"}
          </div>
          <h3 className={`display text-xl text-ghost-50 md:text-2xl ${lang === "zh" ? "zh" : ""}`}>
            <T v={{ en: "Eight epochs of scaling the decision", zh: "八个时代，放大「共同决定」" }} />
          </h3>
        </div>
        <div className="rule-civic h-px w-28 self-center opacity-60" />
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(260px,400px)_1fr] md:items-start">

        {/* ── SVG Ladder ───────────────────────────────────────────── */}
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="min-w-[480px] w-full"
            style={{ height: "auto" }}
            role="presentation"
          >
            <defs>
              {/* Multi-stop spine gradient climbing through accent colors */}
              <linearGradient id={`${uid}spineGrad`} x1="0" y1="1" x2="0.4" y2="0">
                {DEMO_EPOCHS.map((ep, i) => (
                  <stop
                    key={ep.key}
                    offset={`${(i / (n - 1)) * 100}%`}
                    stopColor={ep.accent}
                  />
                ))}
              </linearGradient>

              {/* Soft outer glow for active nodes */}
              <filter id={`${uid}glow`} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Subtle radial for node halos */}
              <filter id={`${uid}softGlow`} x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Faint horizontal baseline rules */}
            {DEMO_EPOCHS.map((ep, i) => {
              const p = xy(i);
              return (
                <line
                  key={`rule-${ep.key}`}
                  x1={spineX - 72}
                  y1={p.y}
                  x2={W - 16}
                  y2={p.y}
                  stroke="rgba(148,162,194,0.04)"
                  strokeWidth={1}
                />
              );
            })}

            {/* Spine: thick glow underlay + thin animated flow */}
            <path
              d={spinePath}
              fill="none"
              stroke={`url(#${uid}spineGrad)`}
              strokeWidth={12}
              opacity={0.12}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={spinePath}
              fill="none"
              stroke={`url(#${uid}spineGrad)`}
              strokeWidth={2.2}
              className="flow"
              opacity={0.9}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* ── Rungs ─────────────────────────────────────────────── */}
            {DEMO_EPOCHS.map((ep, i) => {
              const p   = xy(i);
              const on  = i === active;
              const sl  = scaleLabels[ep.key]?.[lang] ?? "";

              return (
                <g
                  key={ep.key}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="cursor-pointer"
                  role="button"
                  aria-label={ep.name[lang]}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActive(i); }}
                >
                  {/* Outer halo, visible only when active */}
                  {on && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={28}
                      fill={ep.accent}
                      opacity={0.12}
                      filter={`url(#${uid}softGlow)`}
                    />
                  )}

                  {/* Inner ring highlight */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={on ? 13 : 8}
                    fill={ep.accent}
                    opacity={on ? 0.22 : 0.1}
                    style={{ transition: "r 0.25s ease, opacity 0.25s ease" }}
                  />

                  {/* Core dot */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={on ? 6.5 : 4.5}
                    fill={ep.accent}
                    filter={on ? `url(#${uid}glow)` : undefined}
                    style={{ transition: "r 0.25s ease" }}
                  />
                  {/* Dark pupil to keep it crisp */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={on ? 6.5 : 4.5}
                    fill="none"
                    stroke="#07090f"
                    strokeWidth={1.2}
                    style={{ transition: "r 0.25s ease" }}
                  />

                  {/* Era label — left of the spine */}
                  <text
                    x={spineX - 80}
                    y={p.y + 4}
                    textAnchor="end"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize={9}
                    fill={on ? ep.accent : "#60687f"}
                    letterSpacing="0.04em"
                    style={{ transition: "fill 0.25s ease" }}
                  >
                    {ep.era[lang]}
                  </text>

                  {/* Epoch name — right of the node */}
                  <text
                    x={p.x + nameGap}
                    y={p.y + 4}
                    textAnchor="start"
                    fontSize={lang === "zh" ? 13 : 13}
                    fontFamily={lang === "zh" ? "'Noto Serif SC', serif" : "'Playfair Display', serif"}
                    fontWeight={600}
                    fill={on ? ep.accent : "#9aa3ba"}
                    style={{ transition: "fill 0.25s ease" }}
                  >
                    {ep.name[lang]}
                  </text>

                  {/* Scale reach label — to the far right */}
                  <text
                    x={W - 18}
                    y={p.y + 4}
                    textAnchor="end"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize={8.5}
                    fill={on ? ep.accent : "#3d4559"}
                    opacity={on ? 0.9 : 0.7}
                    style={{ transition: "fill 0.25s ease, opacity 0.25s ease" }}
                  >
                    {sl}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── Detail panel ─────────────────────────────────────────── */}
        <div
          key={`${active}-${lang}`}
          className="lang-fade rounded-xl border p-5"
          style={{
            borderColor: `${cur.accent}2e`,
            background: `${cur.accent}0b`,
          }}
        >
          {/* Epoch badge */}
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: cur.accent, boxShadow: `0 0 10px ${cur.accent}` }}
            />
            <span
              className="mono text-[0.65rem] uppercase tracking-widest"
              style={{ color: cur.accent }}
            >
              {cur.era[lang]}
            </span>
            <span className="mono text-[0.65rem] text-ghost-500 opacity-60">
              {scaleLabels[cur.key]?.[lang]}
            </span>
          </div>

          {/* Epoch name */}
          <div
            className={`display text-[1.18rem] font-semibold leading-snug ${lang === "zh" ? "zh" : ""}`}
            style={{ color: cur.accent }}
          >
            <T v={cur.name} />
          </div>

          {/* Gain description */}
          <p className="mt-3 text-[0.85rem] leading-relaxed text-ghost-200">
            <T v={cur.gain} />
          </p>

          {/* Step counter */}
          <div className="mt-4 flex items-center gap-1.5">
            {DEMO_EPOCHS.map((ep, i) => (
              <button
                key={ep.key}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "1.5rem" : "0.4rem",
                  background: i === active ? ep.accent : `${ep.accent}44`,
                }}
                aria-label={ep.name[lang]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="mt-6 border-t border-azure-500/10 pt-4 text-[0.75rem] leading-relaxed text-ghost-300">
        <span className="label-mono mr-2 align-middle">
          {lang === "zh" ? "如何阅读" : "how to read"}
        </span>
        <T
          v={{
            en: "Read bottom to top. Each rung marks one step in the long work of externalizing the act of deciding together — lifting it out of a single face-to-face circle and into something durable, public, and shared, so that cooperation could reach ever further among people who will never meet. Hover or tap a node.",
            zh: "从下往上读。每一级，都标记着「把共同决定这一行为外化出去」这项漫长工作中的一步——把它从一个面对面的圆圈中提起，搬进某种持久、公开、可共享的东西，让合作，能在素未谋面的人们之间，多伸展一点点。悬停或点击节点。",
          }}
        />
      </p>
    </div>
  );
}
