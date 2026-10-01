import ExternalLink from './ExternalLink.jsx';

export default function Hero({ data }) {
  return (
    <header id="hero">
      <div className="hero-left">
        <h1 className="hero-name fade-up">{data.name}</h1>
        <div className="hero-title fade-up">{data.title}</div>
        <p className="hero-bio fade-up">{data.about}</p>
      </div>

      <nav className="hero-links fade-up" aria-label="Contact">
        <a href={`mailto:${data.email}`}>{data.email}</a>
        <ExternalLink href={`https://${data.github}`}>{data.github}</ExternalLink>
        {data.arrowLink && (
          <ExternalLink className="hero-arrow-link" href={data.arrowLink.url}>
            {data.arrowLink.label}
          </ExternalLink>
        )}
      </nav>
    </header>
  );
}
