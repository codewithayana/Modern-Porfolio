import React, { useState, useEffect, useRef } from 'react';
import { projects } from './projects';
import '../styles/Projects.css';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fullstack' | 'frontend' | 'backend'>('all');
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Starfield logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: any[] = [];
    const CFG = { count: 120, minR: 0.4, maxR: 1.6, minA: 0.05, maxA: 0.85, speed: 0.005 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const makeStars = () => {
      stars = [];
      for (let i = 0; i < CFG.count; i++) {
        const a = CFG.minA + Math.random() * (CFG.maxA - CFG.minA);
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: CFG.minR + Math.random() * (CFG.maxR - CFG.minR),
          a,
          da: (Math.random() - 0.5) * CFG.speed,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a += s.da;
        if (s.a <= CFG.minA || s.a >= CFG.maxA) s.da *= -1;
        s.a = Math.max(CFG.minA, Math.min(CFG.maxA, s.a));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.a})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    makeStars();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll Progress logic
  useEffect(() => {
    const track = trackRef.current;
    const fill = progressFillRef.current;
    if (!track || !fill) return;

    const handleScroll = () => {
      if (track.scrollWidth === track.clientWidth) {
        fill.style.width = '18%';
        return;
      }
      const pct = (track.scrollLeft / (track.scrollWidth - track.clientWidth)) * 100;
      fill.style.width = Math.max(18, Math.min(100, pct + 18)) + '%';
    };

    track.addEventListener('scroll', handleScroll);
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollCards = (dir: number) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <section className="projects-section" id="projects">
      <canvas ref={canvasRef} className="starfield-canvas" id="starfield"></canvas>

      <main className="projects-container">
        
        <h1 className="page-title">
          My <span>Projects</span>
        </h1>
        <div className="eyebrow">
          <div className="ey-line"></div>
          <span className="ey-txt">What I've built</span>
        </div>

        {/* FILTER TABS */}
        <div className="filters">
          {(['all', 'fullstack', 'frontend', 'backend'] as const).map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* SCROLL TRACK */}
        <div className="scroll-outer reveal">
          <div className="scroll-track" id="track" ref={trackRef}>
            {filteredProjects.map((project, idx) => (
              <div
                key={project.title}
                className={`card reveal-item ${project.isFeatured ? 'featured' : ''}`}
              >
                <div className="thumb" style={{ background: 'linear-gradient(135deg,#0d1020,#1a0d30)' }}>
                  <div
                    className="thumb-glow"
                    style={{
                      background: project.category === 'fullstack' ? '#c8820a' : project.category === 'frontend' ? '#9B8FFF' : '#3ddc84',
                      width: '100px',
                      height: '100px',
                      top: '10%',
                      left: '25%',
                    }}
                  ></div>
                  <span className="thumb-emoji">{project.emoji || '🚀'}</span>
                  {project.isFeatured && <div className="featured-badge">★ Featured</div>}
                  {!project.isFeatured && <div className="card-num">{String(idx + 1).padStart(2, '0')}</div>}
                  <span className={`cat-tag tag-${project.category === 'fullstack' ? 'fs' : project.category === 'frontend' ? 'fe' : 'be'}`}>
                    {project.category === 'fullstack' ? 'Full Stack' : project.category === 'frontend' ? 'Frontend' : 'Backend'}
                  </span>
                </div>
                <div className="card-body">
                  <div className="card-title">{project.title}</div>
                  <div className="card-desc">{project.description}</div>
                  <div className="stack">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="stack-pill">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <div className="card-links">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-btn btn-demo">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn btn-gh">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SCROLL PROGRESS */}
          <div className="progress-bg">
            <div className="progress-fill" id="progressFill" ref={progressFillRef}></div>
          </div>
        </div>

        {/* ARROWS */}
        <div className="arrows">
          <button className="arr-btn" onClick={() => scrollCards(-1)}>
            ←
          </button>
          <button className="arr-btn" onClick={() => scrollCards(1)}>
            →
          </button>
        </div>

        {/* VIEW ALL */}
        <div className="view-all">
          <a href="#">
            View all projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </main>
    </section>
  );
};

export default Projects;

