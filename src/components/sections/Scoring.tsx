import { useReveal } from "@/hooks/useReveal";

const criteria = [
  { score: 20, title: "Dolzarbligi va amalga oshirish", desc: "Tibbiy va ijtimoiy jihatdan amalga oshirish mumkinligi, ilmiy tahliliy ma'lumotlar aniqligi", color: "primary" },
  { score: 25, title: "Innovatsionlik va yangilik", desc: "Taqdimotning yangiligi, tibbiy va ijtimoiy yangilikni joriy qilish imkoniyati", color: "secondary" },
  { score: 25, title: "MVP mavjudligi", desc: "Sinovlar muvaffaqiyatli o'tgan, tibbiy-ijtimoiy samaradorlik tasdiqlanganlik darajasi", color: "dna" },
  { score: 10, title: "Ilmiy asoslanganlik", desc: "Ilmiy dalillar bilan asoslanganligi, ilmiy adabiyotlar bilan ishlanganlik aniqligi", color: "amber" },
  { score: 15, title: "Savol-javob", desc: "Ilmiy va amaliy jihatdan tanlov komissiyasi a'zolari savollariga javob berish", color: "heart" },
  { score: 5, title: "Prezentatsiya sifati", desc: "Tushunarlilik va aniqlik, vizual taqdimot sifati, informatsion grafikalar mavjudligi", color: "primary" },
];

export const Scoring = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="scoring" className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/30 mb-4">
            ⭐ Baholash
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
            Baholash <span className="text-gradient">mezonlari</span>
          </h2>
          <p className="text-muted-foreground">100 ballik tizim asosida baholanadi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {criteria.map((c, i) => (
            <div key={i} className="glass-card p-6 group">
              <div className="flex items-baseline gap-3 mb-3">
                <span className={`font-display text-5xl font-black text-${c.color} leading-none`}>{c.score}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">ball</span>
              </div>
              <h4 className="font-display text-base font-bold text-foreground mb-2">{c.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
