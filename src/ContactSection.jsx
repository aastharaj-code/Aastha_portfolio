import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const services = [
  "UI/UX Design",
  "Web Development",
  "Brand Identity",
  "Motion Design",
  "Full Stack App",
  "Consulting"
];

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: ''
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [focused, setFocused] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const toggleService = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      {/* Ambient background glow orbs */}
      <div className="contact-glow-1"></div>
      <div className="contact-glow-2"></div>

      <div className="contact-inner">
        <motion.div
          className="contact-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* ── LEFT COLUMN ── */}
          <div className="contact-left">
            <motion.div variants={itemVariants} className="contact-eyebrow">
              Let's Collaborate
            </motion.div>

            <motion.h2 variants={itemVariants} className="contact-heading">
              Have a project<br />
              <span className="contact-heading-italic">in mind?</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="contact-subtext">
              I'm currently available for freelance work and collaborations. Let's build something extraordinary together.
            </motion.p>

            {/* Availability badge */}
            <motion.div variants={itemVariants} className="availability-badge">
              <span className="avail-dot"></span>
              Available for new projects
            </motion.div>

            {/* Contact details */}
            <motion.div variants={itemVariants} className="contact-details">
              <a href="mailto:aastha@example.com" className="contact-detail-item">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="3"/>
                    <path d="m2 7 10 6 10-6"/>
                  </svg>
                </div>
                <div>
                  <div className="detail-label">Email</div>
                  <div className="detail-value">aastha@example.com</div>
                </div>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-detail-item">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <div>
                  <div className="detail-label">LinkedIn</div>
                  <div className="detail-value">Aastha Raj</div>
                </div>
              </a>
            </motion.div>

            {/* Marquee strip */}
            <motion.div variants={itemVariants} className="contact-marquee-wrapper">
              <div className="contact-marquee-track">
                {["UI Design ✦", "Development ✦", "Branding ✦", "Motion ✦", "Strategy ✦", "UI Design ✦", "Development ✦", "Branding ✦", "Motion ✦", "Strategy ✦"].map((item, i) => (
                  <span key={i} className="contact-marquee-item">{item}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: FORM ── */}
          <motion.div variants={itemVariants} className="contact-form-wrapper">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="success-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3 className="success-title">Message Received!</h3>
                  <p className="success-sub">Thanks for reaching out. I'll get back to you within 24 hours. Let's create something incredible.</p>
                  <button
                    className="success-reset"
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', budget: '', message: '' }); setSelectedServices([]); }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                >
                  {/* Service selector */}
                  <div className="form-section-label">What do you need?</div>
                  <div className="service-chips">
                    {services.map(service => (
                      <button
                        key={service}
                        type="button"
                        className={`service-chip ${selectedServices.includes(service) ? 'active' : ''}`}
                        onClick={() => toggleService(service)}
                      >
                        {service}
                        {selectedServices.includes(service) && (
                          <span className="chip-check">✓</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Name & Email row */}
                  <div className="form-row">
                    <div className={`form-group ${focused === 'name' ? 'focused' : ''} ${formData.name ? 'has-value' : ''}`}>
                      <label htmlFor="contact-name">Your Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused('')}
                        required
                        autoComplete="off"
                      />
                      <div className="input-line"></div>
                    </div>

                    <div className={`form-group ${focused === 'email' ? 'focused' : ''} ${formData.email ? 'has-value' : ''}`}>
                      <label htmlFor="contact-email">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused('')}
                        required
                        autoComplete="off"
                      />
                      <div className="input-line"></div>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className={`form-group ${focused === 'budget' ? 'focused' : ''} ${formData.budget ? 'has-value' : ''}`}>
                    <label htmlFor="contact-budget">Budget Range</label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      onFocus={() => setFocused('budget')}
                      onBlur={() => setFocused('')}
                    >
                      <option value="" disabled></option>
                      <option>Under ₹15,000</option>
                      <option>₹15,000 – ₹40,000</option>
                      <option>₹40,000 – ₹1,00,000</option>
                      <option>₹1,00,000+</option>
                      <option>Let's discuss</option>
                    </select>
                    <div className="input-line"></div>
                    <div className="select-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>

                  {/* Message */}
                  <div className={`form-group ${focused === 'message' ? 'focused' : ''} ${formData.message ? 'has-value' : ''}`}>
                    <label htmlFor="contact-message">Tell me about your project</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      required
                    />
                    <div className="input-line"></div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sending ? (
                      <span className="btn-sending">
                        <span className="sending-dots">
                          <span></span><span></span><span></span>
                        </span>
                        Sending...
                      </span>
                    ) : (
                      <span className="btn-text">
                        Send Message
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </span>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default ContactSection;
