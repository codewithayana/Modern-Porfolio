import React, { useEffect, useRef, useState } from "react";
import "./Certifications.css";

const certification = {
  id: "cert-1",
  name: "Full-Stack Web Development",
  issuer: "Sample Organization",
  issuerIcon: "🎓",
  date: "2024",
  // TODO: Replace with the actual path to your certificate image (e.g., "/images/my-certificate.png")
  image: "", 
  description: "Comprehensive training and hands-on experience in modern web development technologies including React, Node.js, Express, and database management. Successfully completed all coursework and final capstone projects.",
  link: "#" // Optional: Link to verify the certificate
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
          <div className="cert-title">Certification</div>
          <div className="cert-subtitle">Verified Skill Achievement</div>
        </div>

        <div className={`cert-featured-card ${visible ? "visible" : ""}`} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}>
          
          <div className="cert-image-container">
            {certification.image ? (
              <img src={certification.image} alt={certification.name} className="cert-image" />
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
                  Verify
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
