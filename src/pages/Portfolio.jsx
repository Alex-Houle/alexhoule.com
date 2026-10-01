import PageHeader from '../components/PageHeader.jsx';
import Projects from '../components/Projects.jsx';
import usePageTitle from '../usePageTitle.js';

export default function Portfolio({ data }) {
  usePageTitle(`Portfolio — ${data.name}`);

  return (
    <>
      <PageHeader title="Portfolio" />

      <main>
        <Projects projects={data.projects} />
      </main>
    </>
  );
}
