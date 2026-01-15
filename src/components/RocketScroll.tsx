import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function RocketScroll() {
    const { scrollYProgress } = useScroll();

    // We want the rocket to move from top to bottom
    const yRange = useTransform(scrollYProgress, [0, 1], ["5%", "90%"]);

    // Detect scrolling for flame effect
    const [isScrolling, setIsScrolling] = useState(false);
    const [hasLanded, setHasLanded] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => setIsScrolling(false), 150);
        };

        // Check for landing
        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (v > 0.99 && !hasLanded) {
                setHasLanded(true);
            } else if (v < 0.95 && hasLanded) {
                setHasLanded(false);
            }
        });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            unsubscribe();
        };
    }, [scrollYProgress, hasLanded]);

    return (
        <div className="fixed right-2 top-0 bottom-0 w-12 flex flex-col items-center z-40 pointer-events-none hidden md:flex">
            {/* Track Line */}
            <div className="absolute top-4 bottom-12 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full" />

            {/* Destination Planet */}
            <div className={`absolute bottom-4 text-2xl filter drop-shadow-lg transition-opacity duration-500 ${hasLanded ? "opacity-20" : "opacity-100 animate-pulse"}`}>
                {hasLanded ? "💥" : "🪐"}
            </div>

            {/* Rocket */}
            <motion.div
                className="absolute top-0"
                style={{ top: yRange }}
                animate={{
                    scale: hasLanded ? 0 : 1,
                    opacity: hasLanded ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
            >
                <div className="relative flex flex-col items-center">
                    {/* Flame (Visible when scrolling) */}
                    <motion.div
                        animate={{
                            opacity: isScrolling && !hasLanded ? 1 : 0,
                            height: isScrolling ? [10, 20, 10] : 0,
                            scale: isScrolling ? [1, 1.2, 1] : 0.5
                        }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-4 w-2 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[2px]"
                    />

                    {/* Rocket Emoji (Rotated to point down) */}
                    <div className="text-2xl transform rotate-135 filter drop-shadow-md">
                        🚀
                    </div>
                </div>
            </motion.div>

            {/* Explosion Particles (Simple CSS animation) */}
            {hasLanded && (
                <div className="absolute bottom-4 w-full flex justify-center items-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-8 h-8 bg-orange-500 rounded-full blur-md absolute"
                    />
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 4, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="w-8 h-8 bg-yellow-400 rounded-full blur-md absolute"
                    />
                </div>
            )}
        </div>
    );
}
