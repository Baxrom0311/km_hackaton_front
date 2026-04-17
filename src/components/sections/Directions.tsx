import { PersonStanding, Eye, Clock, Armchair, TrendingUp } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const directions = [
  { num: "01", icon: PersonStanding, color: "primary", bg: "from-primary/12 to-cyan-bright/8", title: "Posture tahlili", desc: "MediaPipe BlazePose orqali tana nuqtalarini aniqlash" },
  { num: "02", icon: Eye, color: "secondary", bg: "from-secondary/12 to-purple-light/8", title: "Ko'z monitoring", desc: "Yuz-kamera masofasi va Digital Eye Strain xavfi" },
  { num: "03", icon: Clock, color: "heart", bg: "from-heart/12 to-heart/8", title: "20-20-20 qoidasi", desc: "Ilmiy asoslangan ko'z dam olish trekeri" },
  { num: "04", icon: Armchair, color: "dna", bg: "from-dna/12 to-dna/8", title: "Smart break", desc: "O'tirish vaqti monitoringi va tanaffus eslatmasi" },
  { num: "05", icon: TrendingUp, color: "amber", bg: "from-amber/12 to-amber/8", title: "Predictive forecast", desc: "30 kunlik og'riq ehtimolini bashorat qilish" },
];

export const Directions = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="directions" className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/30 mb-4">
            🔬 Yo'nalishlar
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
            5 ta <span className="text-gradient">asosiy modul</span>
          </h2>
          <p className="text-muted-foreground">Multi-signal ergonomik tizim arxitekturasi</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {directions.map((d, i) => {
            const Icon = d.icon;
            const gradients = [
              "from-primary to-cyan-bright",
              "from-secondary to-purple-light",
              "from-heart to-heart/60",
              "from-dna to-dna/60",
              "from-amber to-amber/60",
            ];
            return (
              <div key={i} className="relative glass-card p-6 text-center overflow-hidden group">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[i]} rounded-t-2xl`} />
                <span className="absolute top-2 right-3 font-display text-2xl font-black text-primary/10 leading-none">{d.num}</span>
                <div className={`w-14 h-14 mx-auto mb-4 mt-2 rounded-2xl bg-gradient-to-br ${d.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 text-${d.color}`} />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2 leading-snug">{d.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
