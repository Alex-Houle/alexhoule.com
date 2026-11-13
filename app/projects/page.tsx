import type { Metadata } from "next";
import ProjectWindow from "@/components/ProjectWindow";
import { Prompt } from "@/components/Section";
import StatusBar from "@/components/StatusBar";
import { navItems, projects } from "@/data/resume";

export const metadata: Metadata = {
  title: "Projects — Alex Houle",
  description:
    "Project write-ups, each in its own terminal window, with the skills used.",
};

export default function ProjectsPage() {
  return (
    <>
      <a
        href="/"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-1/2 focus:z-50 focus:-translate-x-1/2 focus:rounded-md focus:border focus:border-term-line focus:bg-term-head focus:px-3 focus:py-2 focus:text-xs focus:text-term-fg"
      >
        back to the resume
      </a>

      <main className="mx-auto flex min-h-[100dvh] w-full flex-col items-center gap-6 p-4 pb-24 sm:gap-8 sm:p-8 sm:pb-32">
        <header className="w-full max-w-4xl">
          <Prompt path="~/projects" command="ls -la" />
          <h1 className="mt-4 text-xl font-bold tracking-tight text-term-fg sm:text-2xl">
            Projects
          </h1>
          <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[13px]">
            <span className="text-term-faint" aria-hidden="true">
              $
            </span>
            <a href="/" className="term-cta text-base">
              cd home
            </a>
          </p>
        </header>

        <div className="flex w-full max-w-4xl flex-col gap-6 sm:gap-8">
          {projects.map((project) => (
            <ProjectWindow key={project.slug} project={project} />
          ))}
        </div>

        <StatusBar items={navItems} />
      </main>
    </>
  );
}
