import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Rocket } from 'lucide-react';
import { SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiJavascript, SiGithub } from 'react-icons/si';
import profileImg from '../assets/profile.png';

const AboutMe: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-[#050110] py-20 px-6 md:px-20 overflow-hidden flex flex-col justify-center">
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
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
            <span className="text-sm font-semibold tracking-widest text-blue-400 uppercase">Get To Know Me</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Me</span>
          </h2>

          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              I'm a passionate <span className="text-white font-medium">Full Stack Developer</span> currently pursuing{' '}
              <span className="text-purple-400 font-medium">MERN Stack Development</span>. I enjoy building modern, 
              responsive and animated web experiences that combine creativity with clean code.
            </p>
            <p>
              I'm also pursuing my Bachelor's degree in <span className="text-pink-400 font-medium">Social Work</span> at St. Joseph's College, 
              which helps me bring empathy, people skills and real-world perspective into everything I do.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {[
              { 
                icon: <GraduationCap className="w-6 h-6 text-purple-400" />, 
                title: "Education", 
                desc: "B.A. Social Work\nSt. Joseph's College\n(2022 - 2025)" 
              },
              { 
                icon: <Code2 className="w-6 h-6 text-blue-400" />, 
                title: "Focus", 
                desc: "MERN Stack\nFull Stack\nDevelopment" 
              },
              { 
                icon: <Rocket className="w-6 h-6 text-pink-400" />, 
                title: "Goal", 
                desc: "To build impactful\ndigital experiences\nand keep learning." 
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <div className="mb-4 p-3 w-fit rounded-xl bg-white/5">
                  {card.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 whitespace-pre-line leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Content: Profile Image with Rings */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex justify-center items-center"
        >
          {/* Animated Rings with Planets */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[320px] h-[320px] md:w-[450px] md:h-[450px] border-2 border-dashed border-purple-500/30 rounded-full"
          >
            {/* Planets on Ring 1 */}
            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_#a855f7]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-[0_0_10px_#f472b6]" />
            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_#c084fc]" />
          </motion.div>

          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-blue-500/20 rounded-full"
          >
            {/* Planets on Ring 2 */}
            <div className="absolute -top-2 left-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]" />
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_10px_#93c5fd]" />
          </motion.div>
          
          {/* Glow Ring */}
          <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border-[3px] border-transparent bg-gradient-to-tr from-purple-500 to-blue-500 p-[3px]">
            <div className="w-full h-full rounded-full bg-[#050110]" />
          </div>

          {/* Main Image Container */}
          <div className="relative w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden border-4 border-[#050110] shadow-[0_0_50px_rgba(168,85,247,0.4)]">
            <img 
              src={profileImg} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>

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
        </motion.div>
      </div>

    </section>
  );
};

export default AboutMe;
