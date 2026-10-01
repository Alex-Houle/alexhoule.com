// Every Markdown file in src/posts/ becomes a blog post. The filename is the URL slug.
const files = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true });

function parsePost(path, raw) {
  const slug = path.split('/').pop().replace(/\.md$/, '');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = {};

  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const sep = line.indexOf(':');
      if (sep === -1) continue;
      const value = line.slice(sep + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
      meta[line.slice(0, sep).trim()] = value;
    }
  }

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    summary: meta.summary || '',
    body: match ? match[2] : raw,
  };
}

export const posts = Object.entries(files)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug) {
  return posts.find(p => p.slug === slug);
}

export function formatDate(date) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
