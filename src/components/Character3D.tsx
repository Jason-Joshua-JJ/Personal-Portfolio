// src/components/Character3D.tsx
import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls, Environment, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

type ActionName = 'Idle' | 'Walk' | 'Run' | 'Survey'; // Available animations in this model

function CuteCharacter({ action }: { action: string }) {
    const group = useRef<THREE.Group>(null);
    // Using a cute low-poly fox character
    const { scene, animations } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/fox-animated/model.gltf');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // Stop all current actions
        Object.values(actions).forEach(a => a?.fadeOut(0.5));

        let animToPlay = 'Survey'; // Default idle-ish

        if (action === 'moonwalk') {
            animToPlay = 'Walk';
        } else if (action === 'floss') {
            animToPlay = 'Survey'; // Using Survey as a "Dance" placeholder since this model lacks Floss
        } else if (action === 'idle') {
            animToPlay = 'Survey';
        }

        const actionObj = actions[animToPlay];
        if (actionObj) {
            actionObj.reset().fadeIn(0.5).play();

            // If moonwalking, we might want to adjust timeScale to make it look like sliding back
            if (action === 'moonwalk') {
                actionObj.timeScale = -1; // Play walk backwards
            } else {
                actionObj.timeScale = 1;
            }
        }

        return () => {
            actionObj?.fadeOut(0.5);
        };
    }, [action, actions]);

    // Animation logic
    useFrame((state) => {
        if (group.current) {
            // Gentle bobbing for idle
            if (action === 'idle') {
                group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 - 0.5;
                group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
            }
            // Moonwalk movement
            else if (action === 'moonwalk') {
                // Slide across screen
                const t = state.clock.elapsedTime;
                group.current.position.x = Math.sin(t) * 1.5; // Move back and forth
                group.current.rotation.y = Math.PI / 2; // Face side
                group.current.position.y = -0.5;
            }
            // Floss/Dance movement
            else if (action === 'floss') {
                group.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 5)) * 0.2 - 0.5; // Bouncing
                group.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
            }
        }
    });

    return (
        <group ref={group} position={[0, -0.5, 0]} scale={0.02}>
            <primitive object={scene} />
        </group>
    );
}

interface Character3DProps {
    onOpenTerminal: () => void;
}

export default function Character3D({ onOpenTerminal }: Character3DProps) {
    const [characterAction, setCharacterAction] = useState<string>('idle');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-secondary/10">
            <div className="relative h-full w-full flex items-center">
                {/* Left Side - Text Content */}
                <div className="relative z-10 w-full lg:w-1/2 px-6 lg:px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="space-y-6 max-w-2xl"
                    >
                        <h1 className="text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl xl:text-8xl">
                            <span className="gradient-text">Jason Joshua</span>
                        </h1>

                        <div className="space-y-3">
                            <p className="text-2xl md:text-3xl lg:text-4xl text-foreground font-semibold">
                                Full-Stack Developer
                            </p>
                            <p className="text-base md:text-lg text-muted-foreground max-w-lg">
                                Building interactive experiences with modern web technologies
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.9 }}
                            className="flex flex-col gap-4 sm:flex-row sm:gap-4 pt-4"
                        >
                            <a
                                href="#projects"
                                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-sm hover:shadow-[0_0_20px_rgba(0,217,255,0.45)] transition-all text-center"
                            >
                                View Projects
                            </a>
                            <button
                                onClick={onOpenTerminal}
                                className="px-8 py-3 rounded-lg glass font-semibold hover:bg-white/10 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group"
                            >
                                <span className="text-primary group-hover:text-foreground transition-colors">&gt;_</span>
                                Launch Terminal
                            </button>
                            <a
                                href="#contact"
                                className="px-8 py-3 rounded-lg glass font-semibold hover:bg-white/10 dark:hover:bg-white/10 transition-colors text-center"
                            >
                                Get In Touch
                            </a>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="text-sm text-muted-foreground/60 pt-2"
                        >
                            🦊 Try the controls on the right!
                        </motion.p>
                    </motion.div>
                </div>

                {/* Right Side - 3D Character */}
                <div className="absolute lg:relative right-0 w-full lg:w-1/2 h-full">
                    <Suspense fallback={
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                                <p className="text-muted-foreground">Loading...</p>
                            </div>
                        </div>
                    }>
                        <Canvas shadows className="w-full h-full">
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                            <ambientLight intensity={0.8} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                            <pointLight position={[-3, 3, 3]} intensity={0.5} color="#00d9ff" />

                            <Environment preset="sunset" />

                            <CuteCharacter action={characterAction} />

                            <OrbitControls
                                enableZoom={false}
                                enablePan={false}
                                minPolarAngle={Math.PI / 3}
                                maxPolarAngle={Math.PI / 2}
                            />
                        </Canvas>
                    </Suspense>

                </div>
            </div>

            {/* Interaction Panel Trigger & Content */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
                {/* Toggle Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="bg-background/80 backdrop-blur-md p-3 rounded-l-xl border-y border-l border-white/10 shadow-lg hover:bg-background transition-colors group relative"
                    aria-label="Toggle Interaction Menu"
                >
                    <div className={`absolute inset-0 bg-primary/20 rounded-l-xl animate-pulse ${isMenuOpen ? 'hidden' : 'block'}`} />
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
                        className={`text-primary transition-transform duration-300 relative z-10 ${isMenuOpen ? 'rotate-180' : ''}`}
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                {/* Slide-out Panel */}
                <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{
                        x: isMenuOpen ? 0 : '100%',
                        opacity: isMenuOpen ? 1 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-background/80 backdrop-blur-md border-y border-l border-white/10 p-6 shadow-2xl h-auto min-h-[300px] flex flex-col justify-center gap-4 rounded-l-2xl origin-right"
                    style={{ display: isMenuOpen ? 'flex' : 'none' }} // Optimization to hide when closed
                >
                    <div className="space-y-1 mb-2">
                        <h3 className="font-bold text-lg text-foreground">Interactions</h3>
                        <p className="text-xs text-muted-foreground">Control the character</p>
                    </div>

                    <div className="space-y-3 w-48">
                        <button
                            onClick={() => setCharacterAction('moonwalk')}
                            className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${characterAction === 'moonwalk'
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                : 'bg-white/5 hover:bg-white/10 text-foreground'
                                }`}
                        >
                            <span>🚶</span> Moonwalk
                        </button>
                        <button
                            onClick={() => setCharacterAction('floss')}
                            className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${characterAction === 'floss'
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                : 'bg-white/5 hover:bg-white/10 text-foreground'
                                }`}
                        >
                            <span>💃</span> Fortnite Floss
                        </button>
                        <div className="h-px bg-white/10 my-2" />
                        <button
                            onClick={() => setCharacterAction('idle')}
                            className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${characterAction === 'idle'
                                ? 'bg-secondary text-secondary-foreground'
                                : 'bg-white/5 hover:bg-white/10 text-foreground'
                                }`}
                        >
                            <span>🛑</span> Reset
                        </button>
                    </div>
                </motion.div>
            </div>


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 2, duration: 0.8 },
                    y: { duration: 2, repeat: Infinity },
                }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center gap-2 text-muted-foreground select-none">
                    <span className="text-sm">Scroll Down</span>
                    <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-3 bg-primary rounded-full" />
                    </div>
                </div>
            </motion.div>
        </section >
    );
}

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/fox-animated/model.gltf');
