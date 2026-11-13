import { OutputList, Prompt } from "@/components/Section";
import TerminalWindow from "@/components/TerminalWindow";
import { skills, type Project } from "@/data/resume";

/**
 * A single project rendered as a large, full-size terminal window — its
 * `README.md`. The "skills used" chips come from the project's stack, matched
 * against the skills list so each chip can be labelled language vs. tooling.
 */
export default function ProjectWindow({ project }: { project: Project }) {
  const stackItems = project.stack
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <TerminalWindow
      id={project.slug}
      title={`alex@houle: ~/projects/${project.slug} — cat README.md`}
      tall
    >
      <Prompt path={`~/projects/${project.slug}`} command="cat README.md" />

      <div className="mt-4 space-y-5 sm:pl-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
          <h3 className="text-lg font-bold tracking-tight text-term-fg sm:text-xl">
            {project.name}
          </h3>
          <span className="text-[11px] text-term-faint sm:text-xs">
            {project.dates}
          </span>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.18em] text-term-faint uppercase">
            # skills used
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {stackItems.map((item) => {
              const skill = skills.find(
                (candidate) =>
                  candidate.name.toLowerCase() === item.toLowerCase(),
              );
              return (
                <li
                  key={item}
                  className="flex items-baseline gap-2 rounded border border-term-line/80 bg-term-win-2/70 px-2.5 py-1 text-xs"
                >
                  <span className="text-term-violet">{item}</span>
                  {skill ? (
                    <span className="text-[10px] text-term-faint">
                      {skill.group === "Languages" ? "language" : "tooling"}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <OutputList items={project.bullets} />

        <Prompt cursor />
      </div>
    </TerminalWindow>
  );
}
