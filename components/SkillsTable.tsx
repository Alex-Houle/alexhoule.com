import { skillRows } from "@/data/resume";

/**
 * Skills rendered as the output of a socket-status style listing.
 * The `proto` / `port` / `state` columns are decorative presentation only.
 */
export default function SkillsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] border-collapse text-left text-[13px]">
        <caption className="sr-only">
          Technical skills. The protocol, port, and state columns are
          decorative; the skill and group columns carry the resume facts.
        </caption>
        <thead>
          <tr className="text-[10px] tracking-[0.18em] text-term-faint uppercase">
            <th scope="col" className="border-b border-term-line py-2 pr-4 font-normal">
              skill
            </th>
            <th scope="col" className="border-b border-term-line py-2 pr-4 font-normal">
              group
            </th>
            <th scope="col" className="border-b border-term-line py-2 pr-4 font-normal">
              proto
            </th>
            <th scope="col" className="border-b border-term-line py-2 pr-4 font-normal">
              port
            </th>
            <th scope="col" className="border-b border-term-line py-2 font-normal">
              state
            </th>
          </tr>
        </thead>
        <tbody>
          {skillRows.map((row) => (
            <tr
              key={row.name}
              className="border-b border-term-line-soft transition-colors last:border-b-0 hover:bg-white/[0.025]"
            >
              <td className="py-2 pr-4 font-medium text-term-fg">{row.name}</td>
              <td className="py-2 pr-4 text-term-faint">
                {row.group === "Languages" ? "language" : "tooling"}
              </td>
              <td className="py-2 pr-4 text-term-violet">{row.proto}</td>
              <td className="py-2 pr-4 text-term-muted">{row.port}</td>
              <td
                className={
                  row.state === "LISTEN"
                    ? "py-2 text-term-amber"
                    : "py-2 text-term-teal"
                }
              >
                {row.state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
