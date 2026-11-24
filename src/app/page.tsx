import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollMemory from "@/components/ScrollMemory";

export default function Home() {
  return (
    <>
      <ScrollMemory />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
