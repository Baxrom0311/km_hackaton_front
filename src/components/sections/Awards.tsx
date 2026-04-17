import { useReveal } from "@/hooks/useReveal";

const awards = [
  { medal: "🥇", place: "I o'rin", desc: "Eng yuqori ball to'plagan jamoa — diplom, sertifikat va maxsus mukofot", color: "amber", glow: "shadow-[0_10px_40px_-10px_hsl(var(--amber)/0.5)]" },
  { medal: "🥈", place: "II o'rin", desc: "Ikkinchi natija — diplom, sertifikat va belgilangan mukofot", color: "muted-foreground", glow: "shadow-[0_10px_40px_-10px_hsl(var(--muted-foreground)/0.4)]" },
  { medal: "🥉", place: "III o'rin", desc: "Uchinchi natija — diplom, sertifikat va belgilangan mukofot", color: "heart", glow: "shadow-[0_10px_40px_-10px_hsl(var(--heart)/0.4)]" },
];

export const Awards = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="awards" className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-amber/10 to-primary/10 text-amber border border-amber/30 mb-4">
            🏆 Mukofotlar
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">Taqdirlash</span>
          </h2>
          <p className="text-muted-foreground">G'oliblar diplom, sertifikat va belgilangan mukofotlar bilan taqdirlanadi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map((a) => (
            <div key={a.place} className={`glass-card p-8 text-center group ${a.glow}`}>
              <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">{a.medal}</div>
              <h3 className={`font-display text-2xl font-bold text-${a.color} mb-3`}>{a.place}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-card p-10 md:p-14 text-center bg-gradient-to-br from-primary/5 via-secondary/5 to-heart/5">
          <h3 className="font-display text-3xl md:text-5xl font-black mb-4">
            <span className="text-gradient">AI bilan tibbiyotni o'zgartiring!</span>
          </h3>
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Sun'iy intellekt va tibbiyot sohasidagi innovatsion loyihangiz bilan hakatonda ishtirok eting va kelajak tibbiyotini yarating!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground bg-primary hover:scale-105 transition-all glow-cyan">
              Ro'yxatdan o'tish
            </a>
            <a href="#architecture" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground glass-card hover:border-secondary/50 transition-all">
              Nizomni yuklab olish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
