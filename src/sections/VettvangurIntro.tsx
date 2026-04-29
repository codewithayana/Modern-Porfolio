import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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

const FLOATING_TAGS = [
  { texts: ['<dev />', '{ code }', '[ build ]'], left: '5%', top: '15%', color: '#ff0080' },
  { texts: ['// design', 'async()',  'import *' ], left: '80%', top: '18%', color: '#f58d0eff' },
  { texts: ['deploy()', '<craft />', 'full-stack'], left: '75%', top: '78%', color: '#6a00ff' },
  { texts: ['( idea )', 'git push', 'v1.0.0'], left: '10%', top: '72%', color: '#00d4ff' },
];

const VettvangurIntro: React.FC = () => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const tagRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef    = useRef({ x: 0, y: 0 });
  const rafRef      = useRef<number>(0);
  const timersRef   = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ── Canvas particle animation ──
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

  return (
    <>
      <style>{`
        @keyframes ad-name-in {
          from { opacity:0; transform:scaleX(1.08) translateY(20px); filter:blur(8px); }
          to   { opacity:1; transform:scaleX(1)    translateY(0);    filter:blur(0);  }
        }
        @keyframes ad-glitch1 {
          0%,90%,100% { transform:translate(0); }
          91% { transform:translate(-4px, 1px); }
          93% { transform:translate( 4px,-1px); }
          95% { transform:translate(-2px, 0);   }
          97% { transform:translate( 2px, 1px); }
        }
        @keyframes ad-glitch2 {
          0%,90%,100% { transform:translate(0); }
          91% { transform:translate( 4px,-1px); }
          93% { transform:translate(-4px, 1px); }
          95% { transform:translate( 2px, 0);   }
          97% { transform:translate(-2px,-1px); }
        }
        @keyframes ad-role-in {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes ad-blink {
          0%,100% { opacity:1; } 50% { opacity:0; }
        }
        @keyframes ad-scan {
          0%   { top:-2px;  opacity:0; }
          5%   { opacity:1; }
          95%  { opacity:0.6; }
          100% { top:100vh; opacity:0; }
        }
        @keyframes ad-tag-float {
          0%, 100% { transform:translateY(10px);  }
          50%      { transform:translateY(-10px); }
        }
        .ad-name-pseudo::before,
        .ad-name-pseudo::after {
          content: 'AYANA DINESH';
          position: absolute;
          top: 0; left: 0; right: 0;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          font-family: inherit;
          white-space: nowrap;
        }
        .ad-name-pseudo::before {
          color: #ff0080;
          clip-path: polygon(0 0,100% 0,100% 35%,0 35%);
          animation: ad-glitch1 4s infinite 2s;
        }
        .ad-name-pseudo::after {
          color: #6a00ff;
          clip-path: polygon(0 65%,100% 65%,100% 100%,0 100%);
          animation: ad-glitch2 4s infinite 2.1s;
        }
      `}</style>

      <section style={{
        position: 'relative', width: '100vw', height: '100vh',
        overflow: 'hidden', background: '#050810',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        userSelect: 'none',
      }}>

        {/* ── PARTICLE CANVAS ── */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        {/* ── DOT GRID ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,0,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,128,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)',
        }} />

        {/* ── SCAN LINE ── */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent, rgba(248, 5, 127, 0.15), rgba(255,140,0,0.2), rgba(106,0,255,0.15), transparent)',
          animation: 'ad-scan 6s linear infinite',
          filter: 'blur(2px)',
        }} />


        {/* ── RANDOMIZED FLOATING DATA CLOUD ── */}
        {(() => {
          const allTexts = FLOATING_TAGS.flatMap(t => t.texts);
          const colors = ['#ff0080', '#f58d0eff', '#6a00ff', '#00d4ff'];
          
          return allTexts.map((txt, i) => {
            // Generate pseudo-random but stable positions
            const seed = i * 137.5; // Golden angle type distribution
            const left = (10 + (seed % 80)) + '%';
            const top = (15 + ((seed * 1.3) % 70)) + '%';
            const color = colors[i % colors.length];
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ 
                  opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 } 
                }}
                style={{
                  position: 'absolute',
                  left,
                  top,
                  zIndex: 4,
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontFamily: "'Courier New', monospace",
                  color: color,
                  textShadow: `0 0 12px ${color}50`,
                  animation: `ad-tag-float ${6 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.7}s`,
                  cursor: 'default'
                }}
              >
                {txt}
              </motion.div>
            );
          });
        })()}

        {/* ── CENTRAL CONTENT ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
          {/* Name + glitch + brackets */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            position: 'relative',
            padding: '0 20px',
            animation: 'ad-name-in 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both',
          }}>
            {/* CORNER BRACKETS (Tightly wrapped) */}
            <div style={{
              position: 'absolute',
              inset: '-10px -10px',
              zIndex: -1,
              pointerEvents: 'none',
            }}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="adLg1" x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#ff0080"/><stop offset="1" stopColor="#ff8c00"/>
                  </linearGradient>
                  <linearGradient id="adLg2" x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#ff8c00"/><stop offset="1" stopColor="#6a00ff"/>
                  </linearGradient>
                </defs>
                <path d="M12 4 L4 4 L4 12" stroke="url(#adLg1)" strokeWidth="1.5" strokeLinecap="square"/>
                <path d="M88 4 L96 4 L96 12" stroke="url(#adLg2)" strokeWidth="1.5" strokeLinecap="square"/>
                <path d="M12 96 L4 96 L4 88" stroke="url(#adLg1)" strokeWidth="1.5" strokeLinecap="square"/>
                <path d="M88 96 L96 96 L96 88" stroke="url(#adLg2)" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </div>
            <span
              style={{
                position: 'relative',
                fontSize: 'clamp(3rem, 9vw, 7rem)',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '0.12em',
                lineHeight: 1,
                fontFamily: "'Courier New', monospace",
                whiteSpace: 'nowrap',
                animation: 'none', // Animation now handled by parent container
                textShadow: '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)',
              }}
            >
              AYANA DINESH
            </span>
            {/* blinking cursor */}
            <span style={{
              display: 'inline-block',
              width: 3,
              height: 'clamp(2.2rem, 7vw, 5rem)',
              background: 'linear-gradient(180deg, #f5f2f3ff, #f5f3f8ff)',
              marginLeft: 8,
              verticalAlign: 'middle',
              borderRadius: 2,
              animation: 'ad-blink 1.1s step-end infinite',
            }} />
          </div>

          {/* Role */}
          <div style={{
            marginTop: '1.4rem',
            display: 'flex', alignItems: 'center', gap: 12,
            animation: 'ad-role-in 1s 1.1s both', opacity: 0,
          }}>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #ff0080)' }} />
            <span style={{
              fontSize: 'clamp(0.55rem, 1.2vw, 0.68rem)',
              fontWeight: 700, letterSpacing: '0.55em', textTransform: 'uppercase',
              fontFamily: "'Courier New', monospace",
              background: 'linear-gradient(90deg, #ff0080, #ff8c00, #6a00ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Full Stack Developer
            </span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, #6a00ff, transparent)' }} />
          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          animation: 'ad-role-in 1s 2.5s both', opacity: 0,
        }}>
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
        </div>

      </section>
    </>
  );
};

export default VettvangurIntro;
