import { useLang } from '../context/LanguageContext';
import content from '../data/content';
import ScrollReveal from './ScrollReveal';
import '../styles/experience.css';

export default function Experience() {
  const { lang } = useLang();
  const t = content[lang].experience;

  return (
    <section className="experience section" id="experience">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">{t.label}</span>
          <h2 className="section-title">{t.title}</h2>
        </ScrollReveal>

        <div className="timeline">
          {t.items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className="timeline-company">{item.company}</span>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
          <div className="timeline-line"></div>
        </div>
      </div>
    </section>
  );
}
