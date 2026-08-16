import type { Section, SectionId } from "../types";

interface TabBarProps {
  sections: Section[];
  active: SectionId;
  onChange: (id: SectionId) => void;
}

export default function TabBar({ sections, active, onChange }: TabBarProps) {
  return (
    <div className="tab-bar">
      {sections.map((s) => (
        <button
          key={s.id}
          className={`tab ${active === s.id ? "active" : ""}`}
          onClick={() => onChange(s.id)}
          type="button"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
