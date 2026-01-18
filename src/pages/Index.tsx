import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Character3D from '@/components/Character3D';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import MiniBot from '@/components/MiniBot';
import ScrollFloat from '@/components/ScrollFloat';
import ScrollReveal from '@/components/ScrollReveal';
import Preloader from '@/components/Preloader';

import { useKonamiCode } from '@/hooks/useKonamiCode';

const Index = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { isPartyMode, togglePartyMode } = useKonamiCode();

  // Refs for Curtain Effect
  const mainContentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Hero Visibility Logic
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide hero after scrolling past 100vh to prevent it from blocking the footer
      setHeroVisible(window.scrollY < window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateMargin = () => {
      if (mainContentRef.current && footerRef.current) {
        mainContentRef.current.style.marginBottom = `${footerRef.current.offsetHeight}px`;
      }
    };

    // Initial set
    updateMargin();

    // Update on resize
    window.addEventListener('resize', updateMargin);

    // Optional: Update on content load (if images/fonts change height)
    const observer = new ResizeObserver(() => {
      updateMargin();
      // Force refresh GSAP ScrollTrigger to ensure triggers are correct
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh());
    });
    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      window.removeEventListener('resize', updateMargin);
      observer.disconnect();
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ... (existing resize code)
    const updateMargin = () => {
      if (mainContentRef.current && footerRef.current) {
        mainContentRef.current.style.marginBottom = `${footerRef.current.offsetHeight}px`;
      }
    };
    // ...
  });

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onTogglePartyMode={togglePartyMode}
      />
      <main className="w-full">
        {/* FIXED HERO LAYER (z-1) */}
        {/* Must have bg-background to hide the fixed footer behind it initially. Higher Z than footer (0) but lower than content (10) */}
        <div
          className="fixed top-0 left-0 right-0 h-screen z-[1] bg-background transition-opacity duration-500"
          style={{ opacity: heroVisible ? 1 : 0, pointerEvents: heroVisible ? 'auto' : 'none' }}
        >
          <Character3D
            onOpenTerminal={() => setIsTerminalOpen(true)}
            isPartyMode={isPartyMode}
            isHeroActive={!isLoading}
          />
        </div>

        {/* MAIN CONTENT (Top Layer) - z-10, white bg, margin-bottom = footer height */}
        <div ref={mainContentRef} className="relative z-10 bg-transparent shadow-2xl pointer-events-none">
          {/* Spacer for Hero (since Hero is fixed, we need 100vh space) */}
          <div className="h-[100vh] w-full bg-transparent" />

          {/* Content starts here with background to cover the fixed hero as we scroll */}
          <div className="relative bg-background pointer-events-auto">
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

            <Skills />

            <Projects />

            <Certifications />

            <section className="min-h-[80vh] flex items-center py-20 px-6 lg:px-12 relative overflow-hidden">
              <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Massive Text */}
                <div className="text-left relative z-10">
                  <h2 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-8">
                    <ScrollFloat animationDuration={1} ease="back.out(2)" stagger={0.03}>EXPLORE</ScrollFloat> <br />
                    <ScrollFloat className="gradient-text" animationDuration={1} ease="back.out(2)" stagger={0.03} split={false}>3D WORLD</ScrollFloat>
                  </h2>
                  <ScrollReveal delay={0.2}>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-lg leading-relaxed">
                      Dive into a curated universe of Blender renders, animations, and digital experiments.
                    </p>
                  </ScrollReveal>
                </div>

                {/* Right: Glossy Card Button */}
                <div className="relative group w-full flex justify-center lg:justify-end">
                  <a
                    href="/gallery"
                    className="block relative w-full max-w-md h-[600px] transition-all duration-500 transform group-hover:-translate-y-2"
                  >
                    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(0,217,255,0.3)] group-hover:border-white/20 relative">

                      {/* Abstract Gradient Background for Card */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                        <div className="w-32 h-32 mb-8 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-xl border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white opacity-80"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>

                        <h3 className="text-4xl font-bold text-white mb-2 tracking-wide">ENTER</h3>
                        <span className="text-lg text-white/60 font-mono tracking-widest uppercase">Gallery</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>

            {/* Outro / Call to Action Section */}
            <section className="py-32 px-6 flex flex-col items-center justify-center text-center">
              <h2 className="text-5xl md:text-7xl font-bold mb-8">
                <ScrollFloat animationDuration={1} ease="back.out(2)" stagger={0.03}>Ready to</ScrollFloat> <ScrollFloat className="gradient-text" animationDuration={1} ease="back.out(2)" stagger={0.03} split={false}>Collaborate?</ScrollFloat>
              </h2>
              <ScrollReveal delay={0.2} className="flex flex-col items-center">
                <p className="text-xl text-muted-foreground max-w-2xl mb-12">
                  Let's turn your vision into a reality. Scroll down to get in touch.
                </p>
                <div className="animate-bounce">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              </ScrollReveal>
            </section>
          </div>
        </div>

        {/* FOOTER REVEAL (Bottom Layer) - Fixed z-0 */}
        <div ref={footerRef} className="fixed bottom-0 left-0 right-0 z-0">
          <Contact />
          <Footer />
        </div>

      </main>
    </div>
  );
};

export default Index;
