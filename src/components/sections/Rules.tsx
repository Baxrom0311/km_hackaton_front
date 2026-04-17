import { Users, GraduationCap, Gavel, ShieldOff, ListChecks, Coins } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const rules = [
  { icon: Users, title: "Jamoa tarkibi", desc: "Har bir jamoa 2 nafardan 5 nafargacha ishtirokchidan iborat bo'ladi. Bir ishtirokchi faqat bitta jamoa tarkibida qatnashishi mumkin." },
  { icon: GraduationCap, title: "OTM talabalari", desc: "Hakaton respublika hududidagi davlat va nodavlat oliy ta'lim muassasalari talabalari o'rtasida o'tkaziladi." },
  { icon: Gavel, title: "Hakamlar qarori yakuniy", desc: "Hakamlar hay'ati qarorlari yakuniy hisoblanadi va qayta ko'rib chiqilmaydi, apellyatsiya hollari bundan mustasno." },
  { icon: ShieldOff, title: "Plagiat taqiqlanadi", desc: "Plagiat aniqlangan taqdirda jamoa hakatondan chetlashtiriladi. Loyiha mualliflik huquqi jamoaga tegishli bo'ladi." },
  { icon: ListChecks, title: "Ichki saralash", desc: "Har bir OTM ichki saralash natijalariga ko'ra belgilangan miqdordagi jamoalarni final bosqichiga tavsiya etadi." },
  { icon: Coins, title: "Moliyalashtirish", desc: "Hakaton festival byudjeti, homiylar va hamkor tashkilotlar mablag'lari hisobidan moliyalashtiriladi." },
];

export const Rules = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="rules" className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/30 mb-4">
            📜 Qoidalar
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
            Asosiy <span className="text-gradient">qoidalar</span>
          </h2>
          <p className="text-muted-foreground">Ishtirokchilar uchun muhim talablar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rules.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className="glass-card p-6 flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground mb-1.5">{r.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
