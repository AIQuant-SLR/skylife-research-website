import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

export default function Home() {
  return (
    <div className="antialiased">
      <StructuredData />
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}