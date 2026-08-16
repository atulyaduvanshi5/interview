import { useEffect, useState } from "react";
import type { Question } from "../types";
import CodeBlock from "./CodeBlock";

interface QuestionCardProps {
  item: Question;
  forceOpen?: boolean;
  highlighted?: boolean;
}

export default function QuestionCard({ item, forceOpen, highlighted }: QuestionCardProps) {
  const [open, setOpen] = useState(false);
  const isOpen = forceOpen || open || highlighted;

  useEffect(() => {
    if (highlighted) setOpen(true);
  }, [highlighted]);

  return (
    <div id={item.id} className={`card ${highlighted ? "card-highlight" : ""}`}>
      <button
        className="card-header"
        onClick={() => setOpen((o) => !o)}
        type="button"
        aria-expanded={isOpen}
      >
        <span className="card-title">{item.question}</span>
        <span className={`chevron ${isOpen ? "open" : ""}`}>›</span>
      </button>
      {isOpen && (
        <div className="card-body">
          <p className="card-answer">{item.shortAnswer}</p>
          {item.keyPoints && item.keyPoints.length > 0 && (
            <ul className="card-keypoints">
              {item.keyPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          )}
          {item.code && <CodeBlock code={item.code} />}
        </div>
      )}
    </div>
  );
}
