import { useEffect, useState } from "react";
import { useReveal, useCountUp } from "@/hooks/useReveal";

const stats = [
  { value: 30, suffix: "%", label: "Global aholida yillik bo'yin og'rig'i", source: "BMC Musculoskelet Disord 2022" },
  { value: 90, prefix: "50–", suffix: "%", label: "Ekran ishchilarida Digital Eye Strain", source: "BMJ Open Ophthalmol 2018" },
  { value: 4, suffix: "+ soat", label: "Kunlik o'tirish — kasallik xavfini oshiradi", source: "J Lifestyle Med 2017" },
  { value: 5.2, prefix: "0.5–", suffix: "%", label: "O'smirlarda skolioz tarqalishi", source: "J Child Orthop 2013" },
];

const StatCard = ({ stat, started }: { stat: typeof stats[0]; started: boolean }) => {
  const ref = useCountUp(stat.value, 2000, started);
  return (
    <div className="glass-card p-8 text-center group">
      <div className="font-display text-5xl md:text-6xl font-bold text-gradient mb-3 leading-none">
        {stat.prefix}<span ref={ref}>0</span>{stat.suffix}
      </div>
      <p className="text-foreground/90 font-medium mb-2 leading-snug">{stat.label}</p>
      <p className="text-xs text-muted-foreground italic">{stat.source}</p>
    </div>
  );
};

export const Problem = () => {
  const ref = useReveal<HTMLDivElement>();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setStarted(true), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);

  return (
    <section id="problem" className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-destructive/10 text-destructive border border-destructive/30 mb-4">
            Muammo
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Millionlab odamlar bilmagan holda{" "}
            <span className="text-gradient">sog'lig'iga zarar</span> yetkazmoqda
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} started={started} />
          ))}
        </div>

        <p className="text-center text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Mavjud ilovalar faqat <span className="text-foreground">hozirgi holatni</span> aniqlaydi.
          Hech biri kelajakdagi og'riq xavfini bashorat qilmaydi.{" "}
          <span className="text-gradient font-semibold">PostureAI bu bo'shliqni to'ldiradi.</span>
        </p>
      </div>
    </section>
  );
};
