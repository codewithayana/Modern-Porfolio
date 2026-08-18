import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from 'react-icons/fa6';
import { ArrowRight, Download } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const cardRef = useRef<HTMLDivElement>(null);
  const maxTilt = 4; // Slightly reduced for a large card so it doesn't clip excessively

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    cardRef.current.style.transform =
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  };

  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub size={20} />, url: 'https://github.com/codewithayana' },
    { name: 'LinkedIn', icon: <FaLinkedin size={20} />, url: 'https://linkedin.com/in/ayanadinesh' },
    { name: 'Email', icon: <FaEnvelope size={20} />, url: 'https://outlook.live.com/mail/0/deeplink/compose?to=ayanakd.official@gmail.com' }
  ];

  return (
    <footer className="w-full px-4 md:px-8 pb-8 pt-10">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d', willChange: 'transform' }}
        className={`w-full max-w-7xl mx-auto py-14 px-8 md:px-14 rounded-3xl border transition-colors duration-300 relative z-10 shadow-2xl ${
          theme === 'light' ? 'bg-[#fafafa] border-gray-200 shadow-gray-200/50' : 'bg-[#18181b] border-white/5 shadow-black/50'
        }`}
      >
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16" style={{ transform: 'translateZ(30px)' }}>
          
          {/* Left Text & Button */}
          <div className="flex flex-col gap-5 max-w-md">
            <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Let's build something.
            </h2>
            <p className={`text-[15px] leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Open to freelance work and full-time roles.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <a 
                href="https://outlook.live.com/mail/0/deeplink/compose?to=ayanakd.official@gmail.com"
                target="_blank" rel="noreferrer"
                className={`w-fit flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-semibold transition-all hover:scale-105 ${
                  theme === 'light' 
                    ? 'border-gray-300 hover:bg-gray-100 text-gray-800' 
                    : 'border-[#333] hover:bg-white/5 text-gray-200'
                }`}
              >
                Say hello <ArrowRight size={16} />
              </a>
              <a 
                href="/Ayana Full Stack.pdf"
                download="Ayana_Dinesh_CV.pdf"
                className={`w-fit flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-semibold transition-all hover:scale-105 ${
                  theme === 'light' 
                    ? 'bg-gray-900 text-white border-transparent hover:bg-gray-800' 
                    : 'bg-white text-black border-transparent hover:bg-gray-200'
                }`}
              >
                Download CV <Download size={16} />
              </a>
            </div>
          </div>

          {/* Right Social Icons */}
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl border transition-all duration-300 studio-hover-link flex items-center justify-center hover:scale-110 ${
                  theme === 'light'
                    ? 'border-gray-300 text-gray-600 hover:border-gray-400'
                    : 'border-[#333] text-gray-300 hover:border-gray-500 hover:text-white'
                }`}
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className={`w-full h-px mb-8 ${theme === 'light' ? 'bg-gray-200' : 'bg-[#333]'}`} style={{ transform: 'translateZ(20px)' }}></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium" style={{ transform: 'translateZ(30px)' }}>
          <p className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
            &copy; {currentYear} Ayana Dinesh. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
              Currently building a new project
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
