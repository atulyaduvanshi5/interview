import { useEffect, useState } from "react";
import type { SubTabGroupMulti } from "../types";
import SnippetCard from "./SnippetCard";
import JumpChips from "./JumpChips";

interface MultiSubTabsPanelProps {
  groups: SubTabGroupMulti[];
  emptyLabel: string;
}

export default function MultiSubTabsPanel({ groups, emptyLabel }: MultiSubTabsPanelProps) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
    if (!highlightId) return;
    const timer = setTimeout(() => setHighlightId(null), 2000);
    return () => clearTimeout(timer);
  }, [highlightId]);

  if (groups.length === 0) {
    return <p className="empty-state">{emptyLabel}</p>;
  }

  const activeGroup = groups.find((g) => g.id === active) ?? groups[0];

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setHighlightId(id);
    const headerOffset = document.querySelector(".sticky-top")?.clientHeight ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset - 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div>
      <div className="tab-bar sub-tab-bar">
        {groups.map((g) => (
          <button
            key={g.id}
            className={`tab ${activeGroup.id === g.id ? "active" : ""}`}
            onClick={() => {
              setActive(g.id);
              setHighlightId(null);
            }}
            type="button"
          >
            {g.label}
          </button>
        ))}
      </div>

      <JumpChips
        items={activeGroup.snippets.map((s) => ({ id: s.id, label: s.title }))}
        onJump={handleJump}
      />

      {activeGroup.snippets.map((s) => (
        <SnippetCard key={s.id} item={s} highlighted={highlightId === s.id} />
      ))}
    </div>
  );
}
