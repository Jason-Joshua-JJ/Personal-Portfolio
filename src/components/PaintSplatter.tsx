import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#F033FF", "#FF33A8", "#33FFF5", "#FFFF33"];

interface Splat {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    rotation: number;
}

export default function PaintSplatter({ trigger }: { trigger: boolean }) {
    const [splats, setSplats] = useState<Splat[]>([]);

    useEffect(() => {
        if (trigger) {
            // Spawn a burst of splats
            const newSplats = Array.from({ length: 12 }).map((_, i) => ({
                id: Date.now() + i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 100 + 50,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                rotation: Math.random() * 360,
            }));

            setSplats((prev) => [...prev, ...newSplats]);

            // Cleanup
            const timer = setTimeout(() => {
                setSplats([]);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [trigger]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {splats.map((splat) => (
                <motion.div
                    key={splat.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, times: [0, 0.1, 1], ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        left: splat.x,
                        top: splat.y,
                        transform: `translate(-50%, -50%) rotate(${splat.rotation}deg)`,
                    }}
                >
                    <svg width={splat.size} height={splat.size} viewBox="0 0 100 100" fill={splat.color}>
                        <path d="M50 0C60 20 70 20 80 10C80 30 90 40 100 50C80 60 80 70 90 90C70 80 60 80 50 100C40 80 30 80 10 90C20 70 20 60 0 50C20 40 20 30 10 10C30 20 40 20 50 0Z" />
                        <circle cx="20" cy="20" r="5" />
                        <circle cx="80" cy="80" r="8" />
                        <circle cx="80" cy="20" r="6" />
                        <circle cx="20" cy="80" r="4" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}
