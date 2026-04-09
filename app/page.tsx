import AnnouncementBar from "@/components/AnnoucementBar/AnnouncementBar";
import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import WaveDivider from "@/components//WaveDivider/WaveDivider";
import SchoolsSection from "@/components/SchoolsSection/SchoolsSection";
import StatsStrip from "@/components/StatsStrip/StatsStrip";
import AboutSection from "@/components/AboutSection/AboutSection";
import DonateSection from "@/components/DonateSection/DonateSection";
import StoriesSection from "@/components/StoriesSection/StoriesSection";
import BlogSection from "@/components/BlogSection/BlogSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
import ScrollAnimations from "@/components/ScrollAnimation/ScrollAnimations";

export default function Home() {
  return (
    <>
      {/* Global scroll fade-in observer */}
      <ScrollAnimations />

      {/* 1. Announcement bar */}
      <AnnouncementBar />

      {/* 2. Navigation */}
      <Navbar />

      {/* 3. Hero */}
      <HeroSection />

      {/* Wave: hero → schools */}
      <WaveDivider
        fromColor="var(--teal-dark)"
        toColor="var(--bg)"
        path="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
      />

      {/* 4. School selection */}
      <SchoolsSection />

      {/* Wave: schools → stats */}
      <WaveDivider
        fromColor="var(--bg)"
        toColor="var(--teal-light)"
        path="M0,20 C400,60 1040,0 1440,40 L1440,60 L0,60 Z"
      />

      {/* 5. Mission stats */}
      <StatsStrip />

      {/* Wave: stats → about */}
      <WaveDivider
        fromColor="var(--teal-light)"
        toColor="var(--bg)"
        path="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"
      />

      {/* 6. About */}
      <AboutSection />

      {/* Wave: about → donate */}
      <WaveDivider
        fromColor="var(--bg)"
        toColor="var(--amber-pale)"
        path="M0,10 C480,60 960,0 1440,50 L1440,60 L0,60 Z"
      />

      {/* 7. Donation module */}
      <DonateSection />

      {/* Wave: donate → stories */}
      <WaveDivider
        fromColor="var(--amber-pale)"
        toColor="var(--bg)"
        path="M0,30 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"
      />

      {/* 8. Impact stories */}
      <StoriesSection />

      {/* Wave: stories → blog */}
      <WaveDivider
        fromColor="var(--bg)"
        toColor="var(--teal-light)"
        path="M0,50 C480,0 960,60 1440,10 L1440,60 L0,60 Z"
      />

      {/* 9. Blog / News */}
      <BlogSection />

      {/* Wave: blog → contact */}
      <WaveDivider
        fromColor="var(--teal-light)"
        toColor="#F5F0EB"
        path="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z"
      />

      {/* 10. Contact */}
      <ContactSection />

      {/* 11. Footer */}
      <Footer />
    </>
  );
}
