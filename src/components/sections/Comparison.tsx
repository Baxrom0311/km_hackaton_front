import { useReveal } from "@/hooks/useReveal";
import { Check, X } from "lucide-react";

const features = [
  "Real-time posture detection",
  "Eye strain monitoring",
  "20-20-20 eye gaze tracking",
  "Screen dimming nudge",
  "Predictive pain forecast",
  "Multi-signal ergonomic score",
  "O'zbek tilida",
  "100% local (privacy)",
  "Ilmiy asoslangan",
];

const data = [
  [true, true, true, false],
  [true, false, false, false],
  [true, false, false, false],
  [true, false, false, false],
  [true, false, false, false],
  [true, false, false, false],
  [true, false, false, false],
  [true, false, true, true],
  [true, false, false, false],
];

const cols = ["PostureAI", "SlouchSniper", "Pose-Nudge", "Oddiy eslatma"];

const Cell = ({ ok, highlight }: { ok: boolean; highlight?: boolean }) => (
  <div className="flex items-center justify-center">
    {ok ? (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${highlight ? "bg-primary/20 glow-cyan" : "bg-success/15"}`}>
        <Check className={`w-4 h-4 ${highlight ? "text-primary" : "text-success"}`} strokeWidth={3} />
      </div>
    ) : (
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/40">
        <X className="w-4 h-4 text-muted-foreground/50" strokeWidth={2.5} />
      </div>
    )}
  </div>
);

export const Comparison = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-padding relative">
      <div ref={ref} className="reveal max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 mb-4">
            Raqobatchilar
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient">Raqobatchilardan</span> farqimiz
          </h2>
        </div>

        <div className="glass-card p-2 md:p-6 overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Feature
                </th>
                {cols.map((c, i) => (
                  <th
                    key={c}
                    className={`p-4 text-center text-sm font-bold ${
                      i === 0 ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {i === 0 ? (
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                        {c}
                      </span>
                    ) : (
                      c
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={f} className="border-t border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="p-4 text-foreground/90 font-medium">{f}</td>
                  {data[i].map((ok, j) => (
                    <td key={j} className="p-4">
                      <Cell ok={ok} highlight={j === 0 && ok} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
