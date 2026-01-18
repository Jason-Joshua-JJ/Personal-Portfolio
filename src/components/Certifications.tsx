import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import { certifications } from '@/data/certifications';
import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const splashStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
  zIndex: -1,
};

// Site theme colors for the splash gradient
const gradients = [
  "linear-gradient(306deg, hsl(142 76% 36%), hsl(160 84% 39%))", // Primary to Neon Blue
  "linear-gradient(306deg, hsl(160 84% 39%), hsl(262 83% 58%))", // Neon Blue to Purple
  "linear-gradient(306deg, hsl(262 83% 58%), hsl(142 76% 36%))", // Purple to Primary
];

export default function Certifications() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !cardsContainerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".cert-card", cardsContainerRef.current);
    const totalCards = cards.length;
    // We want to move (totalCards - 1) * 100% up
    const yPercentMove = -100 * (totalCards - 1);

    gsap.to(cardsContainerRef.current, {
      yPercent: yPercentMove,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: `+=${totalCards * 100}%`, // Scroll distance based on card count
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="certifications" className="relative h-screen bg-card/30 overflow-hidden">
      <div className="flex h-full w-full flex-col lg:flex-row max-w-7xl mx-auto">

        {/* Left Column - Static Header (Pinned visually) */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 lg:px-12 relative z-10 bg-background/50 backdrop-blur-sm lg:bg-transparent">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <ScrollFloat animationDuration={1} ease="back.out(2)" stagger={0.03}>Professional</ScrollFloat> <br />
              <ScrollFloat className="gradient-text" animationDuration={1} ease="back.out(2)" stagger={0.03} split={false}>Certifications</ScrollFloat>
            </h2>
            <div className="w-32 h-2 bg-primary mb-8 rounded-full" />

            <p className="text-lg text-muted-foreground max-w-md">
              A collection of my validated skills and achievements.
              Each certification represents a milestone in my journey of continuous learning.
            </p>

            <div className="mt-12 flex items-center gap-4 text-sm text-muted-foreground/60">
              <div className="h-10 w-0.5 bg-border animate-pulse" />
              <span>Scroll to explore</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Scrolling Cards */}
        <div className="w-full lg:w-1/2 h-full overflow-hidden relative">
          <div ref={cardsContainerRef} className="flex flex-col w-full h-full">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="cert-card w-full h-screen flex-shrink-0 flex items-center justify-center p-6"
              >
                <div className="relative w-full max-w-md flex justify-center items-center">
                  {/* Splash Background */}
                  <div
                    style={{
                      ...splashStyle,
                      background: gradients[index % gradients.length]
                    }}
                    className="opacity-50 blur-xl scale-110"
                  />

                  {/* Card Content */}
                  <div className="glass p-8 rounded-2xl border border-border/50 bg-background/80 hover:bg-background/90 transition-colors w-full relative z-10 shadow-2xl">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-primary/10 rounded-xl">
                        <Award className="w-10 h-10 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground font-mono bg-secondary/50 px-3 py-1 rounded-full">{cert.date}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-foreground">
                      {cert.title}
                    </h3>

                    <p className="text-base text-muted-foreground mb-6">
                      Issued by <span className="text-primary font-semibold">{cert.issuer}</span>
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      Verify Certificate
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
