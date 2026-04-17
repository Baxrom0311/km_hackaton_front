import { PersonStanding, Eye, Clock, Armchair, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const features = [
  {
    icon: PersonStanding,
    title: "Posture Control",
    desc: "Webcam orqali bosh burchagi, yelka simmetriyasi va oldinga engashishni real vaqtda aniqlaydi. MediaPipe BlazePose Heavy modeli — 96.4% aniqlik.",
    color: "from-primary to-primary/40",
  },
  {
    icon: Eye,
    title: "Eye Tracking",
    desc: "Yuz-kamera masofasini o'lchab, ko'z zo'riqishi xavfini baholaydi. Ekranga juda yaqin o'tirsangiz — darhol ogohlantiradi.",
    color: "from-secondary to-secondary/40",
  },
  {
    icon: Clock,
    title: "20-20-20 Qoidasi",
    desc: "20 daqiqa uzluksiz ekranga qarashni aniqlaydi va '20 soniya 6 metrga qarang' deb eslatadi. Ilmiy asoslangan ko'z dam olish qoidasi.",
    color: "from-primary to-secondary",
  },
  {
    icon: Armchair,
    title: "Smart Break Reminder",
    desc: "Uzluksiz o'tirish vaqtini kuzatadi. 25+ daqiqa o'tirsangiz — tanaffus eslatmasi. AI charchoq darajasini baholaydi.",
    color: "from-secondary to-primary",
  },
  {
    icon: Sparkles,
    title: "Predictive Forecast",
    desc: "7 kunlik tarixdan 30 kunlik og'riq ehtimolini bashorat qiladi. Linear regression + risk trajectory. Bu bozorda yo'q — bizning asosiy innovatsiyamiz.",
    color: "from-primary via-secondary to-primary",
    featured: true,
  },
];

export const Solution = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="solution" className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 mb-4">
            Yechim
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">5 signalli</span> AI ergonomik tizim
          </h2>
          <p className="text-lg text-muted-foreground">Nima qilamiz?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`glass-card p-8 group relative overflow-hidden ${
                  f.featured ? "lg:col-span-1 md:col-span-2 border-primary/30" : ""
                }`}
              >
                {f.featured && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                    Innovatsiya
                  </div>
                )}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-background" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
