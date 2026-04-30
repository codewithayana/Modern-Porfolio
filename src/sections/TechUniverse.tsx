import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, 
  SiTailwindcss, SiJavascript, SiGit, SiPostman,
  SiTypescript, SiHtml5, SiCss, SiNextdotjs,
  SiFramer, SiVite, SiGraphql,
  SiJsonwebtokens, SiPostgresql, SiRedis,
  SiDocker, SiVercel,
  SiFigma, SiNotion, 
} from 'react-icons/si';
import {  FaNetworkWired, FaAws } from 'react-icons/fa6';
import { TbApi } from 'react-icons/tb';
import {  MdOutlineBugReport } from 'react-icons/md';
import { VscVscode } from 'react-icons/vsc';

const categories = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, color: "#ffffff" },
      
      { name: "Vite", icon: SiVite, color: "#646CFF" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#ffffff" },
      { name: "REST APIs", icon: TbApi, color: "#0078D4" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { name: "JWT Auth", icon: SiJsonwebtokens, color: "#ffffff" },
      { name: "WebSockets", icon: FaNetworkWired, color: "#ffffff" },
    ]
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
    ]
  },
  {
    title: "Tools & Testing",
    skills: [
      { name: "Playwright", icon: MdOutlineBugReport, color: "#2EAD33" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Notion", icon: SiNotion, color: "#ffffff" },
    ]
  },
  
];

const proficiencies = [
  { name: "JavaScript / TS", level: 90, color: "#F7DF1E" },
  { name: "React.js", level: 50, color: "#61DAFB" },
  { name: "Node.js", level: 85, color: "#339933" },
  { name: "PostgreSQL", level: 80, color: "#4169E1" },
  { name: "Docker / AWS", level: 5, color: "#FF9900" },
];

const TechNode: React.FC<{ skill: any, index: number }> = ({ skill, index }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    viewport={{ once: true }}
    className="flex flex-col items-center group relative p-4"
  >
    <div 
      className="absolute inset-0 rounded-full blur-[30px] opacity-10 group-hover:opacity-30 transition-opacity"
      style={{ backgroundColor: skill.color }}
    />
    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md z-10 transition-all group-hover:scale-110 group-hover:border-white/30 shadow-lg">
      <skill.icon className="text-2xl md:text-3xl" style={{ color: skill.color }} />
    </div>
    <span className="mt-3 text-[9px] md:text-[10px] font-bold text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors text-center">
      {skill.name}
    </span>
  </motion.div>
);

const ProgressBar: React.FC<{ item: any, index: number }> = ({ item, index }) => (
  <div className="space-y-3 w-full">
    <div className="flex justify-between items-end">
      <span className="text-sm font-bold tracking-widest text-gray-300 uppercase">{item.name}</span>
      <span className="text-xs font-mono text-pink-500">{item.level}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${item.level}%` }}
        transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
        className="h-full rounded-full relative"
        style={{ backgroundColor: item.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
        <div className="absolute inset-0 blur-sm opacity-50" style={{ backgroundColor: item.color }} />
      </motion.div>
    </div>
  </div>
);

const TechUniverse: React.FC = () => {
  return (
    <section id="skills" className="relative min-h-screen bg-[#050110] text-white overflow-hidden py-20 px-6">
      
      {/* 🌌 CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_30%,#1a0533,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff1a_1px,transparent_1px)] bg-[size:50px_50px] opacity-10" />
        
        {/* Retro Grid Sunset (Bottom) */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] overflow-hidden">
          <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-gradient-to-t from-pink-600/30 via-orange-600/10 to-transparent blur-[120px]" />
          <div className="absolute bottom-0 w-full h-full bg-[linear-gradient(rgba(244,114,182,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(244,114,182,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" 
               style={{ transform: 'perspective(500px) rotateX(60deg) translateY(50px) scale(3)' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
<div className="text-center space-y-4 mb-16">

  {/* TITLE FIRST */}
  <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
    Tech <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
      Universe
    </span>
  </h2>

  {/* THEN EYEBROW */}
  <motion.div 
    initial={{ opacity: 0 }} 
    whileInView={{ opacity: 1 }} 
    className="flex items-center justify-center gap-4 text-pink-500"
  >
    <div className="h-[1px] w-12 bg-pink-500/50" />
    <span className="text-xs font-bold tracking-[0.5em] uppercase">
      What I work with
    </span>
    <div className="h-[1px] w-12 bg-pink-500/50" />
  </motion.div>

</div>

        {/* Categorized Clusters */}
        <div className="space-y-12 mb-20">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-6 reveal-item">
              <div className="flex items-center gap-6">
                <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-500 whitespace-nowrap">{cat.title}</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
                {cat.skills.map((skill, i) => (
                  <div key={i} className="reveal-item">
                    <TechNode skill={skill} index={i} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiencies Section */}
        <div className="max-w-4xl mx-auto pt-16 border-t border-white/5">
           <div className="text-center mb-12 space-y-2">
              <h3 className="text-xl font-bold tracking-tight">Core Proficiencies</h3>
              <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">Expertise visualization across the full stack</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {proficiencies.map((p, i) => <ProgressBar key={i} item={p} index={i} />)}
           </div>
        </div>

      </div>
    </section>
  );
};

export default TechUniverse;
