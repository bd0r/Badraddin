import { useLang } from '../context/LanguageContext';
import content from '../data/content';
import ScrollReveal from './ScrollReveal';
import '../styles/skills.css';

export default function Skills() {
  const { lang } = useLang();
  const t = content[lang].skills;

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">{t.label}</span>
          <h2 className="section-title">{t.title}</h2>
        </ScrollReveal>

        <div className="skills-grid">
          {t.categories.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="skill-card">
                <div className="skill-card-glow"></div>
                <div className="skill-icon">{cat.icon}</div>
                <h3 className="skill-title">{cat.title}</h3>
                <p className="skill-desc">{cat.description}</p>
                <div className="skill-tags">
                  {cat.skills.map((skill, j) => (
                    <span className="skill-tag" key={j}>{skill}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
