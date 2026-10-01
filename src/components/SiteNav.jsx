import { NavLink } from 'react-router';

export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Main">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/portfolio">Portfolio</NavLink>
      <NavLink to="/blog">Blog</NavLink>
    </nav>
  );
}
