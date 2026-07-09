import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const InlineBadge = ({ imageSrc, hoverText, link, badgeWidth }) => {
  const [isHovered, setIsHovered] = useState(false);

  const badgeVariants = {
    hidden: { width: 0, opacity: 0, scale: 0, margin: "0 0px" },
    visible: {
      width: badgeWidth,
      opacity: 1,
      scale: 1,
      margin: window.innerWidth < 768 ? "0 6px" : "0 15px",
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 14
      }
    }
  };

  return (
    <motion.a 
      href={link}
      className="inline-badge"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={badgeVariants}
      style={{ display: 'inline-flex', verticalAlign: 'middle' }}
    >
      <div className="badge-inner">
        <motion.div 
          className="badge-image" 
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
        >
          <img src={imageSrc} alt={hoverText} />
        </motion.div>
        <motion.div 
          className="badge-text" 
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
        >
          {hoverText}
        </motion.div>
      </div>
    </motion.a>
  );
};

const ImpactSection = () => {
  const [badgeWidth, setBadgeWidth] = useState("160px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBadgeWidth("110px");
      } else {
        setBadgeWidth("160px");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Split sentence into words and badges
  const items = [
    { type: 'word', text: 'I' },
    { type: 'badge', badge: <InlineBadge imageSrc="/badge_about.png" hoverText="About" link="#about" badgeWidth={badgeWidth} /> },
    { type: 'word', text: 'create' },
    { type: 'word', text: 'living,' },
    { type: 'word', text: 'breathing' },
    { type: 'word', text: 'websites' },
    { type: 'word', text: 'for' },
    { type: 'word', text: 'brands' },
    { type: 'badge', badge: <InlineBadge imageSrc="/badge_work.png" hoverText="Work" link="#projects" badgeWidth={badgeWidth} /> },
    { type: 'word', text: 'that' },
    { type: 'word', text: 'want' },
    { type: 'word', text: 'to' },
    { type: 'word', text: 'be' },
    { type: 'word', text: 'felt,' },
    { type: 'word', text: 'not' },
    { type: 'word', text: 'just' },
    { type: 'word', text: 'seen.' }
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      }
    }
  };

  const wordVariants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="impact-section">
      {/* Background ambient blobs for aesthetic */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>
      <div className="ambient-blob blob-3"></div>

      <div className="impact-container">
        <motion.h2 
          className="impact-text"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: 'center', lineHeight: 1.4 }}
        >
          {items.map((item, index) => {
            if (item.type === 'word') {
              return (
                <span 
                  key={index} 
                  style={{ 
                    display: 'inline-block', 
                    overflow: 'hidden', 
                    marginRight: '0.24em',
                    verticalAlign: 'bottom',
                    paddingBottom: '0.04em'
                  }}
                >
                  <motion.span 
                    variants={wordVariants} 
                    style={{ display: 'inline-block' }}
                  >
                    {item.text}
                  </motion.span>
                </span>
              );
            } else {
              return (
                <span key={index} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  {item.badge}
                </span>
              );
            }
          })}
        </motion.h2>
      </div>
    </section>
  );
};

export default ImpactSection;
