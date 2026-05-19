import React from "react";
import "./Education.css"; // Reuse the timeline styles
import { education } from "./education";

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="edu-section">
      <h1 className="edu-title reveal-item" style={{ background: "linear-gradient(90deg, #b06aff, #ff6eb4, #ff9a3c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Education</h1>

      <div className="timeline">
        {education.map((item, i) => (
          <div className="timeline-item reveal-item" key={i}>
            <div className="timeline-dot" style={{ background: "#b06aff", boxShadow: "0 0 12px #b06aff, 0 0 25px #b06aff" }}></div>

            <div className="timeline-card" style={{ borderColor: "rgba(176,106,255,0.2)" }}>
              <div className="timeline-card-main">
                <div className="icon">🎓</div>
                <div>
                  <h3 style={{ color: "#ede0ff" }}>{item.degree}</h3>
                  <p style={{ color: "#aaa" }}>
                    {item.institution} <br/> 
                    <span style={{ color: "#ff6eb4", fontSize: "0.8rem" }}>{item.period}</span> 
                    {item.score && <span style={{ color: "#ff9a3c", fontSize: "0.8rem" }}> • Score: {item.score}</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
