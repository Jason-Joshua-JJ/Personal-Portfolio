
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlenderGallery from '@/components/BlenderGallery';
import Terminal from '@/components/Terminal';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import MiniBot from '@/components/MiniBot';

const Gallery = () => {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const { isPartyMode, togglePartyMode } = useKonamiCode();

    return (
        <div className="min-h-screen w-full overflow-x-hidden relative bg-background">
            <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
            <Terminal
                isOpen={isTerminalOpen}
                onClose={() => setIsTerminalOpen(false)}
                onTogglePartyMode={togglePartyMode}
            />

            <main className="w-full pt-16">
                <BlenderGallery />

                {/* Party Mode Bots - kept for consistency if user triggers it here */}
                {isPartyMode && (
                    <>
                        <MiniBot color="#ff0000" direction="right" delay={0} />
                        <MiniBot color="#00ff00" direction="left" delay={0.5} />
                        <MiniBot color="#0000ff" direction="right" delay={1} />
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Gallery;
