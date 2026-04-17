import { useReveal } from "@/hooks/useReveal";
import { Zap } from "lucide-react";
import dimImg from "@/assets/screen-dimming.jpg";

export const ScreenDimming = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-padding relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/30 mb-6">
              <Zap className="w-3 h-3" /> Asosiy fishka
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Bukchaysangiz —{" "}
              <span className="text-gradient">ekran xira</span> bo'ladi
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Oddiy notification'dan samaraliroq. Noto'g'ri posture aniqlanganda ekran avtomatik
              xiraytadi — foydalanuvchi <span className="text-primary font-semibold">majburan
              holatini tuzatadi</span>. To'g'ri o'tirganda — ekran tiklanadi.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm">
              <span className="text-muted-foreground">Texnologiya:</span>
              <code className="text-primary font-mono">macOS CoreGraphics API</code>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-2xl opacity-60" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 glow-cyan">
              <img
                src={dimImg}
                alt="Ekran xirayish demo: to'g'ri o'tirgan foydalanuvchi yorqin ekran, bukchaygan foydalanuvchi xira ekran"
                className="w-full h-auto"
                loading="lazy"
                width={1024}
                height={640}
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-success/20 backdrop-blur text-success text-xs font-bold border border-success/40">
                ✓ TO'G'RI
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-destructive/20 backdrop-blur text-destructive text-xs font-bold border border-destructive/40">
                ✗ XIRA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
