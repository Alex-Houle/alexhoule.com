export default function PageHeader({ title, label, children }) {
  return (
    <header className="page-header">
      {label && <div className="page-label fade-up">{label}</div>}
      <h1 className="page-title fade-up">{title}</h1>
      {children && <p className="hero-bio fade-up">{children}</p>}
    </header>
  );
}
