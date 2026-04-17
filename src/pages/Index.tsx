import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { ScreenDimming } from "@/components/sections/ScreenDimming";
import { Architecture } from "@/components/sections/Architecture";
import { Demo } from "@/components/sections/Demo";
import { Science } from "@/components/sections/Science";
import { Comparison } from "@/components/sections/Comparison";
import { Validation } from "@/components/sections/Validation";
import { Roadmap } from "@/components/sections/Roadmap";
import { Team } from "@/components/sections/Team";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Hero />
      <Problem />
      <Solution />
      <ScreenDimming />
      <Architecture />
      <Demo />
      <Science />
      <Comparison />
      <Validation />
      <Roadmap />
      <Team />
      <Footer />
    </main>
  );
};

export default Index;
