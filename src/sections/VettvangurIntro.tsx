import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web';
import archerAnimation from '../assets/archer.json';

gsap.registerPlugin(ScrollTrigger);

// ── Cybersunset: #ff0080 → #ff8c00 → #6a00ff ──
function csColor(t: number, a: number): string {
  let r: number, g: number, b: number;
  if (t < 0.5) {
    const p = t / 0.5;
    r = 255; g = Math.round(p * 140); b = Math.round(128 - p * 128);
  } else {
    const p = (t - 0.5) / 0.5;
    r = Math.round(255 - p * 149); g = Math.round(140 - p * 140); b = Math.round(p * 255);
  }
  return `rgba(${r},${g},${b},${a})`;
}

// ── Particle class ──
class Particle {
  x = 0; y = 0; vx = 0; vy = 0;
  r = 0; t = 0; a = 0; life = 0; maxLife = 0;
  W: number; H: number;

  constructor(W: number, H: number, init = false) {
    this.W = W; this.H = H;
    this.reset(init);
  }

  reset(init = false) {
    this.x       = Math.random() * this.W;
    this.y       = init ? Math.random() * this.H : (Math.random() < 0.5 ? -4 : this.H + 4);
    this.r       = Math.random() * 1.8 + 0.3;
    this.vx      = (Math.random() - 0.5) * 0.4;
    this.vy      = (Math.random() - 0.5) * 0.4;
    this.t       = Math.random();
    this.a       = Math.random() * 0.6 + 0.2;
    this.life    = 0;
    this.maxLife = 200 + Math.random() * 400;
  }

  update(mx: number, my: number) {
    const dx = mx - this.x, dy = my - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 200) { this.vx += dx * 0.00008; this.vy += dy * 0.00008; }
    this.x += this.vx; this.y += this.vy;
    this.life++;
    if (this.life > this.maxLife || this.x < 0 || this.x > this.W || this.y < 0 || this.y > this.H) {
      this.reset(false);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const fade =
      this.life < 30 ? this.life / 30 :
      this.life > this.maxLife - 30 ? (this.maxLife - this.life) / 30 : 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = csColor(this.t, this.a * fade);
    ctx.fill();
  }
}

const VettvangurIntro: React.FC = () => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const mouseRef    = useRef({ x: 0, y: 0 });
  const rafRef      = useRef<number>(0);

  const [showName, setShowName] = useState(false);

  // Load Lottie and Trigger name reveal after the arrow hits (around 3 seconds into the animation)
  useEffect(() => {
    let anim: any;
    if (lottieContainerRef.current) {
      anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: archerAnimation,
      });
    }

    const t1 = setTimeout(() => setShowName(true), 3200);
    return () => {
      clearTimeout(t1);
      if (anim) anim.destroy();
    };
  }, []);

  // Particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let W = 0, H = 0;
    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles = Array.from({ length: 180 }, (_, i) => new Particle(W, H, i < 100));
    };
    resize();
    window.addEventListener('resize', resize);

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            const a = (1 - d / 100) * 0.18;
            const t = (particles[i].t + particles[j].t) / 2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = csColor(t, a);
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      drawConnections();
      particles.forEach(p => { p.update(mouseRef.current.x, mouseRef.current.y); p.draw(ctx); });
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    const onMove = (e: MouseEvent) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; };
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    if (!contentRef.current) return;

    gsap.to(contentRef.current, {
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: -150,
      scale: 0.85,
      opacity: 0,
      filter: 'blur(15px)',
    });

    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top top',
          end: '20% top',
          scrub: true,
        },
        opacity: 0,
        y: 50,
      });
    }

    gsap.to(canvasRef.current, {
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 200,
      scale: 1.1,
    });
  }, []);

  return (
    <section style={{
      position: 'relative', width: '100vw', height: '100vh',
      overflow: 'hidden', background: 'radial-gradient(circle at 50% 40%,#0b0418, #05010a)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      userSelect: 'none',
    }}>
      {/* Background Layer */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,0,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,128,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)',
      }} />

      {/* Main Content Area */}
      <div ref={contentRef} style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        
        {/* Archer Lottie Animation */}
        <div 
          ref={lottieContainerRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            minHeight: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none'
          }}
        />

        {/* Name Reveal */}
        <AnimatePresence>
          {showName && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)', y: 40 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: -80 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                position: 'absolute', 
                top: '50%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20,
              }}
            >
              <h1 style={{
                fontSize: 'clamp(3rem, 9vw, 7rem)', fontWeight: 900, color: '#ffffff',
                letterSpacing: '0.12em', lineHeight: 1, fontFamily: "'Courier New', monospace",
                whiteSpace: 'nowrap', textShadow: '0 0 40px rgba(0,240,255,0.5), 0 0 80px rgba(255,0,128,0.3)',
                margin: 0,
              }}>
                AYANA DINESH
              </h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{
                  marginTop: '1.4rem', display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #ff0080)' }} />
                <span style={{
                  fontSize: 'clamp(0.55rem, 1.2vw, 0.68rem)', fontWeight: 700, letterSpacing: '0.55em', textTransform: 'uppercase',
                  fontFamily: "'Courier New', monospace", background: 'linear-gradient(90deg, #00F0FF, #ff0080)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Full Stack Developer
                </span>
                <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, #ff0080, transparent)' }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showName && (
          <motion.div ref={indicatorRef} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{
              position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
              zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}
          >
            <div style={{
              width: 1, height: 48,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.45), transparent)',
            }} />
            <span style={{
              fontSize: '0.48rem', letterSpacing: '0.45em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)', fontFamily: "'Courier New', monospace",
            }}>
              scroll
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VettvangurIntro;
