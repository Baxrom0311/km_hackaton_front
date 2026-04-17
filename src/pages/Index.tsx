import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Monitor,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import demoGood from "@/assets/demo-good.jpg";
import demoBad from "@/assets/demo-bad.jpg";
import forecastShot from "@/assets/demo-forecast.jpg";
import screenDimming from "@/assets/screen-dimming.jpg";
import { useReveal, useCountUp } from "@/hooks/useReveal";

/* ═══════════════════════ SKELETON SVG ═══════════════════════ */

/* 33 ta MediaPipe BlazePose landmark — normalized [0..1] */
const POSE_LANDMARKS: [number, number][] = [
  [0.500, 0.100], // 0  nose
  [0.485, 0.085], // 1  left eye inner
  [0.470, 0.082], // 2  left eye
  [0.455, 0.085], // 3  left eye outer
  [0.515, 0.085], // 4  right eye inner
  [0.530, 0.082], // 5  right eye
  [0.545, 0.085], // 6  right eye outer
  [0.440, 0.095], // 7  left ear
  [0.560, 0.095], // 8  right ear
  [0.475, 0.118], // 9  mouth left
  [0.525, 0.118], // 10 mouth right
  [0.370, 0.250], // 11 left shoulder
  [0.630, 0.250], // 12 right shoulder
  [0.310, 0.400], // 13 left elbow
  [0.690, 0.400], // 14 right elbow
  [0.290, 0.530], // 15 left wrist
  [0.710, 0.530], // 16 right wrist
  [0.280, 0.550], // 17 left pinky
  [0.720, 0.550], // 18 right pinky
  [0.285, 0.545], // 19 left index
  [0.715, 0.545], // 20 right index
  [0.275, 0.540], // 21 left thumb
  [0.725, 0.540], // 22 right thumb
  [0.400, 0.530], // 23 left hip
  [0.600, 0.530], // 24 right hip
  [0.390, 0.700], // 25 left knee
  [0.610, 0.700], // 26 right knee
  [0.385, 0.870], // 27 left ankle
  [0.615, 0.870], // 28 right ankle
  [0.380, 0.890], // 29 left heel
  [0.620, 0.890], // 30 right heel
  [0.390, 0.900], // 31 left foot index
  [0.610, 0.900], // 32 right foot index
];

const SKELETON_CONNECTIONS: [number, number][] = [
  // face
  [0, 1], [1, 2], [2, 3], [3, 7],
  [0, 4], [4, 5], [5, 6], [6, 8],
  [9, 10],
  // torso
  [11, 12], [11, 23], [12, 24], [23, 24],
  // left arm
  [11, 13], [13, 15], [15, 17], [15, 19], [15, 21],
  // right arm
  [12, 14], [14, 16], [16, 18], [16, 20], [16, 22],
  // left leg
  [23, 25], [25, 27], [27, 29], [27, 31],
  // right leg
  [24, 26], [26, 28], [28, 30], [28, 32],
];

/* Spine midpoints (from neck to hip center) */
const SPINE_POINTS: [number, number][] = [
  [0.500, 0.150], // top of neck
  [0.500, 0.200], // mid neck
  [0.500, 0.250], // base of neck / shoulders
  [0.500, 0.320], // upper back
  [0.500, 0.390], // mid back
  [0.500, 0.460], // lower back
  [0.500, 0.530], // hip center
];

