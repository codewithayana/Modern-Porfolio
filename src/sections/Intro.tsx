import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 3D Components ---

const StarField = ({ theme }: { theme: string }) => {
  const ref = useRef<THREE.Points>(null!);
  
  const [positions] = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 40;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return [positions];
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x -= 0.0003;
      ref.current.rotation.y -= 0.0005;
    }
  });

  const color = theme === 'light' ? '#ff8c00' : '#ff0080';

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const FloatingOrb = ({ theme }: { theme: string }) => {
  const orbRef = useRef<THREE.Mesh>(null!);
  const glowColor = theme === 'light' ? '#00bfff' : '#00f0ff';
  const ring1Color = theme === 'light' ? '#0088ff' : '#00bfff';
  const ring2Color = theme === 'light' ? '#00f0ff' : '#ffffff';
  const envColor = theme === 'light' ? '#f0f0f0' : '#0a0a1a';

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orbRef.current) {
      orbRef.current.rotation.y = Math.sin(t / 4) * 0.5;
      orbRef.current.rotation.z = Math.sin(t / 4) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[0, 0, -2]}>
      {/* Core Orb */}
      <mesh ref={orbRef} scale={1.2}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial 
          color={envColor} 
          emissive={glowColor}
          emissiveIntensity={0.8}
          clearcoat={1} 
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          wireframe={theme === 'dark'}
          distort={0.4} 
          speed={2.5} 
        />
      </mesh>
      
      {/* Outer Rotating Rings */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={0.5}>
        <mesh rotation-x={Math.PI / 2} scale={1.2}>
          <torusGeometry args={[3.2, 0.015, 16, 100]} />
          <meshBasicMaterial color={ring1Color} wireframe opacity={0.4} transparent />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={3} floatIntensity={0}>
        <mesh rotation-y={Math.PI / 3} rotation-x={Math.PI / 4} scale={1.4}>
          <torusGeometry args={[2.8, 0.01, 16, 100]} />
          <meshBasicMaterial color={ring2Color} wireframe opacity={0.3} transparent />
        </mesh>
      </Float>
    </Float>
  );
};

const CameraController = () => {
  useFrame((state) => {
    const { pointer, camera } = state;
    // Smooth camera movement based on mouse
    const targetX = (pointer.x * 1.5);
    const targetY = (pointer.y * 1.5);
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// --- Main Intro Component ---

const Intro: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 150]);

  // Decode Text Animation
  const [text, setText] = useState("");
  const finalString = "AYANA DINESH";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  
  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setText((prev) => 
          finalString.split("").map((letter, index) => {
            if (index < iteration) {
              return finalString[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          }).join("")
        );
        
        if (iteration >= finalString.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 40);
    }, 400);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden ${theme === 'light' ? 'bg-[#f8f9fa]' : 'bg-[#020005]'}`}
      style={{ userSelect: 'none' }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 cursor-crosshair">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={theme === 'light' ? 1.5 : 0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <StarField theme={theme} />
          <FloatingOrb theme={theme} />
          <CameraController />
        </Canvas>
      </div>

      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');`}
      </style>

      {/* Vignette Overlay */}
      <div className={`absolute inset-0 z-[1] pointer-events-none transition-colors duration-700 ${theme === 'light' ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,249,250,0.7)_100%)]' : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,0,5,0.8)_100%)]'}`} />

      {/* Foreground Content */}
      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="flex flex-col items-center text-center mt-10">
          

          <h1 
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-bold tracking-widest ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
            style={{
               filter: theme === 'dark' ? 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' : 'drop-shadow(0 0 20px rgba(0,0,0,0.1))',
               fontFamily: "'Montserrat', sans-serif"
            }}
          >
            {text || " "}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="mt-20 flex items-center justify-center"
          >
            <span 
              className={`text-sm md:text-lg font-semibold tracking-[0.4em] uppercase text-[#ff0080]`}
              style={{ filter: 'drop-shadow(0 0 10px rgba(255,0,128,0.4))' }}
            >
              Full Stack Developer
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
        >
          <span className={`text-[0.6rem] tracking-[0.4em] uppercase mb-2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className={`w-[2px] h-10 bg-gradient-to-b from-[#ff0080] to-transparent`}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Intro;
