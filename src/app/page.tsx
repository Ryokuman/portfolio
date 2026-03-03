import { SsgoiTransition } from "@ssgoi/react";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CareerSection from "@/components/sections/CareerSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <SsgoiTransition id="/">
      <HeroSection />
      <ProjectsSection />
      <CareerSection />
      <ContactSection />
    </SsgoiTransition>
  );
}
