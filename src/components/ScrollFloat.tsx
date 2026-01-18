import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
    children: string;
    className?: string;
    animationDuration?: number;
    ease?: string;
    stagger?: number;
    split?: boolean; // New prop to control splitting
}

export default function ScrollFloat({
    children,
    className = "",
    animationDuration = 1,
    ease = "back.out(2)",
    stagger = 0.05,
    split = true // Default to true
}: ScrollFloatProps) {
    const elRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        // Target: If split, target chars. If not, target the element itself.
        const target = split ? el.querySelectorAll('.char') : el;

        const animation = gsap.fromTo(target,
            {
                y: 100,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: split ? stagger : 0, // Only stagger if split
                duration: animationDuration,
                ease: ease,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            animation.kill();
        };
    }, [animationDuration, ease, stagger, split]);

    // Render content
    const content = split
        ? children.split('').map((char, index) => (
            <span key={index} className="char inline-block" style={{ opacity: 0 }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ))
        : children; // Render raw text if not split

    return (
        <span ref={elRef} className={`inline-block ${split ? 'overflow-hidden' : ''} ${className}`}>
            {content}
        </span>
    );
}
