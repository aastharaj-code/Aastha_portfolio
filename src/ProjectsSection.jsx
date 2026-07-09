import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PROJECTS = [
  {
    title: "BEST COFFEE ZONE",
    category: "Premium Cafe & E-Commerce",
    image: "/proj_coffee.png",
    color: "from-amber-700 to-amber-900",
    github: "https://github.com/aastha-raj/best-coffee-zone",
    live: "https://bestcoffeezone.netlify.app"
  },
  {
    title: "THE AURA FITNESS",
    category: "AI-Powered Gym & Fitness App",
    image: "/proj_gym.png",
    color: "from-cyan-500 to-blue-600",
    github: "https://github.com/aastha-raj/the-aura-fitness",
    live: "https://theaurafitness.netlify.app"
  }
];

// Reusable project card shared by both layouts
function ProjectCard({ project, imgY }) {
  return (
    <div className="project-card">
      <div className="project-card-image-wrapper">
        <motion.img
          style={imgY ? { y: imgY, scale: 1.2 } : { scale: 1.05 }}
          src={project.image}
          alt={project.title}
          className="project-card-img"
        />
        <div className="project-card-overlay" />

        {/* Hover Links Overlay */}
        <div className="project-card-actions">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn"
            onClick={(e) => e.stopPropagation()}
            aria-label="View GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn"
            onClick={(e) => e.stopPropagation()}
            aria-label="View Live Demo"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>

      <div className="project-card-content">
        <span className="project-card-category">{project.category}</span>
        <h3 className="project-card-name">{project.title}</h3>
      </div>
      
      <div className="project-card-glow-border" style={{ background: `linear-gradient(135deg, var(--accent-teal-glow), transparent 60%)` }}></div>
    </div>
  );
}

// Desktop: horizontal scroll experience
function DesktopProjects() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 95, mass: 0.18 });

  useEffect(() => {
    const updateRange = () => {
      if (cardsContainerRef.current && wrapperRef.current) {
        const scrollWidth = cardsContainerRef.current.scrollWidth;
        const clientWidth = wrapperRef.current.clientWidth;
        setScrollRange(Math.max(0, scrollWidth - clientWidth + 40));
      }
    };
    updateRange();
    window.addEventListener("resize", updateRange);
    const timer = setTimeout(updateRange, 600);
    return () => {
      window.removeEventListener("resize", updateRange);
      clearTimeout(timer);
    };
  }, []);

  const x = useTransform(smoothProgress, [0, 0.82], ["0px", `-${scrollRange}px`]);

  return (
    <section ref={containerRef} id="projects" className="projects-section">
      <div className="projects-sticky">
        <div className="projects-container">
          {/* Left Column: Sticky Title & Background Deco */}
          <div className="projects-left-col">
            
            {/* 3D Wireframe Octahedron SVG Decoration */}
            <motion.div 
              className="deco-octahedron"
              animate={{ rotateY: 360, rotateX: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              style={{ perspective: 600 }}
            >
              <svg width="240" height="240" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10 L25 50 L50 68 Z" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.8" />
                <path d="M50 10 L75 50 L50 68 Z" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.8" />
                <path d="M50 10 L25 50 L50 32 Z" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
                <path d="M50 10 L75 50 L50 32 Z" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
                <path d="M50 90 L25 50 L50 68 Z" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.8" />
                <path d="M50 90 L75 50 L50 68 Z" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.8" />
                <path d="M50 90 L25 50 L50 32 Z" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
                <path d="M50 90 L75 50 L50 32 Z" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
                <path d="M25 50 L50 68 L75 50 L50 32 Z" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.8" />
              </svg>
            </motion.div>

            {/* 3D Glossy Sphere Decoration */}
            <div className="deco-sphere">
              <div className="sphere-inner"></div>
              <div className="sphere-glow"></div>
              <div className="sphere-highlight"></div>
            </div>

            <div className="projects-header-info">
              <span className="projects-subtitle-badge">Selected Works</span>
              <h2 className="projects-title-main">
                CRAFTING <br /> DIGITAL <br /> ARTIFACTS
              </h2>
              <div className="projects-title-line" />
            </div>
          </div>

          {/* Right Column: Horizontal Cards Scroll Container */}
          <div className="projects-right-col" ref={wrapperRef}>
            <motion.div style={{ x }} ref={cardsContainerRef} className="projects-cards-container">
              {PROJECTS.map((project, i) => {
                const imgY = useTransform(smoothProgress, [0, 0.82], ["-10%", "10%"]);
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProjectCard project={project} imgY={imgY} />
                  </motion.div>
                );
              })}

              <div className="view-all-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4rem' }}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-view-all"
                  onClick={() => window.open("https://github.com/aastha-raj", "_blank")}
                >
                  VIEW ALL ON GITHUB
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mobile: vertical scrolling grid
function MobileProjects() {
  return (
    <section id="projects" className="projects-section" style={{ padding: '5rem 0' }}>
      <div className="projects-container" style={{ gridTemplateColumns: '1fr', gap: '3rem', padding: '0 6%' }}>
        <div className="projects-left-col" style={{ textAlign: 'center' }}>
          <span className="projects-subtitle-badge">Selected Works</span>
          <h2 className="projects-title-main">
            CRAFTING <br /> DIGITAL <br /> ARTIFACTS
          </h2>
          <div className="projects-title-line" style={{ margin: '0 auto' }} />
        </div>

        <div className="projects-cards-container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <button 
            className="btn-view-all"
            onClick={() => window.open("https://github.com/aastha-raj", "_blank")}
          >
            VIEW ALL ON GITHUB
          </button>
        </div>
      </div>
    </section>
  );
}

export default function ProjectsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <MobileProjects /> : <DesktopProjects />;
}
