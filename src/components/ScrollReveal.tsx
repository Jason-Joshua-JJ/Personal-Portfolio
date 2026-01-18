import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    stagger?: number;
    x?: number; // Initial x offset
    y?: number; // Initial y offset
    ease?: string;
    threshold?: number; // ScrollTrigger start point (0.8 = 80% viewport)
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    stagger = 0,
    x = 0,
    y = 30, // Default fade up
    ease = "power3.out",
    threshold = 0.8
}: ScrollRevealProps) {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        // If stagger is used, we assume children are targets. Otherwise the container itself is the target.
        // Note: React children are not DOM nodes, so we animate the container (div) by default.
        // To stagger children, the container must contain DOM elements.

        // Simple logic: Animate the container itself. 
        // If user wants stagger, they should map this component or we use gsap.utils.toArray internally if desired.
        // BUT for simplicity and flexibility with single blocks:

        // If stagger > 0, we try to animate the direct children of this ref.
        const target = stagger > 0 ? el.children : el;

        const animation = gsap.fromTo(target,
            {
                opacity: 0,
                x: x,
                y: y
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: duration,
                delay: delay,
                stagger: stagger,
                ease: ease,
                scrollTrigger: {
                    trigger: el,
                    start: `top ${threshold * 100}%`,
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            animation.kill();
        };
    }, [delay, duration, stagger, x, y, ease, threshold]);

    return (
        <div ref={elRef} className={className}>
            {children}
        </div>
    );
}
