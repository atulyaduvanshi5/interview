import { useState } from "react";
import type { HookGroup } from "../types";
import SnippetCard from "./SnippetCard";

interface CustomHooksPanelProps {
  hooks: HookGroup[];
}

export default function CustomHooksPanel({ hooks }: CustomHooksPanelProps) {
  const [active, setActive] = useState(hooks[0]?.id ?? "");

  if (hooks.length === 0) {
    return <p className="empty-state">No custom hooks added yet.</p>;
  }

  const activeHook = hooks.find((h) => h.id === active) ?? hooks[0];

  return (
    <div>
      <div className="tab-bar sub-tab-bar">
        {hooks.map((h) => (
          <button
            key={h.id}
            className={`tab ${activeHook.id === h.id ? "active" : ""}`}
            onClick={() => setActive(h.id)}
            type="button"
          >
            {h.label}
          </button>
        ))}
      </div>
      <SnippetCard item={activeHook.snippet} />
    </div>
  );
}
