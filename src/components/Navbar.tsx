import React, { useState, useEffect } from 'react';
import ShuffleText from './ShuffleText'
import { motion } from 'framer-motion';
import { Download, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Skills', 'Projects','Achievements','Educations', 'Certifications', 'Contacts'];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? theme === 'light' 
            ? 'py-4 bg-white/80 backdrop-blur-lg border-b border-gray-200' 
            : 'py-4 bg-[#050110]/80 backdrop-blur-lg border-b border-white/10'
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

        {/* Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`hover-underline text-sm font-medium transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'}`}
            >
              <ShuffleText className="studio-hover-text" text={item} />
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={toggleTheme}
            className={`p-2.5 rounded-full border transition-all ${
              theme === 'light' 
                ? 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200' 
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button className={`studio-hover-link flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all group ${
              theme === 'light'
                ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}>
              <ShuffleText className="studio-hover-text" text="Download CV" />
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
