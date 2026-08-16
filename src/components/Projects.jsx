import { useRef, useCallback, useState } from 'react';
import { useStaggeredInView } from '../hooks/useInView';

/* ── Link-preview card ─────────────────────────────────────── */
const GitHubPreview = ({ url }) => {
  const [hovered, setHovered] = useState(false);
  // GitHub's auto-generated social preview image
  const owner = url.replace('https://github.com/', '').split('/')[0];
  const repo = url.replace('https://github.com/', '').split('/')[1];
  const ogImg = `https://opengraph.github.com/repo/${owner}/${repo}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...previewStyles.wrap,
        ...(hovered ? previewStyles.wrapHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <span style={previewStyles.accent} />

      <div style={previewStyles.body}>
        {/* OG image */}
        <div style={previewStyles.imgWrap}>
          <img
            src={ogImg}
            alt={repo}
            style={{
              ...previewStyles.img,
              ...(hovered ? previewStyles.imgHover : {}),
            }}
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div style={previewStyles.text}>
          <div style={previewStyles.repoRow}>
            {/* GitHub icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#8a95a5', flexShrink: 0 }}>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span style={previewStyles.repoName}>{owner} / {repo}</span>
          </div>
          <span style={previewStyles.domain}>github.com</span>
        </div>

        {/* Arrow */}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: hovered ? '#d4a843' : '#3a4455', flexShrink: 0, transition: 'color 0.2s ease, transform 0.2s ease', transform: hovered ? 'translate(2px,-2px)' : 'translate(0,0)' }}
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </a>
  );
};

const previewStyles = {
  wrap: {
    display: 'flex',
    marginTop: '1.5rem',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'border-color 0.25s ease, background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
    cursor: 'pointer',
  },
  wrapHover: {
    borderColor: 'rgba(212,168,67,0.35)',
    background: 'rgba(212,168,67,0.04)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
  },
  accent: {
    display: 'block',
    width: '3px',
    flexShrink: 0,
    background: 'linear-gradient(180deg, #d4a843 0%, rgba(212,168,67,0.3) 100%)',
    borderRadius: '10px 0 0 10px',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.65rem 0.85rem',
    flex: 1,
    minWidth: 0,
  },
  imgWrap: {
    flexShrink: 0,
    width: '80px',
    height: '42px',
    borderRadius: '6px',
    overflow: 'hidden',
    background: 'rgba(255,255,255,0.06)',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  imgHover: {
    transform: 'scale(1.05)',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    flex: 1,
    minWidth: 0,
  },
  repoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  repoName: {
    color: '#c8d0db',
    fontSize: '0.8rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  domain: {
    color: '#4a5568',
    fontSize: '0.72rem',
  },
};

const PROJECTS = [
  {
    id: '01',
    title: 'MetaForge: ML-Accelerated HEA Discovery',
    desc: 'A computational materials science pipeline for discovering optimal High Entropy Alloys (HEAs). Combines combinatorial filtering, Random Forest property prediction, and a custom Genetic Algorithm for inverse design to maximize specific strength.',
    tags: ['Machine Learning', 'Genetic Algorithms', 'Materials Science', 'Python'],
    featured: true,
    github: 'https://github.com/SA-FIND/High-Entropy-Alloy-Discovery',
  },
  {
    id: '02',
    title: 'Biomass-Derived Carbon Filter for Turbid Water Treatment',
    desc: 'Designed and fabricated a low-cost water filtration system using coconut shell activated carbon (CSAC). Employed Response Surface Methodology with a Face-Centered Central Composite Design (CCD) in Design Expert to optimise adsorption parameters.',
    tags: ['RSM / CCD', 'Agricultural Waste', 'Water Treatment'],
  },
  {
    id: '03',
    title: 'Machine Learning for Froth Flotation Optimisation',
    desc: 'Developed a three-tier LOOCV modelling framework for grade and recovery prediction in froth flotation. Applied to UG2 platinum circuits (Rustenburg) and iron ore time-series data. Built XGBoost models with engineered lag features for predicting silica and iron concentrate grade and recovery.',
    tags: ['XGBoost', 'Froth Flotation', 'Time-Series Forecasting'],
    github: 'https://github.com/SA-FIND/Flotation-Optimisation',
  },
];

const ProjectCard = ({ project, index, isInView, delay }) => {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const rafRef = useRef(null);

  const handleMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6;

      setSpotlight({ x, y, active: true });
      setTilt({ rotateX: rx, rotateY: ry });
    });
  }, []);

  const handleLeave = useCallback(() => {
    setSpotlight(s => ({ ...s, active: false }));
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="liquid-glass"
      style={{
        ...styles.card,
        ...(project.featured ? styles.cardFeatured : {}),
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)${isInView ? '' : ' translateY(40px)'}`,
        opacity: isInView ? 1 : 0,
        transition: tilt.rotateX === 0
          ? `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}`
          : 'transform 0.1s ease-out',
        willChange: 'transform, opacity',
      }}
    >
      {/* Spotlight follow overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: spotlight.active
            ? `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(212,168,67,0.08) 0%, transparent 50%)`
            : 'none',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'background 0.2s ease',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <div style={styles.meta}>
          <span style={styles.number}>{project.id} / Project</span>
        </div>
        <h3 style={styles.title}>{project.title}</h3>
        <p style={styles.desc}>{project.desc}</p>
        <div style={styles.tags}>
          {project.tags.map((tag, j) => (
            <span key={j} className="tag">{tag}</span>
          ))}
        </div>
        {project.github && <GitHubPreview url={project.github} />}
      </div>
    </div>
  );
};

const Projects = () => {
  const { ref, isInView, getDelay } = useStaggeredInView({ threshold: 0.1 });

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <span
          className="section-label"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          Portfolio
        </span>
        <h2
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 100ms, transform 0.6s ease 100ms',
          }}
        >
          Selected research &amp;<br />engineering work
        </h2>

        <div style={styles.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              isInView={isInView}
              delay={getDelay(i + 2, 100)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '1.5rem',
    marginTop: '3rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '2rem',
    transformStyle: 'preserve-3d',
  },
  cardFeatured: {
    borderColor: 'rgba(212, 168, 67, 0.2)',
    background: 'linear-gradient(145deg, rgba(212,168,67,0.05) 0%, rgba(255,255,255,0.03) 100%)',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '1rem',
  },
  number: {
    color: '#d4a843',
    fontWeight: 700,
    fontSize: '0.8rem',
    letterSpacing: '0.5px',
  },
  title: {
    fontSize: '1.35rem',
    marginBottom: '1rem',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.3,
  },
  desc: {
    color: '#8a95a5',
    marginBottom: '1.5rem',
    flexGrow: 1,
    lineHeight: 1.7,
    fontSize: '0.95rem',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
  },

};

export default Projects;
