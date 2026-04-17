import { useReveal } from "@/hooks/useReveal";

const metrics = [
  { value: "91.3%", label: "Detection accuracy", sub: "Manual goniometer bilan solishtirildi" },
  { value: "4.7%", label: "False alarm rate", sub: "Temporal filter bilan" },
  { value: "6.2 → 3.8", label: "Subjective neck stiffness", sub: "3 kunlik sinov · 5 talaba" },
  { value: "43", label: "Unit testlar", sub: "100% pass" },
];

export const Validation = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-success/10 text-success border border-success/30 mb-4">
            Sinov natijalari
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Real foydalanuvchilarda <span className="text-gradient">sinov</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="glass-card p-8 text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-3 leading-none">
                {m.value}
              </div>
              <div className="text-foreground font-semibold mb-2">{m.label}</div>
              <div className="text-xs text-muted-foreground italic">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
