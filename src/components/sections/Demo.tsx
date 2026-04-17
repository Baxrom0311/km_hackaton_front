import { useReveal } from "@/hooks/useReveal";
import goodImg from "@/assets/demo-good.jpg";
import badImg from "@/assets/demo-bad.jpg";
import forecastImg from "@/assets/demo-forecast.jpg";

const demos = [
  { img: goodImg, title: "Visual rejim — GOOD holat", subtitle: "Score 92 · Yashil chegara", border: "border-success/60", glow: "shadow-[0_0_40px_hsl(var(--success)/0.4)]" },
  { img: badImg, title: "Visual rejim — BAD holat", subtitle: "Alert ko'rinmoqda · Qizil chegara", border: "border-destructive/60", glow: "shadow-[0_0_40px_hsl(var(--destructive)/0.4)]" },
  { img: forecastImg, title: "Forecast — 30 kunlik prognoz", subtitle: "Terminal output · risk trajectory", border: "border-secondary/60", glow: "shadow-[0_0_40px_hsl(var(--secondary)/0.4)]" },
];

export const Demo = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="demo" className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 mb-4">
            Demo
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Jonli <span className="text-gradient">ko'rinish</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {demos.map((d, i) => (
            <div key={i} className={`group rounded-2xl overflow-hidden border-2 ${d.border} ${d.glow} transition-transform duration-500 hover:-translate-y-2`}>
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={d.img}
                  alt={d.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={768}
                  height={512}
                />
              </div>
              <div className="p-5 bg-card/80 backdrop-blur">
                <h3 className="font-display font-bold text-foreground mb-1">{d.title}</h3>
                <p className="text-sm text-muted-foreground">{d.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-card border-primary/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-foreground/90">Hakaton kunida jonli demo ko'rsatiladi</span>
          </div>
        </div>
      </div>
    </section>
  );
};
