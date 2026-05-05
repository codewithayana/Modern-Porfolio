import React from "react";
import "./Achievements.css";


const achievements = [
  {
    title: "LeetCode 75",
    desc: "Completed 75 problem challenge",
    icon: "💻",
    badge: "/badges/leetcode75.png",
  },
  {
    title: "SQL 50",
    desc: "Mastered SQL challenges",
    icon: "💾",
    badge: "/badges/sql50.png",
  },
  {
    title: "Pull Shark",  
    desc: "Merged PRs on GitHub",
    icon: "🦈",
    badge: "/badges/pull-shark.png",
  },
  {
    title: "50 Days Badge",
    desc: "Consistency achievement",
    icon: "🏅",
    badge: "/badges/50-days.png",
  },
];

const Achievements: React.FC = () => {


  return (
    <section id="achievements" className="ach-section reveal">
      <h1 className="ach-title reveal-item">Achievements</h1>

      <div className="timeline">
        {achievements.map((item, i) => (
          <div className="timeline-item reveal-item" key={i}>
            <div className="timeline-dot"></div>

            <div className="timeline-card">
              <div className="timeline-card-main">
                <div className="icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
              
              {item.badge && (
                <div className="timeline-badge-mini">
                  <img src={item.badge} alt="badge" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
