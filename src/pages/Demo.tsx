import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Types ─── */
interface Landmark {
  x: number;
  y: number;
  label?: string;
}

interface PostureState {
  status: "good" | "bad";
  score: number;
  ergonomicScore: number;
  headAngle: number;
  shoulderDiff: number;
  forwardLean: number;
  faceDistance: number;
  sitMinutes: number;
  gazeMinutes: number;
  fps: number;
  issues: string[];
}

/* ─── Landmark data (normalized 0-1 for a "person sitting at desk" view) ─── */
const baseLandmarks: Record<string, Landmark> = {
  nose: { x: 0.50, y: 0.18 },
  leftEyeInner: { x: 0.48, y: 0.16 },
  rightEyeInner: { x: 0.52, y: 0.16 },
  leftEye: { x: 0.46, y: 0.155 },
  rightEye: { x: 0.54, y: 0.155 },
  leftEar: { x: 0.42, y: 0.17 },
  rightEar: { x: 0.58, y: 0.17 },
  mouthLeft: { x: 0.47, y: 0.21 },
  mouthRight: { x: 0.53, y: 0.21 },
  leftShoulder: { x: 0.35, y: 0.35 },
  rightShoulder: { x: 0.65, y: 0.35 },
  leftElbow: { x: 0.28, y: 0.52 },
  rightElbow: { x: 0.72, y: 0.52 },
  leftWrist: { x: 0.36, y: 0.64 },
  rightWrist: { x: 0.64, y: 0.64 },
  leftHip: { x: 0.40, y: 0.68 },
  rightHip: { x: 0.60, y: 0.68 },
};

const badLandmarks: Record<string, Landmark> = {
  nose: { x: 0.52, y: 0.22 },
  leftEyeInner: { x: 0.50, y: 0.20 },
  rightEyeInner: { x: 0.54, y: 0.20 },
  leftEye: { x: 0.48, y: 0.195 },
  rightEye: { x: 0.56, y: 0.195 },
  leftEar: { x: 0.44, y: 0.21 },
  rightEar: { x: 0.60, y: 0.21 },
  mouthLeft: { x: 0.50, y: 0.25 },
  mouthRight: { x: 0.55, y: 0.25 },
  leftShoulder: { x: 0.33, y: 0.38 },
  rightShoulder: { x: 0.67, y: 0.32 },
  leftElbow: { x: 0.26, y: 0.54 },
  rightElbow: { x: 0.74, y: 0.50 },
  leftWrist: { x: 0.38, y: 0.66 },
  rightWrist: { x: 0.66, y: 0.62 },
  leftHip: { x: 0.39, y: 0.70 },
  rightHip: { x: 0.61, y: 0.70 },
};

const connections: [string, string][] = [
  ["leftEar", "leftEye"],
  ["rightEar", "rightEye"],
  ["leftEye", "nose"],
  ["rightEye", "nose"],
  ["leftShoulder", "rightShoulder"],
  ["leftShoulder", "leftElbow"],
  ["rightShoulder", "rightElbow"],
  ["leftElbow", "leftWrist"],
  ["rightElbow", "rightWrist"],
  ["leftShoulder", "leftHip"],
  ["rightShoulder", "rightHip"],
  ["leftHip", "rightHip"],
];

const goodState: PostureState = {
  status: "good",
  score: 92,
  ergonomicScore: 88,
  headAngle: 4.2,
  shoulderDiff: 0.008,
  forwardLean: -0.04,
  faceDistance: 0.38,
  sitMinutes: 12,
  gazeMinutes: 8,
  fps: 10.0,
  issues: [],
};

const badState: PostureState = {
  status: "bad",
  score: 31,
  ergonomicScore: 24,
  headAngle: 28.7,
  shoulderDiff: 0.11,
  forwardLean: -0.29,
  faceDistance: 0.22,
  sitMinutes: 34,
  gazeMinutes: 22,
  fps: 10.0,
  issues: ["Boshingizni ko'taring!", "Yelkalaringizni tekislang!", "Oldinga engashmang!"],
};

