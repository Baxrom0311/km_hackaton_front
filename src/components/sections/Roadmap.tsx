import { useReveal } from "@/hooks/useReveal";
import { Rocket, Smartphone, School, Stethoscope } from "lucide-react";

const milestones = [
  { icon: Rocket, when: "Hozir", what: "Desktop MVP", sub: "Python · macOS / Win / Linux", active: true },
  { icon: Smartphone, when: "3 oy", what: "Mobil ilova", sub: "iOS / Android selfie kamera bilan" },
  { icon: School, when: "6 oy", what: "Maktab dashboard", sub: "O'qituvchi monitoring tizimi" },
  { icon: Stethoscope, when: "12 oy", what: "Klinik validatsiya", sub: "Toshkent Tibbiyot Akademiyasi" },
];

export const Roadmap = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/30 mb-4">
            Roadmap
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Kelajak <span className="text-gradient">rejalari</span>
          </h2>
        </div>

        <div className="relative">
          {/* horizontal line on desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-primary via-secondary to-primary opacity-40" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="text-center group">
                  <div className="relative mx-auto mb-6 w-24 h-24">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${m.active ? "from-primary to-secondary glow-cyan" : "from-muted to-muted/50"} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-10 h-10 ${m.active ? "text-background" : "text-foreground/70"}`} />
                    </div>
                    {m.active && (
                      <div className="absolute -inset-2 rounded-full border-2 border-primary/40 animate-pulse-glow" />
                    )}
                  </div>
                  <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${m.active ? "text-primary" : "text-muted-foreground"}`}>
                    {m.when}
                  </div>
                  <div className="font-display text-xl font-bold text-foreground mb-1">{m.what}</div>
                  <div className="text-sm text-muted-foreground">{m.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
