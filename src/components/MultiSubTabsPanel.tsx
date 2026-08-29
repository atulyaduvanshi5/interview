import { useState } from "react";
import type { SubTabGroupMulti } from "../types";
import SnippetCard from "./SnippetCard";

interface MultiSubTabsPanelProps {
  groups: SubTabGroupMulti[];
  emptyLabel: string;
}

export default function MultiSubTabsPanel({ groups, emptyLabel }: MultiSubTabsPanelProps) {
  const [active, setActive] = useState(groups[0]?.id ?? "");

  if (groups.length === 0) {
    return <p className="empty-state">{emptyLabel}</p>;
  }

  const activeGroup = groups.find((g) => g.id === active) ?? groups[0];

  return (
    <div>
      <div className="tab-bar sub-tab-bar">
        {groups.map((g) => (
          <button
            key={g.id}
            className={`tab ${activeGroup.id === g.id ? "active" : ""}`}
            onClick={() => setActive(g.id)}
            type="button"
          >
            {g.label}
          </button>
        ))}
      </div>
      {activeGroup.snippets.map((s) => (
        <SnippetCard key={s.id} item={s} />
      ))}
    </div>
  );
}
