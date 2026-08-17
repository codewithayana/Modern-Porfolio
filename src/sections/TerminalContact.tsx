import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TerminalContact.css';

gsap.registerPlugin(ScrollTrigger);

const TerminalContact: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [linesVisible, setLinesVisible] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);


  useEffect(() => {
    if (!terminalRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: terminalRef.current,
      start: "top 75%", // Triggers when the top of the terminal hits 75% of the viewport height
      once: true,
      onEnter: () => {
        let currentLine = 0;
        const interval = setInterval(() => {
          currentLine++;
          setLinesVisible(currentLine);
          if (currentLine >= 8) {
            clearInterval(interval);
          }
        }, 300);
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section id="contacts" className="terminal-section reveal-item">
      <h1 className="contact-title reveal-item" style={{ background: "linear-gradient(90deg, #b06aff, #ff6eb4, #ff9a3c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Contacts</h1>
      
      <div className="contact-wrapper">
        
        {/* Flip Card Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotateY: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="contact-cards-container reveal-item"
          style={{ perspective: "1000px" }}
        >
          <div 
            className="flip-card-wrapper" 
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '280px', cursor: 'pointer' }}
          >
            <motion.div
              className="flip-card-inner"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
              style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
            >
              {/* Front of Card */}
              <div className="holo-card flip-card-front" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <div className="holo-card-content center-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <div className="holo-icon-wrapper" style={{ fontSize: '56px', marginBottom: '16px', filter: 'drop-shadow(0 0 20px rgba(255, 110, 180, 0.8))' }}>
                    👋
                  </div>
                  <h2 style={{ fontSize: '30px', margin: '0 0 12px 0', textAlign: 'center', fontWeight: '800', background: 'linear-gradient(90deg, #b06aff, #ff6eb4, #ff9a3c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 4px 12px rgba(176, 106, 255, 0.3))' }}>Let's work together!</h2>
                  <p className="text-text-secondary" style={{ fontSize: '15px', fontWeight: '500', letterSpacing: '0.5px' }}>Click to view my availability & details</p>
                </div>
              </div>

              {/* Back of Card */}
              <div className="holo-card flip-card-back" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <div className="holo-card-content" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ margin: '0 0 20px 0', fontSize: '24px', borderBottom: '1px solid rgba(255, 110, 180, 0.3)', paddingBottom: '12px', background: 'linear-gradient(90deg, #b06aff, #ff6eb4, #ff9a3c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800' }}>Connection Details</h3>
                  <ul className="context-list" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: 2.4 }}>
                    <li className="border-b border-pink-500/15 flex justify-between">
                      <strong className="text-pink-500 font-semibold">Preferred Method</strong> 
                      <span className="text-text-primary">Email or LinkedIn</span>
                    </li>
                    <li className="border-b border-pink-500/15 flex justify-between">
                      <strong className="text-pink-500 font-semibold">Response Time</strong> 
                      <span className="text-text-primary">Within 24-48 hours</span>
                    </li>
                    <li className="border-b border-pink-500/15 flex justify-between">
                      <strong className="text-pink-500 font-semibold">Open To</strong> 
                      <span className="text-text-primary">Full-time, Freelance</span>
                    </li>
                    <li className="flex justify-between">
                      <strong className="text-pink-500 font-semibold">Timezone</strong> 
                      <span className="text-text-primary">IST (UTC +5:30)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          <p className="card-stack-hint">Click card to flip</p>
        </motion.div>

        {/* Terminal Side */}
        <motion.div 
          ref={terminalRef}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="terminal-container"
        >
          {/* Header */}
          <div className="terminal-header">
            <div className="terminal-buttons">
              <div className="terminal-btn close"></div>
              <div className="terminal-btn minimize"></div>
              <div className="terminal-btn maximize"></div>
            </div>
            <div className="terminal-title">ayana.dev</div>
            <div className="terminal-path">~/portfolio</div>
          </div>

          {/* Body */}
          <div className="terminal-body">
            <div className="terminal-comment"># ------------------------------------------------------------------</div>
            <div className="terminal-comment"># v2.4.1  ·  open to opportunities</div>
            <div className="terminal-comment"># ------------------------------------------------------------------</div>

            {/* --network command */}
            {linesVisible >= 1 && (
              <div className="terminal-prompt">
                <span className="prompt-user">ayana</span><span className="prompt-host">@portfolio</span>
                
                <span className="prompt-arg">--network</span>
              </div>
            )}
            
            <div className="terminal-output" style={{ marginBottom: '16px' }}>
              {linesVisible >= 2 && (
                <div className="terminal-output-row">
                  <span className="output-arrow green">▶</span>
                  <span className="output-label">email</span>
                  <span className="output-value">
                    <a href="https://outlook.live.com/mail/0/deeplink/compose?to=ayanakd.official@gmail.com" target="_blank" rel="noreferrer">ayanakd.official@gmail.com</a>
                  </span>
                </div>
              )}
              
              {linesVisible >= 3 && (
                <div className="terminal-output-row">
                  <span className="output-arrow green">▶</span>
                  <span className="output-label">github</span>
                  <span className="output-value">
                    <a href="https://github.com/codewithayana" target="_blank" rel="noreferrer">github.com/codewithayana</a>
                  </span>
                </div>
              )}
              
              {linesVisible >= 4 && (
                <div className="terminal-output-row">
                  <span className="output-arrow green">▶</span>
                  <span className="output-label">linkedin</span>
                  <span className="output-value">
                    <a href="https://linkedin.com/in/ayanadinesh" target="_blank" rel="noreferrer">linkedin.com/in/ayanadinesh</a>
                  </span>
                </div>
              )}
              
              {linesVisible >= 5 && (
                <div className="terminal-output-row">
                  <span className="output-arrow green">▶</span>
                  <span className="output-label">leetcode</span>
                  <span className="output-value">
                    <a href="https://leetcode.com/u/ayanadinesh" target="_blank" rel="noreferrer">leetcode.com/u/ayanadinesh</a>
                  </span>
                </div>
              )}
              
              {linesVisible >= 6 && (
                <div className="terminal-output-row">
                  <span className="output-arrow green">▶</span>
                  <span className="output-label">dev.to</span>
                  <span className="output-value">
                    <a href="https://dev.to/ayanadinesh" target="_blank" rel="noreferrer">dev.to/ayanadinesh</a>
                  </span>
                </div>
              )}
              
              {linesVisible >= 7 && (
                <div className="terminal-output-row">
                  <span className="output-arrow green">▶</span>
                  <span className="output-label">phone</span>
                  <span className="output-value">
                    <a href="tel:+918078028796">+91 8129407173</a>
                </span>
                </div>
              )}

               {linesVisible >= 8 && (
                <div className="terminal-output-row">
                  <span className="output-arrow green">▶</span>
                  <span className="output-label">WhatsApp</span>
                  <span className="output-value">
                    <a href="tel:+918078028796"> 8129407173</a>
                </span>
                </div>
              )}
            </div>

            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalContact;
