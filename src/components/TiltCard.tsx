import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    intensity?: number; // How much it tilts (default 15)
    glareOpacity?: number; // Max opacity of glare (default 0.4)
}

export default function TiltCard({
    children,
    className = "",
    intensity = 15,
    glareOpacity = 0.4
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const content = contentRef.current;
        const glare = glareRef.current;

        if (!card || !content || !glare) return;

        // GSAP QuickTo for performant mouse following
        // We animate CSS variables or direct properties
        const xTo = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3", paused: true });
        const yTo = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3", paused: true });
        const glareXTo = gsap.quickTo(glare, "x", { duration: 0.4, ease: "power3", paused: true });
        const glareYTo = gsap.quickTo(glare, "y", { duration: 0.4, ease: "power3", paused: true });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate rotation (0 to 1 scale relative to center)
            const xPct = (mouseX / width - 0.5) * 2; // -1 to 1
            const yPct = (mouseY / height - 0.5) * 2; // -1 to 1

            // Tilt
            xTo(xPct * intensity); // Rotate Y based on X mouse pos
            yTo(-yPct * intensity); // Rotate X based on Y mouse pos (inverted)

            // Glare movement
            glareXTo(mouseX);
            glareYTo(mouseY);

            // Dynamic Glare Opacity based on distance from center
            const dist = Math.sqrt(xPct * xPct + yPct * yPct);
            gsap.to(glare, { opacity: dist * glareOpacity, duration: 0.2 });
        };

        const handleMouseEnter = () => {
            // Pop out slightly
            gsap.to(card, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
        };

        const handleMouseLeave = () => {
            // Reset
            xTo(0);
            yTo(0);
            gsap.to(card, { scale: 1, duration: 0.5, ease: "power3.out" });
            gsap.to(glare, { opacity: 0, duration: 0.5 });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
            xTo.tween.kill();
            yTo.tween.kill();
        };
    }, [intensity, glareOpacity]);

    return (
        <div
            ref={cardRef}
            className={`relative preserve-3d cursor-pointer will-change-transform ${className}`}
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
            {/* Content Layer (Raised) */}
            <div ref={contentRef} className="relative z-10 w-full h-full" style={{ transform: 'translateZ(30px)' }}>
                {children}
            </div>

            {/* Glare Overlay */}
            <div
                className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-20"
                style={{ transform: 'translateZ(0.1px)' }} // Slight lift to sit on top
            >
                <div
                    ref={glareRef}
                    className="absolute w-[300px] h-[300px] bg-white/40 blur-[50px] rounded-full mix-blend-overlay opacity-0 pointer-events-none"
                    style={{ transform: 'translate(-50%, -50%)' }}
                />
            </div>
        </div>
    );
}