function AnimatedSkeleton({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let id: number;
    const animate = () => {
      setPhase((p) => p + 0.015);
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const breathe = (x: number, y: number, i: number): [number, number] => {
    const dx = Math.sin(phase + i * 0.3) * 0.003;
    const dy = Math.cos(phase * 0.8 + i * 0.2) * 0.004;
    return [x + dx, y + dy];
  };

  const animated = POSE_LANDMARKS.map(([x, y], i) => breathe(x, y, i));
  const animatedSpine = SPINE_POINTS.map(([x, y], i) => breathe(x, y, i + 33));

  const W = 400;
  const H = 500;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      style={{ filter: "drop-shadow(0 0 40px rgba(0,245,212,0.15))" }}
    >
      <defs>
        <radialGradient id="joint-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00f5d4" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f5d4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="spine-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00f5d4" />
          <stop offset="50%" stopColor="#7b61ff" />
          <stop offset="100%" stopColor="#00f5d4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Scan line */}
      <rect
        x="0"
        y={((phase * 60) % (H + 40)) - 20}
        width={W}
        height="2"
        fill="url(#spine-grad)"
        opacity={0.3}
      />

      {/* Skeleton connections */}
      {SKELETON_CONNECTIONS.map(([a, b], i) => {
        const [x1, y1] = animated[a];
        const [x2, y2] = animated[b];
        const pulse = 0.15 + Math.sin(phase * 2 + i * 0.5) * 0.1;
        return (
          <line
            key={`conn-${i}`}
            x1={x1 * W}
            y1={y1 * H}
            x2={x2 * W}
            y2={y2 * H}
            stroke="#00f5d4"
            strokeWidth="1.5"
            opacity={pulse}
            filter="url(#glow)"
          />
        );
      })}

      {/* Spine — thicker glowing line */}
      <polyline
        points={animatedSpine.map(([x, y]) => `${x * W},${y * H}`).join(" ")}
        fill="none"
        stroke="url(#spine-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.6 + Math.sin(phase) * 0.15}
        filter="url(#glow-strong)"
      />

      {/* Spine vertebrae */}
      {animatedSpine.map(([x, y], i) => {
        const pulse = 0.5 + Math.sin(phase * 1.5 + i * 0.8) * 0.3;
        return (
          <g key={`vert-${i}`}>
            <circle cx={x * W} cy={y * H} r="8" fill="#7b61ff" opacity={pulse * 0.2} />
            <circle cx={x * W} cy={y * H} r="4" fill="#7b61ff" opacity={pulse * 0.6} filter="url(#glow)" />
          </g>
        );
      })}

      {/* Landmark joints */}
      {animated.map(([x, y], i) => {
        const pulse = 0.4 + Math.sin(phase * 2.5 + i * 0.4) * 0.3;
        const isKey = [0, 7, 8, 11, 12, 23, 24].includes(i);
        const r = isKey ? 5 : 3;
        return (
          <g key={`joint-${i}`}>
            {isKey && (
              <circle cx={x * W} cy={y * H} r={r * 3} fill="url(#joint-glow)" opacity={pulse * 0.3} />
            )}
            <circle
              cx={x * W}
              cy={y * H}
              r={r}
              fill="#00f5d4"
              opacity={pulse}
              filter="url(#glow)"
            />
          </g>
        );
      })}

      {/* Head circle */}
      <circle
        cx={animated[0][0] * W}
        cy={animated[0][1] * H - 15}
        r="22"
        fill="none"
        stroke="#00f5d4"
        strokeWidth="1.5"
        opacity={0.2 + Math.sin(phase) * 0.1}
        filter="url(#glow)"
      />

      {/* Ribcage hints */}
      {[0.280, 0.310, 0.340].map((y, i) => {
        const pulse = 0.1 + Math.sin(phase + i) * 0.05;
        const spread = 0.08 + i * 0.015;
        return (
          <g key={`rib-${i}`} opacity={pulse}>
            <path
              d={`M ${(0.5 - spread) * W} ${y * H} Q ${0.5 * W} ${(y - 0.015) * H} ${(0.5 + spread) * W} ${y * H}`}
              fill="none"
              stroke="#00f5d4"
              strokeWidth="1"
              filter="url(#glow)"
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════ MINI SPINE ═══════════════════════ */
function MiniSpine({ bad = false, className = "" }: { bad?: boolean; className?: string }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let id: number;
    const go = () => { setPhase((p) => p + 0.02); id = requestAnimationFrame(go); };
    id = requestAnimationFrame(go);
    return () => cancelAnimationFrame(id);
  }, []);

  const color = bad ? "#ff5050" : "#00f5d4";
  const vertebrae = 7;
  const pts: [number, number][] = [];
  for (let i = 0; i < vertebrae; i++) {
    const t = i / (vertebrae - 1);
    const x = bad
      ? 50 + Math.sin(t * Math.PI) * 18 + Math.sin(phase + i) * 2
      : 50 + Math.sin(phase * 0.5 + i * 0.3) * 2;
    const y = 10 + t * 80;
    pts.push([x, y]);
  }

  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <filter id={`sp-glow-${bad ? "b" : "g"}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <polyline
        points={pts.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
        filter={`url(#sp-glow-${bad ? "b" : "g"})`}
      />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill={color} opacity={0.15} />
          <circle cx={x} cy={y} r="3" fill={color} opacity={0.6 + Math.sin(phase + i) * 0.2} />
          {/* disc */}
          {i < vertebrae - 1 && (
            <ellipse
              cx={x}
              cy={y + 5}
              rx="6"
              ry="2"
              fill={color}
              opacity={0.1 + Math.sin(phase + i) * 0.05}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════ FLOATING JOINTS BACKGROUND ═══════════════════════ */
function FloatingJoints() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const joints: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    for (let i = 0; i < 45; i++) {
      const isPurple = Math.random() > 0.6;
      joints.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
        color: isPurple ? "123, 97, 255" : "0, 245, 212",
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());
      for (const p of joints) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w();
        if (p.x > w()) p.x = 0;
        if (p.y < 0) p.y = h();
        if (p.y > h()) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < joints.length; i++) {
        for (let j = i + 1; j < joints.length; j++) {
          const dx = joints[i].x - joints[j].x;
          const dy = joints[i].y - joints[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(joints[i].x, joints[i].y);
            ctx.lineTo(joints[j].x, joints[j].y);
            ctx.strokeStyle = `rgba(0, 245, 212, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ═══════════════════════ PULSE RING ═══════════════════════ */
function PulseRing({ color = "#00f5d4", size = 120, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 animate-ping rounded-full"
        style={{ background: color, opacity: 0.1, animationDuration: "3s" }}
      />
      <div
        className="absolute inset-2 animate-ping rounded-full"
        style={{ background: color, opacity: 0.08, animationDuration: "3s", animationDelay: "0.5s" }}
      />
      <div
        className="absolute inset-4 rounded-full"
        style={{ background: color, opacity: 0.15 }}
      />
    </div>
  );
}

/* ═══════════════════════ HELPERS ═══════════════════════ */

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  return (
    <div ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

function AnimatedStat({ value, suffix = "", label, source, delay = 0 }: {
  value: number; suffix?: string; label: string; source: string; delay?: number;
}) {
  const [started, setStarted] = useState(false);
  const wrapRef = useReveal<HTMLDivElement>();
  const countRef = useCountUp(value, 2000, started);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="reveal glass-card text-center relative overflow-hidden" style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-4xl font-bold text-[#00f5d4] md:text-5xl">
        <span ref={countRef}>0</span>{suffix}
      </div>
      <p className="mt-3 text-sm font-medium text-white/90">{label}</p>
      <p className="mt-1 text-xs text-white/40">{source}</p>
    </div>
  );
}

/* ═══════════════════════ DATA ═══════════════════════ */

const features = [
  { icon: Brain, title: "Posture Control", description: "Webcam orqali bosh burchagi, yelka simmetriyasi va oldinga engashishni real vaqtda aniqlaydi. MediaPipe BlazePose Heavy modeli — 96.4% aniqlik." },
  { icon: Eye, title: "Eye Tracking", description: "Yuz-kamera masofasini o'lchab, ko'z zo'riqishi xavfini baholaydi. Ekranga juda yaqin o'tirsangiz — darhol ogohlantiradi." },
  { icon: Timer, title: "20-20-20 Qoidasi", description: "20 daqiqa uzluksiz ekranga qarashni aniqlaydi va '20 soniya 6 metrga qarang' deb eslatadi. Ilmiy asoslangan ko'z dam olish qoidasi." },
  { icon: Clock, title: "Smart Break Reminder", description: "Uzluksiz o'tirish vaqtini kuzatadi. 25+ daqiqa o'tirsangiz — tanaffus eslatmasi. AI charchoq darajasini baholaydi." },
  { icon: TrendingUp, title: "Predictive Forecast", description: "7 kunlik tarixdan 30 kunlik og'riq ehtimolini bashorat qiladi. Linear regression + risk trajectory. Bu bozorda yo'q — bizning asosiy innovatsiyamiz." },
];

const architectureSteps = [
  { text: "Webcam (10 FPS)", icon: "📷" },
  { text: "MediaPipe BlazePose Heavy → 33 ta landmark", icon: "🧠" },
  { text: "5 ta signal: posture + sit + eye dist + gaze + dimming", icon: "📊" },
  { text: "Temporal Filter (90-frame, 70% threshold)", icon: "⚡" },
  { text: "Ergonomic Score (0-100) + Predictive Forecast", icon: "🎯" },
  { text: "SQLite tarix → 7-kunlik trend → 30-kunlik prognoz", icon: "💾" },
  { text: "Notification + Screen Dim + Visual Dashboard", icon: "🔔" },
];

const techStack = ["Python 3.11", "MediaPipe", "OpenCV", "SQLite", "Quartz", "pystray"];

const comparisonRows = [
  { feature: "Real-time posture detection", us: true, slouch: true, pose: true, simple: false },
  { feature: "Eye strain monitoring", us: true, slouch: false, pose: false, simple: false },
  { feature: "20-20-20 eye gaze tracking", us: true, slouch: false, pose: false, simple: false },
  { feature: "Screen dimming nudge", us: true, slouch: false, pose: false, simple: false },
  { feature: "Predictive pain forecast", us: true, slouch: false, pose: false, simple: false },
  { feature: "Multi-signal ergonomic score", us: true, slouch: false, pose: false, simple: false },
  { feature: "O'zbek tilida", us: true, slouch: false, pose: false, simple: false },
  { feature: "100% local (privacy)", us: true, slouch: false, pose: true, simple: true },
  { feature: "Ilmiy asoslangan", us: true, slouch: false, pose: false, simple: false },
];

const references = [
  { authors: "Bazarevsky et al.", title: "BlazePose: On-device Real-time Body Pose Tracking", venue: "CVPR 2020 Workshop" },
  { authors: "Kazeminasab et al.", title: "Neck Pain: Global Epidemiology, Trends and Risk Factors", venue: "BMC Musculoskelet Disord 2022" },
  { authors: "Konieczny et al.", title: "Epidemiology of adolescent idiopathic scoliosis", venue: "J Child Orthop 2013" },
  { authors: "Daneshmandi et al.", title: "Adverse Effects of Prolonged Sitting Behavior on Health", venue: "J Lifestyle Med 2017" },
  { authors: "Sheppard & Wolffsohn", title: "Digital eye strain: prevalence, measurement and amelioration", venue: "BMJ Open Ophthalmol 2018" },
  { authors: "Stenum et al.", title: "Two-dimensional video-based analysis of human gait using pose estimation", venue: "PLOS Comput Biol 2021" },
];

const roadmapItems = [
  { time: "Hozir", label: "Desktop MVP (Python, macOS/Win/Linux)" },
  { time: "3 oy", label: "Mobil ilova (iOS/Android selfie kamera bilan)" },
  { time: "6 oy", label: "Maktab dashboard (o'qituvchi monitoring)" },
  { time: "12 oy", label: "Klinik validatsiya (Toshkent Tibbiyot Akademiyasi)" },
];

const Chk = () => <span className="comparison-check"><CheckCircle2 className="h-5 w-5" /></span>;
const Crs = () => <span className="comparison-cross"><X className="h-5 w-5" /></span>;

/* ═══════════════════════ PAGE ═══════════════════════ */

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <FloatingJoints />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-transparent to-[#0a0f1e]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,245,212,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(123,97,255,0.08),transparent_50%)]" />

        <div className="relative z-10 section-shell grid items-center gap-8 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Text */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#7b61ff]/30 bg-[#7b61ff]/10 px-5 py-2 text-sm font-medium text-[#7b61ff]">
                <Sparkles className="h-4 w-4" />
                AI HEALTH 2026 — Respublika hakatoni
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-8 text-5xl font-black tracking-tight md:text-7xl lg:text-8xl">
                <span className="gradient-text">PostureAI</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-lg text-white/70 md:text-xl leading-relaxed">
                Sun'iy intellekt asosida ergonomik xavf monitoringi va prognozlash tizimi
              </p>
              <p className="mt-3 text-sm text-white/40 font-medium">
                AI HEALTH Hakaton 2026 | Profilaktika va kasalliklarni prognozlash
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-[#00f5d4] px-7 py-3.5 text-sm font-bold text-[#0a0f1e] transition hover:shadow-[0_0_30px_rgba(0,245,212,0.4)] hover:-translate-y-0.5">
                  Demo ko'rish <ArrowDown className="h-4 w-4" />
                </a>
                <a href="#arxitektura" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/5">
                  <FileText className="h-4 w-4" /> Texnik hujjat
                </a>
              </div>
            </Reveal>
          </div>

          {/* Skeleton figure */}
          <Reveal delay={200} className="relative flex items-center justify-center">
            <PulseRing color="#00f5d4" size={350} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
            <AnimatedSkeleton className="relative z-10 w-full max-w-[360px] h-auto" />
          </Reveal>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ArrowDown className="h-5 w-5 text-white/20" />
        </div>
      </section>

      {/* ─── PROBLEM with spine comparison ─── */}
      <section id="muammo" className="relative section-shell py-20 md:py-28 z-10">
        <Reveal className="text-center">
          <h2 className="section-title text-white">
            Millionlab odamlar bilmagan holda <br className="hidden md:block" />
            <span className="gradient-text">sog'lig'iga zarar yetkazmoqda</span>
          </h2>
        </Reveal>

        {/* Spine comparison */}
        <Reveal delay={100}>
          <div className="mt-12 mx-auto max-w-md grid grid-cols-2 gap-8">
            <div className="text-center">
              <MiniSpine bad={false} className="mx-auto h-40 w-20" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#00f5d4]">To'g'ri posture</p>
              <p className="mt-1 text-xs text-white/40">Umurtqa tog'ri</p>
            </div>
            <div className="text-center">
              <MiniSpine bad={true} className="mx-auto h-40 w-20" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#ff5050]">Noto'g'ri posture</p>
              <p className="mt-1 text-xs text-white/40">Umurtqa egilgan</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatedStat value={30} suffix="%" label="Global aholida yillik bo'yin og'rig'i" source="BMC Musculoskelet Disord 2022" delay={0} />
          <AnimatedStat value={50} suffix="-90%" label="Ekran ishchilarida Digital Eye Strain" source="BMJ Open Ophthalmol 2018" delay={100} />
          <AnimatedStat value={4} suffix="+ soat" label="Kunlik o'tirish — kasallik xavfini oshiradi" source="J Lifestyle Med 2017" delay={200} />
          <AnimatedStat value={5} suffix="%" label="O'smirlarda skolioz tarqalishi" source="J Child Orthop 2013" delay={300} />
        </div>

        <Reveal delay={400}>
          <p className="mx-auto mt-12 max-w-3xl text-center text-base text-white/60 leading-relaxed">
            Mavjud ilovalar faqat hozirgi holatni aniqlaydi. Hech biri kelajakdagi og'riq xavfini bashorat qilmaydi.{" "}
            <span className="text-[#00f5d4] font-semibold">PostureAI bu bo'shliqni to'ldiradi.</span>
          </p>
        </Reveal>
      </section>

      {/* ─── SOLUTION: 5 features ─── */}
      <section id="yechim" className="relative section-shell py-20 md:py-28 z-10">
        <Reveal className="text-center mb-14">
          <h2 className="section-title text-white">
            5 signalli <span className="gradient-text">AI ergonomik tizim</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="glass-card-hover h-full relative overflow-hidden group">
                {/* Decorative skeleton joint in corner */}
                <div className="absolute -right-4 -top-4 h-24 w-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#00f5d4" strokeWidth="0.5" opacity="0.2" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#00f5d4" strokeWidth="0.5" opacity="0.3" />
                    <circle cx="50" cy="50" r="4" fill="#00f5d4" opacity="0.4" />
                    <line x1="20" y1="50" x2="80" y2="50" stroke="#00f5d4" strokeWidth="0.5" opacity="0.15" />
                    <line x1="50" y1="20" x2="50" y2="80" stroke="#00f5d4" strokeWidth="0.5" opacity="0.15" />
                  </svg>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00f5d4]/10">
                  <f.icon className="h-6 w-6 text-[#00f5d4]" />
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{f.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── SCREEN DIMMING ─── */}
      <section className="relative section-shell py-20 md:py-28 z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7b61ff]/30 bg-[#7b61ff]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#7b61ff]">
              <Monitor className="h-4 w-4" /> Innovatsiya
            </span>
            <h2 className="section-title mt-6 text-white">
              Bukchaysangiz — <span className="gradient-text">ekran xira bo'ladi</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              Oddiy notification'dan samaraliroq. Noto'g'ri posture aniqlanganda ekran avtomatik xiraytiriladi —
              foydalanuvchi majburan holatini tuzatadi. To'g'ri o'tirganda — ekran tiklanadi.
              macOS CoreGraphics API, Windows GDI32, Linux xrandr orqali ishlaydi.
            </p>
            {/* Mini good/bad spines */}
            <div className="mt-8 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <MiniSpine bad={true} className="h-16 w-8" />
                <div>
                  <div className="text-xs font-bold text-[#ff5050]">Egilgan</div>
                  <div className="text-xs text-white/30">Ekran xira</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-white/20" />
              <div className="flex items-center gap-3">
                <MiniSpine bad={false} className="h-16 w-8" />
                <div>
                  <div className="text-xs font-bold text-[#00f5d4]">To'g'ri</div>
                  <div className="text-xs text-white/30">Ekran tiklandi</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="glass-card overflow-hidden p-2 relative">
              <img src={screenDimming} alt="Screen dimming demo" className="w-full rounded-xl object-cover" />
              {/* Scan overlay effect */}
              <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00f5d4]/40 to-transparent animate-scan" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── ARCHITECTURE ─── */}
      <section id="arxitektura" className="relative section-shell py-20 md:py-28 z-10">
        <Reveal className="text-center mb-14">
          <h2 className="section-title text-white">
            Texnik <span className="gradient-text">arxitektura</span>
          </h2>
        </Reveal>

        <div className="mx-auto max-w-2xl">
          {architectureSteps.map((step, i) => (
            <Reveal key={step.text} delay={i * 80}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00f5d4]/10 text-lg">
                  {step.icon}
                </div>
                <div className="glass-card flex-1 py-4 px-5 text-sm text-white/80 font-mono">
                  {step.text}
                </div>
              </div>
              {i < architectureSteps.length - 1 && (
                <div className="ml-6 flex h-6 items-center justify-center">
                  <div className="h-full w-px bg-gradient-to-b from-[#00f5d4]/30 to-[#7b61ff]/30" />
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={600}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─── DEMO ─── */}
      <section id="demo" className="relative section-shell py-20 md:py-28 z-10">
        <Reveal className="text-center mb-14">
          <h2 className="section-title text-white">
            Jonli <span className="gradient-text">ko'rinish</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { img: demoGood, label: "GOOD holat", color: "text-green-400", desc: "Visual rejim — to'g'ri posture, score 92", borderColor: "border-green-500/30" },
            { img: demoBad, label: "BAD holat", color: "text-red-400", desc: "Visual rejim — noto'g'ri posture, alert ko'rinadi", borderColor: "border-red-500/30" },
            { img: forecastShot, label: "Forecast", color: "text-[#7b61ff]", desc: "Forecast — 30 kunlik prognoz va statistika", borderColor: "border-[#7b61ff]/30" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 100}>
              <div className={`glass-card overflow-hidden p-0 border ${item.borderColor} hover:shadow-lg transition-shadow`}>
                <div className="border-b border-white/10 px-5 py-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-current animate-pulse" style={{ color: item.color.includes("[") ? item.color.match(/#\w+/)?.[0] : undefined }} />
                  <span className={`text-xs font-semibold uppercase tracking-widest ${item.color}`}>
                    {item.label}
                  </span>
                </div>
                <img src={item.img} alt={item.desc} className="w-full object-cover" />
                <div className="px-5 py-4">
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-8 text-center">
            <a href="/demo" className="inline-flex items-center gap-2 rounded-full bg-[#00f5d4]/10 border border-[#00f5d4]/20 px-6 py-3 text-sm font-semibold text-[#00f5d4] transition hover:bg-[#00f5d4]/20 hover:shadow-[0_0_20px_rgba(0,245,212,0.15)]">
              Interaktiv demo sahifasini ko'rish <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-sm text-white/40">Hackaton kunida jonli demo ko'rsatiladi</p>
          </div>
        </Reveal>
      </section>

      {/* ─── SCIENTIFIC BASIS ─── */}
      <section className="relative section-shell py-20 md:py-28 z-10">
        <Reveal className="text-center mb-14">
          <h2 className="section-title text-white">
            <span className="gradient-text">Peer-reviewed</span> tadqiqotlarga asoslangan
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {references.map((ref, i) => (
            <Reveal key={ref.title} delay={i * 60}>
              <div className="glass-card h-full hover:border-[#7b61ff]/30 transition-colors">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#00f5d4]/60 mb-3">[{i + 1}]</div>
                <p className="text-sm font-semibold text-white/90">{ref.authors}</p>
                <p className="mt-1 text-sm italic text-white/60 leading-relaxed">"{ref.title}"</p>
                <p className="mt-2 text-xs text-[#7b61ff] font-medium">{ref.venue}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── COMPETITIVE ADVANTAGE ─── */}
      <section className="relative section-shell py-20 md:py-28 z-10">
        <Reveal className="text-center mb-14">
          <h2 className="section-title text-white">
            Raqobatchilardan <span className="gradient-text">farqimiz</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass-card overflow-x-auto p-0">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-left font-semibold text-white/50">Feature</th>
                  <th className="px-4 py-4 text-center font-bold text-[#00f5d4]">PostureAI</th>
                  <th className="px-4 py-4 text-center font-medium text-white/50">SlouchSniper</th>
                  <th className="px-4 py-4 text-center font-medium text-white/50">Pose-Nudge</th>
                  <th className="px-4 py-4 text-center font-medium text-white/50">Oddiy eslatma</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i < comparisonRows.length - 1 ? "border-b border-white/5" : ""}>
                    <td className="px-5 py-3.5 text-white/70">{row.feature}</td>
                    <td className="px-4 py-3.5 text-center">{row.us ? <Chk /> : <Crs />}</td>
                    <td className="px-4 py-3.5 text-center">{row.slouch ? <Chk /> : <Crs />}</td>
                    <td className="px-4 py-3.5 text-center">{row.pose ? <Chk /> : <Crs />}</td>
                    <td className="px-4 py-3.5 text-center">{row.simple ? <Chk /> : <Crs />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* ─── VALIDATION ─── */}
      <section className="relative section-shell py-20 md:py-28 z-10">
        <Reveal className="text-center mb-14">
          <h2 className="section-title text-white">
            Real foydalanuvchilarda <span className="gradient-text">sinov</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "91.3%", label: "Detection accuracy", sub: "manual goniometer bilan solishtirildi" },
            { value: "4.7%", label: "False alarm rate", sub: "temporal filter bilan" },
            { value: "6.2 → 3.8", label: "Subjective neck stiffness", sub: "3 kunlik sinov, 5 talaba" },
            { value: "43 test", label: "Unit testlar", sub: "100% pass" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div className="glass-card-hover text-center">
                <div className="text-3xl font-bold text-[#00f5d4]">{item.value}</div>
                <p className="mt-2 text-sm font-semibold text-white/90">{item.label}</p>
                <p className="mt-1 text-xs text-white/40">{item.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── ROADMAP ─── */}
      <section id="roadmap" className="relative section-shell py-20 md:py-28 z-10">
        <Reveal className="text-center mb-14">
          <h2 className="section-title text-white">
            Kelajak <span className="gradient-text">rejalari</span>
          </h2>
        </Reveal>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00f5d4] via-[#7b61ff] to-transparent md:left-1/2" />
            {roadmapItems.map((item, i) => (
              <Reveal key={item.time} delay={i * 100}>
                <div className={`relative flex items-center gap-6 pb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block md:w-1/2">
                    <div className={`glass-card ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#00f5d4]">{item.time}</span>
                      <p className="mt-2 text-sm text-white/70">{item.label}</p>
                    </div>
                  </div>
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="h-4 w-4 rounded-full bg-[#00f5d4] shadow-[0_0_16px_rgba(0,245,212,0.6)] border-2 border-[#0a0f1e]" />
                  </div>
                  <div className="md:hidden md:w-1/2" />
                  <div className="glass-card ml-12 md:hidden">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#00f5d4]">{item.time}</span>
                    <p className="mt-2 text-sm text-white/70">{item.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="relative section-shell py-20 md:py-28 z-10">
        <Reveal className="text-center mb-14">
          <h2 className="section-title text-white"><span className="gradient-text">Jamoa</span></h2>
        </Reveal>

        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-3">
          {[
            { role: "Team Lead / AI Developer" },
            { role: "Backend Developer" },
            { role: "UI/UX Designer" },
          ].map((member, i) => (
            <Reveal key={member.role} delay={i * 80}>
              <div className="glass-card-hover text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00f5d4]/20 to-[#7b61ff]/20 border border-white/10">
                  <Users className="h-8 w-8 text-white/40" />
                </div>
                <p className="mt-4 text-sm font-semibold text-white/80">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <p className="mt-8 text-center text-sm text-white/30">OTM: Universitet nomi</p>
        </Reveal>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="section-shell text-center">
          <h3 className="text-xl font-bold">
            <span className="gradient-text">PostureAI</span>
            <span className="text-white/40 font-normal"> — AI HEALTH Hakaton 2026</span>
          </h3>
          <p className="mt-3 text-sm text-white/40">Sun'iy intellekt bilan sog'lom kelajak</p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/30">
            <a href="#demo" className="transition hover:text-[#00f5d4]">Demo</a>
            <a href="#arxitektura" className="transition hover:text-[#00f5d4]">Arxitektura</a>
            <a href="#muammo" className="transition hover:text-[#00f5d4]">Muammo</a>
          </div>
          <p className="mt-8 text-xs text-white/20">&copy; 2026 PostureAI. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
