import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntroScene from "@/components/IntroScene";

export default function Home() {
  return (
    <>
      <IntroScene>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Work />
          <About />
          <Services />
          <Contact />
        </main>
        <Footer />
      </IntroScene>
    </>
  );
}
