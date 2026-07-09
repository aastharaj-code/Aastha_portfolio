import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
import AboutSection from './AboutSection';
import ImpactSection from './ImpactSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';

function App() {
  const firstNameLetters = "AASTHA".split("");
  const lastNameLetters = "RAJ".split("");
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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

        <a href="#contact" className="btn btn-primary start-project-desktop">Start a project</a>

        {/* Hamburger Menu Button */}
        <button
          className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="hamburger-line line-1"></div>
          <div className="hamburger-line line-2"></div>
          <div className="hamburger-line line-3"></div>
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav 
              className="mobile-nav-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-nav-links">
                {[
                  { label: "Projects", href: "#projects" },
                  { label: "Services", href: "#skills" },
                  { label: "About", href: "#about" },
                  { label: "Contact", href: "#contact" }
                ].map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  className="btn btn-primary"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + 4 * 0.08 }}
                  style={{ marginTop: '2rem' }}
                >
                  Start a project
                </motion.a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>



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
          <h1 className="title" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '1.5rem', rowGap: '0.5rem' }}>
            <span style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
              {firstNameLetters.map((char, index) => (
                <motion.span
                  key={`first-${index}`}
                  drag
                  dragMomentum={false}
                  whileHover={{ scale: 1.1, color: 'var(--accent-teal)', cursor: 'grab' }}
                  whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
                  style={{ display: 'inline-block', zIndex: 50 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
              {lastNameLetters.map((char, index) => (
                <motion.span
                  key={`last-${index}`}
                  drag
                  dragMomentum={false}
                  whileHover={{ scale: 1.1, color: 'var(--accent-teal)', cursor: 'grab' }}
                  whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
                  style={{ display: 'inline-block', zIndex: 50 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
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
