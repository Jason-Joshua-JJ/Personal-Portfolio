import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

interface ShuffleTextProps {
    text: string;
    className?: string;
}

export default function ShuffleText({ text, className = "" }: ShuffleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const elementRef = useRef<HTMLSpanElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsIntersecting(true);
                        observer.unobserve(entry.target); // Stop observing after first trigger
                    }
                });
            },
            {
                threshold: 0.2, // Trigger when 20% visible
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [text]);

    useEffect(() => {
        if (isIntersecting) {
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplayText((prev) =>
                    prev
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                    setDisplayText(text); // Ensure final state is clean
                }

                iteration += 1 / 2; // Speed
            }, 30);

            return () => clearInterval(interval);
        }
    }, [isIntersecting, text]);

    return (
        <span ref={elementRef} className={className}>
            {displayText}
        </span>
    );
}
