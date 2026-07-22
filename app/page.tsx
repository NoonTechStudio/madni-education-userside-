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
import DataModeSwitcher from "@/components/DataModeSwitcher/DataModeSwitcher";

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

      {/* Wave: donate → nurturing */}
      <WaveDivider
        fromColor="var(--amber-pale)"
        toColor="#F0F7F4"
        path="M0,30 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"
      />

      {/* 7b. Nurturing Hearts section */}
      <section style={{ background: "#F0F7F4", padding: "80px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div className="fade-in" style={{
            background: "white",
            borderRadius: 28,
            padding: "52px 56px",
            boxShadow: "0 8px 40px rgba(26,107,90,0.10)",
            borderLeft: "6px solid #1A6B5A",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* decorative quote mark */}
            <span aria-hidden="true" style={{
              position: "absolute", top: -10, left: 40,
              fontFamily: "Georgia, serif", fontSize: 160, lineHeight: 1,
              color: "rgba(26,107,90,0.05)", pointerEvents: "none", userSelect: "none",
            }}>&ldquo;</span>

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* pill */}
              <span style={{
                display: "inline-block",
                background: "#1A6B5A", color: "white",
                fontFamily: "var(--font-dm-sans-var), sans-serif",
                fontWeight: 600, fontSize: 12,
                padding: "5px 18px", borderRadius: 9999,
                letterSpacing: "0.06em", textTransform: "uppercase",
                marginBottom: 20,
              }}>
                Since 1996
              </span>

              <h2 style={{
                fontFamily: "var(--font-epilogue-var), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(22px, 3.5vw, 34px)",
                color: "#1A6B5A",
                lineHeight: 1.2,
                margin: "0 0 24px",
              }}>
                Nurturing Hearts, Building Futures – Since 1996
              </h2>

              <p style={{
                fontFamily: "var(--font-dm-sans-var), sans-serif",
                fontSize: 17,
                color: "#4A4A4A",
                lineHeight: 1.85,
                margin: 0,
              }}>
                Since 1996, Madrasa Ashrafia Talimul Islam has been nurturing Muslim children with both
                religious and worldly education—completely free of cost. Here, children learn to respect
                their elders, love their country, earn a lawful living, and grow with good morals. Over
                the years, nearly 7,000 children have left behind bad habits, learned the Quran, and
                embraced a life of kindness, brotherhood, and prayer. This has been possible only through
                the generous support of our Muslim brothers.
              </p>

              {/* stat chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
                {[
                  { icon: "🕌", text: "Free Islamic Education" },
                  { icon: "👦", text: "7,000+ Children Benefited" },
                  { icon: "📖", text: "Quran & Character Building" },
                  { icon: "🤝", text: "Community Supported" },
                ].map(({ icon, text }) => (
                  <span key={text} style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    background: "#EAF4F0", color: "#1A6B5A",
                    fontFamily: "var(--font-dm-sans-var), sans-serif",
                    fontWeight: 600, fontSize: 13,
                    padding: "7px 16px", borderRadius: 9999,
                  }}>
                    {icon} {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave: nurturing → stories */}
      <WaveDivider
        fromColor="#F0F7F4"
        toColor="var(--bg)"
        path="M0,20 C480,60 960,0 1440,40 L1440,60 L0,60 Z"
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

      {/* Floating Data Mode Switcher Widget */}
      <DataModeSwitcher />
    </>
  );
}
