// ---------------------------------------------------------------------------
// resume.ts
//
// Single source of truth for every fact rendered on this site.
// All values are transcribed verbatim from /resume.latex (Alex Houle).
// Edit this file to update the site; no other file holds resume content.
// ---------------------------------------------------------------------------

export type ContactLink = {
  /** Human readable label, e.g. "email". */
  label: string;
  /** Value as printed on the resume. */
  display: string;
  href: string;
};

export type Education = {
  school: string;
  location: string;
  degree: string;
  dates: string;
  bullets: string[];
};

export type Position = {
  title: string;
  dates: string;
  organization: string;
  location: string;
  bullets: string[];
};

export type Project = {
  name: string;
  /** URL-safe id, used to give each project its own page and window. */
  slug: string;
  /** Tech stack exactly as listed after the pipe in the resume heading. */
  stack: string;
  dates: string;
  bullets: string[];
};

export type Achievement = {
  title: string;
  dates: string;
  bullets: string[];
};

export type Skill = {
  /** Skill name, verbatim. */
  name: string;
  /** Which resume group the skill was listed under, verbatim. */
  group: "Languages" | "Frameworks/Tools";
};

export type SkillRow = Skill & {
  // --- presentation-only columns (faux packet capture) -------------------
  // These are decorative values used to style the skills table as a network
  // status readout. They carry no factual meaning.
  proto: string;
  port: string;
  state: string;
};

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

export const profile = {
  name: "Alex Houle",
  /** Verbatim role/summary lines taken from the resume. */
  roleLines: [
    "Test Technician @ UNH Interoperability Lab",
    "Bachelor of Science in Computer Science — University of New Hampshire",
  ],
  /** Short phrase used for the browser tab / metadata description. */
  tagline:
    "Computer Science student at the University of New Hampshire. Networking, systems programming, and security.",
} as const;

