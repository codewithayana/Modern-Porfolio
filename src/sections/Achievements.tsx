import React from "react";
import { useState } from "react";
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
  },
  {
    title: "Pull Shark",  
    desc: "Merged PRs on GitHub",
    icon: "🦈",
  },
  {
    title: "50 Days Badge",
    desc: "Consistency achievement",
    icon: "🏅",
  },
];

const Achievements: React.FC = () => {

  const [selected, setSelected] = useState<any>(null); // ✅ ADD HERE

  return (
    <section id="achievements" className="ach-section reveal">
      <h1 className="ach-title reveal-item">Achievements</h1>

      <div className="timeline">
        {achievements.map((item, i) => (
          <div className="timeline-item reveal-item" key={i}>
            <div className="timeline-dot"></div>

            {/* ✅ ADD onClick here */}
            <div
              className="timeline-card"
              onClick={() => setSelected(item)}
            >
              <div className="icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ ADD MODAL HERE (inside return, but after timeline) */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.badge} alt="badge" className="modal-badge" />
            <h2>{selected.title}</h2>
            <p>{selected.desc}</p>

            <button
              className="close-btn"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

export default Achievements;
