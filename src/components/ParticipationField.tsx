"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background — the participation network. A population of "citizens" drifts
 * across the field, each holding an opinion (a color on an azure → teal → amber
 * spectrum). Nearby citizens link into a luminous network. Periodically a
 * consensus wave ripples out from a point: as it passes, citizens nudge toward a
 * shared judgment and brighten — a collective decision forming — then opinions
 * slowly diversify again, and the rhythm repeats. The visual thesis of the site:
 * democracy turns many scattered minds into one coordinated decision, over and over.
 * Calm, slow, cinematic, so the hero title stays readable.
 */
export default function ParticipationField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0, dpr = 1;

    // opinion 0..1 mapped through azure(#4f9fff) → teal(#3fd9c0) → amber(#e6b65c)
    function opinionRGB(o: number): [number, number, number] {
      // two-stop gradient: 0→0.5 azure→teal, 0.5→1 teal→amber
      const stops: [number, [number, number, number]][] = [
        [0.0, [79, 159, 255]],
        [0.5, [63, 217, 192]],
        [1.0, [230, 182, 92]],
      ];
      let a = stops[0], b = stops[stops.length - 1];
      for (let i = 0; i < stops.length - 1; i++) {
        if (o >= stops[i][0] && o <= stops[i + 1][0]) { a = stops[i]; b = stops[i + 1]; break; }
      }
      const f = (o - a[0]) / Math.max(1e-6, b[0] - a[0]);
      return [
        Math.round(a[1][0] + (b[1][0] - a[1][0]) * f),
        Math.round(a[1][1] + (b[1][1] - a[1][1]) * f),
        Math.round(a[1][2] + (b[1][2] - a[1][2]) * f),
      ];
    }

    type Node = {
      x: number; y: number; vx: number; vy: number;
      o: number;      // opinion 0..1
      base: number;   // resting opinion it drifts back toward
      r: number; ph: number;
    };
    let nodes: Node[] = [];

    // consensus waves: expanding rings that pull opinions toward a target value
    type Wave = { x: number; y: number; t: number; target: number };
    let waves: Wave[] = [];

    function build() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width || window.innerWidth;
      h = rect.height || window.innerHeight;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.max(40, Math.min(90, Math.floor((w * h) / 15000)));
      nodes = Array.from({ length: n }, () => {
        const base = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          o: base,
          base,
          r: 1.0 + Math.random() * 2.0,
          ph: Math.random() * Math.PI * 2,
        };
      });
      waves = [];
    }

    let t = 0;
    let nextWave = 90; // frames until the first consensus wave

    function frame() {
      t += 1;
      ctx!.clearRect(0, 0, w, h);

      // spawn a consensus wave periodically
      nextWave -= 1;
      if (nextWave <= 0) {
        waves.push({
          x: (0.15 + 0.7 * Math.random()) * w,
          y: (0.15 + 0.7 * Math.random()) * h,
          t: 0,
          target: Math.random(),
        });
        nextWave = 360 + Math.floor(Math.random() * 240);
        if (waves.length > 3) waves.shift();
      }

      // advance waves
      const speed = Math.max(w, h) * 0.0042;
      for (const wv of waves) wv.t += 1;
      waves = waves.filter((wv) => wv.t * speed < Math.hypot(w, h) * 0.9);

      // --- update nodes ---
      for (const p of nodes) {
        p.vx += (Math.random() - 0.5) * 0.018;
        p.vy += (Math.random() - 0.5) * 0.018;
        p.vx *= 0.96; p.vy *= 0.96;
        p.x += p.vx; p.y += p.vy;
        p.ph += 0.013;

        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        // opinion slowly relaxes back toward its resting value (re-diversifies)
        p.o += (p.base - p.o) * 0.004;

        // a passing wavefront pulls opinion toward the wave target
        for (const wv of waves) {
          const radius = wv.t * speed;
          const d = Math.hypot(p.x - wv.x, p.y - wv.y);
          const band = Math.abs(d - radius);
          if (band < 46) {
            const pull = (1 - band / 46) * 0.06;
            p.o += (wv.target - p.o) * pull;
          }
        }
        p.o = Math.max(0, Math.min(1, p.o));
      }

      // --- connection lines: the participation network ---
      const maxD = 116;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            // lines glow brighter when the two citizens agree (similar opinion)
            const agree = 1 - Math.abs(a.o - b.o);
            const strength = (1 - d / maxD) * (0.32 + 0.5 * agree);
            if (strength <= 0.02) continue;
            const [r, g, bl] = opinionRGB((a.o + b.o) / 2);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${r},${g},${bl},${strength * 0.20})`;
            ctx!.lineWidth = 0.5 + strength * 0.6;
            ctx!.stroke();
          }
        }
      }

      // --- faint wavefronts ---
      for (const wv of waves) {
        const radius = wv.t * speed;
        const life = 1 - radius / (Math.hypot(w, h) * 0.9);
        const [r, g, bl] = opinionRGB(wv.target);
        ctx!.beginPath();
        ctx!.arc(wv.x, wv.y, radius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${r},${g},${bl},${0.10 * life})`;
        ctx!.lineWidth = 1.2;
        ctx!.stroke();
      }

      // --- citizens ---
      for (const p of nodes) {
        const tw = 0.5 + 0.5 * Math.sin(p.ph);
        const [r, g, bl] = opinionRGB(p.o);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r + 2.8, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${bl},${0.16 + 0.12 * tw})`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${bl},${0.5 + 0.4 * tw})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    build();
    frame();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => build());
      ro.observe(canvas);
    }
    window.addEventListener("resize", build);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      if (ro) ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
