import type { Snippet } from "../types";
import CodeBlock from "./CodeBlock";

interface SnippetCardProps {
  item: Snippet;
  highlighted?: boolean;
}

export default function SnippetCard({ item, highlighted }: SnippetCardProps) {
  return (
    <div id={item.id} className={`card snippet-card ${highlighted ? "card-highlight" : ""}`}>
      <div className="card-header snippet-header">
        <span className="card-title">{item.title}</span>
      </div>
      <div className="card-body">
        {item.description && <p className="card-answer">{item.description}</p>}
        <CodeBlock code={item.code} />
      </div>
    </div>
  );
}
