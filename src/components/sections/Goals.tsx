import { Brain, Stethoscope, Heart, Rocket } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const goals = [
  { icon: Brain, color: "secondary", bg: "from-secondary/15 to-purple-light/10", title: "AI innovatsiyalarni qo'llab-quvvatlash", desc: "Sog'liqni saqlash sohasida sun'iy intellekt asosidagi innovatsion ishlanmalar" },
  { icon: Stethoscope, color: "primary", bg: "from-primary/15 to-cyan-bright/10", title: "IT va tibbiyot integratsiyasi", desc: "Talabalar o'rtasida amaliy ko'nikmalarni shakllantirish" },
  { icon: Rocket, color: "dna", bg: "from-dna/15 to-dna/10", title: "Startap faoliyatiga jalb etish", desc: "Iqtidorli yoshlarni aniqlash va startap loyihalariga yo'naltirish" },
  { icon: Heart, color: "heart", bg: "from-heart/15 to-heart/10", title: "Texnologik yechimlar", desc: "Sog'liqni saqlash tizimidagi dolzarb muammolarga yechimlar" },
];

export const Goals = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="goals" className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/30 mb-4">
            🎯 Maqsadlar
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
            Loyiha <span className="text-gradient">maqsadlari</span>
          </h2>
          <p className="text-muted-foreground">AI va tibbiyot sohasidagi asosiy vazifalar</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((g, i) => {
            const Icon = g.icon;
            return (
              <div key={i} className="glass-card p-6 text-center group">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${g.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 text-${g.color}`} />
                </div>
                <h4 className="font-display text-sm font-bold text-foreground mb-2 leading-snug">{g.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
