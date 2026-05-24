"use client";

import { useMemo, useRef, useState } from "react";
import { useLang, t, T } from "./lang";
import { CANDIDATES, VOTER_BLOCS, VOTING_SYSTEMS, SOCIAL_CHOICE } from "./content";

/**
 * FLAGSHIP — the Voting Simulator.
 * A 1-D spatial electorate: voter blocs and candidates sit on a 0–100 opinion axis.
 * The SAME electorate is run through six voting systems; the winner can differ.
 * Drag the candidates, reshape the blocs, and watch the rule — not the voters —
 * decide the outcome. (Arrow's theorem, made tangible.)
 */

const C = CANDIDATES.length;
const BINS = 400;
const SIGMA = 9;          // spread of each bloc along the 0–100 axis
const APPROVAL_T = 20;    // approval threshold in axis units

type Result = {
  winner: number | null;      // candidate index, or null for proportional
  shares: number[];           // 0..1 per candidate (final tally for the method)
  rounds?: { tally: number[]; eliminated: number | null }[]; // IRV
  seats?: number[];           // proportional seat counts (sum 100)
  label2?: [number, number];  // runoff finalists
};

export default function VotingSimulator() {
  const { lang } = useLang();
  const svgRef = useRef<SVGSVGElement>(null);

  const [pos, setPos] = useState<number[]>(CANDIDATES.map((c) => c.pos));
  const [shares, setShares] = useState<number[]>(VOTER_BLOCS.map((b) => b.share));
  const [system, setSystem] = useState<string>("ranked");
  const [drag, setDrag] = useState<number | null>(null);

  // normalized bloc shares
  const normShares = useMemo(() => {
    const s = shares.reduce((a, b) => a + b, 0) || 1;
    return shares.map((x) => x / s);
  }, [shares]);

  // electorate as a normalized mass distribution along 0..100
  const mass = useMemo(() => {
    const m = new Float64Array(BINS);
    VOTER_BLOCS.forEach((b, i) => {
      const sh = normShares[i];
      for (let k = 0; k < BINS; k++) {
        const x = ((k + 0.5) / BINS) * 100;
        const d = x - b.center;
        m[k] += sh * Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
      }
    });
    let sum = 0;
    for (let k = 0; k < BINS; k++) sum += m[k];
    for (let k = 0; k < BINS; k++) m[k] /= sum || 1;
    return m;
  }, [normShares]);

  // helper: ranking of candidates by distance at bin x (closest first)
  function orderAt(x: number, remaining: number[]): number[] {
    return [...remaining].sort((a, b) => Math.abs(x - pos[a]) - Math.abs(x - pos[b]));
  }

  // first-choice (plurality) shares
  const first = useMemo(() => {
    const f = new Array(C).fill(0);
    for (let k = 0; k < BINS; k++) {
      const x = ((k + 0.5) / BINS) * 100;
      let best = 0, bd = Infinity;
      for (let c = 0; c < C; c++) {
        const d = Math.abs(x - pos[c]);
        if (d < bd) { bd = d; best = c; }
      }
      f[best] += mass[k];
    }
    return f;
  }, [mass, pos]);

  // compute the result for every system
  const results = useMemo<Record<string, Result>>(() => {
    const out: Record<string, Result> = {};

    // plurality
    {
      const winner = first.indexOf(Math.max(...first));
      out.plurality = { winner, shares: first.slice() };
    }

    // two-round runoff
    {
      const order = [...Array(C).keys()].sort((a, b) => first[b] - first[a]);
      const [a, b] = [order[0], order[1]];
      let sa = 0, sb = 0;
      for (let k = 0; k < BINS; k++) {
        const x = ((k + 0.5) / BINS) * 100;
        if (Math.abs(x - pos[a]) <= Math.abs(x - pos[b])) sa += mass[k]; else sb += mass[k];
      }
      const sh = new Array(C).fill(0); sh[a] = sa; sh[b] = sb;
      // if someone already has a first-round majority, they win outright
      const maj = first.findIndex((v) => v > 0.5);
      out.runoff = maj >= 0
        ? { winner: maj, shares: first.slice(), label2: [a, b] }
        : { winner: sa >= sb ? a : b, shares: sh, label2: [a, b] };
    }

    // ranked-choice / instant runoff
    {
      let remaining = [...Array(C).keys()];
      const rounds: { tally: number[]; eliminated: number | null }[] = [];
      let winner: number | null = null;
      while (remaining.length > 0) {
        const tally = new Array(C).fill(0);
        for (let k = 0; k < BINS; k++) {
          const x = ((k + 0.5) / BINS) * 100;
          const o = orderAt(x, remaining);
          tally[o[0]] += mass[k];
        }
        const total = remaining.reduce((s, c) => s + tally[c], 0) || 1;
        const leader = remaining.reduce((a, b) => (tally[a] >= tally[b] ? a : b));
        if (tally[leader] / total > 0.5 || remaining.length === 1) {
          rounds.push({ tally: tally.slice(), eliminated: null });
          winner = leader;
          break;
        }
        const loser = remaining.reduce((a, b) => (tally[a] <= tally[b] ? a : b));
        rounds.push({ tally: tally.slice(), eliminated: loser });
        remaining = remaining.filter((c) => c !== loser);
      }
      const finalTally = rounds[rounds.length - 1].tally;
      out.ranked = { winner, shares: finalTally, rounds };
    }

    // Borda count
    {
      const pts = new Array(C).fill(0);
      for (let k = 0; k < BINS; k++) {
        const x = ((k + 0.5) / BINS) * 100;
        const o = orderAt(x, [...Array(C).keys()]);
        o.forEach((c, rank) => { pts[c] += mass[k] * (C - 1 - rank); });
      }
      const sum = pts.reduce((a, b) => a + b, 0) || 1;
      const norm = pts.map((p) => p / sum);
      out.borda = { winner: pts.indexOf(Math.max(...pts)), shares: norm };
    }

    // approval
    {
      const app = new Array(C).fill(0);
      for (let k = 0; k < BINS; k++) {
        const x = ((k + 0.5) / BINS) * 100;
        let any = false;
        for (let c = 0; c < C; c++) {
          if (Math.abs(x - pos[c]) <= APPROVAL_T) { app[c] += mass[k]; any = true; }
        }
        if (!any) {
          let best = 0, bd = Infinity;
          for (let c = 0; c < C; c++) { const d = Math.abs(x - pos[c]); if (d < bd) { bd = d; best = c; } }
          app[best] += mass[k];
        }
      }
      out.approval = { winner: app.indexOf(Math.max(...app)), shares: app };
    }

    // proportional — seats ∝ first choices (largest remainder, 100 seats)
    {
      const raw = first.map((f) => f * 100);
      const floors = raw.map((r) => Math.floor(r));
      let used = floors.reduce((a, b) => a + b, 0);
      const rema = raw.map((r, i) => ({ i, frac: r - Math.floor(r) })).sort((a, b) => b.frac - a.frac);
      const seats = floors.slice();
      let idx = 0;
      while (used < 100) { seats[rema[idx % C].i] += 1; used += 1; idx += 1; }
      out.proportional = { winner: null, shares: first.slice(), seats };
    }

    return out;
  }, [first, mass, pos]);

  // distinct winners across single-winner systems → the headline payoff
  const distinctWinners = useMemo(() => {
    const ws = ["plurality", "runoff", "ranked", "borda", "approval"]
      .map((k) => results[k]?.winner)
      .filter((w): w is number => w != null);
    return new Set(ws).size;
  }, [results]);

  // pointer drag of a candidate marker along the axis
  function clientToAxis(clientX: number) {
    const el = svgRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100));
  }
  function onMove(e: React.PointerEvent) {
    if (drag == null) return;
    const x = clientToAxis(e.clientX);
    setPos((p) => p.map((v, i) => (i === drag ? x : v)));
  }

  // mass → polyline area for the spectrum
  const maxMass = useMemo(() => Math.max(...Array.from(mass)), [mass]);
  const area = useMemo(() => {
    const pts: string[] = [];
    for (let k = 0; k < BINS; k++) {
      const x = ((k + 0.5) / BINS) * 100;
      const y = 100 - (mass[k] / (maxMass || 1)) * 88;
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return `0,100 ${pts.join(" ")} 100,100`;
  }, [mass, maxMass]);

  const fmt = (v: number) => `${(v * 100).toFixed(1)}%`;
  const sel = results[system];

  return (
    <div className="space-y-6">
      {/* headline */}
      <div className="holo rounded-xl p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="label-mono">Same electorate · 同一群选民</div>
          <div className="font-mono text-[0.7rem] text-ghost-500">
            {distinctWinners > 1 ? (
              <span className="text-amber-400">
                <T v={{ en: `${distinctWinners} different winners from the same votes →`, zh: `同样的选票，选出 ${distinctWinners} 个不同的胜者 →` }} />
              </span>
            ) : (
              <T v={{ en: "the rules happen to agree here — reshape the blocs", zh: "此处各规则恰好一致——试着重塑选民群" }} />
            )}
          </div>
        </div>

        {/* spectrum axis with draggable candidates */}
        <div className="mt-4">
          <svg
            ref={svgRef}
            viewBox="0 0 100 116"
            preserveAspectRatio="none"
            className="h-48 w-full touch-none select-none"
            onPointerMove={onMove}
            onPointerUp={() => setDrag(null)}
            onPointerLeave={() => setDrag(null)}
          >
            <defs>
              <linearGradient id="vs-spectrum" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4f9fff" />
                <stop offset="50%" stopColor="#3fd9c0" />
                <stop offset="100%" stopColor="#e6b65c" />
              </linearGradient>
            </defs>
            {/* electorate mass area */}
            <polygon points={area} fill="url(#vs-spectrum)" opacity="0.16" />
            <polyline
              points={area.split(" ").slice(1, -1).join(" ")}
              fill="none"
              stroke="url(#vs-spectrum)"
              strokeWidth="0.6"
              opacity="0.7"
              vectorEffect="non-scaling-stroke"
            />
            {/* bloc centers */}
            {VOTER_BLOCS.map((b, i) => (
              <line key={b.key} x1={b.center} y1="100" x2={b.center} y2="104"
                stroke={b.accent} strokeWidth="0.5" opacity="0.6" vectorEffect="non-scaling-stroke" />
            ))}
            {/* candidate markers (draggable) */}
            {CANDIDATES.map((c, i) => (
              <g key={c.key}
                 style={{ cursor: "ew-resize" }}
                 onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); setDrag(i); }}>
                <line x1={pos[i]} y1="8" x2={pos[i]} y2="100" stroke={c.accent} strokeWidth="0.5"
                      opacity="0.55" vectorEffect="non-scaling-stroke" />
                <circle cx={pos[i]} cy="8" r="3.4" fill="#05080f" stroke={c.accent} strokeWidth="1.4"
                        vectorEffect="non-scaling-stroke" />
                <circle cx={pos[i]} cy="8" r="1.3" fill={c.accent} />
              </g>
            ))}
          </svg>
          {/* candidate legend */}
          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.62rem] text-ghost-400">
            {CANDIDATES.map((c) => (
              <span key={c.key} className="inline-flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: c.accent }} />
                <span style={{ color: c.accent }}>{t(c.name, lang)}</span>
                <span className="text-ghost-500">· {t(c.tag, lang)}</span>
              </span>
            ))}
          </div>
          <div className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ghost-500">
            <T v={{ en: "← drag candidates · left–right opinion axis →", zh: "← 拖动候选人 · 左—右 立场轴 →" }} />
          </div>
        </div>

        {/* bloc sliders */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {VOTER_BLOCS.map((b, i) => (
            <div key={b.key}>
              <div className="flex items-center justify-between font-mono text-[0.62rem]">
                <span style={{ color: b.accent }}>{t(b.name, lang)}</span>
                <span className="text-ghost-500">{(normShares[i] * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range" min={0.02} max={0.6} step={0.01} value={shares[i]}
                onChange={(e) => setShares((s) => s.map((v, j) => (j === i ? +e.target.value : v)))}
                className="mt-1 w-full accent-azure-500"
                aria-label={t(b.name, lang)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* the six rules, same voters */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {VOTING_SYSTEMS.map((sys) => {
          const r = results[sys.key];
          const win = r?.winner != null ? CANDIDATES[r.winner] : null;
          const active = system === sys.key;
          return (
            <button
              key={sys.key}
              onClick={() => setSystem(sys.key)}
              className={`holo rounded-xl p-3 text-left transition ${active ? "ring-1 ring-azure-400/60" : ""}`}
              style={{ borderTopColor: sys.accent, borderTopWidth: 2 }}
            >
              <div className="font-mono text-[0.6rem] uppercase tracking-wider" style={{ color: sys.accent }}>
                {t(sys.name, lang)}
              </div>
              <div className="mt-0.5 text-[0.62rem] text-ghost-500">{t(sys.gloss, lang)}</div>
              <div className="mt-2 border-t border-ghost-700/40 pt-2">
                {win ? (
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: win.accent }} />
                    <span className="display text-sm" style={{ color: win.accent }}>{t(win.name, lang)}</span>
                  </div>
                ) : (
                  <div className="flex h-[18px] items-end gap-0.5" aria-hidden>
                    {r?.seats?.map((s, i) => (
                      <div key={i} className="w-full rounded-sm" style={{ height: `${Math.max(8, s)}%`, background: CANDIDATES[i].accent, opacity: 0.8 }} title={`${s}`} />
                    ))}
                  </div>
                )}
                <div className="mt-1 font-mono text-[0.55rem] text-ghost-500">
                  {win ? <T v={{ en: "winner", zh: "胜者" }} /> : <T v={{ en: "seats / 100", zh: "席位 / 100" }} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* selected-system detail */}
      <div className="holo rounded-xl p-5">
        {(() => {
          const sys = VOTING_SYSTEMS.find((s) => s.key === system)!;
          return (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="display text-xl text-ghost-50" style={{ color: sys.accent }}>{t(sys.name, lang)}</h4>
                <span className="font-mono text-[0.6rem] uppercase tracking-wider text-ghost-500">{t(sys.gloss, lang)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ghost-300">{t(sys.how, lang)}</p>

              {/* IRV rounds */}
              {system === "ranked" && sel.rounds && (
                <div className="mt-4 space-y-3">
                  {sel.rounds.map((rd, ri) => {
                    const total = rd.tally.reduce((a, b) => a + b, 0) || 1;
                    return (
                      <div key={ri}>
                        <div className="font-mono text-[0.58rem] uppercase tracking-wider text-ghost-500">
                          <T v={{ en: `Round ${ri + 1}`, zh: `第 ${ri + 1} 轮` }} />
                          {rd.eliminated != null && (
                            <span className="text-amber-400/80"> · <T v={{ en: "eliminate", zh: "淘汰" }} /> {t(CANDIDATES[rd.eliminated].name, lang)}</span>
                          )}
                        </div>
                        <div className="mt-1 space-y-1">
                          {CANDIDATES.map((c, ci) => {
                            const v = rd.tally[ci];
                            const gone = v === 0 && (ri > 0);
                            return (
                              <div key={ci} className={`flex items-center gap-2 ${gone ? "opacity-30" : ""}`}>
                                <span className="w-16 shrink-0 truncate text-[0.66rem]" style={{ color: c.accent }}>{t(c.name, lang)}</span>
                                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink-700">
                                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(v / total) * 100}%`, background: c.accent }} />
                                </div>
                                <span className="w-12 shrink-0 text-right font-mono text-[0.6rem] text-ghost-400">{fmt(v / total)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* proportional seats */}
              {system === "proportional" && sel.seats && (
                <div className="mt-4">
                  <div className="flex h-7 w-full overflow-hidden rounded-full">
                    {CANDIDATES.map((c, i) => (
                      <div key={i} style={{ width: `${sel.seats![i]}%`, background: c.accent }}
                           className="transition-all duration-500" title={`${t(c.name, lang)}: ${sel.seats![i]}`} />
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.62rem]">
                    {CANDIDATES.map((c, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5" style={{ color: c.accent }}>
                        <span className="inline-block h-2 w-2 rounded-full" style={{ background: c.accent }} />
                        {t(c.name, lang)} · {sel.seats![i]}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-ghost-500">
                    <T v={{ en: "No single winner — a parliament that mirrors the electorate, where governing means building a coalition.", zh: "没有单一胜者——一个映照选民的议会；执政，意味着组建一个联合政府。" }} />
                  </p>
                </div>
              )}

              {/* generic tally for plurality / runoff / borda / approval */}
              {["plurality", "runoff", "borda", "approval"].includes(system) && (
                <div className="mt-4 space-y-1">
                  {system === "runoff" && sel.label2 && (
                    <div className="mb-2 font-mono text-[0.58rem] uppercase tracking-wider text-ghost-500">
                      <T v={{ en: "second round:", zh: "第二轮：" }} /> {t(CANDIDATES[sel.label2[0]].name, lang)} vs {t(CANDIDATES[sel.label2[1]].name, lang)}
                    </div>
                  )}
                  {CANDIDATES.map((c, ci) => {
                    const tot = sel.shares.reduce((a, b) => a + b, 0) || 1;
                    const v = sel.shares[ci] / tot;
                    const isWin = sel.winner === ci;
                    return (
                      <div key={ci} className="flex items-center gap-2">
                        <span className="w-16 shrink-0 truncate text-[0.66rem]" style={{ color: c.accent }}>{t(c.name, lang)}</span>
                        <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-700">
                          <div className="h-full rounded-full transition-all duration-500"
                               style={{ width: `${v * 100}%`, background: c.accent, boxShadow: isWin ? `0 0 12px ${c.accent}` : "none" }} />
                        </div>
                        <span className="w-12 shrink-0 text-right font-mono text-[0.6rem] text-ghost-400">{fmt(v)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* social-choice ideas */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SOCIAL_CHOICE.map((s) => (
          <div key={s.key} className="holo rounded-xl p-4" style={{ borderTopColor: s.accent, borderTopWidth: 2 }}>
            <div className="display text-sm" style={{ color: s.accent }}>{t(s.name, lang)}</div>
            <p className="mt-1.5 text-xs leading-relaxed text-ghost-300">{t(s.claim, lang)}</p>
            <p className="mt-2 font-mono text-[0.62rem] leading-relaxed text-ghost-500">{t(s.caveat, lang)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
