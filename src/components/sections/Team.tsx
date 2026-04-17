import { useReveal } from "@/hooks/useReveal";
import { User } from "lucide-react";

const team = [
  { name: "Team Lead", role: "AI Developer", initials: "TL" },
  { name: "Backend Dev", role: "Python · ML Engineer", initials: "BD" },
  { name: "UI/UX Designer", role: "Product Designer", initials: "UX" },
];

export const Team = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-padding relative">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 mb-4">
            Jamoa
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Bizning <span className="text-gradient">jamoa</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {team.map((m, i) => (
            <div key={i} className="glass-card p-8 text-center group">
              <div className="relative mx-auto mb-5 w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center font-display text-2xl font-bold text-gradient">
                    {m.initials}
                  </div>
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground">
          OTM: <span className="text-foreground font-medium">[Universitet nomi]</span>
        </p>
      </div>
    </section>
  );
};
