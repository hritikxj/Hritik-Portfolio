import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntroScene from "@/components/IntroScene";

export default function Home() {
  return (
    <IntroScene>
      <Navbar />
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Services />
      <Contact />
      <Footer />
    </IntroScene>
  );
}
