import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import ShuffleText from './ShuffleText';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const numberSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textContainerRef.current || !numberSectionRef.current) return;

    const slides = gsap.utils.toArray<HTMLElement>(".project-slide", containerRef.current);
    const totalSlides = slides.length; // e.g., 5
    const actualMoveCount = totalSlides - 1; // e.g., 4 moves

    // 1. PIN & SCRUB SETUP
    // We extend the scroll distance (end) to make the scrolling feel "heavier" and smoother.
    // 150% per slide gives user plenty of pixel-distance to digest the content.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: `+=${totalSlides * 150}%`,
        scrub: 1,
      }
    });

    // 2. MASTER TIMELINE LOGIC
    // We use absolute time units (0, 1, 2...). 
    // 1 Unit = 1 Slide Transition.

    // A. TEXT SCROLL (Left Side)
    // Continuous, linear movement from 0 to N-1.
    // Starts exactly at time 0.
    tl.to(textContainerRef.current, {
      yPercent: -100 * actualMoveCount, // e.g. -400%
      ease: "none",
      duration: actualMoveCount // e.g. 4.0
    }, 0); // ABSOLUTE START AT 0

    // B. NUMBER SNAP (Right Side)
    // Snaps happen exactly halfway through a transition (0.5, 1.5, 2.5...)
    // We loop from 0 to N-1 transitions.
    for (let i = 0; i < actualMoveCount; i++) {

      // Debug check (implicit)
      if (numberSectionRef.current) {
        tl.to(numberSectionRef.current, {
          yPercent: -((i + 1) * 100) / totalSlides,
          duration: 0.2, // Fast snap
          ease: "power3.inOut"
        }, i + 0.5); // Insert at 0.5, 1.5, etc.
      }
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" className="relative h-screen overflow-hidden bg-background">

      <div className="flex h-full w-full flex-col lg:flex-row">

        {/* LEFT: Project Content */}
        <div ref={textSectionRef} className="relative w-full lg:w-1/2 h-full overflow-hidden order-2 lg:order-1">
          {/* Floating Header */}
          <div className="absolute top-10 left-6 sm:left-12 z-20 pointer-events-none mix-blend-difference">
            <h2 className="text-2xl font-bold text-foreground">
              Selected <span className="gradient-text">Works</span>
            </h2>
            <div className="w-10 h-1 bg-primary mt-2" />
          </div>

          {/* Scrolling Inner Container */}
          <div ref={textContainerRef} className="flex flex-col w-full h-full">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-slide w-full h-screen flex-shrink-0 flex flex-col justify-center px-8 md:px-20"
              >
                <div className="max-w-xl">
                  <span className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block">
                    {project.category}
                  </span>

                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    <ShuffleText text={project.title} />
                  </h3>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="px-3 py-1 bg-secondary/50">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors group"
                      >
                        <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 rounded-lg transition-colors group"
                      >
                        <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1 hover:-translate-y-1" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Number Strip */}
        <div className="hidden lg:flex w-1/2 h-full relative items-center justify-center bg-background/50 border-l border-border/10 backdrop-blur-sm order-2">
          <div className="flex items-start justify-center font-bold leading-none select-none overflow-hidden">
            {/* Static '0' */}
            <span className="text-[12rem] md:text-[15rem] gradient-text opacity-20">
              0
            </span>

            {/* Scrolling Digit Window */}
            {/* Height matches font size (1em) to show exactly one digit */}
            <div className="relative h-[12rem] md:h-[15rem] w-[1em] text-[12rem] md:text-[15rem] overflow-hidden">
              <div ref={numberSectionRef} className="absolute top-0 left-0 w-full flex flex-col items-center">
                {projects.map((_, index) => (
                  <span
                    key={index}
                    className="h-[12rem] md:h-[15rem] flex items-center justify-center text-[12rem] md:text-[15rem] gradient-text opacity-20"
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
