import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LanguageContext';
import content from '../data/content';
import '../styles/navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = content[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.home },
    { href: '#about', label: t.about },
    { href: '#skills', label: t.skills },
    { href: '#experience', label: t.experience },
    { href: '#projects', label: t.projects },
    { href: '#contact', label: t.contact },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-nav">
      <div className="navbar-inner container">
        <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">B</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <button className="nav-toggle-btn" onClick={toggleLang} aria-label="Toggle Language" id="lang-toggle">
            <span className="lang-label">{lang === 'en' ? 'عر' : 'EN'}</span>
          </button>

          <button className="nav-toggle-btn theme-btn" onClick={toggleTheme} aria-label="Toggle Theme" id="theme-toggle">
            <div className={`theme-icon ${theme}`}>
              <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
              <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            </div>
          </button>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            id="menu-toggle"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
