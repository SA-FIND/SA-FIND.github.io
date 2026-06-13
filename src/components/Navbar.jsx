import { useState, useEffect, useCallback, useRef } from 'react';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // ── Active section tracking via IntersectionObserver ──
  useEffect(() => {
    const observers = [];
    const sections = NAV_LINKS.map(l => document.getElementById(l.id)).filter(Boolean);

    sections.forEach(section => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // ── Scroll-aware blur intensity ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Close mobile menu on link click ──
  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // ── Close on Escape ──
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          ...styles.nav,
          ...(scrolled ? styles.navScrolled : {}),
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container" style={styles.container}>
          {/* Logo */}
          <a href="#hero" style={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span style={styles.logoText}>SA</span>
            <span style={styles.logoDot}>.</span>
            <span style={styles.logoSuffix}>eng</span>
          </a>

          {/* Desktop nav links */}
          <ul style={styles.links} id="nav-links-desktop">
            {NAV_LINKS.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={{
                    ...styles.link,
                    ...(activeSection === link.id ? styles.linkActive : {}),
                  }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span style={styles.activeIndicator} />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            style={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            id="mobile-menu-toggle"
          >
            <span style={{
              ...styles.hamburgerLine,
              transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              ...styles.hamburgerLine,
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)',
            }} />
            <span style={{
              ...styles.hamburgerLine,
              transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen overlay ── */}
      <div
        style={{
          ...styles.mobileOverlay,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          visibility: mobileOpen ? 'visible' : 'hidden',
        }}
        id="mobile-menu-overlay"
      >
        <ul style={styles.mobileLinks}>
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.id}
              style={{
                ...styles.mobileLinkItem,
                transitionDelay: mobileOpen ? `${i * 80 + 150}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                style={{
                  ...styles.mobileLink,
                  color: activeSection === link.id ? '#d4a843' : '#f0f2f5',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'min(calc(100% - 2rem), 900px)',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px) saturate(1.6)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
    zIndex: 1000,
    boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  navScrolled: {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
    backdropFilter: 'blur(40px) saturate(2) brightness(1.05)',
    WebkitBackdropFilter: 'blur(40px) saturate(2) brightness(1.05)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'baseline',
    textDecoration: 'none',
    gap: 0,
    cursor: 'pointer',
  },
  logoText: {
    fontSize: '1.3rem',
    fontWeight: 800,
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  logoDot: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#d4a843',
    lineHeight: 1,
  },
  logoSuffix: {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '0.5px',
  },
  links: {
    display: 'flex',
    gap: '0.5rem',
    listStyle: 'none',
    alignItems: 'center',
  },
  link: {
    position: 'relative',
    padding: '0.45rem 0.85rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.6)',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block',
  },
  linkActive: {
    color: '#fff',
    background: 'rgba(212, 168, 67, 0.12)',
    boxShadow: '0 0 12px rgba(212, 168, 67, 0.1)',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: '2px',
    left: '30%',
    right: '30%',
    height: '2px',
    borderRadius: '1px',
    background: 'linear-gradient(90deg, transparent, #d4a843, transparent)',
  },

  // ── Hamburger ──
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: '5px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    zIndex: 1001,
  },
  hamburgerLine: {
    display: 'block',
    width: '22px',
    height: '2px',
    background: '#fff',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
    transformOrigin: 'center',
  },

  // ── Mobile overlay ──
  mobileOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(8, 9, 12, 0.95)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.4s ease, visibility 0.4s ease',
  },
  mobileLinks: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    textAlign: 'center',
  },
  mobileLinkItem: {
    transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  mobileLink: {
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
};

// ── Inject responsive styles ──
const mobileCSS = `
  @media (max-width: 768px) {
    #nav-links-desktop { display: none !important; }
    #mobile-menu-toggle { display: flex !important; }
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = mobileCSS;
  document.head.appendChild(style);
}

export default Navbar;
