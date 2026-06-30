import React from "react";
import "./Education.css"; // Reuse the timeline styles
import { education } from "../data/education";

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="edu-section">
      <h1 className="edu-title reveal-item" style={{ background: "linear-gradient(90deg, #b06aff, #ff6eb4, #ff9a3c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Educations</h1>

      <div className="timeline">
        {education.map((item, i) => (
          <div className="timeline-item reveal-item" key={i}>
            <div className="timeline-dot" style={{ background: "#b06aff", boxShadow: "0 0 12px #b06aff, 0 0 25px #b06aff" }}></div>

            <div className="timeline-card" style={{ borderColor: "rgba(176,106,255,0.2)" }}>
              <div className="timeline-card-main">
                <div className="icon">🎓</div>
                <div>
                  <h3 className="text-text-primary text-lg font-bold">{item.degree}</h3>
                  <p className="text-text-secondary mt-1">
                    {item.institution} <br/> 
                    <span className="text-pink-500 text-xs font-medium">{item.period}</span> 
                    {item.score && <span className="text-orange-500 text-xs font-medium"> • Score: {item.score}</span>}
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
