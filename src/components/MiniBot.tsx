import { motion } from "framer-motion";
import { useSound } from "@/components/SoundProvider";
import { SOUNDS } from "@/constants/sounds";

interface MiniBotProps {
    color?: string;
    delay?: number;
    direction?: "left" | "right";
}

export default function MiniBot({ color = "#4ade80", delay = 0, direction = "right" }: MiniBotProps) {
    const { play } = useSound();

    return (
        <div className="w-full h-12 pointer-events-none relative z-50 my-4 overflow-visible">
            <motion.div
                initial={{ x: direction === "right" ? "-100%" : "100vw" }}
                whileInView={{ x: direction === "right" ? "100vw" : "-100%" }}
                viewport={{ once: false, margin: "0px 0px -100px 0px" }} // Trigger slightly before bottom
                transition={{
                    duration: 4,
                    ease: "linear",
                    delay: delay,
                }}
                className="absolute top-0"
                style={{ left: 0 }}
            >
                <motion.div
                    drag
                    dragSnapToOrigin
                    whileDrag={{ scale: 1.2, cursor: "grabbing" }}
                    whileHover={{ scale: 1.1, cursor: "grab" }}
                    onDragStart={() => play(SOUNDS.drag)}
                    onDragEnd={() => play(SOUNDS.drop)}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        y: {
                            duration: 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }
                    }}
                    className="flex flex-col items-center pointer-events-auto"
                >
                    {/* Robot Body */}
                    <div
                        className="w-8 h-8 rounded-lg shadow-lg flex items-center justify-center relative"
                        style={{ backgroundColor: color }}
                    >
                        {/* Eyes */}
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-black rounded-full animate-blink" />
                            <div className="w-2 h-2 bg-black rounded-full animate-blink" />
                        </div>
                        {/* Antenna */}
                        <div className="absolute -top-3 w-1 h-3 bg-gray-400" />
                        <div className="absolute -top-4 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    {/* Legs (Simple CSS lines) */}
                    <div className="flex gap-2 mt-[-2px]">
                        <motion.div
                            animate={{ height: [4, 8, 4] }}
                            transition={{ duration: 0.2, repeat: Infinity }}
                            className="w-1 bg-gray-600 rounded-full"
                        />
                        <motion.div
                            animate={{ height: [8, 4, 8] }}
                            transition={{ duration: 0.2, repeat: Infinity }}
                            className="w-1 bg-gray-600 rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
