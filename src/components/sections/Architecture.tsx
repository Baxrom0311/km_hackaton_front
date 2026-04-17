import { useReveal } from "@/hooks/useReveal";
import { Camera, Cpu, Activity, Filter, Target, Database, Bell } from "lucide-react";

const steps = [
  { icon: Camera, label: "Webcam", sub: "10 FPS" },
  { icon: Cpu, label: "MediaPipe BlazePose Heavy", sub: "33 ta landmark" },
  { icon: Activity, label: "5 ta signal", sub: "posture · sit · eye dist · gaze · dimming" },
  { icon: Filter, label: "Temporal Filter", sub: "90-frame · 70% threshold" },
  { icon: Target, label: "Ergonomic Score (0–100)", sub: "+ Predictive Forecast" },
  { icon: Database, label: "SQLite tarix", sub: "7-kunlik trend → 30-kunlik prognoz" },
  { icon: Bell, label: "Notification + Screen Dim", sub: "+ Visual Dashboard" },
];

const techStack = ["Python 3.11", "MediaPipe", "OpenCV", "SQLite", "Quartz", "pystray"];

export const Architecture = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="architecture" className="section-padding relative">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/30 mb-4">
            Qanday ishlaydi?
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Texnik <span className="text-gradient">arxitektura</span>
          </h2>
        </div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-primary via-secondary to-primary opacity-40" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-6 ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} text-left`}>
                    <div className="glass-card p-5 inline-block max-w-md">
                      <div className="font-display text-lg font-bold text-foreground mb-1">{step.label}</div>
                      <div className="text-sm text-muted-foreground font-mono">{step.sub}</div>
                    </div>
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-cyan">
                      <Icon className="w-6 h-6 text-background" />
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-16 text-center">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-semibold">Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full glass-card text-sm font-mono text-foreground/90 hover:text-primary transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
