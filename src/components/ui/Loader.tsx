
import { motion } from "framer-motion";

export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative w-16 h-16">
                <motion.div
                    className="absolute inset-0 border-4 border-primary/30 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
            <motion.p
                className="text-sm font-medium text-muted-foreground"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                Initializing...
            </motion.p>
        </div>
    );
}
