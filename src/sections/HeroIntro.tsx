import React, { useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HeroIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 100,
    restDelta: 0.001
  });

  // 🎥 CAMERA movement
  const sceneX = useTransform(smoothProgress, [0.3, 0.6], ["0vw", "-100vw"]);

  // ✨ THE SWARM & CONVERGENCE TRAJECTORY
  // Primary horizontal travel
  const swarmXRaw = useTransform(smoothProgress, [0.2, 0.6], ["-10vw", "174vw"]);
  const swarmX = useSpring(swarmXRaw, { stiffness: 105, damping: 30 });

  // Convergence Logic (Stars merge at 50% of the swarm travel)
  // At scroll 0.2-0.4: Distant swarm
  // At scroll 0.4-0.5: Merging into one
  // At scroll 0.5-0.6: One massive star
  const mergeProgress = useTransform(smoothProgress, [0.2, 0.5], [1, 0]); // 1 = separate, 0 = merged

  // Massive Star scale-up after merge
  const massiveScale = useTransform(smoothProgress, [0.4, 0.5, 0.6], [1, 4, 3]);
  const massiveGlow = useTransform(smoothProgress, [0.4, 0.5], ["0px", "80px"]);

  // Impact & Feedback
  const impactScale = useTransform(smoothProgress, [0.6, 0.62, 0.65], [1, 4, 1]);
  const impactOpacity = useTransform(smoothProgress, [0.6, 0.62, 0.65], [0, 1, 0]);
  const targetVibration = useTransform(smoothProgress, [0.6, 0.61, 0.62, 0.63, 0.64, 0.65], [0, -8, 8, -5, 5, 0]);

  // Identity Reveal
  const revealOpacity = useTransform(smoothProgress, [0.55, 0.65], [0, 1]);
  const revealScale = useTransform(smoothProgress, [0.55, 0.65], [0.8, 1]);
  const revealY = useTransform(smoothProgress, [0.55, 0.65], [40, 0]);

  // Swarm Configuration (Increased sizes for more impact)
  const swarmStars = useMemo(() => [
    { id: 1, yOffset: -150, xOffset: -100, size: 12, delay: 0 },
    { id: 2, yOffset: 120, xOffset: -250, size: 10, delay: 0.1 },
    { id: 3, yOffset: -40, xOffset: -300, size: 16, delay: 0.05 },
    { id: 4, yOffset: 180, xOffset: -80, size: 8, delay: 0.15 },
    { id: 5, yOffset: -220, xOffset: -180, size: 11, delay: 0.08 },
    { id: 6, yOffset: 70, xOffset: -350, size: 14, delay: 0.2 },
    { id: 7, yOffset: -100, xOffset: -120, size: 9, delay: 0.12 },
    { id: 8, yOffset: -200, xOffset: -50, size: 7, delay: 0.03 },
  ], []);

  // Cosmic Background
  const particles = useMemo(() => {
    return Array.from({ length: 180 }).map((_, i) => ({
      id: i,
      x: Math.random() * 200, 
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
    }));
  }, []);

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full bg-[#050110]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* WIDE SCENE CONTAINER */}
        <motion.div 
          style={{ x: sceneX }}
          className="relative w-[200vw] h-screen"
        >
          {/* Cosmic Background Layer */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#020108] via-[#050212] to-[#020108]" />
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${p.x}vw`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  opacity: p.opacity,
                }}
              />
            ))}
          </div>

          {/* ✨ THE CONVERGING SWARM */}
          <motion.div 
            style={{ left: swarmX, top: '50%', y: '-50%' }}
            className="absolute z-20"
          >
            {/* Individual Swarm Stars */}
            {swarmStars.map((star) => (
              <motion.div
                key={star.id}
                style={{
                  y: useTransform(mergeProgress, (v) => v * star.yOffset),
                  x: useTransform(mergeProgress, (v) => v * star.xOffset),
                  opacity: useTransform(smoothProgress, [0.5, 0.55], [1, 0]),
                  scale: useTransform(mergeProgress, [1, 0], [1, 1.5])
                }}
                className="absolute flex items-center justify-center"
              >
                {/* 5-Pointed Faceted Star Tip (With Rotation) */}
                <motion.svg 
                  viewBox="0 0 100 100" 
                  style={{ 
                    width: star.size * 3, 
                    height: star.size * 3,
                    rotate: useTransform(smoothProgress, [0.2, 0.6], [0, 720 + star.id * 100]) // Dynamic spin
                  }} 
                  className="relative z-10 drop-shadow-[0_0_12px_#fff]"
                >
                  <defs>
                    <linearGradient id={`starFacet-${star.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="white" />
                      <stop offset="100%" stopColor="#e0e7ff" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" 
                    fill={`url(#starFacet-${star.id})`} 
                  />
                  <path d="M50 0 L50 70 L21 91 Z" fill="rgba(0,0,0,0.1)" />
                  <path d="M50 0 L61 35 L98 35 Z" fill="rgba(255,255,255,0.2)" />
                </motion.svg>

                {/* Stardust Particle Tail */}
                <div className="absolute left-0 -translate-x-full pointer-events-none flex items-center">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        x: [0, -150 - (i * 20)], 
                        y: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50],
                        opacity: [0.8, 0],
                        scale: [1, 0]
                      }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                      className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_8px_white]"
                    />
                  ))}
                  <div className="w-32 h-[1px] bg-gradient-to-r from-[#ff0080]/40 to-transparent blur-[2px]" />
                </div>
              </motion.div>
            ))}

            {/* THE MASSIVE STAR (Appears after merge) */}
            <motion.div
              style={{
                scale: massiveScale,
                opacity: useTransform(smoothProgress, [0.45, 0.5, 0.65], [0, 1, 0]),
                filter: useTransform(massiveGlow, (v) => `blur(0px) drop-shadow(0 0 ${v} #ff0080)`)
              }}
              className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            >
              {/* Massive 5-Pointed Star (Continuous Spin) */}
              <motion.svg 
                viewBox="0 0 100 100" 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 drop-shadow-[0_0_30px_#fff,0_0_60px_#ff0080]"
              >
                <path 
                  d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" 
                  fill="white" 
                />
              </motion.svg>
              
              {/* Massive Stardust Trail */}
              <div className="absolute left-0 -translate-x-full pointer-events-none flex items-center">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      x: [0, -400 - (i * 10)], 
                      y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 150],
                      opacity: [1, 0],
                      scale: [Math.random() * 3, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                    className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_15px_white]"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ✨ IDENTITY REVEAL */}
          <motion.div 
            style={{ opacity: revealOpacity, scale: revealScale, y: revealY }}
            className="absolute left-[130vw] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]">
              AYANA DINESH
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-light tracking-[0.8em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ff8c00] to-[#6a00ff]">
              Full Stack Developer
            </p>
          </motion.div>

          {/* 🎯 IMPACT TARGET */}
          <motion.div 
            style={{ 
              opacity: useTransform(smoothProgress, [0.4, 0.6], [0, 1]),
              x: targetVibration
            }}
            className="absolute left-[170vw] top-1/2 -translate-y-1/2 w-80 h-80 flex items-center justify-center z-10"
          >
            <div className="relative w-full h-full flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 rounded-full border-[2px] border-dashed border-[#ff0080]/40" 
               />
               <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#ff0080] to-[#6a00ff] shadow-[0_0_40px_#ff0080]" />
               <motion.div 
                 style={{ scale: impactScale, opacity: impactOpacity }}
                 className="absolute w-full h-full rounded-full border-4 border-white shadow-[0_0_100px_#fff]"
               />
            </div>
          </motion.div>

        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-10 flex flex-col items-center text-white/50"
        >
          <span className="text-xs tracking-widest uppercase">Scroll to Merge</span>
          <div className="mt-2 w-5 h-8 border border-white/50 rounded-full flex items-start justify-center p-1 text-[#ff0080]">
            <div className="w-1 h-2 bg-[#ff0080] rounded-full animate-bounce" />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroIntro;
