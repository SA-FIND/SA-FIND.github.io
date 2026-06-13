import Navbar from './components/Navbar';
import Background from './components/Background';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Background />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />

      <footer style={footerStyles.footer}>
        <div className="container" style={footerStyles.container}>
          <span style={footerStyles.logo}>
            SA<span style={footerStyles.dot}>.</span>eng
          </span>
          <p style={footerStyles.copy}>
            Solomon Ahedor &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}

const footerStyles = {
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.04)',
    padding: '3rem 0 3rem',
    textAlign: 'center',
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logo: {
    fontSize: '1.2rem',
    fontWeight: 800,
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  dot: {
    color: '#d4a843',
    fontSize: '1.4rem',
  },
  copy: {
    color: '#5a6373',
    fontSize: '0.85rem',
  },
};

export default App;
