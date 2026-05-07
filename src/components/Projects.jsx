import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import content from '../data/content';
import ScrollReveal from './ScrollReveal';
import '../styles/projects.css';

export default function Projects() {
  const { lang } = useLang();
  const t = content[lang].projects;
  const [activeFilter, setActiveFilter] = useState(0);

  const filteredItems = activeFilter === 0
    ? t.items
    : t.items.filter(item => item.category === t.filters[activeFilter]);

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">{t.label}</span>
          <h2 className="section-title">{t.title}</h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="project-filters">
            {t.filters.map((filter, i) => (
              <button
                key={i}
                className={`filter-btn ${activeFilter === i ? 'active' : ''}`}
                onClick={() => setActiveFilter(i)}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="projects-grid">
          {filteredItems.map((project, i) => (
            <ScrollReveal key={`${activeFilter}-${i}`} delay={i * 100}>
              <div className="project-card">
                <div className="project-card-top">
                  <div className="project-icon-row">
                    <svg className="project-folder" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                    </svg>
                    <a href={project.link} className="project-link-icon" aria-label="View project">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7v10"/>
                      </svg>
                    </a>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                </div>
                <div className="project-card-bottom">
                  <div className="project-tech">
                    {project.tech.map((t, j) => (
                      <span key={j} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
