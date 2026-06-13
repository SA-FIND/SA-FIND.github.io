import { useRef, useCallback, useState } from 'react';
import { useStaggeredInView } from '../hooks/useInView';

const PROJECTS = [
  {
    id: '01',
    title: 'MetaForge: ML-Accelerated HEA Discovery',
    desc: 'A computational materials science pipeline for discovering optimal High Entropy Alloys (HEAs). Combines combinatorial filtering, Random Forest property prediction, and a custom Genetic Algorithm for inverse design to maximize specific strength.',
    tags: ['Machine Learning', 'Genetic Algorithms', 'Materials Science', 'Python'],
    featured: true,
  },
  {
    id: '02',
    title: 'Biomass-Derived Carbon Filter for Turbid Water Treatment',
    desc: 'Designing and fabricating a low-cost water filtration system using coconut shell activated carbon (CSAC). Employed Response Surface Methodology with a Face-Centered Central Composite Design (CCD) in Design Expert to optimise adsorption parameters.',
    tags: ['RSM / CCD', 'Agricultural Waste', 'Water Treatment'],
  },
  {
    id: '03',
    title: 'Machine Learning for Froth Flotation Optimisation',
    desc: 'Developed a three-tier LOOCV modelling framework applied to UG2 circuit data from Rustenburg Platinum Mines. Built XGBoost models with engineered lag features for predicting silica and iron concentrate grade.',
    tags: ['XGBoost', 'Froth Flotation', 'Predictive Modelling'],
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
