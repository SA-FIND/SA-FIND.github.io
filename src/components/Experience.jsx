import { useStaggeredInView } from '../hooks/useInView';

const EXPERIENCES = [
  {
    role: 'Metallurgy & Process Engineering Intern',
    period: 'Nov 2025 – Dec 2025',
    org: 'AngloGold Ashanti (Obuasi Mine), Ghana',
    desc: [
      'Completed technical rotation through the full refractory gold processing circuit, monitored BIOX bacterial activity, and performed ferrous/ferric ion determinations to optimize sulfide oxidation rates and CIL adsorption efficiency.',
      'Performed extended flotation tests and Particle Size Analysis (PSA) in the Met-lab to evaluate recovery efficiency and grind kinetics, providing data to refine process settings.',
    ],
  },
  {
    role: 'Undergraduate Researcher',
    period: '2025 – 2026',
    org: 'Kwame Nkrumah University of Science and Technology (KNUST)',
    desc: [
      'Developed computational materials discovery and process optimization using inverse design pipelines for High Entropy Alloys utilizing Genetic Algorithms and Random Forests with project proposal for physical experimental implementation (... Working with Prof. Kwadwo Mensah Darkwah)',
      'Designed and fabricated a biomass-derived carbon filtration system optimized via Response Surface Methodology (RSM) with a Face-Centered Central Composite Design. (supervised by Prof. Emmanuel Gikunoo)',
    ],
  },
  {
    role: 'President & R&D Lead',
    period: '2025 – 2026',
    org: 'Materials Innovation Hub (MIH)',
    desc: [
      'Led the association and managed student-driven research initiatives in sustainable materials and clean water.',
      'Mentored peers in data-driven materials research methodologies and advanced analytical instrumentation.',
    ],
  },
];

const Experience = () => {
  const { ref, isInView, getDelay } = useStaggeredInView({ threshold: 0.1 });

  return (
    <section id="experience" ref={ref}>
      <div className="container">
        <span
          className="section-label"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          Experience
        </span>
        <h2
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 100ms, transform 0.6s ease 100ms',
          }}
        >
          Industry, research<br />&amp; leadership roles
        </h2>

        <div style={styles.timeline}>
          {/* Animated timeline line */}
          <div
            style={{
              ...styles.timelineLine,
              transform: isInView ? 'scaleY(1)' : 'scaleY(0)',
              transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 200ms',
            }}
          />

          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              style={{
                ...styles.item,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateX(0)' : 'translateX(-30px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${getDelay(i + 2, 150)}, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${getDelay(i + 2, 150)}`,
              }}
            >
              {/* Timeline node */}
              <div
                style={{
                  ...styles.timelineNode,
                  boxShadow: isInView
                    ? '0 0 12px rgba(212,168,67,0.4), 0 0 24px rgba(212,168,67,0.15)'
                    : '0 0 0 rgba(212,168,67,0)',
                  transition: `box-shadow 0.5s ease ${getDelay(i + 2, 150)}`,
                }}
              />

              {/* Card */}
              <div className="liquid-glass" style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.roleSection}>
                    <div>
                      <span style={styles.role}>{exp.role}</span>
                      <div style={styles.org}>{exp.org}</div>
                    </div>
                  </div>
                  <span style={styles.period}>{exp.period}</span>
                </div>

                <ul style={styles.list}>
                  {exp.desc.map((d, j) => (
                    <li key={j} style={styles.li}>
                      <span style={styles.bullet}>›</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  timeline: {
    position: 'relative',
    marginTop: '3rem',
    paddingLeft: '3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  timelineLine: {
    position: 'absolute',
    left: '11px',
    top: '0',
    bottom: '0',
    width: '1px',
    background: 'linear-gradient(to bottom, rgba(212,168,67,0.3), rgba(212,168,67,0.05))',
    transformOrigin: 'top',
  },
  timelineNode: {
    position: 'absolute',
    left: '-3rem',
    top: '1.75rem',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #d4a843, #e8c55a)',
    border: '2px solid rgba(8,9,12,0.8)',
    zIndex: 2,
    marginLeft: '6px',
  },
  item: {
    position: 'relative',
  },
  card: {
    padding: '1.75rem',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  roleSection: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
  },
  role: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#fff',
    display: 'block',
    lineHeight: 1.3,
  },
  org: {
    color: '#8a95a5',
    fontStyle: 'italic',
    fontSize: '0.9rem',
    marginTop: '4px',
  },
  period: {
    color: '#d4a843',
    fontWeight: 700,
    fontSize: '0.85rem',
    letterSpacing: '0.5px',
    background: 'rgba(212,168,67,0.1)',
    padding: '0.3rem 0.7rem',
    borderRadius: '8px',
    border: '1px solid rgba(212,168,67,0.15)',
    flexShrink: 0,
  },
  list: {
    paddingLeft: '0',
    listStyle: 'none',
    color: '#8a95a5',
    fontSize: '0.95rem',
    lineHeight: 1.7,
  },
  li: {
    marginBottom: '0.5rem',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-start',
  },
  bullet: {
    color: '#d4a843',
    fontWeight: 700,
    fontSize: '1.1rem',
    lineHeight: 1.5,
    flexShrink: 0,
  },
};

export default Experience;