/* ─── 7-day mock data for forecast ─── */
const weeklyData = [
  { day: "2026-04-11", good_pct: 78.2, bad_pct: 21.8, avg_score: 74.5, avg_ergonomic: 71.2, samples: 342 },
  { day: "2026-04-12", good_pct: 72.1, bad_pct: 27.9, avg_score: 69.8, avg_ergonomic: 65.4, samples: 401 },
  { day: "2026-04-13", good_pct: 68.5, bad_pct: 31.5, avg_score: 66.2, avg_ergonomic: 62.1, samples: 389 },
  { day: "2026-04-14", good_pct: 65.0, bad_pct: 35.0, avg_score: 63.1, avg_ergonomic: 58.7, samples: 356 },
  { day: "2026-04-15", good_pct: 61.8, bad_pct: 38.2, avg_score: 59.4, avg_ergonomic: 55.2, samples: 412 },
  { day: "2026-04-16", good_pct: 58.3, bad_pct: 41.7, avg_score: 56.7, avg_ergonomic: 52.8, samples: 378 },
  { day: "2026-04-17", good_pct: 55.1, bad_pct: 44.9, avg_score: 53.9, avg_ergonomic: 49.5, samples: 295 },
];

/* ═══════════ Camera View Canvas ═══════════ */
function CameraView({
  landmarks,
  state,
  width = 640,
  height = 480,
}: {
  landmarks: Record<string, Landmark>;
  state: PostureState;
  width?: number;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background — dark camera-like
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, w, h);

    // Subtle noise/gradient to simulate camera
    const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.7);
    grad.addColorStop(0, "rgba(30, 40, 60, 0.8)");
    grad.addColorStop(1, "rgba(10, 15, 30, 0.95)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Draw "person silhouette" area
    const bodyGrad = ctx.createRadialGradient(w * 0.5, h * 0.4, 30, w * 0.5, h * 0.4, w * 0.35);
    bodyGrad.addColorStop(0, "rgba(60, 80, 100, 0.4)");
    bodyGrad.addColorStop(1, "rgba(30, 40, 60, 0)");
    ctx.fillStyle = bodyGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw connections
    const isGood = state.status === "good";
    const lineColor = isGood ? "rgba(0, 255, 128, 0.7)" : "rgba(255, 80, 80, 0.7)";

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = lineColor;
    for (const [a, b] of connections) {
      const la = landmarks[a];
      const lb = landmarks[b];
      if (!la || !lb) continue;
      ctx.beginPath();
      ctx.moveTo(la.x * w, la.y * h);
      ctx.lineTo(lb.x * w, lb.y * h);
      ctx.stroke();
    }

    // Draw landmarks
    const dotColor = isGood ? "#00ff80" : "#ff5050";
    for (const lm of Object.values(landmarks)) {
      ctx.beginPath();
      ctx.arc(lm.x * w, lm.y * h, 5, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Border glow
    const borderColor = isGood ? "#00ff80" : "#ff3333";
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, w - 4, h - 4);

    // Shadow glow
    ctx.shadowColor = borderColor;
    ctx.shadowBlur = 15;
    ctx.strokeRect(2, 2, w - 4, h - 4);
    ctx.shadowBlur = 0;

    // Status badge top-left
    const statusText = isGood ? "GOOD" : "BAD";
    const badgeBg = isGood ? "rgba(0, 200, 100, 0.85)" : "rgba(220, 40, 40, 0.85)";
    ctx.fillStyle = badgeBg;
    const badgeW = 90;
    const badgeH = 32;
    const radius = 8;
    ctx.beginPath();
    ctx.moveTo(12 + radius, 12);
    ctx.lineTo(12 + badgeW - radius, 12);
    ctx.quadraticCurveTo(12 + badgeW, 12, 12 + badgeW, 12 + radius);
    ctx.lineTo(12 + badgeW, 12 + badgeH - radius);
    ctx.quadraticCurveTo(12 + badgeW, 12 + badgeH, 12 + badgeW - radius, 12 + badgeH);
    ctx.lineTo(12 + radius, 12 + badgeH);
    ctx.quadraticCurveTo(12, 12 + badgeH, 12, 12 + badgeH - radius);
    ctx.lineTo(12, 12 + radius);
    ctx.quadraticCurveTo(12, 12, 12 + radius, 12);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Inter, monospace";
    ctx.textAlign = "center";
    ctx.fillText(statusText, 12 + badgeW / 2, 12 + badgeH / 2 + 5);

    // Info panel right side
    ctx.textAlign = "left";
    const panelX = w - 220;
    const panelY = 12;
    const panelW = 208;
    const panelH = 240;
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 10);
    ctx.fill();

    ctx.font = "bold 12px Inter, monospace";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText("POSTURE INFO", panelX + 12, panelY + 22);

    const lines = [
      { label: "Posture Score", value: `${state.score}`, color: isGood ? "#00ff80" : "#ff5050" },
      { label: "Ergonomic", value: `${state.ergonomicScore}`, color: state.ergonomicScore > 60 ? "#00ff80" : "#ff5050" },
      { label: "Head Angle", value: `${state.headAngle.toFixed(1)}°`, color: state.headAngle < 15 ? "#00ff80" : "#ff5050" },
      { label: "Shoulder Diff", value: state.shoulderDiff.toFixed(3), color: state.shoulderDiff < 0.05 ? "#00ff80" : "#ff5050" },
      { label: "Forward Lean", value: state.forwardLean.toFixed(2), color: state.forwardLean > -0.15 ? "#00ff80" : "#ff5050" },
      { label: "Face Dist", value: state.faceDistance.toFixed(2), color: state.faceDistance > 0.25 ? "#00ff80" : "#ffaa00" },
      { label: "Sit Time", value: `${state.sitMinutes} min`, color: state.sitMinutes < 25 ? "#00ff80" : "#ff5050" },
      { label: "Gaze", value: `${state.gazeMinutes} min`, color: state.gazeMinutes < 20 ? "#00ff80" : "#ffaa00" },
      { label: "FPS", value: state.fps.toFixed(1), color: "rgba(255,255,255,0.6)" },
    ];

    let ly = panelY + 38;
    ctx.font = "11px Inter, monospace";
    for (const line of lines) {
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText(line.label, panelX + 12, ly);
      ctx.fillStyle = line.color;
      ctx.textAlign = "right";
      ctx.fillText(line.value, panelX + panelW - 12, ly);
      ctx.textAlign = "left";
      ly += 22;
    }

    // Issues bar at bottom
    if (state.issues.length > 0) {
      const barH = 36;
      const barY = h - barH - 8;
      ctx.fillStyle = "rgba(220, 40, 40, 0.8)";
      ctx.beginPath();
      ctx.roundRect(12, barY, w - 24, barH, 8);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 13px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(state.issues.join("  •  "), w / 2, barY + barH / 2 + 4);
      ctx.textAlign = "left";
    }

    // Timestamp bottom-right
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const secs = ((now.getSeconds() + time) % 60).toString().padStart(2, "0");
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "11px monospace";
    ctx.textAlign = "right";
    ctx.fillText(`${hours}:${minutes}:${secs}`, w - 16, h - 16);
    ctx.textAlign = "left";
  }, [landmarks, state, time]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full rounded-lg"
      style={{ imageRendering: "auto" }}
    />
  );
}

