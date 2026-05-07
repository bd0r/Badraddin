import { useLang } from '../context/LanguageContext';
import content from '../data/content';
import ScrollReveal from './ScrollReveal';
import '../styles/about.css';

export default function About() {
  const { lang } = useLang();
  const t = content[lang].about;

  return (
    <section className="about section" id="about">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">{t.label}</span>
          <h2 className="section-title">{t.title}</h2>
        </ScrollReveal>

        <div className="about-grid">
          <div className="about-text">
            <ScrollReveal delay={100}><p>{t.p1}</p></ScrollReveal>
            <ScrollReveal delay={200}><p>{t.p2}</p></ScrollReveal>
            <ScrollReveal delay={300}><p>{t.p3}</p></ScrollReveal>
          </div>

          <ScrollReveal delay={200}>
            <div className="about-stats">
              {t.stats.map((stat, i) => (
                <div className="stat-card" key={i}>
                  <span className="stat-value gradient-text">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Terminal decoration */}
        <ScrollReveal delay={400}>
          <div className="about-terminal">
            <div className="terminal-header">
              <span className="terminal-dot" style={{background:'#ff5f57'}}></span>
              <span className="terminal-dot" style={{background:'#ffbd2e'}}></span>
              <span className="terminal-dot" style={{background:'#28c840'}}></span>
              <span className="terminal-title">badraddin@engineer:~$</span>
            </div>
            <div className="terminal-body">
              <code>
                <span className="t-green">$</span> whoami<br/>
                <span className="t-cyan">→ Computer Engineer | Fullstack Developer | SysAdmin | Embedded Dev</span><br/>
                <span className="t-green">$</span> cat skills.conf<br/>
                <span className="t-muted"># Loading domains...</span><br/>
                <span className="t-amber">✓</span> web_development <span className="t-muted">[active]</span><br/>
                <span className="t-amber">✓</span> system_administration <span className="t-muted">[active]</span><br/>
                <span className="t-amber">✓</span> embedded_systems <span className="t-muted">[active]</span><br/>
                <span className="t-amber">✓</span> engineering_tools <span className="t-muted">[active]</span><br/>
                <span className="t-green">$</span> <span className="cursor-blink">_</span>
              </code>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
