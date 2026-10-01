import ExternalLink from './ExternalLink.jsx';

export default function Footer({ data }) {
  return (
    <footer id="footer">
      <div>
        <div className="footer-name">{data.name}</div>
        <div className="footer-email">{data.email}</div>
      </div>

      <ul className="footer-links">
        <li><a href={`mailto:${data.email}`}>Email</a></li>
        <li><ExternalLink href={`https://${data.github}`}>GitHub</ExternalLink></li>
        <li><ExternalLink href={`https://${data.website}`}>Website</ExternalLink></li>
      </ul>
    </footer>
  );
}
