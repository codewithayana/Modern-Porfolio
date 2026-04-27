import React from 'react';
import { motion } from 'framer-motion';
import { SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiJavascript, SiGithub } from 'react-icons/si';
import profileImg from '../assets/profile.png';
import avatarImg from '../assets/avatar.png';

const AboutMe: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen bg-[#1b0524] py-20 px-6 md:px-20 overflow-hidden flex flex-col justify-center z-10">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* LEFT SIDE: Profile Image with Neon Ring */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: -50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative flex justify-center items-center"
        >
          {/* Decorative Dotted Grid */}
          <div className="absolute -left-12 top-0 w-48 h-64 opacity-10 pointer-events-none hidden lg:block" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', 
                 backgroundSize: '24px 24px' 
               }} 
          />

          {/* Rotating Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[380px] h-[380px] md:w-[540px] md:h-[540px] border border-white/5 rounded-full"
          />
          
          {/* Orbiting Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[340px] h-[340px] md:w-[500px] md:h-[500px]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#ff0080] rounded-full shadow-[0_0_25px_#ff0080]" />
            <div className="absolute bottom-1/4 -right-1 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_25px_#3b82f6]" />
            <div className="absolute top-1/2 -left-2 w-2 h-2 bg-[#ff8c00] rounded-full shadow-[0_0_20px_#ff8c00]" />
          </motion.div>

          {/* Neon Ring (Original Cybersunset Colors) */}
          <div className="absolute w-[290px] h-[290px] md:w-[420px] md:h-[420px] rounded-full p-[6px] bg-gradient-to-tr from-[#ff0080] via-[#ff8c00] to-[#6a00ff] 
            shadow-[0_0_40px_rgba(255,0,128,0.6),inset_0_0_30px_rgba(255,255,255,0.2)]
          ">
            <div className="w-full h-full rounded-full bg-[#1b0524] relative z-10" />
          </div>

          {/* Profile Card with 3D Flip */}
          <div className="relative w-[270px] h-[270px] md:w-[390px] md:h-[390px] [perspective:1000px] group cursor-pointer z-10">
            <motion.div 
              className="relative w-full h-full transition-all duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-full overflow-hidden border-2 border-white/10">
                <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
              </div>
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-full overflow-hidden border-2 border-white/10">
                <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Text & Bio Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]" />
            <span className="text-sm font-semibold tracking-widest text-pink-400 uppercase">Get To Know Me</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">Me</span>
          </h2>

          <div className="space-y-6 text-gray-400 text-lg leading-relaxed max-w-xl">
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

          {/* Cinematic Quote */}
          <div className="pt-10 flex gap-6 items-start">
            <div className="text-5xl text-[#ff0080] font-serif leading-none opacity-80">“</div>
            <div className="space-y-2 border-l-2 border-white/10 pl-6">
              <p className="text-gray-200 text-xl font-light italic leading-relaxed">
                I don't just build websites,<br />
                I create <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] to-[#ff8c00] font-bold">experiences.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🛰️ FLOATING TECHNICAL DATA */}
      <div className="absolute inset-0 pointer-events-none opacity-20 font-mono text-[10px] text-gray-500 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ delay: 1.5 + i * 0.1 }}
            className="absolute"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          >
            {`0x${Math.random().toString(16).substr(2, 6).toUpperCase()} // ${['INITIALIZING', 'REVEALING', 'LOADING_BIO', 'SYNCING'][i % 4]}`}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutMe;
