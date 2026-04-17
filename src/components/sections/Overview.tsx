import { Info, FileText } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const infoRows = [
  ["Format", "Hakaton / Pitch"],
  ["Davomiylik", "24-48 soat"],
  ["Jamoa", "2-5 nafar"],
  ["Ishtirokchilar", "OTM talabalari"],
  ["Bosqichlar", "2 bosqich"],
  ["Baholash", "100 ball"],
  ["Taqdimot", "5-7 daq. pitch"],
  ["Natija", "MVP / demo"],
];

export const Overview = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="overview" className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/30 mb-4">
            <Info className="w-3.5 h-3.5" /> Umumiy ma'lumot
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">PostureAI</span> loyihasi
          </h2>
          <p className="text-muted-foreground">Sun'iy intellekt va ergonomika integratsiyasi</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 glass-card p-8 md:p-10">
            <p className="text-foreground/80 leading-relaxed mb-4 text-base md:text-lg">
              <span className="text-primary font-semibold">"PostureAI"</span> — bu sun'iy intellekt
              texnologiyalari asosida ofis xodimlari, talabalar va o'quvchilarning ergonomik
              xavflarini real vaqtda monitoring qiluvchi va kelajakdagi og'riq ehtimolini
              bashorat qiluvchi tizim. Loyiha AI HEALTH Hakaton 2026 doirasida ishlab chiqilgan.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Tizim oddiy webcam orqali 33 ta tana nuqtasini aniqlaydi va 5 ta signal asosida
              ergonomik xavfni baholaydi: <span className="text-foreground font-medium">posture, ko'z
              masofasi, 20-20-20 qoidasi, o'tirish vaqti va prediktiv prognoz</span>. Eng yuqori ball
              to'plagan jamoalar <span className="text-amber font-semibold">I, II va III o'rinlarni</span> egallaydi.
            </p>
          </div>

          <div className="rounded-2xl p-6 md:p-7 bg-white/[0.03] border border-primary/15 backdrop-blur-md">
            <h4 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-5 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Hakaton ma'lumotlari
            </h4>
            <div className="space-y-0">
              {infoRows.map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-sm font-semibold text-foreground font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
