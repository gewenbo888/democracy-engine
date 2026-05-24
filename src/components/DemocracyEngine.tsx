"use client";

import { ReactNode } from "react";
import { LangProvider, LangToggle, T, useLang } from "./lang";
import { SECTIONS, FUTURES, BIG_QUESTIONS } from "./content";
import ParticipationField from "./ParticipationField";
import DemocracyLadder from "./DemocracyLadder";
import LegitimacySim from "./LegitimacySim";
import VotingSimulator from "./VotingSimulator";
import OpinionNetwork from "./OpinionNetwork";
import SeparationOfPowers from "./SeparationOfPowers";
import InfluenceLab from "./InfluenceLab";
import CivilizationCompass from "./CivilizationCompass";
import DigitalGovernance from "./DigitalGovernance";
import FutureGov from "./FutureGov";
import CoordinationScale from "./CoordinationScale";
import DemocracyModel from "./DemocracyModel";
import DemocracyRecursionSim from "./DemocracyRecursionSim";

const VIS: Record<string, ReactNode> = {
  origin: <DemocracyLadder />,
  legitimacy: <LegitimacySim />,
  voting: <VotingSimulator />,
  information: <OpinionNetwork />,
  constitution: <SeparationOfPowers />,
  inequality: <InfluenceLab />,
  civilizations: <CivilizationCompass />,
  digital: <DigitalGovernance />,
  future: <FutureGov />,
  unified: (
    <div className="space-y-8">
      <CoordinationScale />
      <QuestionsGrid />
    </div>
  ),
};

function SealMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <g stroke="#4f9fff" strokeWidth="1" opacity="0.85">
        <line x1="16" y1="16" x2="16" y2="6" />
        <line x1="16" y1="16" x2="24.7" y2="11" />
        <line x1="16" y1="16" x2="24.7" y2="21" />
        <line x1="16" y1="16" x2="16" y2="26" />
        <line x1="16" y1="16" x2="7.3" y2="21" />
        <line x1="16" y1="16" x2="7.3" y2="11" />
      </g>
      <g fill="#7bb8ff">
        <circle cx="16" cy="6" r="1.6" />
        <circle cx="24.7" cy="11" r="1.6" />
        <circle cx="24.7" cy="21" r="1.6" />
        <circle cx="16" cy="26" r="1.6" />
        <circle cx="7.3" cy="21" r="1.6" />
        <circle cx="7.3" cy="11" r="1.6" />
      </g>
      <circle cx="16" cy="16" r="3" fill="#05080f" stroke="#3fd9c0" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="1.1" fill="#e6b65c" />
    </svg>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-azure-500/12 bg-ink-950/80 px-5 py-3 backdrop-blur md:px-9">
      <div className="flex items-center gap-3">
        <SealMark className="h-8 w-8" />
        <div className="leading-tight">
          <div className="display text-base text-ghost-50">Democracy Engine</div>
          <div className="zh text-[0.6rem] text-ghost-500">民主引擎</div>
        </div>
      </div>
      <nav className="hidden gap-5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ghost-500 xl:flex">
        <a href="#origin" className="hover:text-azure-400">Origin</a>
        <a href="#legitimacy" className="hover:text-azure-400">Legitimacy</a>
        <a href="#voting" className="hover:text-azure-400">Voting</a>
        <a href="#information" className="hover:text-azure-400">Information</a>
        <a href="#constitution" className="hover:text-azure-400">Institutions</a>
        <a href="#inequality" className="hover:text-azure-400">Inequality</a>
        <a href="#digital" className="hover:text-azure-400">Digital</a>
        <a href="#future" className="hover:text-azure-400">Future</a>
      </nav>
      <div className="flex items-center gap-3">
        <LangToggle />
        <a href="https://psyverse.fun" className="hidden font-mono text-[0.58rem] uppercase tracking-[0.18em] text-azure-400 hover:text-teal-400 sm:block">← Psyverse</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 z-0 opacity-90"><ParticipationField /></div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />
      <div className="relative z-20 mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="label-mono">Psyverse · An atlas of democracy & collective intelligence</div>
        <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ghost-500">
          EN · 中文 · council → assembly → republic → constitution → digital → planetary
        </div>
        <h1 className="display mt-6 text-5xl leading-[1.02] text-ghost-50 md:text-7xl">
          Democracy <span className="azure-text">Engine</span>
        </h1>
        <h2 className="zh mt-3 text-3xl text-ghost-200 md:text-5xl">民主引擎</h2>

        <p className="mt-9 max-w-2xl text-lg leading-relaxed text-ghost-100 md:text-xl">
          <T v={{
            en: "A society is a vast distributed system: knowledge, interests, and judgment scattered across millions of minds that no single ruler could ever hold at once. Democracy is one civilization-scale answer — a coordination technology for turning that dispersed intelligence into decisions legitimate enough to be obeyed, informed enough to be wise, and revisable enough to be corrected. This is the story of that machine: how it scaled from the council of elders to the networked assembly, what makes it stable, and where it is being rebuilt.",
            zh: "一个社会，是一套庞大的分布式系统：知识、利益与判断，散落在千百万个心智之中——没有任何一个统治者，能同时握住它们的全部。民主，是一个文明尺度的答案——一种协调技术，把那分散的智能，转化为这样的决定：合法到足以被服从，知情到足以有智慧，且可修订到足以被纠正。这，是关于那台机器的故事：它如何从长老议事，放大到联网的集会；是什么让它稳定；以及，它正在何处被重建。",
          }} />
        </p>

        <div className="mt-10 max-w-2xl holo rounded-lg p-6">
          <div className="label-mono">Central thesis · 核心论点</div>
          <p className="mt-3 text-xl leading-relaxed text-ghost-50 md:text-2xl">
            <T v={{
              en: "Democracy is not merely voting. It is civilization's attempt to coordinate millions of minds without collapsing into tyranny or chaos — to scale collective intelligence as fast as it scales complexity.",
              zh: "民主，并不仅仅是投票。它是文明的一次尝试——协调千百万个心智，而不坍缩为暴政或混乱；以不慢于它放大复杂性的速度，去放大集体的智能。",
            }} />
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ghost-500">
          <span>10 systems · 十大系统</span>
          <span>live voting simulator · 投票系统模拟</span>
          <span>7-term stability model · opinion network · civilization radar</span>
        </div>
      </div>
    </section>
  );
}

function SectionBlock({ num, id, title, sub, body, vis }: { num: string; id: string; title: any; sub: any; body: any; vis?: ReactNode }) {
  return (
    <section id={id} className="relative border-t border-azure-500/8 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline gap-4">
          <span className="display text-5xl text-azure-500/25">{num}</span>
          <div>
            <h2 className="display text-3xl text-ghost-50 md:text-4xl"><T v={title} /></h2>
            <h3 className="mt-1 text-lg text-teal-400"><T v={sub} /></h3>
          </div>
        </div>
        <div className="mt-5 h-px rule-civic opacity-50" />
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ghost-200"><T v={body} /></p>
        {vis && <div className="mt-12">{vis}</div>}
      </div>
    </section>
  );
}

function sectionProps(id: string) {
  const s = SECTIONS.find((x) => x.id === id)!;
  return { num: s.num, id: s.id, title: s.title, sub: s.sub, body: s.body };
}

