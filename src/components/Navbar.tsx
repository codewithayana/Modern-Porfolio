import React, { useState, useEffect } from 'react';
import ShuffleText from './ShuffleText'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Download, Sun, Moon, Check, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Ensure it checks on initial mount in case of page refresh
  useEffect(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  const navItems = ['About', 'Skills', 'Projects','Achievements','Education', 'Certifications', 'Contacts'];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(`nav-${id}`) || document.getElementById(id);
    if (target) {
      // @ts-ignore
      if (window.lenis) {
        // @ts-ignore
        window.lenis.scrollTo(target, { offset: -80 }); // offset for the fixed navbar
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? theme === 'light' 
            ? 'py-4 bg-white/90 backdrop-blur-lg border-b border-gray-200' 
            : 'py-4 bg-[#050110]/90 backdrop-blur-lg border-b border-white/10'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Ayana</span>
        </motion.div>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item, idx) => {
            const id = item.toLowerCase();
            return (
              <motion.a
                key={item}
                href={`#${id}`}
                onClick={(e) => handleScrollTo(e, id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`hover-underline text-sm font-medium transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <ShuffleText className="studio-hover-text" text={item} />
              </motion.a>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={toggleTheme}
            className={`p-2.5 rounded-full border transition-all ${
              theme === 'light' 
                ? 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200' 
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:block"
          >
            <button 
              onClick={() => {
                setIsDownloaded(true);
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Ayana_Dinesh_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => setIsDownloaded(false), 3000);
              }}
              className={`studio-hover-link flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all group ${
              theme === 'light'
                ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            } ${isDownloaded ? 'border-green-500/50 bg-green-500/10 text-green-500' : ''}`}>
              <ShuffleText 
                key={isDownloaded ? 'downloaded' : 'download'} 
                className={`studio-hover-text ${isDownloaded ? 'text-green-500' : ''}`} 
                text={isDownloaded ? "Downloaded!" : "Download CV"} 
              />
              {isDownloaded ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full border transition-all ${
              theme === 'light' 
                ? 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200' 
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden"
          >
            <div className={`px-6 py-4 flex flex-col gap-4 border-t ${theme === 'light' ? 'border-gray-200 bg-white/95' : 'border-white/10 bg-[#050110]/95'}`}>
              {navItems.map((item) => {
                const id = item.toLowerCase();
                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    onClick={(e) => handleScrollTo(e, id)}
                    className={`text-sm font-medium transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    {item}
                  </a>
                );
              })}
              
              <button 
                onClick={() => {
                  setIsDownloaded(true);
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'Ayana_Dinesh_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setTimeout(() => setIsDownloaded(false), 3000);
                }}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all sm:hidden mt-2 ${
                theme === 'light'
                  ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
              >
                {isDownloaded ? "Downloaded!" : "Download CV"}
                {isDownloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
