import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollAnimations from "@/components/ScrollAnimation/ScrollAnimations";
import WaveDivider from "@/components/WaveDivider/WaveDivider";

import OurSchoolsHero from "@/components/OurSchools/OurSchoolsHero";
import SchoolsGrid from "@/components/OurSchools/SchoolsGrid";
import OurSchoolsStats from "@/components/OurSchools/OurSchoolsStats";
import CurriculumSection from "@/components/OurSchools/CurriculumSection";
import TrustsSection from "@/components/OurSchools/TrustsSection";
import SchoolsContactSection from "@/components/OurSchools/SchoolsContactSection";
import OurSchoolsCTA from "@/components/OurSchools/OurSchoolsCTA";
import CertificationsSection from "@/components/OurSchools/CertificationsSection";
import SchoolPhotoGallery from "@/components/OurSchools/SchoolPhotoGallery";

export const metadata = {
  title: "Our Schools — Madni Education Trust",
  description:
    "Explore Sabri High School and Markaz Public School under Madni Education Trust — providing quality Gujarati and English medium education to 650+ students in Karjan, Vadodara.",
};

export default function OurSchoolsPage() {
  return (
    <>
      {/* Global scroll fade-in observer */}
      <ScrollAnimations />

      {/* Sticky navigation */}
      <Navbar />

      {/* 1. Hero banner */}
      <OurSchoolsHero />

      {/* Wave: hero → schools grid */}
      <WaveDivider
        fromColor="#2E8B6E"
        toColor="var(--bg)"
        path="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
      />

      {/* 2. Schools grid */}
      <SchoolsGrid />

      {/* Wave: schools grid → stats */}
      <WaveDivider
        fromColor="var(--bg)"
        toColor="var(--teal-light)"
        path="M0,20 C400,60 1040,0 1440,40 L1440,60 L0,60 Z"
      />

      {/* 3. Animated stats strip */}
      <OurSchoolsStats />

      {/* Wave: stats → curriculum */}
      <WaveDivider
        fromColor="var(--teal-light)"
        toColor="var(--bg)"
        path="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"
      />

      {/* 4. Medium & curriculum */}
      <CurriculumSection />

      {/* Wave: curriculum → certifications */}
      <WaveDivider
        fromColor="var(--bg)"
        toColor="#FFF8EC"
        path="M0,10 C480,60 960,0 1440,50 L1440,60 L0,60 Z"
      />

      {/* 4b. Certifications — 12A & 80G */}
      <CertificationsSection />

      {/* Wave: certifications → gallery */}
      <WaveDivider
        fromColor="#FFF8EC"
        toColor="#0F3D35"
        path="M0,30 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"
      />

      {/* 4c. Pinterest-style photo gallery */}
      <SchoolPhotoGallery />

      {/* Wave: gallery → trusts */}
      <WaveDivider
        fromColor="#0F3D35"
        toColor="var(--teal-light)"
        path="M0,20 C400,60 1040,0 1440,40 L1440,60 L0,60 Z"
      />

      {/* 5. Charitable trusts */}
      <TrustsSection />

      {/* Wave: trusts → contact */}
      <WaveDivider
        fromColor="var(--teal-light)"
        toColor="var(--bg)"
        path="M0,30 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"
      />

      {/* 6. Contact section */}
      <SchoolsContactSection />

      {/* Wave: contact → CTA */}
      <WaveDivider
        fromColor="var(--bg)"
        toColor="#1A6B5A"
        path="M0,20 C480,60 960,0 1440,40 L1440,60 L0,60 Z"
      />

      {/* 7. Page-end CTA banner */}
      <OurSchoolsCTA />

      {/* Footer */}
      <Footer />
    </>
  );
}
