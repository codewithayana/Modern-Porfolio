import React from 'react';
import { motion } from 'framer-motion';
import { SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiJavascript, SiGithub } from 'react-icons/si';
import profileImg from '../assets/profile.png';
import avatarImg from '../assets/avatar.png';

const AboutMe: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-[#1a0b2e] py-20 px-6 md:px-20 overflow-hidden flex flex-col justify-center">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]" />
            <span className="text-sm font-semibold tracking-widest text-pink-400 uppercase">Get To Know Me</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">Me</span>
          </h2>

          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              I'm <span className="text-white font-medium">Ayana</span>, a passionate <span className="text-white font-medium">Full Stack Developer</span> who loves 
              building modern, interactive and user-friendly web experiences.
            </p>
            <p>
              I focus on creating clean, responsive and performance-driven applications that not only 
              look good but also deliver a smooth experience.
            </p>
            <p>
              I enjoy turning ideas into real digital products and constantly exploring new technologies 
              to grow my skills.
            </p>
          </div>

          {/* Quote Section from Reference */}
          <div className="pt-10 flex gap-6 items-start">
            <div className="text-5xl text-purple-500 font-serif leading-none opacity-80">“</div>
            <div className="space-y-2 border-l-2 border-purple-500/30 pl-6">
              <p className="text-gray-200 text-xl font-light italic leading-relaxed">
                I don't just build websites,<br />
                I create <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-bold">experiences.</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Content: Profile Image with Neon Ring */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex justify-center items-center"
        >
          {/* Decorative Dotted Grid (Right Side) */}
          <div className="absolute -right-12 top-0 w-48 h-64 opacity-10 pointer-events-none hidden lg:block" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', 
                 backgroundSize: '24px 24px' 
               }} 
          />

          {/* Decorative Faint Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[380px] h-[380px] md:w-[540px] md:h-[540px] border border-white/5 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[420px] h-[420px] md:w-[600px] md:h-[600px] border border-white/5 rounded-full"
          />

          {/* Orbiting Planets - Enhanced & Brighter */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[340px] h-[340px] md:w-[500px] md:h-[500px]"
          >
            {/* Original 3 - Brightened */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-pink-500 rounded-full shadow-[0_0_25px_#ec4899]" />
            <div className="absolute bottom-1/4 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full shadow-[0_0_25px_#3b82f6]" />
            <div className="absolute top-1/2 -left-2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_20px_#a855f7]" />
            
            {/* 4 Extra Planets - Bright & Colorful */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_25px_#fbbf24]" />
            <div className="absolute bottom-1/3 left-0 w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_20px_#f43f5e]" />
            <div className="absolute top-1/3 -right-2 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_15px_#818cf8]" />
          </motion.div>

          {/* MAIN NEON LIGHT RING - BRIGHTER VERSION */}
          <div className="absolute w-[290px] h-[290px] md:w-[420px] md:h-[420px] rounded-full p-[6px] bg-gradient-to-tr from-[#ff00d4] via-[#a855f7] to-[#00d4ff] 
            shadow-[0_0_40px_rgba(255,0,212,0.8),0_0_80px_rgba(255,0,212,0.4),0_0_40px_rgba(0,212,255,0.8),0_0_80px_rgba(0,212,255,0.4),inset_0_0_40px_rgba(255,255,255,0.4)]
            before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-tr before:from-[#ff00d4] before:to-[#00d4ff] before:blur-[2px] before:opacity-80
          ">
            <div className="w-full h-full rounded-full bg-[#1a0b2e] relative z-10" />
          </div>

          {/* Profile Image Container */}
          <div className="relative w-[270px] h-[270px] md:w-[390px] md:h-[390px] [perspective:1000px] group cursor-pointer z-10">
            <motion.div 
              className="relative w-full h-full transition-all duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
              {/* Front: Portrait */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-full overflow-hidden border-2 border-white/10">
                <img 
                  src={profileImg} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                {/* Subtle Inner Glow on Image */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] rounded-full" />
              </div>

              {/* Back: Avatar */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-full overflow-hidden border-2 border-white/10">
                <img 
                  src={avatarImg} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] rounded-full" />
              </div>
            </motion.div>
          </div>

          {/* Extra Background Glow Accents */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
        </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-purple-400' : 'bg-blue-400'} blur-sm`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
      </div>
    </section>
  );
};

export default AboutMe;
