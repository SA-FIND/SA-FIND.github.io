import { useStaggeredInView } from '../hooks/useInView';

const SKILL_GROUPS = [
  {
    title: 'Process Metallurgy & Instrumentation',
    skills: [
      'Extractive Metallurgy',
      'Refractory Ore Processing',
      'Bacterial Oxidation (BIOX)',
      'Froth Flotation',
      'Carbon-in-Leach (CIL)',
      'LECO S832 DR/S632 (Sulfur/Carbon)',
      'Atomic Absorption Spectroscopy',
      'Particle Size Analyzers',
    ],
  },
  {
    title: 'Computational Materials & Data',
    skills: [
      'Python',
      'Pandas & NumPy',
      'Machine Learning',
      'Scikit-learn & XGBoost',
      'Predictive Modelling',
      'Genetic Algorithms',
      'Design Expert (RSM)',
    ],
  },
];

const SkillTag = ({ skill, isInView, delay }) => (
  <span
    className="tag"
    style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(10px)',
      transition: `opacity 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}`,
    }}
  >
    {skill}
  </span>
);

const Skills = () => {
  const { ref, isInView, getDelay } = useStaggeredInView({ threshold: 0.1 });

  let tagIndex = 0;

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <span
          className="section-label"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          Capabilities
        </span>
        <h2
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 100ms, transform 0.6s ease 100ms',
          }}
        >
          Technical toolkit
        </h2>

        <div style={styles.grid}>
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={i}
              className="liquid-glass"
              style={{
                ...styles.card,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${getDelay(i + 2, 120)}, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${getDelay(i + 2, 120)}`,
              }}
            >
              <div style={styles.cardHeader}>
                <h4 style={styles.title}>{group.title}</h4>
              </div>
              <div style={styles.tagsContainer}>
                {group.skills.map((skill, j) => {
                  const currentIndex = tagIndex++;
                  return (
                    <SkillTag
                      key={j}
                      skill={skill}
                      isInView={isInView}
                      delay={`${(currentIndex + 5) * 50}ms`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '3rem',
  },
  card: {
    padding: '2rem',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '-0.01em',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
};

export default Skills;