/* ═══════════ Forecast Terminal ═══════════ */
function ForecastTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  const lines = [
    { text: "$ python main.py --stats", color: "#00f5d4" },
    { text: "", color: "" },
    { text: "╔══════════════════════════════════════════════╗", color: "#555" },
    { text: "║           PostureAI Stats Report             ║", color: "#00f5d4" },
    { text: "╚══════════════════════════════════════════════╝", color: "#555" },
    { text: "", color: "" },
    { text: `Today: good=55.1% bad=44.9% avg_score=53.9`, color: "#fff" },
    { text: `       avg_ergonomic=49.5  samples=295`, color: "#aaa" },
    { text: `       alerts=12  longest_sit=34 min`, color: "#aaa" },
    { text: "", color: "" },
    { text: "Calibration: head=8.0, shoulder=0.015, lean=-0.06", color: "#7b61ff" },
    { text: "", color: "" },
    { text: "─── Haftalik trend (7 kun) ───", color: "#00f5d4" },
    { text: "", color: "" },
    ...weeklyData.map((d) => ({
      text: `  ${d.day}  good=${d.good_pct.toFixed(1)}%  score=${d.avg_score.toFixed(1)}  ergo=${d.avg_ergonomic.toFixed(1)}  (${d.samples})`,
      color: d.avg_ergonomic > 60 ? "#00ff80" : d.avg_ergonomic > 50 ? "#ffaa00" : "#ff5050",
    })),
    { text: "", color: "" },
    { text: "─── 30 kunlik prognoz ───", color: "#00f5d4" },
    { text: "", color: "" },
    { text: "  Current risk:          62.8 / 100", color: "#ffaa00" },
    { text: "  Projected (7d):        71.4 / 100", color: "#ff5050" },
    { text: "  Slope:                 +1.23 / kun", color: "#ff5050" },
    { text: "  Pain probability (30d): 48.2%", color: "#ff5050" },
    { text: "  Category:              O'RTA XAVF", color: "#ffaa00" },
    { text: "", color: "" },
    { text: "  Tavsiya: Ergonomik score tushmoqda.", color: "#fff" },
    { text: "  Har 25 daqiqada tanaffus qiling.", color: "#fff" },
    { text: "  Kalibrovka yangilang: python main.py --calibrate", color: "#7b61ff" },
    { text: "", color: "" },
    { text: "─── Bar chart ───", color: "#00f5d4" },
    { text: "", color: "" },
    ...weeklyData.map((d) => {
      const barLen = Math.round(d.avg_ergonomic / 3);
      const bar = "█".repeat(barLen) + "░".repeat(33 - barLen);
      const c = d.avg_ergonomic > 60 ? "#00ff80" : d.avg_ergonomic > 50 ? "#ffaa00" : "#ff5050";
      return { text: `  ${d.day.slice(5)} ${bar} ${d.avg_ergonomic.toFixed(1)}`, color: c };
    }),
  ];

  useEffect(() => {
    if (visibleLines >= lines.length) return;
    const timer = setTimeout(
      () => setVisibleLines((v) => v + 1),
      visibleLines === 0 ? 500 : 40
    );
    return () => clearTimeout(timer);
  }, [visibleLines, lines.length]);

  return (
    <div className="rounded-lg bg-[#0d1117] border border-[#30363d] overflow-hidden font-mono text-[11px] leading-[1.6] md:text-xs">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-4 py-2.5">
        <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-white/30">PostureAI — python main.py --stats</span>
      </div>

      {/* Terminal body */}
      <div className="max-h-[520px] overflow-y-auto p-4">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ color: line.color || "#aaa" }} className="whitespace-pre">
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block w-2 h-4 bg-[#00f5d4] animate-pulse" />
        )}
      </div>
    </div>
  );
}

