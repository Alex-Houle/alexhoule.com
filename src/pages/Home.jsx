import Hero from '../components/Hero.jsx';
import Experience from '../components/Experience.jsx';
import Skills from '../components/Skills.jsx';
import Education from '../components/Education.jsx';
import Achievements from '../components/Achievements.jsx';
import usePageTitle from '../usePageTitle.js';

export default function Home({ data }) {
  usePageTitle(`${data.name} — Software Engineer`);

  return (
    <>
      <Hero data={data} />

      <main>
        <Experience experience={data.experience} />
        <Skills skills={data.skills} />
        <Education education={data.education} />
        <Achievements achievements={data.achievements} />
      </main>
    </>
  );
}
