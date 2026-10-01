import Reveal from './Reveal.jsx';

export default function Education({ education }) {
  return (
    <section id="education">
      <h2 className="section-label">Education</h2>

      {education.map(edu => (
        <Reveal className="edu-item" key={`${edu.school}-${edu.degree}`}>
          <div>
            <div className="edu-period">{edu.period}</div>
            <div className="edu-period">{edu.location}</div>
          </div>

          <div>
            <h3 className="edu-school">{edu.school}</h3>
            <div className="edu-degree">{edu.degree}</div>
            <div className="edu-courses">
              Coursework: {edu.courses.join(' · ')}
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
