import { Trophy, Play, FileText, Users, Clock, Award, Activity } from "lucide-react";
import { ParticleBackground } from "@/components/ParticleBackground";

export const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Mesh background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[140px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple/10 blur-[160px]" />
      </div>

      <ParticleBackground />

      <div className="relative z-10 max-w-6xl mx-auto text-center animate-fade-in">
        {/* Category badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase">
            Tibbiyot Texnologiyalari · Sun'iy Intellekt
          </span>
        </div>

        {/* Level badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-medium border border-purple/40 bg-purple/15 text-purple-light">
            🤖 AI
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium border border-heart/40 bg-heart/15 text-heart">
            ❤️ Hakaton
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium border border-primary/40 bg-primary/15 text-primary">
            🇺🇿 Respublika
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium border border-dna/40 bg-dna/15 text-dna">
            🌍 Xalqaro
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-none tracking-tight">
          <span className="block bg-gradient-to-r from-primary via-cyan-bright to-primary bg-clip-text text-transparent">
            POSTURE
          </span>
          <span className="block bg-gradient-to-r from-secondary via-purple-light to-secondary bg-clip-text text-transparent">
            AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl font-medium text-foreground/90 mb-3 max-w-3xl mx-auto leading-tight">
          Sun'iy intellekt asosida ergonomik xavf monitoringi va prognozlash tizimi
        </p>

        <p className="text-sm md:text-base text-muted-foreground mb-10">
          IT va tibbiyot integratsiyasi · AI HEALTH Hakaton 2026
        </p>

        {/* Hero stat pills (template style) */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-primary/20 backdrop-blur-md hover:border-primary/50 transition-all">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-mono font-bold text-foreground">2-5</span>
            <span className="text-xs text-muted-foreground">jamoa</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-secondary/20 backdrop-blur-md hover:border-secondary/50 transition-all">
            <Clock className="w-5 h-5 text-secondary" />
            <span className="font-mono font-bold text-foreground">24-48</span>
            <span className="text-xs text-muted-foreground">soat</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-amber/20 backdrop-blur-md hover:border-amber/50 transition-all">
            <Award className="w-5 h-5 text-amber" />
            <span className="font-mono font-bold text-foreground">100</span>
            <span className="text-xs text-muted-foreground">ball</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-heart/20 backdrop-blur-md hover:border-heart/50 transition-all">
            <Trophy className="w-5 h-5 text-heart" />
            <span className="font-mono font-bold text-foreground">I-II-III</span>
            <span className="text-xs text-muted-foreground">o'rin</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo("demo")}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground bg-primary hover:scale-105 transition-all duration-300 glow-cyan"
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
      </div>
    </section>
  );
};
