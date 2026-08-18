import { useState } from "react";
import type { SubTabGroup } from "../types";
import SnippetCard from "./SnippetCard";

interface SubTabsPanelProps {
  groups: SubTabGroup[];
  emptyLabel: string;
}

export default function SubTabsPanel({ groups, emptyLabel }: SubTabsPanelProps) {
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
      <SnippetCard item={activeGroup.snippet} />
    </div>
  );
}