export const contacts: ContactLink[] = [
  {
    label: "linkedin",
    display: "linkedin.com/in/alex-houle-53a4b9328",
    href: "https://www.linkedin.com/in/alex-houle-53a4b9328",
  },
  {
    label: "git",
    display: "github.com/Alex-Houle",
    href: "https://github.com/Alex-Houle",
  },
];

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export const education: Education = {
  school: "University of New Hampshire",
  location: "Durham, NH",
  degree: "Bachelor of Science in Computer Science",
  dates: "Expected May 2028",
  bullets: [
    "Relevant Coursework: Data Structures & Algorithms, Computer Networks, Operating Systems, Systems Programming.",
  ],
};

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export const experience: Position[] = [
  {
    title: "Test Technician",
    dates: "March 2026 – Present",
    organization: "UNH Interoperability Lab",
    location: "Durham, NH",
    bullets: [
      "Executed conformance test plans for Time-Sensitive Networking protocols, standards IEEE 802.1AS, 802.1Q, and 802.1BA.",
      "Conducted multi-vendor interoperability testing on Layer 2 networking devices, identifying configuration issues to ensure seamless communication across networking equipment.",
      "Performed Layer 2 MAC-level conformance testing against IEEE 802.3 standards, using packet capture tools to verify conformance.",
      "Performed high-speed InfiniBand interoperability testing across NICs, transceivers/DACs, and switches.",
    ],
  },
  {
    title: "Cybersecurity Team Member",
    dates: "Sept 2024 – Present",
    organization: "University Cybersecurity Club",
    location: "Durham, NH",
    bullets: [
      "Competed in the NECCDC, managing Linux infrastructure, Keycloak authentication services, and Gitea repositories while completing incident response tasks and operational injects under time constraints.",
      "Collaborate with peers to analyze vulnerabilities, practice penetration testing, and strengthen overall security awareness.",
      "Hardened Linux systems during attack-and-defense cybersecurity competitions, helping maintain service availability and improve team scoring.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    name: "Chess Engine",
    slug: "chess-engine",
    stack: "C, Bitboards, Systems Programming",
    dates: "March 2024 – October 2025",
    bullets: [
      "Designed and implemented a high-performance chess engine using bitboards for efficient move generation and position evaluation.",
      "Implemented algorithms for move validation, game state evaluation, and search optimization (minimax, alpha-beta pruning).",
      "Applied low-level systems programming concepts such as memory management, bit manipulation, and Performance Optimization.",
    ],
  },
  {
    name: "OpnLaaS (Lab as a Service)",
    slug: "opnlaas",
    stack: "Go, Fiber, Proxmox API, Tailwind CSS",
    dates: "2025 – 2025",
    bullets: [
      "Developed a full-stack orchestration platform for automated provisioning of virtual machines and containers.",
      "Architected a scalable backend in Go using the Fiber framework to interface with Proxmox APIs for real-time resource management.",
      "Built a responsive web dashboard with Tailwind CSS, enabling users to request, monitor, and manage isolated lab environments.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skills: Skill[] = [
  { name: "C", group: "Languages" },
  { name: "Go", group: "Languages" },
  { name: "Java", group: "Languages" },
  { name: "Python", group: "Languages" },
  { name: "JavaScript", group: "Languages" },
  { name: "HTML/CSS", group: "Languages" },
  { name: "React", group: "Frameworks/Tools" },
  { name: "Fiber", group: "Frameworks/Tools" },
  { name: "Flask", group: "Frameworks/Tools" },
  { name: "Docker", group: "Frameworks/Tools" },
  { name: "Linux", group: "Frameworks/Tools" },
  { name: "Git", group: "Frameworks/Tools" },
  { name: "Tailwind CSS", group: "Frameworks/Tools" },
];

/**
 * Skills rendered as a faux packet capture / network status table.
 * `proto`, `port`, and `state` are decorative presentation columns only.
 */
export const skillRows: SkillRow[] = [
  { name: "C", group: "Languages", proto: "tcp", port: "8081", state: "ESTABLISHED" },
  { name: "Go", group: "Languages", proto: "tcp", port: "8000", state: "ESTABLISHED" },
  { name: "Java", group: "Languages", proto: "tcp", port: "1099", state: "ESTABLISHED" },
  { name: "Python", group: "Languages", proto: "tcp", port: "5001", state: "ESTABLISHED" },
  { name: "JavaScript", group: "Languages", proto: "tcp", port: "3001", state: "ESTABLISHED" },
  { name: "HTML/CSS", group: "Languages", proto: "tcp", port: "80", state: "LISTEN" },
  { name: "React", group: "Frameworks/Tools", proto: "tcp", port: "5173", state: "ESTABLISHED" },
  { name: "Fiber", group: "Frameworks/Tools", proto: "tcp", port: "3000", state: "LISTEN" },
  { name: "Flask", group: "Frameworks/Tools", proto: "tcp", port: "5000", state: "LISTEN" },
  { name: "Docker", group: "Frameworks/Tools", proto: "unix", port: "2375", state: "LISTEN" },
  { name: "Linux", group: "Frameworks/Tools", proto: "unix", port: "22", state: "ESTABLISHED" },
  { name: "Git", group: "Frameworks/Tools", proto: "tcp", port: "9418", state: "ESTABLISHED" },
  { name: "Tailwind CSS", group: "Frameworks/Tools", proto: "tcp", port: "8080", state: "ESTABLISHED" },
];

/** Group names as they appear on the resume, for the legend above the table. */
export const skillGroups = [
  { group: "Languages" as const, members: skills.filter((s) => s.group === "Languages").map((s) => s.name) },
  {
    group: "Frameworks/Tools" as const,
    members: skills.filter((s) => s.group === "Frameworks/Tools").map((s) => s.name),
  },
];

// ---------------------------------------------------------------------------
// Leadership & Achievements
// ---------------------------------------------------------------------------

export const achievements: Achievement[] = [
  {
    title: "Eagle Scout, Boy Scouts of America",
    dates: "",
    bullets: [
      "Led a service project coordinating volunteers, resources, and logistics, demonstrating leadership, initiative, and project management skills.",
      "Developed resilience, teamwork, and problem-solving through years of community service and outdoor leadership.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Navigation / sections
// ---------------------------------------------------------------------------

export type SectionId = "about" | "education" | "experience" | "projects" | "skills" | "achievements";

export type NavItem = {
  id: SectionId;
  /** Keycap label shown in the nav bar. */
  key: string;
  /** Shell command echoed in the section header. */
  command: string;
  title: string;
  /** Absolute link target. Defaults to an in-page anchor for `id`. */
  href?: string;
};

export const navItems: NavItem[] = [
  { id: "about", key: "WHOAMI", command: "whoami", title: "Identity" },
  { id: "education", key: "EDU", command: "cat education.txt", title: "Education" },
  { id: "experience", key: "EXP", command: "cat experience.log", title: "Experience" },
  {
    id: "projects",
    key: "PROJ",
    command: "ls -la ~/projects",
    title: "Projects",
    /** Projects live on their own page; each project gets a full window there. */
    href: "/projects",
  },
  { id: "skills", key: "SKILLS", command: "ss -tunap --skills", title: "Technical Skills" },
  { id: "achievements", key: "ACHV", command: "cat achievements.txt", title: "Leadership & Achievements" },
];

/**
 * Downloadable resume, served from /public.
 *
 * `resume.pdf` was compiled from `resume.latex` with pdflatex (TeX Live 2026)
 * — see scripts/compile-resume.sh. The original LaTeX source is offered as a
 * secondary link.
 */
export const resumeDownload = {
  href: "/Alex_Houle_Resume.pdf",
  filename: "Alex_Houle_Resume.pdf",
  /** Shown as a note under the button. */
  note: "PDF · 1 page · compiled from resume.latex with pdflatex",
  sourceHref: "/resume.latex",
  sourceLabel: "resume.latex",
  sourceNote: "view LaTeX source",
};
