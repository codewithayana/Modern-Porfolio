import React, { useRef, useMemo, useEffect} from 'react';
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
    damping: 30,
    restDelta: 0.001
  });

  const delayedProgress = useSpring(smoothProgress, {
  stiffness: 70, // Increased from 40 to reduce lag
  damping: 30
});

  // 🎥 CAMERA movement (horizontal) - Moves from screen 1 to screen 2
  const sceneX = useTransform(smoothProgress, [0, 0.6], ["0vw", "-100vw"]);

  // 🏹 Arrow movement (SYNCED!)
  let arrowXRaw = useTransform(
  smoothProgress,
  [0.1, 0.45, 0.6],   // 👈 starts moving at 10% scroll
  [10, 100, 174]
);
let  arrowX = useSpring(arrowXRaw, {
  stiffness: 105,
  damping: 30
});
  
  // Animation Mappings
  const archerOpacity = useTransform(smoothProgress, [0, 0.65, 0.8], [1, 1, 0]); // Always visible at start
  const bowStringX = useTransform(
  smoothProgress,
  [0, 0.08, 0.1],     // 👈 quick pull
  [0, -40, 0]
);
  const bowCurve = useTransform(smoothProgress, [0, 0.08], [0, 25]);
  const arrowOpacity = useTransform(smoothProgress, [0, 0.1, 0.65], [1, 1, 1]); // Always visible

  // Impact & Feedback
  const impactScale = useTransform(
  delayedProgress,
  [0.58, 0.6, 0.62],
  [1, 2.5, 1]
);

const impactOpacity = useTransform(
  delayedProgress,
  [0.58, 0.6, 0.62],
  [0, 1, 0]
);
  const targetVibration = useTransform(smoothProgress, [0.6, 0.61, 0.62, 0.63, 0.64, 0.65], [0, -5, 5, -3, 3, 0]);

  const scrollHintOpacity = useTransform(
  smoothProgress,
  [0, 0.1],
  [1, 0]
);
  
  // Reveal (Threshold: 0.75)
  const revealOpacity = useTransform(
  smoothProgress,
  [0.5, 0.55, 0.65],   // 👈 finishes at 65%
  [0, 0, 1]
);

const revealScale = useTransform(
  smoothProgress,
  [0.55, 0.65],
  [0.8, 1]
);

const revealY = useTransform(
  smoothProgress,
  [0.55, 0.65],
  [40, 0]
);



  // Cosmic Starfield Background
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
    <div
  ref={containerRef}
  className="relative h-[600vh] w-full bg-[#050110]"
>
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* WIDE SCENE CONTAINER */}
        <motion.div 
          style={{ x: sceneX }}
          className="scene relative w-[200vw] h-screen"
        >
          {/* Cosmic Background Layer */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#050110] via-[#0b041a] to-[#050110]" />
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
                  boxShadow: p.size > 1.5 ? '0 0 15px rgba(255, 255, 255, 0.6)' : 'none'
                }}
              />
            ))}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

  {/* ... your existing scene + overlay ... */}

  {/* 👇 ADD IT HERE */}
  <motion.div
  style={{ opacity: scrollHintOpacity }}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: [0, 10, 0] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    className="absolute bottom-10 left-10 flex flex-col items-center text-white/70 z-50"
  >
    <span className="text-sm tracking-widest uppercase">Scroll Down</span>
    <div className="mt-2 w-5 h-8 border border-white/50 rounded-full flex items-start justify-center p-1">
      <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
    </div>
  </motion.div>

