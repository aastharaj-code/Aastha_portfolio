import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
import AboutSection from './AboutSection';
import ImpactSection from './ImpactSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';

function App() {
  const nameLetters = "AASTHA RAJ".split("");
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ visibility: loaded ? 'visible' : 'hidden' }}
      >
      {/* Header */}
      <header>
        <div className="logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 30L20 10L30 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 20H25" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <nav className="pill-nav">
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="btn btn-primary">Start a project</a>
      </header>



      {/* Main Hero Section */}
      <main className="hero">
        {/* Social Sidebar Left */}
        <aside className="social-sidebar">
          <a href="#" className="social-icon" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
          <a href="#" className="social-icon" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
        </aside>

        <div className="hero-content">
          <h2 className="subtitle">UX/UI & WEB DEVELOPMENT</h2>
          <h1 className="title" style={{ display: 'flex', justifyContent: 'center' }}>
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                drag
                dragMomentum={false}
                whileHover={{ scale: 1.1, color: 'var(--accent-teal)', cursor: 'grab' }}
                whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
                style={{ display: 'inline-block', whiteSpace: 'pre', zIndex: 50 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
          <p className="description">
            I design clear, functional, and memorable experiences. From visual identity to user interface, I help you build a meaningful digital presence.
          </p>
          <a href="#contact" className="btn btn-primary btn-glow">Start a project</a>
        </div>
      </main>
      
      <ImpactSection />
      
      <AboutSection />
      
      <SkillsSection />
      
      <ProjectsSection />

      <ContactSection />

      <FooterSection />

        {/* Back to top button */}
        <a href="#" className="back-to-top" aria-label="Back to top">
          <i className="fa-solid fa-chevron-up"></i>
        </a>
      </motion.div>
    </>
  );
}

export default App;
