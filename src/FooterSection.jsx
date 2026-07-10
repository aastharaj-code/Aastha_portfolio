import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const FooterSection = () => {
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Draggable text position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring for custom cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 200, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 25 });

  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setBounds({ width: rect.width, height: rect.height });
      }
      setIsMobile(window.innerWidth < 768);
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    }
  };

  const year = new Date().getFullYear();

  const socialLinks = [
    { label: 'Mail', href: 'mailto:aastha@example.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aastha-raj-9b25083a6' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'GitHub', href: 'https://github.com' },
  ];

  return (
    <footer
      id="footer"
      className="site-footer"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorVisible(true)}
      onMouseLeave={() => setCursorVisible(false)}
    >
      {/* Custom cursor blob that follows mouse */}
      <motion.div
        className="footer-cursor-blob"
        style={{
          x: springX,
          y: springY,
          opacity: cursorVisible ? 1 : 0,
        }}
      />

      {/* Top separator line */}
      <div className="footer-top-line" />

      {/* Draggable hero text — user can drag it anywhere */}
      <div className="footer-drag-arena">
        <motion.div
          className="footer-drag-text"
          drag={!isMobile}
          dragMomentum={true}
          dragElastic={0.12}
          dragConstraints={containerRef}
          style={{ x: isMobile ? 0 : x, y: isMobile ? 0 : y, cursor: isMobile ? 'default' : 'grab' }}
          whileDrag={{ cursor: 'grabbing', scale: 0.97 }}
          whileHover={isMobile ? {} : { scale: 1.02 }}
          title={isMobile ? undefined : "Drag me anywhere!"}
        >
          {!isMobile && <span className="footer-drag-label">drag me</span>}
          <h2 className="footer-big-text">
            Let's Create<br />
            <em>Something.</em>
          </h2>
        </motion.div>

        {/* Floating hint that fades out */}
        <div className="footer-drag-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
            <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>
          </svg>
          <span>Drag freely</span>
        </div>
      </div>

      {/* Bottom footer bar */}
      <div className="footer-bottom-bar">
        {/* Left: brand */}
        <div className="footer-brand">
          <div className="footer-brand-name">Aastha Raj</div>
          <div className="footer-brand-tagline">UX/UI & Web Developer</div>
        </div>

        {/* Center: social links */}
        <nav className="footer-social-nav" aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="footer-social-link"
            >
              <span className="footer-social-text">{link.label}</span>
              <span className="footer-social-arrow">↗</span>
            </a>
          ))}
        </nav>

        {/* Right: copyright */}
        <div className="footer-copy">
          <span>© {year}</span>
          <span className="footer-copy-dot">·</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
