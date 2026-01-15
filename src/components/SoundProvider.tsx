import React, { createContext, useContext, useState, useEffect } from "react";

interface SoundContextType {
    isMuted: boolean;
    toggleMute: () => void;
    play: (url: string, options?: { volume?: number }) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => setIsMuted((prev) => !prev);

    const play = (url: string, options: { volume?: number } = {}) => {
        if (isMuted) return;

        const audio = new Audio(url);
        audio.volume = options.volume ?? 0.5;
        audio.play().catch((e) => console.log("Audio play failed:", e));
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, play }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error("useSound must be used within a SoundProvider");
    }
    return context;
}
