"use client";

import { useEffect, useState } from "react";
import { RECURSION_LAYERS } from "./content";
import { T, useLang } from "./lang";

/**
 * The recursive democracy engine. One move — take the dispersed judgment of
 * many minds and turn it into one legitimate, correctable collective decision —
 * re-emerges at every scale, from the tribal council around a fire up to
 * civilizational coordination. Run the engine and a rising signal lights each
 * layer in turn, stacking the passed scales beneath the one now active.
 * Democracy is not many inventions but a single transformation, iterated all
 * the way up the ladder of civilization.
 */
export default function DemocracyRecursionSim() {
  const { lang } = useLang();
  const n = RECURSION_LAYERS.length;
  // step = how many layers have been revealed (0 → none, n → all)
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= n) {
          setRunning(false);
          return s;
        }
        return s + 1;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [running, n]);

  const reset = () => {
    setRunning(false);
    setStep(0);
  };

  const play = () => {
    if (step >= n) setStep(0);
    setRunning(true);
  };

  const pause = () => setRunning(false);

  const step1 = () => {
    if (running) return;
    setStep((s) => Math.min(s + 1, n));
  };

  // the layer most recently revealed is the "current" one
  const cur = step > 0 ? RECURSION_LAYERS[step - 1] : null;
  const finished = step >= n;

  return (
    <div className="holo rounded-2xl p-5 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="label-mono">
            {lang === "zh" ? "递归民主引擎" : "recursive democracy engine"}
          </div>
          <h3 className={`mt-1 display text-xl azure-text md:text-2xl ${lang === "zh" ? "zh" : ""}`}>
            <T v={{ en: "One move, every scale", zh: "同一个动作，每一种尺度" }} />
          </h3>
          <p className={`mt-1 text-xs text-ghost-500 max-w-xl leading-relaxed ${lang === "zh" ? "zh" : ""}`}>
            <T
              v={{
                en: "At every scale the move is identical: take the dispersed judgment of many minds and turn it into one legitimate, correctable collective decision.",
                zh: "在每一种尺度上，动作都一样：取来众多心智那分散的判断，将其转化为一个合法、可纠正的集体决定。",
              }}
            />
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {!running ? (
            <button
              onClick={play}
              className="rounded-full border border-azure-500/30 bg-azure-500/20 px-4 py-1.5 font-mono text-xs text-azure-300 transition hover:border-azure-400 hover:bg-azure-500/30"
            >
              {finished ? (lang === "zh" ? "重新播放" : "replay") : (lang === "zh" ? "播放" : "play")}
            </button>
          ) : (
            <button
              onClick={pause}
              className="rounded-full border border-azure-500/30 bg-azure-500/20 px-4 py-1.5 font-mono text-xs text-azure-300 transition hover:border-azure-400 hover:bg-azure-500/30"
            >
              {lang === "zh" ? "暂停" : "pause"}
            </button>
          )}
          <button
            onClick={step1}
            disabled={running || finished}
            className="rounded-full border border-azure-500/30 px-4 py-1.5 font-mono text-xs text-ghost-500 transition hover:border-azure-400 hover:text-azure-400 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {lang === "zh" ? "步进" : "step"}
          </button>
          <button
            onClick={reset}
            className="rounded-full border border-azure-500/30 px-4 py-1.5 font-mono text-xs text-ghost-500 transition hover:border-azure-400 hover:text-azure-400"
          >
            {lang === "zh" ? "重置" : "reset"}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5 flex items-center gap-3">
        <span className="mono text-[0.6rem] text-ghost-500 shrink-0">
          {String(step).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <div className="h-1 flex-1 rounded-full bg-ink-700 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${(step / n) * 100}%`,
              background: cur
                ? `linear-gradient(90deg, #4f9fff, ${cur.color})`
                : "#4f9fff",
            }}
          />
        </div>
        {running && (
          <span className="mono text-[0.6rem] text-azure-400 pulse shrink-0">
            {lang === "zh" ? "运行中" : "running"}
          </span>
        )}
        {finished && !running && (
          <span className="mono text-[0.6rem] text-ghost-500 shrink-0">
            {lang === "zh" ? "完成" : "done"}
          </span>
        )}
      </div>

      {/* Current layer spotlight */}
      <div
        key={step}
        className="lang-fade mt-4 rounded-xl border p-4 transition-all duration-500 min-h-[5.5rem]"
        style={{
          borderColor: cur ? `${cur.color}55` : "rgba(154,166,192,0.1)",
          background: cur ? `${cur.color}12` : "rgba(13,19,34,0.5)",
        }}
      >
        {cur ? (
          <div className="flex items-start gap-3">
            {/* Glowing dot */}
            <span
              className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full"
              style={{
                background: cur.color,
                boxShadow: `0 0 18px ${cur.color}, 0 0 6px ${cur.color}`,
              }}
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className={`display text-lg font-semibold ${lang === "zh" ? "zh" : ""}`}
                  style={{ color: cur.color }}
                >
                  <T v={cur.name} />
                </span>
                <span className="label-mono text-[0.6rem] text-ghost-400">
                  <T v={cur.scale} />
                </span>
              </div>
              <p className={`mt-1.5 text-sm leading-relaxed text-ghost-100 ${lang === "zh" ? "zh" : ""}`}>
                <T v={cur.move} />
              </p>
            </div>
          </div>
        ) : (
          <p className={`text-sm leading-relaxed text-ghost-400 ${lang === "zh" ? "zh" : ""}`}>
            <T
              v={{
                en: "Press Play. The engine climbs scale by scale — from the tribal council to civilizational coordination — and the same move repeats at every rung.",
                zh: "按下「播放」。引擎将一级一级向上攀爬——从部落议事会，直到文明级协调——而同一个动作，在每一级都重复一次。",
              }}
            />
          </p>
        )}
      </div>

      {/* Accumulating ladder */}
      <div className="mt-4 grid gap-1.5">
        {RECURSION_LAYERS.map((l, i) => {
          const lit = i < step;
          const isCur = i === step - 1;
          return (
            <div
              key={l.k}
              className="grid items-center gap-2 rounded-lg border px-3 py-2.5 transition-all duration-500 grid-cols-[auto_1fr] sm:grid-cols-[1.75rem_160px_110px_1fr]"
              style={{
                borderColor: lit ? `${l.color}55` : "rgba(154,166,192,0.07)",
                background: isCur
                  ? `${l.color}18`
                  : lit
                  ? "rgba(154,166,192,0.03)"
                  : "transparent",
                opacity: lit ? 1 : 0.28,
                transform: isCur ? "translateX(2px)" : "none",
              }}
            >
              {/* Index + dot */}
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="mono text-[0.58rem] text-ghost-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Name */}
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300"
                  style={{
                    background: lit ? l.color : "transparent",
                    border: `2px solid ${l.color}`,
                    boxShadow: isCur ? `0 0 14px ${l.color}` : "none",
                  }}
                />
                <span
                  className={`display text-sm ${lang === "zh" ? "zh" : ""}`}
                  style={{ color: lit ? l.color : "#69748f" }}
                >
                  <T v={l.name} />
                </span>
              </div>

              {/* Scale tag — hidden on mobile */}
              <div className="hidden sm:block mono text-[0.6rem] text-ghost-400 truncate">
                <T v={l.scale} />
              </div>

              {/* Move description — hidden on mobile when not lit */}
              <div
                className={`text-xs leading-snug text-ghost-200 col-span-2 sm:col-span-1 ${!lit ? "hidden sm:block" : ""}`}
              >
                <T v={l.move} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Civilizational signal: the unifying claim */}
      <div
        className={`mt-5 rounded-xl border px-4 py-3.5 transition-all duration-700 ${finished ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{
          borderColor: "rgba(246,223,174,0.25)",
          background: "rgba(246,223,174,0.06)",
        }}
      >
        <p
          className={`text-sm leading-relaxed font-semibold ${lang === "zh" ? "zh" : ""}`}
          style={{ color: "#f6dfae" }}
        >
          <T
            v={{
              en: "Civilizational coordination: the same move, all the way up.",
              zh: "文明级协调：同一个动作，一路向上。",
            }}
          />
        </p>
      </div>

      {/* Bilingual explainer */}
      <p
        className={`mt-5 border-t border-azure-500/10 pt-4 text-sm leading-relaxed text-ghost-300 ${lang === "zh" ? "zh" : ""}`}
      >
        <T
          v={{
            en: "Run it bottom to top. At each layer the unit changes — kin, city, republic, nation, public, platform, algorithm, ledger, species, the coordination layer itself — but the move is identical: take the dispersed judgment of many minds and turn it into one legitimate, correctable collective decision, then carry that capacity up to the next scale. Democracy is not many inventions. It is one transformation, recursing all the way up the ladder of civilization.",
            zh: "从下往上运行它。在每一层，单元都在变化——血亲、城市、共和、民族、公众、平台、算法、账本、物种、乃至协调层本身——但那个动作始终如一：取来众多心智那分散的判断，将其转化为一个合法、可纠正的集体决定，再把这种能力带向下一个尺度。民主，不是许多项发明。它是同一种转化，一路递归到文明的阶梯之巅。",
          }}
        />
      </p>
    </div>
  );
}
