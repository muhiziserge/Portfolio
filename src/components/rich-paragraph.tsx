import type { Paragraph } from "@/lib/projects";

export function RichParagraph({ runs }: { runs: Paragraph }) {
  return (
    <p>
      {runs.map((run, i) => {
        if (run.href) {
          return (
            <a key={i} href={run.href} target="_blank" rel="noopener" className="cs-link">
              {run.text}
            </a>
          );
        }
        if (run.bold) {
          return <strong key={i}>{run.text}</strong>;
        }
        return <span key={i}>{run.text}</span>;
      })}
    </p>
  );
}
