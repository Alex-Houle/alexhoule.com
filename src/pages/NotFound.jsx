import { Link } from 'react-router';
import PageHeader from '../components/PageHeader.jsx';
import usePageTitle from '../usePageTitle.js';

export default function NotFound({ data }) {
  usePageTitle(`Not found — ${data.name}`);

  return (
    <>
      <PageHeader title="Page not found">
        That page doesn't exist.
      </PageHeader>

      <main>
        <section>
          <Link className="back-link" to="/">← Back home</Link>
        </section>
      </main>
    </>
  );
}
