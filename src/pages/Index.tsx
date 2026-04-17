import { Hero } from "@/components/sections/Hero";
import { Overview } from "@/components/sections/Overview";
import { Goals } from "@/components/sections/Goals";
import { Directions } from "@/components/sections/Directions";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { ScreenDimming } from "@/components/sections/ScreenDimming";
import { Architecture } from "@/components/sections/Architecture";
import { Demo } from "@/components/sections/Demo";
import { Science } from "@/components/sections/Science";
import { Comparison } from "@/components/sections/Comparison";
import { Validation } from "@/components/sections/Validation";
import { Stages } from "@/components/sections/Stages";
import { Scoring } from "@/components/sections/Scoring";
import { Rules } from "@/components/sections/Rules";
import { Roadmap } from "@/components/sections/Roadmap";
import { Team } from "@/components/sections/Team";
import { Awards } from "@/components/sections/Awards";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Hero />
      <Overview />
      <Problem />
      <Goals />
      <Solution />
      <Directions />
      <ScreenDimming />
      <Architecture />
      <Demo />
      <Science />
      <Comparison />
      <Validation />
      <Stages />
      <Scoring />
      <Rules />
      <Roadmap />
      <Team />
      <Awards />
      <Footer />
    </main>
  );
};

export default Index;
