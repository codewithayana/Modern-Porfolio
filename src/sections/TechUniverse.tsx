import React, { useState } from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    id: 1,
    title: "Languages",
    icon: "</>",
    iconBg: "#b45309",
    iconColor: "#fde68a",
    borderColor: "#b45309",
    tagColor: "#fde68a",
    tagBg: "rgba(180,83,9,0.15)",
    tagBorder: "rgba(180,83,9,0.3)",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    id: 2,
    title: "Frontend",
    icon: "⊞",
    iconBg: "#1e3a5f",
    iconColor: "#93c5fd",
    borderColor: "#1e40af",
    tagColor: "#93c5fd",
    tagBg: "rgba(30,58,138,0.2)",
    tagBorder: "rgba(30,58,138,0.3)",
    skills: ["React.js", "Next.js", "Tailwind CSS","Framer Motion", "Vite"],
  },
  {
    id: 3,
    title: "Backend",
    icon: "⬡",
    iconBg: "#064e3b",
    iconColor: "#6ee7b7",
    borderColor: "#065f46",
    tagColor: "#6ee7b7",
    tagBg: "rgba(6,78,59,0.2)",
    tagBorder: "rgba(6,78,59,0.3)",
    skills: ["Node.js", "Express.js", "REST APIs","JWT Auth"],
  },
  {
    id: 4,
    title: "Database",
    icon: "🗄",
    iconBg: "#4c1d95",
    iconColor: "#c4b5fd",
    borderColor: "#5b21b6",
    tagColor: "#c4b5fd",
    tagBg: "rgba(76,29,149,0.2)",
    tagBorder: "rgba(76,29,149,0.3)",
    skills: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    id: 5,
    title: "Cloud & DevOps",
    icon: "☁",
    iconBg: "#1e3a5f",
    iconColor: "#7dd3fc",
    borderColor: "#0369a1",
    tagColor: "#e2e8f0",
    tagBg: "rgba(15,23,42,0.4)",
    tagBorder: "#334155",
    skills: ["AWS", "Docker","Vercel"],
  },
  {
    id: 6,
    title: "Testing",
    icon: "✓",
    iconBg: "#14532d",
    iconColor: "#4ade80",
    borderColor: "#166534",
    tagColor: "#4ade80",
    tagBg: "rgba(20,83,45,0.2)",
    tagBorder: "rgba(20,83,45,0.3)",
    skills: [ "Playwright","Postman" ],
  },
  {
    id: 7,
    title: "Tools",
    icon: "🔧",
    iconBg: "#78350f",
    iconColor: "#fcd34d",
    borderColor: "#92400e",
    tagColor: "#fcd34d",
    tagBg: "rgba(120,53,15,0.2)",
    tagBorder: "rgba(120,53,15,0.3)",
    skills: ["Git","GitHub","VS Code",  "Figma","Notion","Swagger","ESlint","Prettier","NPM","Yarn","PNPM"],
  },
  {
    id: 8,
    title: "Architecture Concepts",
    icon: "⚙",
    iconBg: "#7f1d1d",
    iconColor: "#fca5a5",
    borderColor: "#991b1b",
    tagColor: "#fca5a5",
    tagBg: "rgba(127,29,29,0.2)",
    tagBorder: "rgba(127,29,29,0.3)",
    skills: ["MVC", "REST", "SOLID Principles", "CI/CD", "Event-Driven", "System Design","Scrum"],
  },
];

const proficiencies = [
  { name: "JavaScript / TS", level: 90, color: "#F7DF1E" },
  { name: "React.js", level: 50, color: "#61DAFB" },
  { name: "Node.js", level: 85, color: "#339933" },
  { name: "PostgreSQL", level: 60, color: "#4169E1" },
  { name: "Docker / AWS", level: 50, color: "#FF9900" },
];



const ProgressBar: React.FC<{ item: any, index: number }> = ({ item, index }) => (
  <div className="space-y-3 w-full">
    <div className="flex justify-between items-end">
      <span className="text-sm font-bold tracking-widest text-text-primary uppercase">{item.name}</span>
      <span className="text-xs font-mono text-pink-500">{item.level}%</span>
    </div>
    <div className="h-1.5 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden border border-black/10 dark:border-white/5">
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
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="skills" className="relative min-h-screen bg-bg-primary text-text-primary overflow-hidden py-20 px-6">
      
      {/* 🌌 CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full tech-bg-glow" />
        <div className="absolute inset-0 tech-bg-grid bg-[size:50px_50px] opacity-10" />
        
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

        {/* Categorized Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-20">
          {skillsData.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHovered(category.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative p-6 rounded-xl transition-all duration-300 border backdrop-blur-sm group"
              style={{
                background: hovered === category.id ? "var(--color-bg-secondary)" : "var(--color-bg-elevated)",
                borderColor: hovered === category.id ? category.borderColor : "var(--color-border-main)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: category.iconBg, color: category.iconColor }}
                  >
                    {category.icon}
                  </div>
                  <span className="text-text-primary text-base font-semibold tracking-wide">
                    {category.title}
                  </span>
                </div>
                <span className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-[10px] text-text-secondary font-bold border border-black/10 dark:border-white/5">
                  {category.skills.length}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wider border transition-colors"
                    style={{
                      borderColor: category.tagBorder,
                      background: category.tagBg,
                      color: category.tagColor,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
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
