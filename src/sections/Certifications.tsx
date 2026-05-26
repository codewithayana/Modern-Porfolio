import React, { useEffect, useRef, useState } from "react";
import "./Certifications.css";

const certification = {
  id: "cert-1",
  name: "Full-Stack Web Development Bootcamp",
  issuer: "Gseven Technologies",
  issuerIcon: "🎓",
  date: "2026",
  image: "/certificates/bootcamp.pdf", 
  description: "Successfully completed a Web Developer Bootcamp at gseven Technologies, gaining hands-on experience in modern web development and real-world project building.",
  link: "/certificates/bootcamp.pdf" 
};

export default function Certifications() {
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal animation
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="certifications" id="certifications">
      <div className="cert-wrap" ref={wrapRef}>
        <div className="cert-header">
          <div className="cert-title">Certifications</div>
          <div className="cert-subtitle">Verified Skill Achievement</div>
        </div>

        <div className={`cert-featured-card ${visible ? "visible" : ""}`} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}>
          
          <div className="cert-image-container">
            {certification.image ? (
              certification.image.endsWith('.pdf') ? (
                <iframe src={`${certification.image}#toolbar=0`} title={certification.name} className="cert-image" style={{ width: "100%", height: "100%", border: "none", overflow: "hidden" }} />
              ) : (
                <img src={certification.image} alt={certification.name} className="cert-image" />
              )
            ) : (
              <div className="cert-image-placeholder">
                <span>📄</span>
                <p>Certificate Image</p>
                <p style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: "10px" }}>Add your image path in Certifications.tsx</p>
              </div>
            )}
          </div>

          <div className="cert-content">
            <h3 className="cert-name">{certification.name}</h3>
            
            <div className="cert-issuer">
              <span>{certification.issuerIcon}</span>
              {certification.issuer}
            </div>
            
            <p className="cert-description">{certification.description}</p>
            
            <div className="cert-meta">
              <span className="cert-date">{certification.date}</span>
              {certification.link && certification.link !== "#" && (
                <a href={certification.link} target="_blank" rel="noreferrer" className="cert-btn">
                  View Certificate
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
