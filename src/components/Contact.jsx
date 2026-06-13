import { useCallback, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useMagnetic } from '../hooks/useMouse';

const LINKS = [
  { label: 'Email', href: 'mailto:ahedorsolomon@gmail.com', external: false },
  { label: 'X (Twitter)', href: 'https://x.com/safinderr', external: true },
  { label: 'GitHub', href: 'https://github.com/SA-FIND', external: true },
  { label: 'View CV', href: '/SOLOMON_AHEDOR_CV.pdf', download: true },
];

const MagneticLink = ({ link }) => {
  const magnetic = useMagnetic(0.2, 80);

  return (
    <a
      ref={magnetic.ref}
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      download={link.download ? true : undefined}
      style={{
        ...styles.link,
        ...magnetic.style,
      }}
    >
      {link.label}
      {link.external && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      )}
    </a>
  );
};

const Contact = () => {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const ctaMagnetic = useMagnetic(0.3, 120);
  const ctaRef = useRef(null);

  // Ripple effect on CTA click
  const handleRipple = useCallback((e) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  const reveal = (delay = 0) => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section id="contact" ref={ref} style={styles.section}>
      <div className="container" style={styles.container}>
        <div className="liquid-glass" style={styles.card}>
          <span className="section-label" style={{ ...reveal(0), textAlign: 'center' }}>Contact</span>

          <h2 style={{ ...styles.heading, ...reveal(100) }}>
            Let&apos;s build<br />
            <em style={styles.em}>something together.</em>
          </h2>

          <p style={{ ...styles.p, ...reveal(200) }}>
            Open to research collaborations, postgraduate opportunities, and conversations about material informatics, sustainable engineering, or ML in process metallurgy.
          </p>

          {/* Links grid */}
          <div style={{ ...styles.links, ...reveal(300) }}>
            {LINKS.map((link, i) => (
              <MagneticLink key={i} link={link} />
            ))}
          </div>

          {/* Primary CTA */}
          <div style={{ ...reveal(400), textAlign: 'center', marginTop: '2.5rem' }}>
            <a
              ref={(el) => {
                ctaRef.current = el;
                ctaMagnetic.ref.current = el;
              }}
              href="https://discordapp.com/users/safind__73430"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                ...ctaMagnetic.style,
                fontSize: '1.05rem',
                padding: '1rem 2.5rem',
              }}
              onClick={handleRipple}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Say Hello
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    borderTop: '1px solid rgba(255,255,255,0.04)',
    padding: '6rem 0 4rem',
  },
  container: {
    maxWidth: '800px',
  },
  card: {
    padding: 'clamp(2rem, 5vw, 4rem)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'visible',
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  em: {
    color: '#8a95a5',
    fontStyle: 'italic',
  },
  p: {
    color: '#8a95a5',
    fontSize: '1.1rem',
    lineHeight: 1.7,
    margin: '0 auto 2.5rem auto',
    maxWidth: '550px',
    textAlign: 'center',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.2rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#f0f2f5',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    willChange: 'transform',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
};

// Hover styles for links
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    #contact a[href]:not(.btn):hover {
      background: rgba(212,168,67,0.08) !important;
      border-color: rgba(212,168,67,0.2) !important;
      color: #d4a843 !important;
      box-shadow: 0 0 15px rgba(212,168,67,0.1);
    }
  `;
  document.head.appendChild(style);
}

export default Contact;