</div>
          </div>

          {/* 🏹 ARCHER - Screen 1 */}
          <motion.div 
            style={{ opacity: archerOpacity }}
            className="archer absolute left-[10vw] top-1/2 -translate-y-1/2 w-48 h-96 z-10"
          >
            <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(106,0,255,0.4)]">
              <path d="M50 30 Q55 25 60 30 T60 50 Q50 60 40 50 T40 30 Z" fill="#0c041a" />
              <path d="M45 55 L55 55 L65 130 L35 130 Z" fill="#0c041a" />
              <path d="M40 130 L30 180 M60 130 L70 180" stroke="#0c041a" strokeWidth="10" strokeLinecap="round" />
              <path d="M50 70 L75 70" stroke="#0c041a" strokeWidth="8" strokeLinecap="round" />
              <motion.path 
                d={useTransform(bowStringX, (v) => `M50 70 L${50+v} 100`)}
                stroke="#0c041a" strokeWidth="8" strokeLinecap="round" 
              />
              <motion.path 
                d={useTransform(bowCurve, (v) => `M75 30 Q${85+v} 100 75 170`)}
                fill="none" stroke="#1a0b2e" strokeWidth="5" strokeLinecap="round" 
              />
              <motion.path 
                d={useTransform(bowStringX, (v) => `M75 30 L${75+v} 100 L75 170`)}
                fill="none" stroke="#4a2d7a" strokeWidth="1.5" 
              />
            </svg>
          </motion.div>

          {/* 🏹 THE ARROW - Travel to HUD Ring */}
          <motion.div 
            style={{ 
              x: useTransform(arrowX, (v) => `${v}vw`), 
              opacity: arrowOpacity,
              rotate: 5 
            }}
            className="arrow absolute top-1/2 left-0 -translate-y-1/2 flex items-center z-20"
          >
            <div className="w-24 h-[2px] bg-white shadow-[0_0_15px_#fff]" />
            <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[12px] border-l-white" />
            <div className="absolute right-full w-64 h-[4px] bg-gradient-to-r from-transparent via-[#ff0080] to-[#ff8c00] opacity-80 blur-[2px]" />
          </motion.div>

          {/* ✨ IDENTITY REVEAL - Centered in screen 2 */}
          <motion.div 
            style={{ opacity: revealOpacity, scale: revealScale, y: revealY }}
            className="name absolute left-[130vw] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]">
              AYANA DINESH
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-[0.8em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ff8c00] to-[#6a00ff] mt-4 drop-shadow-[0_0_20px_rgba(255,0,128,0.5)]">
              Full Stack Developer
            </p>
          </motion.div>

          {/* 🎯 TECH HUD RING - Right side of screen 2 */}
          <motion.div 
            style={{ 
              opacity: useTransform(smoothProgress, [0.4, 0.6], [0, 1]),
              x: targetVibration
            }}
            className="target absolute left-[170vw] top-1/2 -translate-y-1/2 w-80 h-80 flex items-center justify-center z-10"
          >
            <div className="relative w-full h-full flex items-center justify-center">
               {/* Main HUD Ring */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 rounded-full border-[2px] border-dashed border-[#ff0080]/40" 
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-4 rounded-full border border-[#ff8c00]/30 shadow-[0_0_30px_rgba(255,140,0,0.2)]" 
               />
               
               {/* Inner Glowing Core */}
               <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#ff0080] to-[#ff8c00] shadow-[0_0_40px_#ff0080] relative z-10">
                 <div className="absolute inset-0 rounded-full bg-white opacity-40 blur-sm" />
               </div>

               {/* Impact Feedback */}
               <motion.div 
                 style={{ scale: impactScale, opacity: impactOpacity }}
                 className="absolute w-full h-full rounded-full border-4 border-white shadow-[0_0_100px_#fff]"
               />

               {/* Energy Streak */}
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '40vw' }}
                 className="absolute left-full h-[1px] bg-gradient-to-r from-[#ff8c00] to-transparent opacity-50 blur-[1px]"
                 style={{ 
                   transformOrigin: 'left center',
                   boxShadow: '0 0 15px rgba(255, 140, 0, 0.5)'
                 }}
               />
            </div>
          </motion.div>

        </motion.div>



        {/* Glitch Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          .glitch-text { position: relative; }
          .glitch-text::before, .glitch-text::after {
            content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.8;
          }
          .glitch-text::before { color: #ff0080; animation: glitch-anim 3s infinite linear alternate-reverse; left: -3px; text-shadow: 2px 0 #ff0080; }
          .glitch-text::after { color: #6a00ff; animation: glitch-anim2 2s infinite linear alternate-reverse; left: 3px; text-shadow: -2px 0 #6a00ff; }
          @keyframes glitch-anim { 0% { clip: rect(44px, 450px, 56px, 0); } 20% { clip: rect(90px, 450px, 45px, 0); } 21% { clip: rect(0,0,0,0); } 100% { clip: rect(0,0,0,0); } }
          @keyframes glitch-anim2 { 0% { clip: rect(14px, 450px, 36px, 0); } 20% { clip: rect(10px, 450px, 95px, 0); } 21% { clip: rect(0,0,0,0); } 100% { clip: rect(0,0,0,0); } }
        `}} />
      </div>
    </div>
  );
};

export default HeroIntro;
