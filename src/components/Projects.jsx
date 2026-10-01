import ExternalLink from './ExternalLink.jsx';
import Reveal from './Reveal.jsx';

export default function Projects({ projects }) {
  return (
    <section id="projects">
      <h2 className="section-label">Projects</h2>

      {projects.map(proj => (
        <Reveal className="project-item" key={proj.name}>
          <div>
            <div className="project-meta">{proj.period}</div>
          </div>

          <div>
            <h3 className="project-name">
              {proj.link ? (
                <ExternalLink href={proj.link}>
                  {proj.name}
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </ExternalLink>
              ) : proj.name}
            </h3>

            <div className="project-tags">
              {proj.tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>

            <ul className="project-bullets">
              {proj.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
