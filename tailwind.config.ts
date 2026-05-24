import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // deep democratic midnight blue — the chamber before the lights come up
        ink: {
          950: "#05080f",
          900: "#080c18",
          800: "#0d1322",
          700: "#141d33",
          600: "#1d2944",
          500: "#283655",
        },
        // azure — luminous participation network, the many minds, the live signal (PRIMARY)
        azure: {
          600: "#2f7fe0",
          500: "#4f9fff",
          400: "#7bb8ff",
          300: "#a9d2ff",
        },
        // teal — consensus, collective intelligence, emergent agreement (SECONDARY)
        teal: {
          600: "#22b39a",
          500: "#3fd9c0",
          400: "#6fe6d2",
          300: "#a3f0e2",
        },
        // amber — legitimacy, the seal, the ballot, the vote cast (SPARSE EMPHASIS)
        amber: {
          600: "#cf9b3f",
          500: "#e6b65c",
          400: "#f0cd86",
          300: "#f6dfae",
        },
        // silver — institutional platinum, marble, neutral structure
        silver: {
          600: "#7986a6",
          500: "#95a2c2",
          400: "#b8c2dc",
          300: "#d8def0",
        },
        // light text on midnight — cool civic white
        ghost: {
          50: "#f5f8ff",
          100: "#e6ecfa",
          200: "#c4cfe6",
          300: "#97a3bf",
          500: "#69748f",
          700: "#39435c",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "ui-serif", "serif"],
        sans: ['"Newsreader"', "Georgia", "ui-serif", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        zh: ['"Noto Serif SC"', "serif"],
      },
      boxShadow: {
        marble: "inset 0 1px 0 rgba(123,184,255,0.08), 0 24px 60px -28px rgba(0,0,0,0.94)",
        glow: "0 0 40px -8px rgba(79,159,255,0.55)",
        glowteal: "0 0 36px -8px rgba(63,217,192,0.45)",
        glowamber: "0 0 34px -8px rgba(230,182,92,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
