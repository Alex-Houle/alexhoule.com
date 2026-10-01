import { Link, useParams } from 'react-router';
import Markdown from 'react-markdown';
import PageHeader from '../components/PageHeader.jsx';
import NotFound from './NotFound.jsx';
import usePageTitle from '../usePageTitle.js';
import { getPost, formatDate } from '../posts.js';

export default function BlogPost({ data }) {
  const { slug } = useParams();
  const post = getPost(slug);
  usePageTitle(post ? `${post.title} — ${data.name}` : `Not found — ${data.name}`);

  if (!post) return <NotFound data={data} />;

  return (
    <>
      <PageHeader title={post.title} label={formatDate(post.date)} />

      <main>
        <section>
          <article className="prose">
            <Markdown>{post.body}</Markdown>
          </article>

          <Link className="back-link" to="/blog">← All posts</Link>
        </section>
      </main>
    </>
  );
}
