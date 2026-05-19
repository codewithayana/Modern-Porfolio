import React from "react";
import "./Achievements.css"; // Reuse the map styles

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
    <section id="achievements" className="ach-shell">
      <h2 className="sr-only" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}>
        Achievements map section
      </h2>

      <h1 className="reveal-item" style={{ fontSize: "3rem", textAlign: "center", marginBottom: "60px", fontWeight: 800, background: "linear-gradient(90deg, #ff0080, #ff8c00, #6a00ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Achievements
      </h1>

      <div className="ach-map-area reveal-item" style={{ maxWidth: "800px" }}>
        <svg className="ach-map-svg" viewBox="0 0 700 360" height="360" xmlns="http://www.w3.org/2000/svg">
          {/* Dashed ghost path */}
          <path
            d="M 80 60 C 80 160, 260 140, 260 240 C 260 140, 440 140, 440 60 C 440 160, 620 140, 620 240"
            stroke="rgba(176,106,255,0.1)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5 5"
          />

          {/* Animated draw path */}
          <path
            d="M 80 60 C 80 160, 260 140, 260 240 C 260 140, 440 140, 440 60 C 440 160, 620 140, 620 240"
            stroke="rgba(176,106,255,0.45)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            style={{ animation: "drawPath 2.5s .3s cubic-bezier(.4,0,.2,1) forwards" }}
          />

          {/* NODE 1 */}
          <g className="ach-node-ring" style={{ "--nd": ".8s" } as React.CSSProperties}>
            <circle cx="80" cy="60" r="8" fill="#07030f" stroke="#b06aff" strokeWidth="1.5" opacity=".9" />
            <circle cx="80" cy="60" r="3.5" fill="#b06aff" className="ach-node-core" style={{ "--nd": ".8s" } as React.CSSProperties} />
          </g>
          {/* Card 1 */}
          <foreignObject x="98" y="18" width="210" height="88" style={{ animation: "riseUp .5s .85s ease both", opacity: 0, animationFillMode: "forwards" }}>
            <div className="ach-card" style={{ "--ac": "#b06aff", "--ab": "rgba(176,106,255,.1)", "--ld": ".85s", "--bd": "1.1s" } as React.CSSProperties}>
              <div className="ach-card-top">
                <p className="ach-card-deg">{achievements[0].title}</p>
                <span className="ach-card-yr" style={{ "--ac": "#b06aff", "--ab": "rgba(176,106,255,.1)" } as React.CSSProperties}>{achievements[0].icon}</span>
              </div>
              <p className="ach-card-school">{achievements[0].desc}</p>
              <div className="ach-card-bar">
                <div className="ach-card-fill" style={{ "--ac": "#b06aff", "--bd": "1.1s", width: "100%" } as React.CSSProperties}></div>
              </div>
              <span className="ach-card-ghost">01</span>
            </div>
          </foreignObject>

          {/* NODE 2 */}
          <g className="ach-node-ring" style={{ "--nd": "1.4s" } as React.CSSProperties}>
            <circle cx="260" cy="240" r="8" fill="#07030f" stroke="#ff6eb4" strokeWidth="1.5" opacity=".9" />
            <circle cx="260" cy="240" r="3.5" fill="#ff6eb4" className="ach-node-core" style={{ "--nd": "1.4s" } as React.CSSProperties} />
          </g>
          {/* Card 2 */}
          <foreignObject x="50" y="256" width="210" height="85" style={{ animation: "riseUp .5s 1.45s ease both", opacity: 0, animationFillMode: "forwards" }}>
            <div className="ach-card" style={{ "--ac": "#ff6eb4", "--ab": "rgba(255,110,180,.1)", "--ld": "1.45s", "--bd": "1.7s" } as React.CSSProperties}>
              <div className="ach-card-top">
                <p className="ach-card-deg">{achievements[1].title}</p>
                <span className="ach-card-yr" style={{ "--ac": "#ff6eb4", "--ab": "rgba(255,110,180,.1)" } as React.CSSProperties}>{achievements[1].icon}</span>
              </div>
              <p className="ach-card-school">{achievements[1].desc}</p>
              <div className="ach-card-bar">
                <div className="ach-card-fill" style={{ "--ac": "#ff6eb4", "--bd": "1.7s", width: "100%" } as React.CSSProperties}></div>
              </div>
              <span className="ach-card-ghost">02</span>
            </div>
          </foreignObject>

          {/* NODE 3 */}
          <g className="ach-node-ring" style={{ "--nd": "1.1s" } as React.CSSProperties}>
            <circle cx="440" cy="60" r="8" fill="#07030f" stroke="#ff9a3c" strokeWidth="1.5" opacity=".9" />
            <circle cx="440" cy="60" r="3.5" fill="#ff9a3c" className="ach-node-core" style={{ "--nd": "1.1s" } as React.CSSProperties} />
          </g>
          {/* Card 3 */}
          <foreignObject x="458" y="18" width="210" height="85" style={{ animation: "riseUp .5s 1.15s ease both", opacity: 0, animationFillMode: "forwards" }}>
            <div className="ach-card" style={{ "--ac": "#ff9a3c", "--ab": "rgba(255,154,60,.1)", "--ld": "1.15s", "--bd": "1.4s" } as React.CSSProperties}>
              <div className="ach-card-top">
                <p className="ach-card-deg">{achievements[2].title}</p>
                <span className="ach-card-yr" style={{ "--ac": "#ff9a3c", "--ab": "rgba(255,154,60,.1)" } as React.CSSProperties}>{achievements[2].icon}</span>
              </div>
              <p className="ach-card-school">{achievements[2].desc}</p>
              <div className="ach-card-bar">
                <div className="ach-card-fill" style={{ "--ac": "#ff9a3c", "--bd": "1.4s", width: "100%" } as React.CSSProperties}></div>
              </div>
              <span className="ach-card-ghost">03</span>
            </div>
          </foreignObject>

          {/* NODE 4 */}
          <g className="ach-node-ring" style={{ "--nd": "1.7s" } as React.CSSProperties}>
            <circle cx="620" cy="240" r="8" fill="#07030f" stroke="#00f0ff" strokeWidth="1.5" opacity=".9" />
            <circle cx="620" cy="240" r="3.5" fill="#00f0ff" className="ach-node-core" style={{ "--nd": "1.7s" } as React.CSSProperties} />
          </g>
          {/* Card 4 */}
          <foreignObject x="410" y="256" width="210" height="85" style={{ animation: "riseUp .5s 1.75s ease both", opacity: 0, animationFillMode: "forwards" }}>
            <div className="ach-card" style={{ "--ac": "#00f0ff", "--ab": "rgba(0,240,255,.1)", "--ld": "1.75s", "--bd": "2s" } as React.CSSProperties}>
              <div className="ach-card-top">
                <p className="ach-card-deg">{achievements[3].title}</p>
                <span className="ach-card-yr" style={{ "--ac": "#00f0ff", "--ab": "rgba(0,240,255,.1)" } as React.CSSProperties}>{achievements[3].icon}</span>
              </div>
              <p className="ach-card-school">{achievements[3].desc}</p>
              <div className="ach-card-bar">
                <div className="ach-card-fill" style={{ "--ac": "#00f0ff", "--bd": "2s", width: "100%" } as React.CSSProperties}></div>
              </div>
              <span className="ach-card-ghost">04</span>
            </div>
          </foreignObject>

          {/* Connector lines from node to card */}
          <line x1="88" y1="60" x2="98" y2="60" stroke="rgba(176,106,255,0.3)" strokeWidth=".5" strokeDasharray="3 2" />
          <line x1="260" y1="248" x2="260" y2="256" stroke="rgba(255,110,180,0.3)" strokeWidth=".5" strokeDasharray="3 2" />
          <line x1="448" y1="60" x2="458" y2="60" stroke="rgba(255,154,60,0.3)" strokeWidth=".5" strokeDasharray="3 2" />
          <line x1="620" y1="248" x2="620" y2="256" stroke="rgba(0,240,255,0.3)" strokeWidth=".5" strokeDasharray="3 2" />
        </svg>
      </div>
    </section>
  );
};

export default Achievements;
