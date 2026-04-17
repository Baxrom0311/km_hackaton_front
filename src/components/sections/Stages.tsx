import { GraduationCap, Trophy, Check } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const stages = [
  {
    num: "I",
    icon: GraduationCap,
    title: "OTM ichki saralash",
    sub: "Har bir OTM mustaqil tashkil etadi",
    desc: "Har bir oliy ta'lim muassasasi mustaqil ravishda ichki saralash bosqichini tashkil etadi. Eng yuqori ball to'plagan jamoalar II bosqichga yo'llanma oladi.",
    items: [
      "Loyiha g'oyasi tavsifi taqdim etiladi",
      "Muammoning dolzarbligi asoslanadi",
      "Texnik yechim konsepsiyasi taqdim etiladi",
      "Minimal prototip yoki demo (mavjud bo'lsa)",
    ],
    color: "primary",
  },
  {
    num: "II",
    icon: Trophy,
    title: "Festival final bosqichi",
    sub: "24-48 soatlik intensiv hakaton",
    desc: "Final bosqich festival doirasida 24-48 soatlik intensiv hakaton yoki tayyor loyiha asosida pitch formatida o'tkaziladi.",
    items: [
      "Ishlaydigan MVP yoki demo versiya taqdim etiladi",
      "5-7 daqiqalik pitch taqdimot o'tkaziladi",
      "AI modeli, algoritm va arxitektura tushuntiriladi",
      "Hakamlar hay'ati tomonidan 100 ball asosida baholanadi",
    ],
    color: "secondary",
  },
];

export const Stages = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="stages" className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/30 mb-4">
            📋 Bosqichlar
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
            Hakaton <span className="text-gradient">bosqichlari</span>
          </h2>
          <p className="text-muted-foreground">2 bosqichda tashkil etiladi</p>
        </div>

        <div className="relative grid md:grid-cols-2 gap-8">
          <div className="hidden md:block absolute left-1/2 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent -translate-x-1/2" />
          {stages.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="glass-card p-8 relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-${s.color}/15 border border-${s.color}/30 flex items-center justify-center font-display text-2xl font-black text-${s.color}`}>
                    {s.num}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.sub}</p>
                  </div>
                  <Icon className={`w-7 h-7 text-${s.color}/40 ml-auto`} />
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <Check className={`w-4 h-4 text-${s.color} flex-shrink-0 mt-0.5`} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
