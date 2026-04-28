import React from 'react';
import { motion } from 'framer-motion';
import ShuffleText from '../components/ShuffleText';
import { SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiJavascript, SiGithub } from 'react-icons/si';
import profileImg from '../assets/profile.png';
import avatarImg from '../assets/avatar.png';

const planets = [
  {
    name: "GitHub",
    link: "https://github.com/codewithayana",
    color: "#c9d1d9",
  },
  {
    name: "LeetCode",
    link: "https://leetcode.com/u/ayanadinesh",
    color: "#ffa116",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/ayanadinesh/",
    color: "#0a66c2",
  },
  {
    name: "Email",
    link: "mailto:ayanakd.official@gmail.com",
    color: "#EA4335",
  },
  {
    name: "dev.to",
    link: "https://dev.to/ayanadinesh",
    color: "#14b8a6",
  },
];

interface PlanetProps {
  item: typeof planets[0];
  index: number;
}

const Planet: React.FC<PlanetProps> = ({ item, index }) => {
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 260;
  const angle = (index / planets.length) * (2 * Math.PI);

  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full cursor-pointer group z-50 pointer-events-auto"
      style={{ 
        x, 
        y,
        backgroundColor: (item as any).color,
        boxShadow: `0 0 15px ${(item as any).color}`
      }}
      animate={{ 
        scale: [1, 1.8, 1],
        boxShadow: [
          `0 0 10px ${(item as any).color}`,
          `0 0 30px ${(item as any).color}`,
          `0 0 10px ${(item as any).color}`
        ],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: index * 0.4
      }}
      whileHover={{ scale: 2.2, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => window.open(item.link, "_blank")}
    >
      <span className="absolute -bottom-8 text-[8px] font-bold tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-1.5 py-0.5 rounded border border-white/5 backdrop-blur-sm pointer-events-none">
        {item.name}
      </span>
    </motion.div>
  );
};

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

          {/* Orbiting Elements - OUTER LAYERS */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            whileHover={{ animationPlayState: "paused" }}
            className="absolute flex items-center justify-center z-50"
          >
            {planets.map((item, i) => (
              <Planet key={i} item={item} index={i} />
            ))}
          </motion.div>
          <p className="absolute bottom-[-100px] text-sm text-gray-400 animate-pulse">
            Click the planets to explore 
          </p>
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
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
              <ShuffleText text="Me" />
            </span>
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
