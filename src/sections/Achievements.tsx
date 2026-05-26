import React, { useEffect, useRef, useState } from "react";
import './Achievements.css';

const badges = [
  {
    name: "LeetCode 75", desc: "Completed 75-problem challenge",
    tag: "Algo", icon: "💻", acc: "#7F77DD", tagBg: "rgba(127,119,221,0.12)", stroke: "#534AB7",
  },
  {
    name: "SQL 50", desc: "Mastered SQL challenges",
    tag: "Database", icon: "🗄️", acc: "#378ADD", tagBg: "rgba(55,138,221,0.12)", stroke: "#185FA5",
  },
  {
    name: "50 Days Badge", desc: "Consistency achievement",
    tag: "Streak", icon: "🏅", acc: "#EF9F27", tagBg: "rgba(239,159,39,0.12)", stroke: "#854F0B",
  },
  {
    name: "Pull Shark", desc: "Merged PRs on GitHub",
    tag: "GitHub", icon: "🦈", acc: "#1D9E75", tagBg: "rgba(29,158,117,0.12)", stroke: "#0F6E56",
  },
  {
    name: "YOLO", desc: "Merged PR without review",
    tag: "Bold", icon: "🚀", acc: "#E24B4A", tagBg: "rgba(226,75,74,0.12)", stroke: "#A32D2D",
  },
  {
    name: "Quickdraw", desc: "Closed issue within 5 mins",
    tag: "Speed", icon: "⚡", acc: "#EF9F27", tagBg: "rgba(239,159,39,0.12)", stroke: "#854F0B",
  },
  {
    name: "Pair Extraordinaire", desc: "Co-authored commits",
    tag: "Collab", icon: "🤝", acc: "#D4537E", tagBg: "rgba(212,83,126,0.12)", stroke: "#993556",
  },
  {
    name: "Starstruck", desc: "Created a starred repository",
    tag: "Open Source", icon: "⭐", acc: "#EF9F27", tagBg: "rgba(239,159,39,0.12)", stroke: "#854F0B",
  },
];



function BadgeCard({ badge, index, wrapRef }: any) {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + index * 90);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`badge-card${visible ? " visible" : ""}`}
      style={{
        "--acc": badge.acc,
        "--tag-bg": badge.tagBg,
        "--delay": `${0.15 + index * 0.09}s`,
      } as React.CSSProperties}
    >
  
      
      <div className="icon-box-cut">
        <span className="hex-icon">{badge.icon}</span>
        <span className="badge-num">{badge.id}</span>
      </div>
      <div className="badge-name">{badge.name}</div>
      <div className="badge-desc">{badge.desc}</div>
      <span className="badge-tag">{badge.tag}</span>
    </div>
  );
}

export default function Achievements() {
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <section className="achievements" id="achievements">
      <div className="ach-wrap" ref={wrapRef}>

        <div className="ach-header">
          <div>
            <div className="ach-title">Achievements</div>
            <div className="ach-subtitle">Unlocked milestones</div>
          </div>
        </div>

        <div className="badges-grid">
          {badges.map((badge, i) => (
            <BadgeCard
              badge={badge}
              index={i}
              wrapRef={wrapRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
