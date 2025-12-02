import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero3D from '@/components/Hero3D';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import BlenderGallery from '@/components/BlenderGallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';

const Index = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <main className="w-full">
        <Hero3D onOpenTerminal={() => setIsTerminalOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <BlenderGallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
