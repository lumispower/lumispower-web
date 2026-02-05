import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Coverage from "@/components/Coverage";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function MarketingPage() {
  return (
    <main className="overflow-hidden bg-white">
      <Hero />
      <About />
      <Services />
      <Certifications />
      <Projects />
      <Coverage />
      <Cta />
      <Footer />
    </main>
  );
}
