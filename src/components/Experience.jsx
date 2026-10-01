import Reveal from './Reveal.jsx';

export default function Experience({ experience }) {
  return (
    <section id="experience">
      <h2 className="section-label">Experience</h2>

      {experience.map(exp => (
        <Reveal className="exp-item" key={`${exp.role}-${exp.org}`}>
          <div>
            <div className="exp-period">{exp.period}</div>
            <div className="exp-org">{exp.org}</div>
          </div>

          <div>
            <h3 className="exp-role">{exp.role}</h3>
            <ul className="exp-bullets">
              {exp.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
