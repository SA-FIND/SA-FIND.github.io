import { useState, useEffect } from 'react';
import { useMagnetic } from '../hooks/useMouse';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  const primaryBtn = useMagnetic(0.25, 100);
  const outlineBtn = useMagnetic(0.25, 100);

  // ── Staggered entrance on mount ──
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stagger = (index) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(35px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms`,
  });

  return (
    <section id="hero" style={styles.section}>
      <div className="container" style={styles.container}>
        {/* Eyebrow */}
        <span style={{ ...styles.eyebrow, ...stagger(0) }}>
          Metallurgical Engineer
        </span>

        {/* Title */}
        <h1 style={{ ...styles.title, ...stagger(1) }}>
          Solomon<br />
          <span className="shimmer-text" style={styles.accent}>Ahedor</span>
        </h1>

        {/* Descriptor */}
        <p style={{ ...styles.descriptor, ...stagger(2) }}>
          Metallurgical Engineering, KNUST Ghana. Building ML pipelines for mineral processing and materials discovery. Open to PhD opportunities in computational materials and mineral processing ML.
        </p>

        {/* CTA buttons with magnetic hover */}
        <div style={{ ...styles.cta, ...stagger(3) }}>
          <a
            ref={primaryBtn.ref}
            href="#projects"
            className="btn btn-primary"
            style={primaryBtn.style}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            View My Work
          </a>
          <a
            ref={outlineBtn.ref}
            href="#contact"
            className="btn btn-outline"
            style={outlineBtn.style}
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{ ...styles.scrollIndicator, ...stagger(5) }}>
          <div style={styles.scrollLine}>
            <div style={styles.scrollDot} />
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '850px',
    margin: '0',
    paddingTop: '6rem',
    position: 'relative',
  },
  eyebrow: {
    color: '#d4a843',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    marginBottom: '1.5rem',
    display: 'block',
  },
  title: {
    fontSize: 'clamp(3rem, 8vw, 5.5rem)',
    lineHeight: 1.05,
    marginBottom: '1.5rem',
    letterSpacing: '-2px',
    color: '#ffffff',
    fontWeight: 800,
  },
  accent: {
    fontStyle: 'italic',
    fontWeight: 700,
  },
  descriptor: {
    fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
    color: '#8a95a5',
    marginBottom: '3rem',
    maxWidth: '620px',
    lineHeight: 1.8,
  },
  cta: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '-4rem',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  scrollLine: {
    width: '1px',
    height: '60px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '1px',
    position: 'relative',
    overflow: 'hidden',
  },
  scrollDot: {
    width: '3px',
    height: '12px',
    background: '#d4a843',
    borderRadius: '2px',
    position: 'absolute',
    left: '-1px',
    animation: 'scrollBounce 2s ease-in-out infinite',
  },
};

// Inject scroll animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scrollBounce {
      0%, 100% { top: 0; opacity: 0; }
      30% { opacity: 1; }
      70% { opacity: 1; }
      100% { top: 48px; opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

export default Hero;
