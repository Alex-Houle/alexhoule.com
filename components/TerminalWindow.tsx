import type { ReactNode } from "react";

type TerminalWindowProps = {
  id?: string;
  title: string;
  children: ReactNode;
  /** Pinned bar below the scroll area, typically the tmux-style status bar. */
  footer?: ReactNode;
  /** Taller scroll area, used for the full-size windows on the projects page. */
  tall?: boolean;
  className?: string;
};

/**
 * A desktop terminal window: title bar with decorative macOS-style controls,
 * a scrolling body, and an optional pinned footer.
 *
 * Width is left to the parent so windows can sit side by side in a grid on
 * wide screens and stack vertically on narrow ones.
 *
 * On phones the window sizes to its content and the page scrolls normally —
 * nesting a scroll area inside a full-height window is miserable to use on
 * touch. The capped height and inner scroll kick in at `sm` and up, where the
 * desktop layout actually benefits from them.
 */
export default function TerminalWindow({
  id,
  title,
  children,
  footer,
  tall = false,
  className = "",
}: TerminalWindowProps) {
  return (
    <section
      id={id}
      aria-label={title}
      className={
        "window flex w-full flex-col overflow-hidden border border-term-line/90 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] sm:min-h-[240px] sm:rounded-lg " +
        (tall
          ? "sm:max-h-[min(86dvh,900px)] "
          : "sm:max-h-[min(72dvh,760px)] ") +
        className
      }
    >
      <header className="window-head flex shrink-0 items-center gap-3 border-b border-term-line/90 px-3.5 py-2">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <p className="min-w-0 flex-1 truncate text-center text-[11px] tracking-wide text-term-faint sm:text-xs">
          {title}
        </p>
        <div className="w-[44px] shrink-0" aria-hidden="true" />
      </header>

      <div className="term-scroll relative flex-1 bg-gradient-to-b from-term-win/95 to-term-win sm:overflow-y-auto">
        <div className="px-4 py-5 sm:px-5 sm:py-5">{children}</div>
      </div>

      {footer}
    </section>
  );
}
