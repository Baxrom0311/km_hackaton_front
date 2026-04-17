import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="font-display text-3xl font-bold text-gradient mb-2">PostureAI</div>
        <p className="text-foreground/80 mb-1">AI HEALTH Hakaton 2026</p>
        <p className="text-sm text-muted-foreground italic mb-6">
          Sun'iy intellekt bilan sog'lom kelajak
        </p>

        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href="#demo" className="hover:text-primary transition-colors">Demo</a>
          <a href="#architecture" className="hover:text-primary transition-colors">Arxitektura</a>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-xs text-muted-foreground">
          © 2026 PostureAI. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
};
