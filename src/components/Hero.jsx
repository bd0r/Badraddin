import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import content from '../data/content';
import '../styles/hero.css';

export default function Hero() {
  const { lang } = useLang();
  const t = content[lang].hero;
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const currentRole = t.roles[roleIndex];
    let timeout;

    if (!isDeleting && charIndex <= currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, charIndex));
        setCharIndex(prev => prev + 1);
      }, 80);
    } else if (!isDeleting && charIndex > currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCharIndex(prev => prev - 1);
        setDisplayText(currentRole.slice(0, charIndex - 1));
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % t.roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, t.roles]);

  // Reset typing when language changes
  useEffect(() => {
    setRoleIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
    setDisplayText('');
  }, [lang]);

  const handleScroll = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero section" id="home">
      <div className="hero-content container">
        <div className="hero-badge" style={{ animationDelay: '0.2s' }}>
          <span className="badge-dot"></span>
          <span>{t.greeting}</span>
        </div>

        <h1 className="hero-name" style={{ animationDelay: '0.4s' }}>
          <span className="gradient-text">{t.name}</span>
        </h1>

        <div className="hero-role" style={{ animationDelay: '0.6s' }}>
          <span className="role-prefix">&gt;_</span>
          <span className="role-text">{displayText}</span>
          <span className="cursor">|</span>
        </div>

        <p className="hero-desc" style={{ animationDelay: '0.8s' }}>
          {t.description}
        </p>

        <div className="hero-actions" style={{ animationDelay: '1s' }}>
          <a href="#projects" className="btn btn-primary" onClick={handleScroll}>
            <span>{t.cta}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            {t.resumeBtn}
          </a>
        </div>

        {/* Decorative floating code snippets */}
        <div className="hero-decor">
          <div className="code-float float-1"><code>{'const build = () => {'}</code></div>
          <div className="code-float float-2"><code>{'<System.init />'}</code></div>
          <div className="code-float float-3"><code>{'0x48656C6C6F'}</code></div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
