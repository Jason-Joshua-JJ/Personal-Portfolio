import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Character3D from '@/components/Character3D';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import BlenderGallery from '@/components/BlenderGallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import MiniBot from '@/components/MiniBot';

import { useKonamiCode } from '@/hooks/useKonamiCode';

const Index = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { isPartyMode, togglePartyMode } = useKonamiCode();

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onTogglePartyMode={togglePartyMode}
      />
      <main className="w-full">
        <Character3D onOpenTerminal={() => setIsTerminalOpen(true)} isPartyMode={isPartyMode} />

        {/* Extra Bots for Party Mode */}
        {isPartyMode && (
          <>
            <MiniBot color="#ff0000" direction="right" delay={0} />
            <MiniBot color="#00ff00" direction="left" delay={0.5} />
            <MiniBot color="#0000ff" direction="right" delay={1} />
          </>
        )}

        <MiniBot color="#60a5fa" direction="left" delay={0.5} />
        <About />

        <MiniBot color="#f472b6" direction="right" delay={0} />
        <Skills />

        <MiniBot color="#a78bfa" direction="left" delay={0.2} />
        <Projects />

        <MiniBot color="#34d399" direction="right" delay={0.5} />
        <Certifications />

        <MiniBot color="#fbbf24" direction="left" delay={0} />
        <BlenderGallery />

        <MiniBot color="#f87171" direction="right" delay={0.3} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
