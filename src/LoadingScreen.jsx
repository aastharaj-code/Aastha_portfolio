import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

/* ─────────────────────────────────────────────
   Cinematic Loading Screen for Aastha Raj
   Timeline:
     0.0s  — screen appears, counter starts
     0.3s  — first name letters stagger in
     1.4s  — last name letters stagger in
     2.2s  — role tag fades in
     2.8s  — progress bar sweeps across
     3.8s  — counter hits 100
     4.0s  — giant curtain wipes UP revealing the site
   ───────────────────────────────────────────── */

const FIRST = "AASTHA";
const LAST  = "RAJ";
const TOTAL_MS = 4200; // total loading time before exit

const LoadingScreen = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase]     = useState('loading'); // 'loading' | 'exiting'

  /* ── Smooth spring counter ── */
  useEffect(() => {
    let start = null;
    const duration = 3400;
    const tick = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounter(Math.floor(eased * 100));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  /* ── Trigger exit after full duration ── */
  useEffect(() => {
    const t = setTimeout(() => setPhase('exiting'), TOTAL_MS - 600);
    return () => clearTimeout(t);
  }, []);

  /* ── Notify parent after curtain fully gone ── */
  useEffect(() => {
    if (phase === 'exiting') {
      const t = setTimeout(onComplete, 900);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  /* ── Letter stagger helper ── */
  const letterVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.07,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  /* ── Last-name letters (stagger after first name) ── */
  const lastVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 1.0 + i * 0.08,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="loader-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }} // exit is handled by child curtain
          key="loader"
        >
          {/* ── Noise texture overlay ── */}
          <div className="loader-noise" />

          {/* ── Subtle radial glow ── */}
          <div className="loader-glow" />

          {/* ── Thin top progress line ── */}
          <motion.div
            className="loader-progress-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.6, ease: 'easeInOut', delay: 0.2 }}
          />

          {/* ── Main central content ── */}
          <div className="loader-center">

            {/* Small eyebrow */}
            <motion.div
              className="loader-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Portfolio · {new Date().getFullYear()}
            </motion.div>

            {/* First name — stagger letters */}
            <div className="loader-name-row">
              <div className="loader-name-overflow">
                {FIRST.split('').map((char, i) => (
                  <motion.span
                    key={`f-${i}`}
                    className="loader-letter"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={letterVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Last name — italic hollow style, stagger after first */}
            <div className="loader-name-row loader-name-italic">
              <div className="loader-name-overflow">
                {LAST.split('').map((char, i) => (
                  <motion.span
                    key={`l-${i}`}
                    className="loader-letter loader-letter-hollow"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={lastVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Role tag */}
            <motion.div
              className="loader-role"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.7, ease: 'easeOut' }}
            >
              <span className="loader-role-dot" />
              UX/UI Designer & Web Developer
            </motion.div>
          </div>

          {/* ── Counter bottom-right ── */}
          <div className="loader-counter">
            <span className="loader-counter-num">{String(counter).padStart(2, '0')}</span>
            <span className="loader-counter-pct">%</span>
          </div>

          {/* ── Bottom tagline ── */}
          <motion.div
            className="loader-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            Crafting digital experiences that leave a mark.
          </motion.div>

          {/* ── EXIT CURTAIN: two panels wipe up ── */}
          <AnimatePresence>
            {phase === 'exiting' && (
              <>
                <motion.div
                  className="loader-curtain loader-curtain-left"
                  initial={{ scaleY: 1, originY: 0 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.div
                  className="loader-curtain loader-curtain-right"
                  initial={{ scaleY: 1, originY: 0 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.06 }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
