"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/data/resume";

/**
 * tmux-style status bar pinned to the bottom of the terminal window.
 * The left side is section navigation; the right side is a local clock.
 *
 * `basePath` is the deployment base path (defaults to `/` for the custom-domain
 * deployment at the domain root) and is prefixed to every nav href, both
 * in-page anchors (`/#about`) and section routes (`/projects`). Links are plain
 * anchors on purpose: the hash-bearing hrefs above need full control over the
 * final URL.
 */
export default function StatusBar({
  items,
  basePath = "/",
}: {
  items: NavItem[];
  basePath?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [clock, setClock] = useState<string | null>(null);

  // Normalize so in-page anchors become `/#about`, routes `/projects`.
  const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const hrefFor = (item: NavItem) =>
    item.href
      ? `${normalizedBase}${item.href.replace(/^\/+/, "")}`
      : `${normalizedBase}#${item.id}`;

  // Highlight the section currently in view.
  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  // Local clock (rendered client-side only to avoid hydration mismatch).
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 20000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="no-print fixed inset-x-0 bottom-0 z-20 mx-auto mb-3 flex w-[calc(100vw-1rem)] max-w-3xl items-center gap-1.5 rounded-full border border-term-line/80 bg-term-head/90 px-2.5 py-1.5 text-[11px] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.95)] backdrop-blur-[1px] sm:w-fit sm:gap-2 sm:px-3">
      <span className="hidden shrink-0 text-term-amber sm:inline">[term]</span>
      <nav
        aria-label="Sections"
        className="flex max-w-full flex-wrap items-center justify-center gap-0.5 sm:flex-nowrap"
      >
        {items.map((item, index) => (
          <a
            key={item.id}
            href={hrefFor(item)}
            aria-current={active === item.id ? "true" : undefined}
            className={
              "tab whitespace-nowrap text-[10px] uppercase tracking-[0.16em] sm:text-[11px] " +
              (active === item.id
                ? "bg-white/[0.08] !text-term-fg ring-1 ring-term-line/80"
                : "")
            }
          >
            {index}:{item.key.toLowerCase()}
          </a>
        ))}
      </nav>
      <span className="ml-auto hidden shrink-0 text-term-faint sm:inline">
        {clock ?? "--:--"}
      </span>
    </footer>
  );
}
