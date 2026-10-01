import { Link } from 'react-router';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import usePageTitle from '../usePageTitle.js';
import { posts, formatDate } from '../posts.js';

export default function Blog({ data }) {
  usePageTitle(`Blog — ${data.name}`);

  return (
    <>
      <PageHeader title="Blog" />

      <main>
        <section id="posts">
          <h2 className="section-label">Posts</h2>

          {posts.length === 0 && <p className="empty-note">No posts yet.</p>}

          {posts.map(post => (
            <Reveal className="post-item" key={post.slug}>
              <div>
                <div className="post-date">{formatDate(post.date)}</div>
              </div>

              <div>
                <h3 className="post-title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.summary && <p className="post-summary">{post.summary}</p>}
              </div>
            </Reveal>
          ))}
        </section>
      </main>
    </>
  );
}
