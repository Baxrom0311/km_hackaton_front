import { useReveal } from "@/hooks/useReveal";
import { BookOpen } from "lucide-react";

const refs = [
  { authors: "Bazarevsky et al.", title: "BlazePose: On-device Real-time Body Pose Tracking", venue: "CVPR 2020 Workshop" },
  { authors: "Kazeminasab et al.", title: "Neck Pain: Global Epidemiology", venue: "BMC Musculoskelet Disord 2022" },
  { authors: "Konieczny et al.", title: "Epidemiology of adolescent idiopathic scoliosis", venue: "J Child Orthop 2013" },
  { authors: "Daneshmandi et al.", title: "Adverse Effects of Prolonged Sitting", venue: "J Lifestyle Med 2017" },
  { authors: "Sheppard & Wolffsohn", title: "Digital eye strain: prevalence and amelioration", venue: "BMJ Open Ophthalmol 2018" },
  { authors: "Stenum et al.", title: "Video-based analysis using pose estimation", venue: "PLOS Comput Biol 2021" },
];

export const Science = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-padding relative">
      <div ref={ref} className="reveal max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/30 mb-4">
            Ilmiy asos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient">Peer-reviewed</span> tadqiqotlarga asoslangan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {refs.map((r, i) => (
            <div key={i} className="glass-card p-5 flex gap-4 items-start group">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/40 group-hover:to-secondary/40 transition-colors">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary mb-1">{r.authors}</p>
                <p className="text-foreground/90 leading-snug mb-2">{r.title}</p>
                <p className="text-xs text-muted-foreground italic">{r.venue}</p>
              </div>
              <div className="flex-shrink-0 text-xs font-mono text-muted-foreground">[{i + 1}]</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
