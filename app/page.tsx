import HeroSection from "@/components/sections/hero-section";
import Navbar from "@/components/navigation/navbar";
import FloatingAssistant from "@/components/features/floating-assistant";
import AboutSection from "@/components/sections/about-section";
import TechStack from "@/components/sections/tech-stack";
import ProjectsSection from "@/components/sections/projects-section";
import MissionControl from "@/components/sections/mission-control";
import FooterSection from "@/components/sections/footer-section";
import Preloader from "@/components/common/preloader";
import SmoothScroll from "@/components/common/smooth-scroll";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black">
      <Preloader />
      <SmoothScroll />

      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStack />
      <ProjectsSection />
      <MissionControl />
      <FloatingAssistant />
      <FooterSection />
    </main>
  );
}