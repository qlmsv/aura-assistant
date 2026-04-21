import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustTicker } from "@/components/TrustTicker";
import { StatsBar } from "@/components/StatsBar";
import { Problem } from "@/components/Problem";
import { Services } from "@/components/Services";
import { ReplaceStack } from "@/components/ReplaceStack";
import { DayTimeline } from "@/components/DayTimeline";
import { BusinessOps } from "@/components/BusinessOps";
import { Pricing } from "@/components/Pricing";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustTicker />
        <StatsBar />
        <Problem />
        <Services />
        <ReplaceStack />
        <DayTimeline />
        <BusinessOps />
        <Pricing />
        <HowItWorks />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