/* ═══════════ Score Gauge ═══════════ */
function ScoreGauge({ score, label }: { score: number; label: string }) {
  const isGood = score >= 60;
  const color = score >= 80 ? "#00ff80" : score >= 50 ? "#ffaa00" : "#ff5050";
  const pct = score / 100;
  const circumference = 2 * Math.PI * 42;
  const offset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1.5s ease-out", filter: `drop-shadow(0 0 6px ${color})` }}
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill={color} fontSize="22" fontWeight="bold" fontFamily="Inter, monospace">
          {score}
        </text>
      </svg>
      <span className="mt-1 text-xs text-white/50">{label}</span>
    </div>
  );
}

/* ═══════════ MAIN DEMO PAGE ═══════════ */
const Demo = () => {
  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0f1e]/90 backdrop-blur-lg">
        <div className="section-shell flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 text-sm font-bold text-[#00f5d4] hover:text-[#00f5d4]/80 transition">
            <ArrowLeft className="h-4 w-4" />
            PostureAI
          </Link>
          <span className="text-xs text-white/30 font-mono">DEMO & PITCH MODE</span>
        </div>
      </header>

      {/* Title */}
      <div className="section-shell pt-10 pb-6 text-center">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          PostureAI <span className="gradient-text">Jonli Demo</span>
        </h1>
        <p className="mt-3 text-sm text-white/40">
          AI HEALTH Hakaton 2026 — Real-time posture monitoring demo
        </p>
      </div>

      {/* ─── Section 1: Good vs Bad side by side ─── */}
      <section className="section-shell py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* GOOD */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                GOOD — To'g'ri posture
              </span>
            </div>
            <div className="glass-card overflow-hidden p-2">
              <CameraView landmarks={baseLandmarks} state={goodState} />
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <ScoreGauge score={92} label="Posture" />
              <ScoreGauge score={88} label="Ergonomic" />
            </div>
            <p className="mt-3 text-center text-sm text-white/40">
              Foydalanuvchi to'g'ri o'tirmoqda. Bosh burchagi 4.2°, yelkalar tekis, oldinga engashish minimal.
            </p>
          </div>

          {/* BAD */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-400">
                <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                BAD — Noto'g'ri posture
              </span>
            </div>
            <div className="glass-card overflow-hidden p-2">
              <CameraView landmarks={badLandmarks} state={badState} />
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <ScoreGauge score={31} label="Posture" />
              <ScoreGauge score={24} label="Ergonomic" />
            </div>
            <p className="mt-3 text-center text-sm text-white/40">
              Bosh egilgan (28.7°), yelkalar notekis, oldinga engashish kuchli. Ekran xiraytirildi.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Signals summary ─── */}
      <section className="section-shell py-8">
        <h2 className="text-center text-xl font-bold text-white mb-6">
          5 ta <span className="gradient-text">signal</span> bir vaqtda
        </h2>
        <div className="grid gap-3 sm:grid-cols-5">
          {[
            { label: "Posture", good: "92", bad: "31", unit: "" },
            { label: "Sit Time", good: "12 min", bad: "34 min", unit: "" },
            { label: "Eye Dist", good: "0.38", bad: "0.22", unit: "" },
            { label: "Gaze", good: "8 min", bad: "22 min", unit: "" },
            { label: "Screen", good: "Normal", bad: "Dimmed", unit: "" },
          ].map((s) => (
            <div key={s.label} className="glass-card text-center py-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">{s.label}</div>
              <div className="flex justify-center gap-4">
                <div>
                  <div className="text-sm font-bold text-green-400">{s.good}</div>
                  <div className="text-[10px] text-white/30">good</div>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <div className="text-sm font-bold text-red-400">{s.bad}</div>
                  <div className="text-[10px] text-white/30">bad</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section 2: Forecast Terminal ─── */}
      <section className="section-shell py-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#7b61ff]/10 border border-[#7b61ff]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#7b61ff]">
            Predictive Forecast
          </span>
          <span className="text-sm text-white/30">7 kunlik tarix → 30 kunlik prognoz</span>
        </div>
        <ForecastTerminal />
      </section>

      {/* ─── Key metrics ─── */}
      <section className="section-shell py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "48.2%", label: "30 kunlik og'riq ehtimoli", color: "#ff5050" },
            { value: "+1.23", label: "Kunlik xavf o'sishi", color: "#ffaa00" },
            { value: "34 min", label: "Eng uzoq uzluksiz o'tirish", color: "#ffaa00" },
            { value: "12", label: "Bugungi ogohlantirishlar", color: "#ff5050" },
          ].map((m) => (
            <div key={m.label} className="glass-card text-center">
              <div className="text-2xl font-bold" style={{ color: m.color }}>
                {m.value}
              </div>
              <p className="mt-2 text-xs text-white/50">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How it works flow ─── */}
      <section className="section-shell py-8">
        <h2 className="text-center text-xl font-bold text-white mb-6">
          Ishlash <span className="gradient-text">oqimi</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          {[
            "Webcam 10fps",
            "→",
            "MediaPipe BlazePose",
            "→",
            "5 Signal",
            "→",
            "Temporal Filter",
            "→",
            "Ergonomic Score",
            "→",
            "Action (Notify + Dim)",
          ].map((step, i) =>
            step === "→" ? (
              <span key={i} className="text-[#00f5d4]">→</span>
            ) : (
              <span
                key={i}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/60"
              >
                {step}
              </span>
            )
          )}
        </div>
      </section>

      {/* Footer note */}
      <div className="section-shell pt-8 text-center">
        <p className="text-xs text-white/20">
          PostureAI Demo — AI HEALTH Hakaton 2026 | Mock ma'lumotlar bilan
        </p>
      </div>
    </main>
  );
};

export default Demo;
