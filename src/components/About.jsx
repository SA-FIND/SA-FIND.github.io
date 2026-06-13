import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useMouse';

const About = () => {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 });
  const tilt = useTilt(6);

  const reveal = (delay = 0) => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section id="about" ref={sectionRef}>
      <div className="container" style={styles.container}>
        {/* Photo with 3D tilt */}
        <div
          style={{
            ...styles.photoWrapper,
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="liquid-glass"
            style={{ ...styles.photoContainer, ...tilt.style }}
          >
            <div style={tilt.shineStyle} />
            <img
              src="/Prophoto.png"
              alt="Solomon Ahedor — Material Science Engineer"
              style={styles.img}
              loading="lazy"
            />
            {/* Gold frame accent */}
            <div style={styles.frameAccent} />
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          <span className="section-label" style={reveal(100)}>About</span>
          <h2 style={reveal(180)}>Materials scientist.<br />Builder. Researcher.</h2>

          <p style={{ ...styles.p, ...reveal(260) }}>
            I am a final-year <strong>Material Science Engineering</strong> student at the <strong>Kwame Nkrumah University of Science and Technology (KNUST)</strong>, graduating in September 2026. My research is supervised by <strong>Prof. Emmanuel Gikunoo</strong> and spans water treatment, process optimisation, and computational materials.
          </p>

          <p style={{ ...styles.p, ...reveal(340) }}>
            Beyond the lab, I serve as <strong>President and R&amp;D Lead of the Materials Innovation Hub (MIH)</strong>, where I manage association policy, coordinate events, and mentor peers in project-based materials research.
          </p>

          <p style={{ ...styles.p, ...reveal(420) }}>
            My work is shaped by a single conviction: that engineering problems in resource-constrained environments deserve solutions that are not just technically sound, but locally relevant and reproducible. I am actively pursuing <strong>postgraduate study (Masters/PhD)</strong> focusing on computational materials and materials informatics.
          </p>

          {/* Meta info */}
          <div style={{ ...styles.meta, ...reveal(500) }}>
            <div style={styles.metaItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.metaIcon}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <div>
                <span style={styles.metaLabel}>Institution</span>
                <span style={styles.metaValue}>KNUST, Kumasi, Ghana</span>
              </div>
            </div>
            <div style={styles.metaItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.metaIcon}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              <div>
                <span style={styles.metaLabel}>Graduating</span>
                <span style={styles.metaValue}>September 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'minmax(280px, 1fr) 2fr',
    gap: '4rem',
    alignItems: 'center',
  },
  photoWrapper: {
    perspective: '800px',
  },
  photoContainer: {
    padding: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  },
  img: {
    width: '100%',
    borderRadius: '14px',
    objectFit: 'cover',
    display: 'block',
    position: 'relative',
    zIndex: 1,
  },
  frameAccent: {
    position: 'absolute',
    bottom: '-4px',
    left: '10%',
    right: '10%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.4), transparent)',
    borderRadius: '1px',
    zIndex: 3,
  },
  content: {},
  p: {
    color: '#8a95a5',
    marginBottom: '1.5rem',
    fontSize: '1.05rem',
    lineHeight: 1.8,
  },
  meta: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  metaItem: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
  },
  metaIcon: {
    marginTop: '2px',
  },
  metaLabel: {
    display: 'block',
    fontSize: '0.78rem',
    color: '#d4a843',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '2px',
  },
  metaValue: {
    display: 'block',
    fontSize: '0.95rem',
    color: '#f0f2f5',
  },
};

// Responsive grid override
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      #about .container {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default About;
