import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Animate out
                gsap.to(containerRef.current, {
                    y: "-100%",
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: onComplete,
                });
            },
        });

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 10;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 200);

        // Dynamic Text Shuffle or Reveal
        if (textRef.current) {
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );
        }

        return () => clearInterval(interval);
    }, [onComplete]);

    // Sync progress bar width
    useEffect(() => {
        if (progressRef.current) {
            gsap.to(progressRef.current, {
                width: `${progress}%`,
                duration: 0.2,
            });
        }
    }, [progress]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Grid/Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Animated Logo/Icon */}
                <div className="w-16 h-16 relative animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-full h-full text-primary">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" strokeDasharray="20 10" className="animate-[spin_10s_linear_infinite]" />
                        <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" fill="currentColor" className="opacity-80" />
                    </svg>
                </div>

                {/* Loading Text */}
                <div ref={textRef} className="font-mono text-xl tracking-[0.2em] text-primary">
                    INITIALIZING SYSTEMS...
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                    <div
                        ref={progressRef}
                        className="h-full bg-primary shadow-[0_0_10px_rgba(0,217,255,0.8)]"
                        style={{ width: "0%" }}
                    />
                </div>

                <div className="font-mono text-sm text-muted-foreground mt-2">
                    {Math.round(progress)}%
                </div>
            </div>
        </div>
    );
}
