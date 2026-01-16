// src/components/Character3D.tsx
import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls, Environment, useAnimations } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ASSETS, ANIMATIONS, ACTIONS } from '../constants/assets';
import CharacterControls from './CharacterControls';
import Loader from './ui/Loader';
import SceneErrorBoundary from './SceneErrorBoundary';

function CuteCharacter({ action }: { action: string }) {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF(ASSETS.MODELS.ROBOT_EXPRESSIVE);
    const { actions } = useAnimations(animations, group);
    const { clock } = useThree();
    const startTimeRef = useRef(0);

    useEffect(() => {
        // Stop all current actions
        Object.values(actions).forEach(a => a?.fadeOut(0.5));

        let animToPlay = ANIMATIONS.IDLE; // Default

        if (action === ACTIONS.MOONWALK) {
            animToPlay = ANIMATIONS.WALKING;
        } else if (action === ACTIONS.STARTUP_WALK) {
            animToPlay = ANIMATIONS.WALKING;
            startTimeRef.current = clock.elapsedTime;
        } else if (action === ACTIONS.FLOSS) {
            animToPlay = ANIMATIONS.DANCE; // Map floss to Dance
        } else if (action === ACTIONS.IDLE) {
            animToPlay = ANIMATIONS.IDLE;
        } else if (action === ACTIONS.HOWL) {
            animToPlay = ANIMATIONS.WAVE; // Map howl to Wave
        }

        const actionObj = actions[animToPlay];
        if (actionObj) {
            actionObj.reset().fadeIn(0.5).play();

            // If moonwalking, we might want to adjust timeScale to make it look like sliding back
            if (action === ACTIONS.MOONWALK) {
                actionObj.timeScale = -1; // Play walk backwards
            } else {
                actionObj.timeScale = 1;
            }
        }

        return () => {
            actionObj?.fadeOut(0.5);
        };
    }, [action, actions, clock]);

    // Animation logic
    useFrame((state) => {
        if (group.current) {
            // Gentle bobbing for idle
            if (action === ACTIONS.IDLE) {
                group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 - 1;
                // Face forward + slight rotation breath
                group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
            }
            // Moonwalk movement
            else if (action === ACTIONS.MOONWALK) {
                // Slide across screen
                const t = state.clock.elapsedTime;
                group.current.position.x = Math.sin(t) * 1.5; // Move back and forth
                group.current.rotation.y = Math.PI / 2; // Face side
                group.current.position.y = -1;
            }
            // Startup Walk movement (Back to Front)
            else if (action === ACTIONS.STARTUP_WALK) {
                const t = state.clock.elapsedTime - startTimeRef.current;
                // Move from back (z=-2) to front (z=0) roughly over the 1.5s
                group.current.position.z = -2 + (t * 1.5);
                group.current.position.x = 0;
                group.current.rotation.y = 0; // Face forward
                group.current.position.y = -1;
            }
            // Floss/Dance movement
            else if (action === ACTIONS.FLOSS) {
                group.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 5)) * 0.2 - 1; // Bouncing
                group.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
            }
            // Howl (Wave) 
            else if (action === ACTIONS.HOWL) {
                group.current.position.y = -1;
                group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            }
        }
    });

    return (
        <group ref={group} position={[0, -1, 0]} scale={0.45}>
            <primitive object={scene} />
        </group>
    );
}

interface Character3DProps {
    onOpenTerminal: () => void;
    isPartyMode?: boolean;
}

export default function Character3D({ onOpenTerminal, isPartyMode }: Character3DProps) {
    const [characterAction, setCharacterAction] = useState<string>(ACTIONS.IDLE);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Startup Sequence
    useEffect(() => {
        // 1. Walk Sideways
        setCharacterAction(ACTIONS.STARTUP_WALK);

        const walkTimer = setTimeout(() => {
            // 2. Howl
            setCharacterAction(ACTIONS.HOWL);
        }, 1500); // Walk for 1.5s

        const howlTimer = setTimeout(() => {
            // 3. Idle
            setCharacterAction(ACTIONS.IDLE);
        }, 3500); // Howl for 2s (1.5 + 2.0 = 3.5)

        return () => {
            clearTimeout(walkTimer);
            clearTimeout(howlTimer);
        };
    }, []);

    useEffect(() => {
        if (isPartyMode) {
            setCharacterAction(ACTIONS.FLOSS);
        } else if (characterAction === ACTIONS.FLOSS) {
            setCharacterAction(ACTIONS.IDLE);
        }
    }, [isPartyMode]);

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

                <div className="absolute lg:relative right-0 w-full lg:w-1/2 h-full">
                    <SceneErrorBoundary>
                        <Suspense fallback={
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader />
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
                    </SceneErrorBoundary>
                </div>
            </div>

            {/* Interaction Panel Trigger & Content */}
            <CharacterControls
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                currentAction={characterAction}
                onActionChange={setCharacterAction}
            />

        </section >
    );
}

useGLTF.preload(ASSETS.MODELS.ROBOT_EXPRESSIVE);
