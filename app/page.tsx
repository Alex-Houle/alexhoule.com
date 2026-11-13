import Link from "next/link";
import { Entry, OutputList, Prompt, Section } from "@/components/Section";
import SkillsTable from "@/components/SkillsTable";
import StatusBar from "@/components/StatusBar";
import TerminalWindow from "@/components/TerminalWindow";
import {
  achievements,
  contacts,
  education,
  experience,
  navItems,
  profile,
  resumeDownload,
} from "@/data/resume";

const sectionMeta = Object.fromEntries(navItems.map((item) => [item.id, item]));

export default function Page() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-1/2 focus:z-50 focus:-translate-x-1/2 focus:rounded-md focus:border focus:border-term-line focus:bg-term-head focus:px-3 focus:py-2 focus:text-xs focus:text-term-fg"
      >
        skip to content
      </a>

      <main className="mx-auto flex min-h-[100dvh] w-full flex-col items-center gap-6 p-4 pb-24 sm:gap-8 sm:p-8 sm:pb-32">
        {/* ------------------------------ whoami ------------------------------ */}
        <div className="w-full max-w-6xl">
          <TerminalWindow id="about" title="alex@houle: ~ — whoami">
            <Prompt command="whoami" />
            <div className="mt-4 space-y-4 sm:pl-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-term-fg sm:text-3xl">
                  {profile.name}
                </h1>
                <p className="mt-2 text-sm text-term-muted">
                  {profile.roleLines[0]}
                </p>
                <p className="text-sm text-term-faint">
                  {profile.roleLines[1]}
                </p>
              </div>

              <p className="max-w-xl text-[13px] leading-relaxed text-term-muted">
                Computer science student at the University of New Hampshire,
                working on networking conformance testing and interoperability
                at the UNH Interoperability Lab.
              </p>

              <dl className="grid max-w-md gap-1.5 text-[13px]">
                {contacts.map((contact) => (
                  <div key={contact.label} className="flex gap-3">
                    <dt className="w-14 shrink-0 text-term-faint">
                      {contact.label}
                    </dt>
                    <dd className="min-w-0">
                      <a
                        href={contact.href}
                        {...(contact.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className="break-all text-term-blue underline-offset-4 hover:underline"
                      >
                        {contact.display}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-5 sm:pl-4">
              <Prompt cursor />
            </div>
          </TerminalWindow>
        </div>

        {/* ---------------------- education (featured) ----------------------- */}
        <div className="w-full max-w-6xl">
          <TerminalWindow
            id="education"
            title="alex@houle: ~/edu — cat education.txt"
            tall
          >
            <Section
              id="education-content"
              title={sectionMeta.education.title}
              command={sectionMeta.education.command}
              note="1 record"
            >
              <Entry
                heading={education.school}
                meta={education.dates}
                subheading={`${education.degree} · ${education.location}`}
              >
                <OutputList items={education.bullets} />
              </Entry>

              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[13px]">
                <span className="text-term-faint" aria-hidden="true">
                  $
                </span>
                <Link
                  href="/projects"
                  className="term-cta text-base"
                >
                  cd ~/projects
                </Link>
              </p>
            </Section>
          </TerminalWindow>
        </div>

        {/* ----------------------- experience | skills ------------------------ */}
        <div className="grid w-full max-w-6xl gap-6 sm:gap-8 lg:grid-cols-2">
          <TerminalWindow
            id="experience"
            title="alex@houle: ~/work — cat experience.log"
          >
            <Section
              id="experience-content"
              title={sectionMeta.experience.title}
              command={sectionMeta.experience.command}
              note={`${experience.length} records`}
            >
              {experience.map((role) => (
                <Entry
                  key={`${role.title}-${role.organization}`}
                  heading={role.title}
                  meta={role.dates}
                  subheading={`${role.organization} · ${role.location}`}
                >
                  <OutputList items={role.bullets} />
                </Entry>
              ))}
            </Section>
          </TerminalWindow>

          <TerminalWindow id="skills" title="alex@houle: ~ — ss -tunap">
            <Section
              id="skills-content"
              title={sectionMeta.skills.title}
              command={sectionMeta.skills.command}
              note="listening"
            >
              <SkillsTable />
            </Section>
          </TerminalWindow>
        </div>

        {/* --------------------- achievements | logout ------------------------ */}
        <div className="grid w-full max-w-6xl gap-6 sm:gap-8 lg:grid-cols-2">
          <TerminalWindow
            id="achievements"
            title="alex@houle: ~/misc — cat achievements.txt"
          >
            <Section
              id="achievements-content"
              title={sectionMeta.achievements.title}
              command={sectionMeta.achievements.command}
              note="1 record"
            >
              {achievements.map((item) => (
                <Entry
                  key={item.title}
                  heading={item.title}
                  meta={item.dates || undefined}
                >
                  <OutputList items={item.bullets} />
                </Entry>
              ))}
            </Section>
          </TerminalWindow>

          <TerminalWindow id="footer" title="alex@houle: ~ — logout">
            <Prompt command="exit" />
            <div className="mt-3 space-y-2.5 text-[13px] sm:pl-4">
              <p className="text-term-muted">
                connection to alexhoule.com closed.
              </p>
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-term-faint" aria-hidden="true">
                  $
                </span>
                <a
                  href={resumeDownload.href}
                  download={resumeDownload.filename}
                  className="text-term-blue underline-offset-4 hover:underline"
                >
                  cat {resumeDownload.filename}
                </a>
                <span className="text-term-faint"># {resumeDownload.note}</span>
              </p>
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-term-faint" aria-hidden="true">
                  $
                </span>
                <a
                  href={resumeDownload.sourceHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-term-blue underline-offset-4 hover:underline"
                >
                  cat {resumeDownload.sourceLabel}
                </a>
                <span className="text-term-faint">
                  # {resumeDownload.sourceNote}
                </span>
              </p>
              <Prompt cursor />
            </div>
          </TerminalWindow>
        </div>

        <StatusBar items={navItems} />
      </main>
    </>
  );
}
