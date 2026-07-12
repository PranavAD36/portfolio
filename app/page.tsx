import HeroSection from "@/components/sections/hero-section";
import Navbar from "@/components/navigation/navbar";
import FloatingAssistant from "@/components/features/floating-assistant";
import AboutSection from "@/components/sections/about-section";
import TechStack from "@/components/sections/tech-stack";
import ProjectsSection from "@/components/sections/projects-section";
import CodingStats from "@/components/sections/coding-stats"; 
import JourneySection from "@/components/sections/journey-section";
import FooterSection from "@/components/sections/footer-section";
import Preloader from "@/components/common/preloader";
import SmoothScroll from "@/components/common/smooth-scroll"; 
import FeedbackPopup from "@/components/features/feedback-popup";
// import SpotlightCursor from "@/components/ui/spotlight-cursor";
 


export default function Home() {
  return (
    <main className="bg-black min-h-screen w-full relative">
      
      {/* ✅ UTILITIES (Logic Only) */}
      <Preloader />
      <SmoothScroll />
      <FeedbackPopup />
    {/* <SpotlightCursor /> */}

      {/* ✅ VISIBLE SECTIONS */}
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStack />
      <ProjectsSection />
      <CodingStats /> 
      <JourneySection />
      <FloatingAssistant /> 
      <FooterSection /> 
          
    </main>
  );
}