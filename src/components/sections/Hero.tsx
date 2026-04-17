import { Trophy, Play, FileText } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";

export const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Mesh background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[140px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple/10 blur-[160px]" />
      </div>

      <ParticleBackground />

      <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card border-primary/30">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground/90">
            AI HEALTH 2026 — Respublika hakatoni
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none">
          <span className="text-gradient inline-block animate-gradient-shift" style={{ backgroundSize: "200% 200%" }}>
            PostureAI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-3xl font-medium text-foreground/90 mb-4 max-w-3xl mx-auto leading-tight">
          Sun'iy intellekt asosida ergonomik xavf monitoringi va prognozlash tizimi
        </p>

        <p className="text-base md:text-lg text-muted-foreground mb-12">
          AI HEALTH Hakaton 2026 · Profilaktika va kasalliklarni prognozlash
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo("demo")}
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground bg-primary hover:scale-105 transition-all duration-300 glow-cyan"
          >
            <Play className="w-5 h-5" />
            Demo ko'rish
          </button>
          <button
            onClick={() => scrollTo("architecture")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground glass-card hover:border-secondary/50 transition-all duration-300"
          >
            <FileText className="w-5 h-5" />
            Texnik hujjat
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-pulse-glow" />
          </div>
        </div>
      </div>
    </section>
  );
};
