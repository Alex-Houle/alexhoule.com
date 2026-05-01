async function loadConfig() {
  const res = await fetch('config.json');
  return res.json();
}

function tag(name, attrs = {}, ...children) {
  const el = document.createElement(name);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else if (child) el.appendChild(child);
  }
  return el;
}

function renderHero(data) {
  const section = document.getElementById('hero');
  const left = tag('div', { class: 'hero-left' },
    tag('h1', { class: 'hero-name fade-up' }, data.name),
    tag('div', { class: 'hero-title fade-up' }, data.title),
    tag('p', { class: 'hero-bio fade-up' }, data.about)
  );

  const links = tag('div', { class: 'hero-links fade-up' },
    tag('a', { href: `mailto:${data.email}` }, data.email),
    tag('a', { href: `https://${data.website}`, target: '_blank' }, data.website),
    tag('a', { href: `https://${data.github}`, target: '_blank' }, data.github),
    data.arrowLink ? tag('a', { class: 'hero-arrow-link', href: data.arrowLink.url, target: '_blank' }, data.arrowLink.label) : null
  );

  section.appendChild(left);
  section.appendChild(links);
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  
  // Look at what the inline HTML script decided the theme is
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    toggleBtn.textContent = '☀'; // Switch to sun icon if already dark
  } else {
    toggleBtn.textContent = '☾'; // Stay as moon icon if light
  }
  
  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '☾'; // Switch back to moon
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '☀'; // Switch to sun
    }
  });
}

function renderExperience(data) {
  const section = document.getElementById('experience');
  section.appendChild(tag('div', { class: 'section-label' }, 'Experience'));

  for (const exp of data.experience) {
    const bullets = tag('ul', { class: 'exp-bullets' });
    exp.bullets.forEach(b => bullets.appendChild(tag('li', {}, b)));

    const meta = tag('div', {},
      tag('div', { class: 'exp-period' }, exp.period),
      tag('div', { class: 'exp-org' }, exp.org)
    );

    const content = tag('div', {},
      tag('div', { class: 'exp-role' }, exp.role),
      bullets
    );

    const item = tag('div', { class: 'exp-item reveal' }, meta, content);
    section.appendChild(item);
  }
}

function renderProjects(data) {
  const section = document.getElementById('projects');
  section.appendChild(tag('div', { class: 'section-label' }, 'Projects'));

  for (const proj of data.projects) {
    const tagsEl = tag('div', { class: 'project-tags' });
    proj.tags.forEach(t => tagsEl.appendChild(tag('span', { class: 'tag' }, t)));

    const bullets = tag('ul', { class: 'project-bullets' });
    proj.bullets.forEach(b => bullets.appendChild(tag('li', {}, b)));

    const meta = tag('div', {},
      tag('div', { class: 'project-meta' }, proj.period)
    );

    // I removed the "color: var(--accent);" from the span below so the arrow stays black!
    const titleEl = proj.link
      ? tag('a', { 
          class: 'project-name', 
          href: proj.link, 
          target: '_blank', 
          style: 'text-decoration: none; color: inherit; display: inline-flex; align-items: center; gap: 6px;' 
        }, 
        proj.name,
        tag('span', { style: 'font-family: var(--sans); font-size: 0.75em;' }, '↗')
      )
      : tag('div', { class: 'project-name' }, proj.name);

    const content = tag('div', {},
      titleEl,
      tagsEl,
      bullets
    );

    const item = tag('div', { class: 'project-item reveal' }, meta, content);
    section.appendChild(item);
  }
}


function renderSkills(data) {
  const section = document.getElementById('skills');
  section.appendChild(tag('div', { class: 'section-label' }, 'Skills & Tools'));

  const grid = tag('div', { class: 'skills-grid' });

  for (const [group, items] of Object.entries(data.skills)) {
    const pills = tag('div', { class: 'skill-pills' });
    items.forEach(s => pills.appendChild(tag('span', {}, s)));

    const col = tag('div', { class: 'reveal' },
      tag('div', { class: 'skill-group-title' }, group),
      pills
    );
    grid.appendChild(col);
  }

  section.appendChild(grid);
}

function renderEducation(data) {
  const section = document.getElementById('education');
  section.appendChild(tag('div', { class: 'section-label' }, 'Education'));

  for (const edu of data.education) {
    const courses = tag('div', { class: 'edu-courses' },
      'Coursework: ' + edu.courses.join(' · ')
    );

    const meta = tag('div', {},
      tag('div', { class: 'edu-period' }, edu.period),
      tag('div', { class: 'edu-period' }, edu.location)
    );

    const content = tag('div', {},
      tag('div', { class: 'edu-school' }, edu.school),
      tag('div', { class: 'edu-degree' }, edu.degree),
      courses
    );

    const item = tag('div', { class: 'edu-item reveal' }, meta, content);
    section.appendChild(item);
  }
}

function renderAchievements(data) {
  const section = document.getElementById('achievements');
  section.appendChild(tag('div', { class: 'section-label' }, 'Leadership & Achievements'));

  for (const ach of data.achievements) {
    const meta = tag('div', {},
      tag('div', { class: 'achievement-org' }, ach.org)
    );

    const content = tag('div', {},
      tag('div', { class: 'achievement-title' }, ach.title),
      tag('p', { class: 'achievement-desc' }, ach.desc)
    );

    const item = tag('div', { class: 'achievement-item reveal' }, meta, content);
    section.appendChild(item);
  }
}

function renderFooter(data) {
  const footer = document.getElementById('footer');
  const left = tag('div', {},
    tag('div', { class: 'footer-name' }, data.name),
    tag('div', { class: 'footer-email' }, data.email)
  );

  const links = tag('ul', { class: 'footer-links' },
    tag('li', {}, tag('a', { href: `mailto:${data.email}` }, 'Email')),
    tag('li', {}, tag('a', { href: `https://${data.github}`, target: '_blank' }, 'GitHub')),
    tag('li', {}, tag('a', { href: `https://${data.website}`, target: '_blank' }, 'Website'))
  );

  footer.appendChild(left);
  footer.appendChild(links);
}

function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

async function init() {
  const data = await loadConfig();
  initThemeToggle();
  renderHero(data);
  renderExperience(data);
  renderProjects(data);
  renderSkills(data);
  renderEducation(data);
  if (Array.isArray(data.achievements) && data.achievements.length > 0) {
    renderAchievements(data);
  }
  renderFooter(data);
  initScrollReveal();
}

init();