import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SkillWord = ({ children, progress, range, isMobile }) => {
  const opacity = useTransform(progress, range, [0.4, 1]);
  return (
    <motion.span 
      style={{ 
        opacity: isMobile ? 1 : opacity, 
        display: 'inline-block', 
        marginRight: '2.5rem', 
        marginBottom: '1rem',
        color: '#ffffff'
      }}
    >
      {children}
    </motion.span>
  );
};

const techLogos = [
  { name: "React", color: "#61DAFB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", delay: 0 },
  { name: "Next.js", color: "#ffffff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", delay: 0.5 },
  { name: "TypeScript", color: "#3178C6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", delay: 1 },
  { name: "Node.js", color: "#339933", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", delay: 0.3 },
  { name: "Tailwind", color: "#06B6D4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", delay: 0.8 },
  { name: "Figma", color: "#F24E1E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", delay: 0.2 },
  { name: "JavaScript", color: "#F7DF1E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", delay: 0.6 },
  { name: "Python", color: "#3776AB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", delay: 0.9 },
  { name: "Git", color: "#F05032", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", delay: 0.4 },
];

const SkillsSection = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const skills = [
    "REACT.JS", "NEXT.JS", "TYPESCRIPT",
    "NODE.JS", "TAILWIND", "THREE.JS",
    "FRAMER", "FIGMA", "UI/UX"
  ];

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section id="skills" className="skills-section" ref={containerRef}>
      <div className="skills-sticky">

        {/* Left: scrolling skills text */}
        <div className="skills-left">
          <h2 className="skills-heading">My Arsenal.</h2>

          <div className="skills-mask-wrapper">
            <motion.div className="skills-text-container" style={{ y: isMobile ? 0 : y }}>
              {skills.map((skill, i) => {
                const step = 1 / skills.length;
                return (
                  <SkillWord key={i} progress={scrollYProgress} range={[i * step, (i + 1) * step]} isMobile={isMobile}>
                    {skill}
                  </SkillWord>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Right: ABSOLUTELY positioned floating logos — completely independent of left scroll */}
        <div className="skills-logos-panel">
          <div className="floating-logos-grid">
            {techLogos.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="floating-logo-item"
                animate={{ y: [0, -12, 0], rotate: [0, i % 2 === 0 ? 4 : -4, 0] }}
                transition={{ duration: 3 + (i * 0.3), repeat: Infinity, ease: "easeInOut", delay: tech.delay }}
                whileHover={{ scale: 1.15, rotate: 0 }}
              >
                <div
                  className="floating-logo-card"
                  style={{
                    boxShadow: `0 0 20px ${tech.color}22, 0 8px 30px rgba(0,0,0,0.5)`,
                    border: `1px solid ${tech.color}44`
                  }}
                >
                  <img src={tech.icon} alt={tech.name} className="floating-logo-img" />
                </div>
                <span className="floating-logo-label">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
