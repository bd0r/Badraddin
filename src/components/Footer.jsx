import { useLang } from '../context/LanguageContext';
import content from '../data/content';
import '../styles/footer.css';

export default function Footer() {
  const { lang } = useLang();
  const t = content[lang].footer;
  const nav = content[lang].nav;

  const links = [
    { href: '#home', label: nav.home },
    { href: '#about', label: nav.about },
    { href: '#skills', label: nav.skills },
    { href: '#projects', label: nav.projects },
    { href: '#contact', label: nav.contact },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="footer-logo" onClick={(e) => handleClick(e, '#home')}>
              <span className="logo-bracket">&lt;</span>
              <span className="logo-text">B</span>
              <span className="logo-bracket">/&gt;</span>
            </a>
            <p className="footer-tagline">{t.madeWith}</p>
          </div>

          <div className="footer-links">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="footer-link" onClick={(e) => handleClick(e, link.href)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <span className="footer-copyright">{t.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
