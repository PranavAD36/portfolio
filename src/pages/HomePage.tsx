import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import SpaceBackground from '@/components/SpaceBackground';

const skills = ['React', 'TypeScript', 'Tailwind CSS', 'UI Design', 'Accessibility'];

const stats = [
  { label: 'Projects shipped', value: '12+' },
  { label: 'Years building', value: '3+' },
  { label: 'Global launches', value: '8' },
];

const journey = [
  { year: '2022', title: 'Started with product interfaces' },
  { year: '2023', title: 'Expanded into polished frontend systems' },
  { year: '2024', title: 'Built immersive digital experiences' },
];

const projects = [
  {
    title: 'Studio Landing',
    description: 'A polished marketing site focused on clarity, motion, and conversion.',
  },
  {
    title: 'Dashboard Kit',
    description: 'A clean internal tool experience with straightforward data views and flows.',
  },
  {
    title: 'Portfolio Redesign',
    description: 'A modern personal site crafted to feel warm, clear, and memorable.',
  },
];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();

    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        frame = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    mediaQuery.addEventListener('change', updatePreference);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', updatePreference);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const sectionMotion = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.55, ease: 'easeOut' },
    }),
    [],
  );

  return (
    <div className="page">
      <SpaceBackground scrollY={scrollY} reduceMotion={reduceMotion} />
      <Navbar />

      <main id="home">
        <motion.section className="hero section" {...sectionMotion}>
          <div className="hero-copy">
            <p className="eyebrow">Frontend developer • UI enthusiast</p>
            <h1>Building calm, thoughtful web experiences.</h1>
            <p className="hero-text">
              I create thoughtful interfaces that feel clear, modern, and easy to use.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                View projects
              </a>
              <a className="button secondary" href="#contact">
                Get in touch
              </a>
            </div>
            <div className="scroll-indicator" aria-hidden="true">
              <span />
            </div>
          </div>
          <motion.div
            className="hero-card"
            aria-label="Profile summary"
            whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 50px rgba(94, 234, 212, 0.18)' }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          >
            <p className="card-label">Currently available</p>
            <h2>Focused on simple, polished product work.</h2>
            <p>
              I enjoy turning ideas into elegant pages with strong structure and clear details.
            </p>
          </motion.div>
        </motion.section>

        <motion.section id="about" className="section about" {...sectionMotion}>
          <div>
            <p className="eyebrow">About</p>
            <h2>Design-minded developer with a strong eye for detail.</h2>
          </div>
          <p>
            I blend product thinking with frontend craftsmanship to create interfaces that look
            refined and feel intuitive from the first click.
          </p>
        </motion.section>

        <motion.section id="skills" className="section" {...sectionMotion}>
          <p className="eyebrow">Skills</p>
          <div className="chip-list">
            {skills.map((skill) => (
              <motion.span
                key={skill}
                className="chip"
                whileHover={{ y: -3, scale: 1.02, boxShadow: '0 10px 30px rgba(147, 197, 253, 0.2)' }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" {...sectionMotion}>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" className="section" {...sectionMotion}>
          <p className="eyebrow">Selected work</p>
          <div className="card-grid">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                className="info-card"
                whileHover={{ y: -8, scale: 1.01, boxShadow: '0 20px 50px rgba(94, 234, 212, 0.16)' }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="card-actions">
                  <a className="button secondary" href="#">
                    GitHub
                  </a>
                  <a className="button primary" href="#">
                    Live Demo
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" {...sectionMotion}>
          <div className="timeline-card">
            <p className="eyebrow">Journey</p>
            <div className="timeline-list">
              {journey.map((item) => (
                <div key={item.year} className="timeline-item">
                  <span>{item.year}</span>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="section contact" {...sectionMotion}>
          <p className="eyebrow">Contact</p>
          <h2>Let’s build something simple and meaningful together.</h2>
          <div className="contact-actions">
            <motion.a
              className="button primary"
              href="#"
              whileHover={{ y: -4, scale: 1.03, boxShadow: '0 16px 45px rgba(56, 189, 248, 0.25)' }}
              whileTap={{ scale: 0.97 }}
            >
              Resume
            </motion.a>
            <motion.a
              className="button secondary"
              href="#"
              whileHover={{ y: -4, scale: 1.03, boxShadow: '0 16px 45px rgba(56, 189, 248, 0.25)' }}
              whileTap={{ scale: 0.97 }}
            >
              LinkedIn
            </motion.a>
            <motion.a
              className="button secondary"
              href="#"
              whileHover={{ y: -4, scale: 1.03, boxShadow: '0 16px 45px rgba(56, 189, 248, 0.25)' }}
              whileTap={{ scale: 0.97 }}
            >
              Email
            </motion.a>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <p>© 2026 Pranav Dabhi</p>
      </footer>
    </div>
  );
}
