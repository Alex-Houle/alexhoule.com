import Reveal from './Reveal.jsx';

export default function Skills({ skills }) {
  return (
    <section id="skills">
      <h2 className="section-label">Skills &amp; Tools</h2>

      <div className="skills-grid">
        {Object.entries(skills).map(([group, items]) => (
          <Reveal key={group}>
            <h3 className="skill-group-title">{group}</h3>
            <div className="skill-pills">
              {items.map(s => <span key={s}>{s}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
