import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyUsSection } from "@/components/WhyUsSection";

export default function HomePage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
