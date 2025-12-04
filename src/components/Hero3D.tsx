// src/components/Hero3D.tsx
import { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { useTheme } from "@/components/ThemeProvider";

const TITLES = ["Full-Stack Developer", "Front-End Developer", "Data Engineer"];

// Animated Character Component
function AnimatedCharacter({ action, onActionComplete }: { action: string, onActionComplete?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasWalkedIn, setHasWalkedIn] = useState(false);
  const [isHurt, setIsHurt] = useState(false);

  const handleClick = () => {
    setIsHurt(true);
    setTimeout(() => setIsHurt(false), 500);
  };

  // Reset pose when action changes
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z = 0;
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.y = 0; // Reset Y rotation
      groupRef.current.position.y = -1; // Reset height
      groupRef.current.position.x = 0; // Reset X position
      groupRef.current.position.z = 0; // Reset Z position
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.3;
      leftArmRef.current.rotation.x = 0;
      leftArmRef.current.rotation.y = 0;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.3;
      rightArmRef.current.rotation.x = 0;
      rightArmRef.current.rotation.y = 0;
    }
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = 0;
      leftLegRef.current.rotation.z = 0;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = 0;
      rightLegRef.current.rotation.z = 0;
    }
  }, [action]);

  // Animation frame
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // HURT ANIMATION (Overrides everything)
    if (isHurt) {
      // Shake effect
      groupRef.current.position.x = Math.sin(time * 50) * 0.1;
      groupRef.current.rotation.z = Math.sin(time * 50) * 0.05;

      // Arms up in shock
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.z = 2.8;
        rightArmRef.current.rotation.z = -2.8;
      }

      // Eyes pop out! (Cartoon effect)
      if (leftEyeRef.current && rightEyeRef.current) {
        const popScale = 2.5;
        const popZ = 0.6; // Move forward

        leftEyeRef.current.scale.setScalar(popScale);
        rightEyeRef.current.scale.setScalar(popScale);

        leftEyeRef.current.position.z = popZ;
        rightEyeRef.current.position.z = popZ;
      }
      return;
    } else {
      // Reset shake
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.1);

      // Reset eyes
      if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2);
        rightEyeRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2);

        leftEyeRef.current.position.z = THREE.MathUtils.lerp(leftEyeRef.current.position.z, 0.35, 0.2);
        rightEyeRef.current.position.z = THREE.MathUtils.lerp(rightEyeRef.current.position.z, 0.35, 0.2);
      }
    }

    // Walk in from back on load (slower, from farther distance)
    if (!hasWalkedIn) {
      const walkDuration = 4; // 4 seconds to walk in (was 2)
      const progress = Math.min(time / walkDuration, 1);
      groupRef.current.position.z = THREE.MathUtils.lerp(-10, 0, progress); // From -10 (was -5)



      // Walking animation - swing legs back and forth
      if (leftLegRef.current && rightLegRef.current) {
        const walkSpeed = 8; // Slightly slower leg movement
        leftLegRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.5;
        rightLegRef.current.rotation.x = Math.sin(time * walkSpeed + Math.PI) * 0.5;

        // Swing arms opposite to legs
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(time * walkSpeed + Math.PI) * 0.3;
          rightArmRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.3;
        }
      }

      if (progress >= 1) {
        setHasWalkedIn(true);
      }
    } else {
      // MAIN INTERACTION LOGIC

      // Reset walk-in positions first
      if (leftLegRef.current && rightLegRef.current) {
        // We don't force reset here because animations below control them
      }

      if (action === 'hype') {
        // HYPE DANCE ANIMATION (Procedural "Shoot" / "Hype" dance)
        const beat = time * 12; // Fast beat

        // Bouncing
        groupRef.current.position.y = -1 + Math.abs(Math.sin(beat)) * 0.3;

        // Body rotation (twisting)
        groupRef.current.rotation.y = Math.sin(beat / 2) * 0.3;

        // Arm pumping (Hype style - one arm up/down)
        if (rightArmRef.current && leftArmRef.current) {
          // Right arm pumps in air
          rightArmRef.current.rotation.z = 2.5 + Math.sin(beat) * 0.5;
          rightArmRef.current.rotation.x = Math.sin(beat) * 0.2;

          // Left arm stays down/stabilizes
          leftArmRef.current.rotation.z = 0.5;
        }

        // Leg kicking
        if (leftLegRef.current && rightLegRef.current) {
          // Jump/Kick rhythm
          leftLegRef.current.rotation.x = Math.sin(beat) * 0.5;
          rightLegRef.current.rotation.x = -Math.sin(beat) * 0.5;
        }

      } else if (action === 'robot') {
        // ROBOT DANCE
        // Quantize time for jerky movement
        const robotTime = Math.floor(time * 6) * (Math.PI / 3);

        // Stiff arm movements
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = Math.sin(robotTime) > 0 ? 1.5 : 0;
          rightArmRef.current.rotation.z = Math.cos(robotTime) > 0 ? -1.5 : 0;

          // Robot arms forward
          leftArmRef.current.rotation.x = Math.sin(robotTime + Math.PI) > 0 ? 1.5 : 0;
          rightArmRef.current.rotation.x = Math.sin(robotTime) > 0 ? 1.5 : 0;
        }

        // Head/Body turns (snappy)
        groupRef.current.rotation.y = Math.floor(Math.sin(time * 3) * 2) * 0.3;

        // Slight mechanical bob
        groupRef.current.position.y = -1 + (Math.floor(time * 12) % 2) * 0.02;

        // Legs planted
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = 0;
          rightLegRef.current.rotation.x = 0;
        }

      } else if (action === 'moonwalk') {


        // MOONWALK - slide backward slowly
        //  groupRef.current.position.z = -2 + Math.sin(time) * 2; // Slide back and forth
        groupRef.current.position.x = Math.sin(time) * 1.5; // Slide side to side looks better for moonwalk in place
        groupRef.current.rotation.y = Math.PI / 2; // Face side

        // Leg movements - MOONWALK style (alternating slides)
        if (leftLegRef.current && rightLegRef.current) {
          const legSlide = Math.sin(time * 8);

          // Alternate leg lifting (moonwalk effect)
          leftLegRef.current.rotation.x = legSlide > 0 ? -0.4 : 0.1;
          rightLegRef.current.rotation.x = legSlide < 0 ? -0.4 : 0.1;

          // Add slight forward/back movement
          leftLegRef.current.rotation.z = legSlide * 0.1;
          rightLegRef.current.rotation.z = -legSlide * 0.1;
        }

        // Arms for balance
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = 0.5;
          rightArmRef.current.rotation.z = -0.5;
        }

      } else if (action === 'floss') {


        // FORTNITE DANCE (Floss-style)

        // Reset rotation
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);

        // Hip sway
        groupRef.current.rotation.z = Math.sin(time * 6) * 0.15;

        // Slight bounce
        groupRef.current.position.y = -1 + Math.abs(Math.sin(time * 6)) * 0.2;

        // Reset position X/Z
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.1);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.1);

        // Arm movements - floss style (arms swing side to side)
        if (leftArmRef.current && rightArmRef.current) {
          const armSwing = Math.sin(time * 6);
          leftArmRef.current.rotation.z = 0.3 + armSwing * 0.8;
          rightArmRef.current.rotation.z = -0.3 - armSwing * 0.8;

          // Arms also move forward/back
          leftArmRef.current.rotation.y = armSwing * 0.5;
          rightArmRef.current.rotation.y = -armSwing * 0.5;
        }

        // Legs stay relatively still but bounce
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = 0;
          rightLegRef.current.rotation.x = 0;
        }

      } else {
        // IDLE



        // Return to normal idle position
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.1);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -1, 0.1);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.05);
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.05);

        // Gentle breathing/bobbing
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.3 + Math.sin(time) * 0.05, 0.1);
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.3 - Math.sin(time) * 0.05, 0.1);
          leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, 0, 0.1);
          rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, 0, 0.1);
        }

        // Reset legs
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
          rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);
          leftLegRef.current.rotation.z = THREE.MathUtils.lerp(leftLegRef.current.rotation.z, 0, 0.1);
          rightLegRef.current.rotation.z = THREE.MathUtils.lerp(rightLegRef.current.rotation.z, 0, 0.1);
        }
      }
    }

    // Wave animation when hovered (only after walking in)
    if (isHovered && hasWalkedIn && !isHurt && action === 'idle') {
      if (rightArmRef.current) {
        // Wave the right arm
        rightArmRef.current.rotation.z = -0.3 + Math.sin(time * 8) * 0.5;
        rightArmRef.current.rotation.x = 0; // Keep x rotation at 0 while waving
      }
    } else if (hasWalkedIn && !isHurt && action === 'idle') {
      // Reset arm position if not waving and in idle
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          -0.3 - Math.sin(time) * 0.05, // Return to gentle breathing
          0.1
        );
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -1, -10]}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >


      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <capsuleGeometry args={[0.4, 1, 16, 32]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#86efac" />
      </mesh>

      {/* Eyes */}
      <mesh ref={leftEyeRef} position={[-0.15, 1.7, 0.35]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.15, 1.7, 0.35]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.6, 0.8, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* Right Arm (waves on hover) */}
      <mesh ref={rightArmRef} position={[0.6, 0.8, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* Legs - with refs for walking animation */}
      <mesh ref={leftLegRef} position={[-0.2, -0.5, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
      <mesh ref={rightLegRef} position={[0.2, -0.5, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
    </group>
  );
}


interface Hero3DProps {
  onOpenTerminal: () => void;
}

export default function Hero3D({ onOpenTerminal }: Hero3DProps): JSX.Element {
  const [titleIndex, setTitleIndex] = useState(0);
  const reduced = useReducedMotion();
  const [characterAction, setCharacterAction] = useState<string>('idle');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTitleIndex((i) => (i + 1) % TITLES.length), 3000);
    return () => clearInterval(id);
  }, [reduced]);



  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Split Layout Container */}
      <div className="relative h-full w-full flex items-center">
        {/* Left Side - Text Content */}
        <div className="relative z-10 w-full lg:w-1/2 px-6 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 max-w-2xl"
          >
            {/* Name with glow effect */}
            <div className="relative">
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl xl:text-8xl">
                <span className="gradient-text">Jason Joshua</span>
              </h1>
              {/* Subtle glow behind name */}
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-lg opacity-30 blur-2xl"
                style={{
                  background: "radial-gradient(circle at 40% 30%, rgba(0,217,255,0.2), rgba(125,92,255,0.1) 40%, transparent 60%)",
                }}
              />
            </div>

            {/* Rotating Titles */}
            <div className="relative h-16 md:h-20 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: reduced ? 0 : 0.45 }}
                  className="text-2xl md:text-3xl lg:text-4xl text-foreground font-semibold"
                  aria-live="polite"
                >
                  {TITLES[titleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-lg">
              Building interactive experiences with modern web technologies
            </p>

            {/* CTAs */}
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
          </motion.div>
        </div>

        {/* Right Side - 3D Character */}
        <div className="hidden lg:block relative w-1/2 h-full">
          <Canvas shadows className="w-full h-full">
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

            {/* Lighting */}
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <pointLight position={[-3, 3, 3]} intensity={0.5} color="#00d9ff" />

            {/* Animated 3D Character */}
            <Suspense fallback={null}>
              <AnimatedCharacter
                action={characterAction}
                onActionComplete={() => setCharacterAction('idle')}
              />
            </Suspense>

            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
              <planeGeometry args={[10, 10]} />
              <shadowMaterial opacity={0.2} />
            </mesh>
          </Canvas>
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
            <button
              onClick={() => setCharacterAction('hype')}
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${characterAction === 'hype'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-white/5 hover:bg-white/10 text-foreground'
                }`}
            >
              <span>�</span> Hype Dance
            </button>
            <button
              onClick={() => setCharacterAction('robot')}
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${characterAction === 'robot'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-white/5 hover:bg-white/10 text-foreground'
                }`}
            >
              <span>🤖</span> Robot Dance
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

      {/* Scroll Indicator */}
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
            <div className="w-1 h-3 bg-primary rounded-full animate-[float_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
