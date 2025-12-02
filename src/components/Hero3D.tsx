// src/components/Hero3D.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// optional bloom import — remove if you haven't installed postprocessing
import { Bloom } from "@react-three/postprocessing";

/* ---------- CONFIG ---------- */
const BG_PARTICLE_COUNT = 900; // background static particles
const INTERACTIVE_STAR_COUNT = 120; // instanced stars that react to mouse
/* ---------------------------- */

/* Background particle field (subtle rotation) */
function BackgroundParticles({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points | null>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(BG_PARTICLE_COUNT * 3);
    for (let i = 0; i < BG_PARTICLE_COUNT; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * (reduced ? 0.006 : 0.02);
    ref.current.rotation.y = t * (reduced ? 0.004 : 0.03);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        depthWrite={false}
        color="#bff8ff"
        size={0.02}
        sizeAttenuation={true}
        opacity={0.85}
      />
    </Points>
  );
}

/* Interactive instanced stars that react to mouse proximity */
function InteractiveStars({ mouse3D, reduced }: { mouse3D: THREE.Vector3 | null; reduced: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const scales = useMemo(() => new Float32Array(INTERACTIVE_STAR_COUNT), []);
  const basePositions = useMemo(() => {
    const arr: Array<THREE.Vector3> = [];
    for (let i = 0; i < INTERACTIVE_STAR_COUNT; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 12
        )
      );
      scales[i] = 1 + Math.random() * 0.6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < INTERACTIVE_STAR_COUNT; i++) {
      const p = basePositions[i];
      const bob = Math.sin(time * 0.6 + i) * 0.08;
      let s = scales[i] + bob * 0.2;

      if (mouse3D) {
        const dist = mouse3D.distanceTo(p);
        const radius = 3.5;
        if (dist < radius) {
          const k = 1 + (1 - dist / radius) * 1.6;
          s = Math.max(s, k);
        }
      }

      if (reduced) s = 1.0 + Math.sin(time * 0.2 + i) * 0.03;

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(s * 0.035, s * 0.035, s * 0.035);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as unknown as THREE.BufferGeometry, undefined as any, INTERACTIVE_STAR_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial emissive="#9ff8ff" emissiveIntensity={0.4} color="#bff8ff" />
    </instancedMesh>
  );
}

/* Camera parallax controller */
function CameraController({ mouseNorm, reduced }: { mouseNorm: [number, number]; reduced: boolean }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame(() => {
    const [mx, my] = mouseNorm;
    const offsetX = mx * 0.6;
    const offsetY = my * 0.35;
    target.current.set(offsetX, offsetY, 6);
    camera.position.lerp(target.current, reduced ? 0.02 : 0.08);
    camera.lookAt(0, reduced ? 0 : -0.1, 0);
  });
  return null;
}

/* Titles */
const TITLES = ["Full-Stack Developer", "Front-End Developer", "Data Engineer"];

interface Hero3DProps {
  onOpenTerminal: () => void;
}

/* Main component */
export default function Hero3D({ onOpenTerminal }: Hero3DProps): JSX.Element {
  // mouse normalized [-1,1]
  const [mouseNorm, setMouseNorm] = useState<[number, number]>([0, 0]);
  const [mouse3D, setMouse3D] = useState<THREE.Vector3 | null>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTitleIndex((i) => (i + 1) % TITLES.length), 3000);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (e.clientX / w) * 2 - 1;
      const ny = -((e.clientY / h) * 2 - 1);
      setMouseNorm([nx, ny]);
      setMouse3D(new THREE.Vector3(nx * 6, ny * 3.5, 0));
    };

    const onLeave = () => {
      setMouseNorm([0, 0]);
      setMouse3D(null);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Canvas background */}
      <div className="absolute inset-0 -z-20">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.4]}>
          <ambientLight intensity={0.18} />
          <hemisphereLight intensity={0.08} />
          <directionalLight position={[5, 10, 5]} intensity={0.3} />

          <CameraController mouseNorm={mouseNorm} reduced={reduced} />

          <BackgroundParticles reduced={reduced} />
          <InteractiveStars mouse3D={mouse3D} reduced={reduced} />

          {/* Bloom/postprocessing for soft neon glow.
              Remove <Bloom> (and its import) if you don't want the dependency. */}
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.6} intensity={0.9} radius={0.6} />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* soft neon halo behind the name */}
        <div
          aria-hidden
          className="absolute -z-10 pointer-events-none w-[680px] h-[220px] rounded-full opacity-60"
          style={{
            filter: "blur(70px)",
            background: "radial-gradient(closest-side, rgba(0,217,255,0.22), rgba(0,0,0,0))",
            transform: "translateY(-20px)",
          }}
        />

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
          <h1 className="relative text-5xl font-extrabold leading-tight md:text-7xl lg:text-8xl">
            <span className="gradient-text">Jason Joshua</span>
            <span
              aria-hidden
              className="absolute inset-0 -z-10 rounded-md"
              style={{
                filter: "blur(36px)",
                opacity: 0.6,
                background: "radial-gradient(circle at 40% 30%, rgba(0,217,255,0.18), rgba(125,92,255,0.08) 40%, transparent 60%)",
              }}
            />
          </h1>

          {/* Rotating title area */}
          <div className="relative flex w-full items-center justify-center">
            <div className="relative h-20 md:h-24 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: reduced ? 0 : 0.45 }}
                  className="text-xl md:text-2xl lg:text-3xl text-muted-foreground"
                  aria-live="polite"
                >
                  {TITLES[titleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.9 }} className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center items-center">
            <a href="#projects" className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-sm hover:shadow-[0_0_20px_rgba(0,217,255,0.45)] transition-all">
              View Projects
            </a>
            <button
              onClick={onOpenTerminal}
              className="px-8 py-3 rounded-lg glass font-semibold hover:bg-white/10 transition-colors flex items-center gap-2 group"
            >
              <span className="text-primary group-hover:text-white transition-colors">&gt;_</span>
              Launch Terminal
            </button>
            <a href="#contact" className="px-8 py-3 rounded-lg glass font-semibold hover:bg-white/10 transition-colors">
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ opacity: { delay: 1.9, duration: 0.8 }, y: { duration: 2, repeat: Infinity } }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground select-none">
            <span className="text-sm">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-primary rounded-full animate-[float_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
