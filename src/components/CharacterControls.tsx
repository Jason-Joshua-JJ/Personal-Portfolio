
import { motion } from "framer-motion";
import { ACTIONS } from "../constants/assets";

interface CharacterControlsProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    currentAction: string;
    onActionChange: (action: string) => void;
}

export default function CharacterControls({
    isOpen,
    setIsOpen,
    currentAction,
    onActionChange,
}: CharacterControlsProps) {
    return (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-background/80 backdrop-blur-md p-3 rounded-l-xl border-y border-l border-white/10 shadow-lg hover:bg-background transition-colors group relative"
                aria-label="Toggle Interaction Menu"
            >
                <div
                    className={`absolute inset-0 bg-primary/20 rounded-l-xl animate-pulse ${isOpen ? "hidden" : "block"
                        }`}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-primary transition-transform duration-300 relative z-10 ${isOpen ? "rotate-180" : ""
                        }`}
                >
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>

            {/* Slide-out Panel */}
            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{
                    x: isOpen ? 0 : "100%",
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-background/80 backdrop-blur-md border-y border-l border-white/10 p-6 shadow-2xl h-auto min-h-[300px] flex flex-col justify-center gap-4 rounded-l-2xl origin-right"
                style={{ display: isOpen ? "flex" : "none" }}
            >
                <div className="space-y-1 mb-2">
                    <h3 className="font-bold text-lg text-foreground">Interactions</h3>
                    <p className="text-xs text-muted-foreground">Control the character</p>
                </div>

                <div className="space-y-3 w-48">
                    <button
                        onClick={() => onActionChange(ACTIONS.MOONWALK)}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${currentAction === ACTIONS.MOONWALK
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "bg-white/5 hover:bg-white/10 text-foreground"
                            }`}
                    >
                        <span>🚶</span> Moonwalk
                    </button>
                    <button
                        onClick={() => onActionChange(ACTIONS.FLOSS)}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${currentAction === ACTIONS.FLOSS
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "bg-white/5 hover:bg-white/10 text-foreground"
                            }`}
                    >
                        <span>💃</span> Fortnite Floss
                    </button>
                    <div className="h-px bg-white/10 my-2" />
                    <button
                        onClick={() => onActionChange(ACTIONS.IDLE)}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${currentAction === ACTIONS.IDLE
                                ? "bg-secondary text-secondary-foreground"
                                : "bg-white/5 hover:bg-white/10 text-foreground"
                            }`}
                    >
                        <span>🛑</span> Reset
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
