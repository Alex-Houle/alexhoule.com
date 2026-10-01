import Reveal from './Reveal.jsx';

export default function Achievements({ achievements }) {
  // An empty section would still take up padding and leave a blank gap
  if (!Array.isArray(achievements) || achievements.length === 0) return null;

  return (
    <section id="achievements">
      <h2 className="section-label">Leadership &amp; Achievements</h2>

      {achievements.map(ach => (
        <Reveal className="achievement-item" key={`${ach.org}-${ach.title}`}>
          <div>
            <div className="achievement-org">{ach.org}</div>
          </div>

          <div>
            <h3 className="achievement-title">{ach.title}</h3>
            <p className="achievement-desc">{ach.desc}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