/* ---- Section 10 : the open questions ---- */
function QuestionsGrid() {
  const { lang } = useLang();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {BIG_QUESTIONS.map((q, i) => (
        <div key={i} className="holo flex gap-4 rounded-xl p-5">
          <span className="mono shrink-0 text-2xl text-teal-400/60">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <div className={`text-base leading-snug text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={q.q} /></div>
            <p className="mt-2 font-mono text-[0.68rem] leading-relaxed text-teal-400/80"><T v={q.lens} /></p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Body() {
  const { lang } = useLang();
  return (
    <main className="relative bg-ink-950 text-ghost-100">
      <Header />
      <Hero />

      <div className="grid-bg border-y border-azure-500/12 bg-ink-900/60 py-2.5 overflow-hidden">
        <div className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.3em] text-azure-400/70 ticker inline-block">
          {(lang === "zh"
            ? "议事会 · 公民大会 · 民众 · 抽签 · 共和 · 元老院 · 等级会议 · 议会 · 选举权 · 选票 · 多数 · 少数权利 · 三权分立 · 制衡 · 联邦制 · 公投 · 比例代表 · 排序复选 · 协商 · 公共舆论 · 自由媒体 · 流动民主 · DAO · AI 治理 · 行星级协调 · "
            : "COUNCIL · ASSEMBLY · DEMOS · SORTITION · REPUBLIC · SENATE · ESTATES · PARLIAMENT · SUFFRAGE · BALLOT · MAJORITY · MINORITY RIGHTS · SEPARATION OF POWERS · CHECKS & BALANCES · FEDERALISM · REFERENDUM · PROPORTIONAL · RANKED CHOICE · DELIBERATION · PUBLIC OPINION · FREE PRESS · LIQUID DEMOCRACY · DAO · AI GOVERNANCE · PLANETARY COORDINATION · ").repeat(2)}
        </div>
      </div>

      {SECTIONS.map((s) => (
        <SectionBlock key={s.id} {...sectionProps(s.id)} vis={VIS[s.id]} />
      ))}

      {/* Meta-model */}
      <section id="model" className="relative border-t border-azure-500/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono">Meta-model · 元模型</div>
          <h2 className="display mt-3 text-3xl text-ghost-50 md:text-4xl">
            <T v={{ en: "The seven terms of democratic stability", zh: "民主稳定的七个项" }} />
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ghost-200">
            <T v={{
              en: "If democracy is a coordination machine, it can be decomposed. A tribal council, a mature mass democracy, a failing state, and a networked future are simply different weightings of the same seven terms. Compare their profiles and 'democracy' resolves into something measurable: which capacities a society has managed to raise, and which it has let fall.",
              zh: "如果民主是一台协调机器，它便可以被分解。一个部落议事会、一个成熟的大众民主、一个失败的国家、一种联网的未来，不过是同样七个项的不同加权。比较它们的剖面，「民主」便消解为某种可被测量之物：一个社会，已经设法立起哪几种能力，又任由哪几种坠落。",
            }} />
          </p>
          <p className="mt-6 max-w-3xl font-mono text-sm leading-relaxed text-teal-300/90">
            Democratic Stability = Participation + Legitimacy + Information Quality + Institutional Trust + Power Distribution + Conflict Resolution + Coordination Capacity
          </p>
          <div className="mt-12"><DemocracyModel /></div>
        </div>
      </section>

      {/* Recursive engine */}
      <section id="recursion" className="relative border-t border-azure-500/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono">Recursive engine · 递归引擎</div>
          <h2 className="display mt-3 text-3xl text-ghost-50 md:text-4xl">
            <T v={{ en: "Run the engine, scale by scale", zh: "逐尺度地，运行这台引擎" }} />
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ghost-200">
            <T v={{
              en: "The same move repeats from a circle of kin to a planetary civilization: take the dispersed judgment of many minds and turn it into one decision legitimate enough to be obeyed and correctable enough to be fixed. Each layer extends self-rule to a larger, more complex scale. Let it run.",
              zh: "同一个动作，从一个血亲的圆圈，到一个行星级文明，不断重复：取来众多心智那分散的判断，并把它转化为一个决定——合法到足以被服从，可纠正到足以被修复。每一层，都把自治伸展到更大、更复杂的尺度。让它运行起来。",
            }} />
          </p>
          <div className="mt-12"><DemocracyRecursionSim /></div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative border-t border-azure-500/8 px-6 py-32 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="display text-3xl leading-snug text-ghost-50 md:text-5xl">
            <T v={{ en: "Democracy is civilization's attempt to coordinate millions of minds without collapsing into tyranny or chaos.", zh: "民主，是文明协调千百万个心智、而不坍缩为暴政或混乱的那一次尝试。" }} />
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ghost-300">
            <T v={{
              en: "From the council of elders to the smart contract, the same project repeats: turn the dispersed intelligence of the many into legitimate, informed, revisable collective decisions. Democracy is not merely voting. It is distributed knowledge made into governance, the peaceful transfer of power, and the institutions that keep a temporary majority from becoming a permanent master. Its future may depend on one question: whether humanity can scale intelligence, participation, and coordination faster than complexity itself.",
              zh: "从长老议事，到智能合约，同一个工程不断重复：把众人那分散的智能，化为合法、知情、可修订的集体决定。民主，并不仅仅是投票。它是被化作治理的分散知识，是权力的和平移交，是那些让一个暂时的多数无法变成永久主人的制度。它的未来，或许取决于一个问题：人类能否以快过复杂性本身的速度，去放大智能、参与与协调。",
            }} />
          </p>
          <div className="mx-auto mt-10 max-w-xl rounded-lg border border-teal-500/25 bg-ink-900/60 p-5">
            <p className="text-xs leading-relaxed text-ghost-500">
              <T v={{
                en: "An educational synthesis of political philosophy, social-choice theory, systems theory, economics, information theory, and governance design. It compares political systems structurally rather than ideologically, states open questions as open, and treats every simulation as an illustrative model, not a verdict.",
                zh: "一份融合政治哲学、社会选择理论、系统论、经济学、信息论与治理设计的教育性综述。它从结构而非意识形态出发比较各政治体系，把悬而未决的问题如实陈述为悬而未决，并把每一个模拟都视为示意性的模型，而非定论。",
              }} />
            </p>
          </div>
          <div className="mx-auto mt-12 h-px w-40 rule-civic" />
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-azure-400/70">
            Democracy Engine · 民主引擎 · Psyverse · 2026
          </p>
        </div>
      </section>

      <footer className="border-t border-azure-500/12 bg-ink-950 px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <div className="display text-xl text-ghost-50">Democracy Engine</div>
            <div className="zh mt-1 text-sm text-ghost-300">民主引擎</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ghost-500">
              <T v={{ en: "The nature of democracy, collective intelligence, representation, institutions, and the civilization-scale coordination that self-rule makes possible.", zh: "民主、集体智能、代表制、制度，以及那使自治得以可能的、文明尺度的协调，之本质。" }} />
            </p>
          </div>
          <div>
            <div className="label-mono">Systems · 系统</div>
            <ul className="mt-4 space-y-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ghost-500">
              {SECTIONS.slice(0, 6).map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="hover:text-azure-400">{s.num} · <T v={s.title} /></a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label-mono">Companion archives</div>
            <ul className="mt-4 space-y-1.5 text-sm text-ghost-300">
              <li><a href="https://rule-of-law-engine.psyverse.fun" className="hover:text-teal-300">Rule of Law Engine · 法治引擎</a></li>
              <li><a href="https://equality-engine.psyverse.fun" className="hover:text-teal-300">Equality Engine · 平等引擎</a></li>
              <li><a href="https://civilization-kernel.psyverse.fun" className="hover:text-teal-300">Civilization Kernel · 文明内核</a></li>
              <li className="pt-3"><a href="https://psyverse.fun" className="text-azure-400 hover:text-teal-300">↩ All Psyverse archives</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 h-px max-w-7xl rule-civic" />
        <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between text-[0.58rem] uppercase tracking-[0.3em] text-ghost-500">
          <div>© 2026 Gewenbo · Psyverse</div>
          <div>EN · 中文 · educational</div>
        </div>
      </footer>
    </main>
  );
}

export default function DemocracyEngine() {
  return (
    <LangProvider>
      <Body />
    </LangProvider>
  );
}
