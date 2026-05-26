import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TerminalContact.css';

gsap.registerPlugin(ScrollTrigger);

const TerminalContact: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [linesVisible, setLinesVisible] = useState(0);

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
        
        {/* GIF Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotateY: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="contact-gif-container reveal-item"
          style={{ perspective: "1000px" }}
        >
          {/* A highly aesthetic Cyberpunk/Hacker anime GIF */}
          <img 
            src="https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif" 
            alt="Cyber aesthetic" 
            className="contact-gif" 
            onError={(e) => { e.currentTarget.src = 'https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif' }}
          />
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
            <div className="terminal-comment"># contact.sh  ·  v2.4.1  ·  open to opportunities</div>
            <div className="terminal-comment"># ------------------------------------------------------------------</div>

            {/* --network command */}
            {linesVisible >= 1 && (
              <div className="terminal-prompt">
                <span className="prompt-user">ayana</span><span className="prompt-host">@portfolio</span>
                <span className="prompt-symbol">~ %</span>
                <span className="prompt-command">./contact.sh</span>
                <span className="prompt-arg">--network</span>
              </div>
            )}
            
            <div className="terminal-output" style={{ marginBottom: '16px' }}>
              {linesVisible >= 2 && (
                <div className="terminal-output-row">
                  <span className="output-arrow green">▶</span>
                  <span className="output-label">email</span>
                  <span className="output-value">
                    <a href="mailto:ayanakd.official@gmail.com">ayanakd.official@gmail.com</a>
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
                    <a href="tel:+918078028796">+91 80780 28796</a>
                  </span>
                </div>
              )}
            </div>

            {/* Active Prompt with Cursor */}
            {linesVisible >= 8 && (
              <div className="terminal-prompt" style={{ marginBottom: 0 }}>
                <span className="prompt-user">ayana</span><span className="prompt-host">@portfolio</span>
                <span className="prompt-symbol">~ %</span>
                <span className="cursor"></span>
              </div>
            )}
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalContact;
