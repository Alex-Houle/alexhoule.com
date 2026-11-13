/**
 * Shell-styled content primitives.
 *
 * Every resume section is rendered as a command followed by its output, so the
 * whole page reads like one continuous terminal session.
 */

type PromptProps = {
  /** Command text shown after the `$`. Omit to render a bare prompt. */
  command?: string;
  /** Working directory segment shown before the `$`. */
  path?: string;
  /** Render a blinking block cursor after the command. */
  cursor?: boolean;
};

export function Prompt({ command, path = "~", cursor = false }: PromptProps) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[13px] sm:text-sm">
      <span className="whitespace-nowrap">
        <span className="text-term-teal">alex@houle</span>
        <span className="text-term-faint">:</span>
        <span className="text-term-blue">{path}</span>
      </span>
      <span className="text-term-faint" aria-hidden="true">
        $
      </span>
      {command ? <span className="text-term-fg">{command}</span> : null}
      {cursor ? <span className="cursor-block" aria-hidden="true" /> : null}
    </p>
  );
}

type SectionProps = {
  id: string;
  /** Visually-hidden heading used for document structure. */
  title: string;
  command: string;
  path?: string;
  /** Faint right-hand comment, e.g. "3 records". */
  note?: string;
  children: React.ReactNode;
};

export function Section({ id, title, command, path, note, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="reveal scroll-mt-2"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 id={`${id}-title`} className="sr-only">
          {title}
        </h2>
        <Prompt command={command} path={path} />
        {note ? (
          <span className="text-[11px] text-term-faint"># {note}</span>
        ) : null}
      </div>
      <div className="mt-3 space-y-6 sm:pl-5">{children}</div>
    </section>
  );
}

type EntryProps = {
  heading: React.ReactNode;
  meta?: string;
  subheading?: string;
  children?: React.ReactNode;
};

export function Entry({ heading, meta, subheading, children }: EntryProps) {
  return (
    <article className="border-l border-term-line-soft pl-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <h3 className="text-[14px] font-semibold text-term-fg sm:text-[15px]">
          {heading}
        </h3>
        {meta ? (
          <span className="text-[11px] text-term-faint sm:text-xs">{meta}</span>
        ) : null}
      </div>
      {subheading ? (
        <p className="mt-0.5 text-xs text-term-amber/90">{subheading}</p>
      ) : null}
      {children ? <div className="mt-2">{children}</div> : null}
    </article>
  );
}

export function OutputList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2.5 text-[13px] leading-relaxed text-term-muted"
        >
          <span aria-hidden="true" className="shrink-0 text-term-faint">
            -
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
