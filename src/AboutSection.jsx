import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cards = [
  {
    id: 1,
    title: "Fullstack",
    subtitle: "DEVELOPER",
    desc: "Robust architecture & scalable systems.",
    gradient: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
    icon: "fa-solid fa-layer-group",
    num: "01"
  },
  {
    id: 2,
    title: "Vibe",
    subtitle: "CODE",
    desc: "Flawless animations & aesthetics.",
    gradient: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)",
    icon: "fa-solid fa-wand-magic-sparkles",
    num: "02"
  },
  {
    id: 3,
    title: "Prompt",
    subtitle: "ENGINEERING",
    desc: "AI-driven solutions & workflows.",
    gradient: "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)",
    icon: "fa-solid fa-brain",
    num: "03"
  },
  {
    id: 4,
    title: "UI/UX",
    subtitle: "DESIGN",
    desc: "Pixel-perfect, user-centric interfaces.",
    gradient: "linear-gradient(135deg, #1fa2ff 0%, #12d8fa 100%, #a6ffcb 100%)",
    icon: "fa-solid fa-bezier-curve",
    num: "04"
  }
];

const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const activeCard = cards[activeIndex];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 150 : -150,
      rotateY: dir > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -150 : 150,
      rotateY: dir > 0 ? -45 : 45,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="about" className="about-creative-section">
      <div className="about-creative-container">
        
        {/* Left Side: Text Content */}
        <div className="about-creative-text">
          <div className="status-indicator">
            <span className="dot"></span>
            <span className="status-text">Available for work</span>
          </div>

          <div style={{ marginTop: '2.5rem', marginBottom: '-1.5rem', fontFamily: 'var(--font-heading)', fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent-teal)', fontWeight: '700' }}>
            About Me
          </div>

          <h2 className="creative-heading">
            <span className="cursive-text">Hey,</span> I'm Aastha.
          </h2>

          <p className="creative-paragraph">
            I'm a multidisciplinary Fullstack Developer and UI/UX Designer with over 1 years of experience creating robust, scalable, and visually stunning digital experiences. My work is grounded in clean architecture, pixel-perfect design, and a deep understanding of user psychology.
          </p>
          
          <p className="creative-paragraph" style={{ fontStyle: 'italic', color: 'var(--text-primary)', fontWeight: 400 }}>
            Independent by nature, collaborative by choice.
          </p>

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">1+</span>
              <span className="stat-label">years of experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">successful projects</span>
            </div>
          </div>

          <a href="#contact" className="creative-link" style={{ marginTop: '1rem' }}>
            Let's Collaborate
            <motion.i 
              className="fa-solid fa-asterisk spinner-icon"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            ></motion.i>
          </a>
        </div>

        {/* Right Side: Premium Card Slider */}
        <div className="creative-cards-slider-container">
          <div className="slider-card-viewport">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeCard.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(e, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) {
                    handleNext();
                  } else if (info.offset.x > swipeThreshold) {
                    handlePrev();
                  }
                }}
                className="premium-about-card"
                style={{
                  background: activeCard.gradient
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Texture overlay */}
                <div className="card-noise"></div>
                
                {/* Top Header Row of the Card */}
                <div className="card-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
                  <div className="card-subtitle-box">
                    <span className="card-cat-number" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '2px', opacity: 0.6, display: 'block', marginBottom: '0.2rem' }}>CAPABILITY</span>
                    <span className="fc-subtitle" style={{ opacity: 0.9, letterSpacing: '1px', fontWeight: 600 }}>{activeCard.subtitle}</span>
                  </div>
                  <div className="card-num-indicator" style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', fontWeight: 'italic', opacity: 0.15, lineHeight: 1 }}>
                    {activeCard.num}
                  </div>
                </div>

                {/* Title */}
                <div className="card-title-box" style={{ zIndex: 2, margin: '2rem 0' }}>
                  <h3 className="fc-title" style={{ fontSize: '2.4rem', fontWeight: 700, margin: 0 }}>{activeCard.title}</h3>
                  <div className="card-decor-line" style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}></div>
                </div>

                {/* Bottom row: Icon and Description */}
                <div className="card-bottom-row" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', zIndex: 2 }}>
                  <div className="card-icon-wrapper">
                    <i className={activeCard.icon}></i>
                  </div>
                  <div className="fc-desc-box" style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 400, opacity: 0.95, lineHeight: 1.4 }}>{activeCard.desc}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls under the card */}
          <div className="slider-controls">
            <button 
              onClick={handlePrev} 
              className="slider-nav-btn" 
              aria-label="Previous card"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            
            <div className="slider-progress-container">
              <span className="active-num">0{activeIndex + 1}</span>
              <div className="slider-progress-track">
                <div 
                  className="slider-progress-bar" 
                  style={{ width: `${((activeIndex + 1) / cards.length) * 100}%` }}
                ></div>
              </div>
              <span>0{cards.length}</span>
            </div>

            <button 
              onClick={handleNext} 
              className="slider-nav-btn" 
              aria-label="Next card"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
