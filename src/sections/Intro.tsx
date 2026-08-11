import React, { useMemo, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../hooks/useTheme';

// Subtle Starfield matching the image
const SparseStars = () => {
  const ref = useRef<THREE.Points>(null!);
  const [positions] = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return [pos];
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial 
        transparent 
        color="#ffffff" 
        size={0.03} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.6} 
      />
    </Points>
  );
};

// Neon Flicker Reveal - Highly responsive, won't cut off wrapped text
const NeonFlickerReveal = ({ text, startAnimation }: { text: string, startAnimation: boolean }) => {
  return (
    <div className="relative group flex justify-center items-center py-4 w-full min-h-[120px] px-4">
      
      {/* Main Glitch Text */}
      <motion.h1 
        initial={{ opacity: 0, filter: "brightness(0) blur(10px)", scale: 0.95 }}
        animate={startAnimation ? { 
          opacity: [0, 1, 0, 1, 0.6, 1], 
          filter: ["brightness(0) blur(10px)", "brightness(2) blur(0px)", "brightness(0) blur(4px)", "brightness(2) blur(0px)", "brightness(1) blur(2px)", "brightness(1) blur(0px)"],
          scale: 1
        } : {}}
        transition={{ duration: 0.8, ease: "linear", delay: 0.2 }}
        className="glitch-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase text-white drop-shadow-lg text-center"
        style={{ fontFamily: "'Montserrat', sans-serif", wordBreak: "keep-all" }}
        data-text={text}
      >
        <span className="relative z-10 block">{text}</span>
      </motion.h1>
      
      {/* Background ambient glow that pulses */}
      <motion.h1
         initial={{ opacity: 0 }}
         animate={startAnimation ? { opacity: [0, 0.4, 0.15] } : {}}
         transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: "mirror" }}
         className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[#ff0080] text-center"
         style={{ fontFamily: "'Montserrat', sans-serif", filter: "blur(20px)", zIndex: -1, wordBreak: "keep-all" }}
      >
        {text}
      </motion.h1>

      <style>{`
        .glitch-text {
          position: relative;
        }
        
        /* Cyan Glitch */
        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #00f0ff;
          z-index: -1;
          overflow: hidden;
          clip-path: inset(0 0 0 0);
          animation: ${startAnimation ? 'glitch-anim-1 3s infinite linear alternate-reverse' : 'none'};
          opacity: 0.9;
          margin-left: -3px;
        }
        
        /* Magenta Glitch */
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #ff0080;
          z-index: -2;
          overflow: hidden;
          clip-path: inset(0 0 0 0);
          animation: ${startAnimation ? 'glitch-anim-2 2.5s infinite linear alternate-reverse' : 'none'};
          opacity: 0.9;
          margin-left: 3px;
        }
        
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          10% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(40% 0 50% 0); transform: translate(2px, 1px); }
          30% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, -1px); }
          40% { clip-path: inset(10% 0 70% 0); transform: translate(2px, -1px); }
          50% { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 1px); }
          60% { clip-path: inset(70% 0 20% 0); transform: translate(2px, 1px); }
          70% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, -1px); }
          80% { clip-path: inset(15% 0 80% 0); transform: translate(2px, 1px); }
          90% { clip-path: inset(85% 0 10% 0); transform: translate(-2px, -1px); }
          100% { clip-path: inset(35% 0 45% 0); transform: translate(2px, 1px); }
        }
        
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          10% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(2px, 1px); }
          30% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, -1px); }
          40% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          50% { clip-path: inset(15% 0 80% 0); transform: translate(-2px, 1px); }
          60% { clip-path: inset(75% 0 15% 0); transform: translate(2px, 1px); }
          70% { clip-path: inset(25% 0 45% 0); transform: translate(-2px, -1px); }
          80% { clip-path: inset(55% 0 35% 0); transform: translate(2px, 1px); }
          90% { clip-path: inset(90% 0 5% 0); transform: translate(-2px, -1px); }
          100% { clip-path: inset(5% 0 85% 0); transform: translate(2px, 1px); }
        }
      `}</style>
    </div>
  );
};

const PreIntro = ({ onExplore, theme }: { onExplore: () => void, theme: string }) => {
  const [bootText, setBootText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const fullText = ">_ INITIALIZING NEURAL LINK...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setBootText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return createPortal(
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center font-mono transition-opacity duration-1000 ${theme === 'light' ? 'bg-[#f8f9fa] text-gray-900' : 'bg-[#020005] text-[#00f0ff]'}`}
    >
      <div className="flex flex-col items-center">
        <div className="h-10 mb-8 flex items-center justify-center">
          <span className="text-lg md:text-2xl tracking-[0.2em] font-bold">
            {bootText}
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              _
            </motion.span>
          </span>
        </div>

        {showButton && (
          <button
            onClick={onExplore}
            className={`relative overflow-hidden px-10 py-4 font-bold tracking-[0.4em] uppercase text-sm group border transition-all duration-300 hover:scale-105 active:scale-95 ${theme === 'light' ? 'text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white' : 'text-[#ff0080] border-[#ff0080] hover:bg-[#ff0080] hover:text-white'}`}
          >
            EXPLORE
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};

const MainIntro: React.FC<{ startAnimation: boolean }> = ({ startAnimation }) => {
  // startAnimation is passed as a prop, no local state needed for it

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#8a1c7c] via-[#290a3a] to-[#0d0614] selection:bg-pink-500/30">
      
      {/* Deep Space Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <SparseStars />
        </Canvas>
      </div>
      
      {/* Light Rays / Flares matching the image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[150%] h-[150%] rotate-[-15deg] opacity-20 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_50%)]" />
        <div className="absolute top-[10%] left-[-20%] w-[200%] h-[20%] rotate-[-25deg] bg-gradient-to-r from-transparent via-[#ff6bdf] to-transparent opacity-[0.07] blur-2xl" />
        <div className="absolute top-[30%] left-[-20%] w-[200%] h-[10%] rotate-[-25deg] bg-gradient-to-r from-transparent via-[#ff6bdf] to-transparent opacity-[0.03] blur-xl" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-12">
        
        
        
        {/* Name with Dynamic Neon Flicker Reveal */}
        <NeonFlickerReveal text="AYANA DINESH" startAnimation={startAnimation} />
        
        {/* Subtitle with Blinking Cursor */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center gap-2 mt-2 mb-12"
        >
          <span className="text-base sm:text-lg md:text-xl font-mono text-pink-100 font-semibold tracking-wide">
            Full Stack Developer
          </span>
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-2.5 h-5 bg-[#ff4da6] block" 
          />
        </motion.div>
        
        
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.a 
        href="#about"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity z-20"
      >
        <span className="text-[0.6rem] tracking-[0.5em] uppercase text-pink-200 font-semibold">Scroll</span>
        <ChevronDown className="w-3 h-3 text-pink-200" />
      </motion.a>

    </section>
  );
};

const Intro: React.FC = () => {
  const [hasExplored, setHasExplored] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!hasExplored) {
      document.body.style.overflow = 'hidden';
      // @ts-ignore
      if (window.lenis) window.lenis.stop();
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      // @ts-ignore
      if (window.lenis) window.lenis.start();
    }
    
    return () => {
      document.body.style.overflow = '';
      // @ts-ignore
      if (window.lenis) window.lenis.start();
    };
  }, [hasExplored]);

  return (
    <>
      {!hasExplored && (
        <PreIntro onExplore={() => setHasExplored(true)} theme={theme} />
      )}
      <MainIntro startAnimation={hasExplored} />
    </>
  );
};

export default Intro;
