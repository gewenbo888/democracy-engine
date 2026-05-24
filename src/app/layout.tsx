import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const TITLE_EN =
  "Democracy Engine · The Nature of Democracy, Collective Intelligence, Representation & Civilizational Coordination";
const TITLE_ZH = "民主引擎 · 民主、集体智能、代表制与文明协调的本质";
const DESC =
  "A civilization-scale, bilingual exploration of democracy — not as elections alone, but as the coordination technology by which large, complex societies turn the distributed knowledge of millions of minds into legitimate, adaptive, peaceful self-government. From tribal councils to Athenian assemblies to constitutional republics to digital, blockchain, and AI-assisted governance.";

export const metadata: Metadata = {
  metadataBase: new URL("https://democracy-engine.psyverse.fun"),
  title: `${TITLE_EN} | ${TITLE_ZH}`,
  description: DESC,
  keywords: [
    "democracy", "collective intelligence", "representation", "governance", "legitimacy",
    "voting systems", "ranked-choice voting", "proportional representation", "direct democracy",
    "deliberative democracy", "liquid democracy", "participation", "public opinion",
    "separation of powers", "checks and balances", "constitution", "institutions", "civil service",
    "Athenian democracy", "Roman republic", "the wisdom of crowds", "Condorcet jury theorem",
    "median voter", "polarization", "echo chambers", "misinformation", "media ecosystem",
    "political philosophy", "social choice theory", "Arrow's theorem", "inequality and democracy",
    "lobbying", "populism", "authoritarianism", "technocracy", "digital democracy",
    "blockchain voting", "DAO governance", "AI governance", "algorithmic governance",
    "planetary governance", "civilization coordination", "self-government",
    "民主", "集体智能", "代表制", "治理", "合法性", "投票制度", "排序复选", "比例代表制",
    "直接民主", "协商民主", "流动民主", "参与", "公共舆论", "三权分立", "制衡", "宪法", "制度",
    "雅典民主", "罗马共和", "群体智慧", "孔多塞陪审团定理", "中位选民", "极化", "回音室",
    "虚假信息", "媒体生态", "政治哲学", "社会选择理论", "阿罗不可能定理", "不平等与民主",
    "游说", "民粹主义", "威权主义", "技术官僚", "数字民主", "区块链投票", "DAO 治理",
    "人工智能治理", "算法治理", "行星级治理", "文明协调", "自治",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: { canonical: "/", languages: { en: "/", "zh-CN": "/", "x-default": "/" } },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Democracy Engine · 民主引擎 — The Nature of Democracy, Collective Intelligence & Coordination" }],
    title: TITLE_EN,
    description:
      "From tribal councils to AI governance. A bilingual atlas of democracy — voting systems, collective intelligence, public opinion, institutions, inequality, digital and algorithmic governance, and the civilization-scale coordination that self-rule makes possible.",
    url: "https://democracy-engine.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    images: ["/twitter-image.png"],
    card: "summary_large_image",
    title: TITLE_EN,
    description: "Democracy is not merely voting. It is civilization's attempt to coordinate millions of minds without collapsing into tyranny or chaos. A bilingual exploration of democracy as coordination technology.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#05080f" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&family=Newsreader:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@300;400;500&family=Noto+Serif+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: TITLE_EN,
              alternateName: TITLE_ZH,
              description: DESC,
              url: "https://democracy-engine.psyverse.fun/",
              inLanguage: ["en", "zh-CN"],
              author: { "@type": "Person", name: "Gewenbo", url: "https://psyverse.fun/" },
              publisher: { "@type": "Organization", name: "Psyverse", url: "https://psyverse.fun/" },
            }),
          }}
        />
      </head>
      <body className="bg-ink-950 text-ghost-100 antialiased">
        {children}
        <Script src="https://analytics-dashboard-two-blue.vercel.app/tracker.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
