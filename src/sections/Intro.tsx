import React, { useMemo, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../hooks/useTheme';

// Subtle Starfield matching the image
const SparseStars = ({ theme }: { theme: string }) => {
  const ref = useRef<THREE.Points>(null!);
  const [positions] = useMemo(() => {
    const count = 1200;
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
        color={theme === 'light' ? "#000000" : "#ffffff"} 
        size={0.03} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.6} 
      />
    </Points>
  );
};

// Neon Flicker Reveal - Highly responsive, won't cut off wrapped text
const NeonFlickerReveal = ({ text, startAnimation, theme }: { text: string, startAnimation: boolean, theme: string }) => {
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
        className={`glitch-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase ${theme === 'light' ? 'text-gray-900' : 'text-white'} drop-shadow-lg text-center`}
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
  const [visibleText, setVisibleText] = useState<string[]>(["", "", ""]);
  const [showButton, setShowButton] = useState(false);
  const [activeLine, setActiveLine] = useState(0);

  const lines = [
    "> DECRYPTING PORTFOLIO...",
    "> ROOT ACCESS ENABLED_",
    "sudo explore --portfolio"
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let isPaused = false;

    const interval = setInterval(() => {
      if (isPaused) return;

      if (currentLine >= lines.length) {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 500);
        return;
      }

      setVisibleText(prev => {
        const newText = [...prev];
        newText[currentLine] = lines[currentLine].slice(0, currentChar + 1);
        return newText;
      });

      currentChar++;
      
      if (currentChar >= lines[currentLine].length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          currentLine++;
          currentChar = 0;
          setActiveLine(currentLine);
        }, 600); // delay between lines
      }
    }, 40); // typing speed

    return () => clearInterval(interval);
  }, []);

  return createPortal(
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center font-mono transition-opacity duration-1000 ${theme === 'light' ? 'bg-[#f8f9fa] text-gray-900' : 'bg-[#020005] text-[#00ffa3]'}`}
    >
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,1) 50%)', backgroundSize: '100% 4px' }} />
      
      {/* Cinematic Vignette */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${theme === 'light' ? 'bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.05)_100%)]' : 'bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.85)_100%)]'}`} />
      
      {/* Decorative Technical Labels */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className={`absolute top-6 left-6 md:top-10 md:left-10 text-[10px] md:text-xs tracking-[0.3em] font-bold ${theme === 'light' ? 'text-gray-500' : 'text-[#00ffa3]'}`}
      >
        SYS.VER_2.4.1
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className={`absolute bottom-6 right-6 md:bottom-10 md:right-10 text-[10px] md:text-xs tracking-[0.3em] font-bold ${theme === 'light' ? 'text-gray-500' : 'text-[#00ffa3]'}`}
      >
        SECURE_CONNECTION
      </motion.div>

      <div className="relative z-10 flex flex-col items-start w-[85%] max-w-[500px]">
        {/* Terminal Text Lines */}
        <div className="flex flex-col items-start justify-center gap-4 mb-8">
          {lines.map((_, idx) => (
            <div key={idx} className="h-6 md:h-8 flex items-center">
              <span 
                className="text-sm md:text-xl tracking-[0.1em] md:tracking-[0.15em] font-bold transition-all duration-300"
                style={{ textShadow: theme === 'light' ? 'none' : '0 0 10px rgba(0,255,163,0.4)' }}
              >
                {visibleText[idx]}
                {activeLine === idx && !showButton && (
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    _
                  </motion.span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Explore Button */}
        <div className="w-full flex justify-start mt-2 h-16">
          {showButton && (
            <motion.button
              onClick={onExplore}
              initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-10 py-4 font-bold tracking-[0.4em] uppercase text-sm group overflow-hidden border-2 transition-all duration-300 ${
                theme === 'light' 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-xl hover:shadow-[0_0_30px_rgba(0,255,163,0.4)] hover:border-transparent' 
                  : 'bg-[#020005] text-[#00ffa3] border-[#00ffa3] shadow-[0_0_15px_rgba(0,255,163,0.3)] hover:shadow-[0_0_30px_rgba(0,255,163,0.7)] hover:border-transparent'
              }`}
            >
              {/* Fill background on hover */}
              <div className={`absolute inset-0 w-full h-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-0 ${
                theme === 'light' ? 'bg-[#00ffa3]' : 'bg-[#00ffa3]'
              }`} />
              
              <span className={`relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-black`}>
                <span className="text-[#00ffa3] group-hover:text-black transition-colors duration-300">{`//`}</span>
                EXPLORE
                <span className="text-[#00ffa3] group-hover:text-black transition-colors duration-300">{`_`}</span>
              </span>
              
              {/* Cyberpunk corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            </motion.button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

const MainIntro: React.FC<{ startAnimation: boolean, theme: string }> = ({ startAnimation, theme }) => {
  // startAnimation is passed as a prop, no local state needed for it

  return (
    <section className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 ${theme === 'light' ? 'bg-[#f8f9fa]' : 'bg-[#020005]'} selection:bg-pink-500/30`}>
      
      {/* Deep Space Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <SparseStars theme={theme} />
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
        <NeonFlickerReveal text="AYANA DINESH" startAnimation={startAnimation} theme={theme} />
        
        {/* Subtitle with Blinking Cursor */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center gap-2 mt-2 mb-12"
        >
          <span className={`text-base sm:text-lg md:text-xl font-mono ${theme === 'light' ? 'text-gray-700' : 'text-pink-100'} font-semibold tracking-wide`}>
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
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity z-20 ${theme === 'light' ? 'text-gray-600' : 'text-pink-200'}`}
      >
        <span className="text-[0.6rem] tracking-[0.5em] uppercase font-semibold">Scroll</span>
        <ChevronDown className="w-3 h-3" />
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
      <MainIntro startAnimation={hasExplored} theme={theme} />
    </>
  );
};

export default Intro;
