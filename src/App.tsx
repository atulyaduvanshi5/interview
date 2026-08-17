import { useEffect, useMemo, useState } from "react";
import type { Section, SectionId } from "./types";
import { javascriptQuestions } from "./data/javascript";
import { reactQuestions } from "./data/react";
import { nextjsQuestions } from "./data/nextjs";
import { codingQuestions } from "./data/coding";
import { myCodeSnippets } from "./data/myCode";
import { customHooks } from "./data/customHooks";
import SearchBar from "./components/SearchBar";
import TabBar from "./components/TabBar";
import JumpChips from "./components/JumpChips";
import QuestionCard from "./components/QuestionCard";
import SnippetCard from "./components/SnippetCard";
import CustomHooksPanel from "./components/CustomHooksPanel";

const SECTIONS: Section[] = [
  { id: "javascript", label: "JavaScript" },
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "coding", label: "Coding" },
  { id: "mycode", label: "My Code" },
  { id: "customhooks", label: "Custom Hooks" },
];

const QUESTION_DATA: Record<
  Exclude<SectionId, "mycode" | "customhooks">,
  typeof javascriptQuestions
> = {
  javascript: javascriptQuestions,
  react: reactQuestions,
  nextjs: nextjsQuestions,
  coding: codingQuestions,
};

function normalize(str: string) {
  return str.toLowerCase();
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("javascript");
  const [search, setSearch] = useState("");
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const searching = search.trim().length > 0;

  const jumpItems = useMemo(() => {
    if (searching || activeSection === "customhooks") return [];
    const items =
      activeSection === "mycode"
        ? myCodeSnippets.map((s) => ({ id: s.id, label: s.title }))
        : QUESTION_DATA[activeSection].map((q) => ({ id: q.id, label: q.question }));
    return [...items].sort((a, b) => a.label.localeCompare(b.label));
  }, [activeSection, searching]);

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setHighlightId(id);
    const headerOffset = document.querySelector(".sticky-top")?.clientHeight ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset - 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    if (!highlightId) return;
    const timer = setTimeout(() => setHighlightId(null), 2000);
    return () => clearTimeout(timer);
  }, [highlightId]);

  const filteredQuestions = useMemo(() => {
    if (!searching) {
      return activeSection === "mycode" || activeSection === "customhooks"
        ? []
        : QUESTION_DATA[activeSection];
    }
    const query = normalize(search.trim());
    const all = [
      ...javascriptQuestions,
      ...reactQuestions,
      ...nextjsQuestions,
      ...codingQuestions,
    ];
    return all.filter((q) => {
      const haystack = [q.question, q.shortAnswer, ...(q.keyPoints ?? []), q.code ?? ""]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [activeSection, search, searching]);

  const filteredSnippets = useMemo(() => {
    if (!searching) {
      return activeSection === "mycode" ? myCodeSnippets : [];
    }
    const query = normalize(search.trim());
    const allSnippets = [...myCodeSnippets, ...customHooks.map((h) => h.snippet)];
    return allSnippets.filter((s) => {
      const haystack = [s.title, s.description ?? "", s.code].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [activeSection, search, searching]);

  const resultCount = filteredQuestions.length + filteredSnippets.length;

  return (
    <div className="app">
      <div className="sticky-top">
        <h1 className="app-title">Interview Cheat Sheet</h1>
        <SearchBar value={search} onChange={setSearch} />
        {!searching && (
          <TabBar sections={SECTIONS} active={activeSection} onChange={setActiveSection} />
        )}
        {!searching && <JumpChips items={jumpItems} onJump={handleJump} />}
      </div>

      <main className="content">
        {searching && (
          <p className="result-count">
            {resultCount} result{resultCount !== 1 ? "s" : ""} for "{search.trim()}"
          </p>
        )}

        {!searching && activeSection === "customhooks" && (
          <CustomHooksPanel hooks={customHooks} />
        )}

        {filteredQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            item={q}
            forceOpen={searching}
            highlighted={highlightId === q.id}
          />
        ))}

        {filteredSnippets.map((s) => (
          <SnippetCard key={s.id} item={s} highlighted={highlightId === s.id} />
        ))}

        {searching && resultCount === 0 && (
          <p className="empty-state">No matches. Try a different keyword.</p>
        )}

        {!searching &&
          activeSection !== "customhooks" &&
          filteredQuestions.length === 0 &&
          filteredSnippets.length === 0 && <p className="empty-state">No content added yet.</p>}
      </main>
    </div>
  );
}

export default App;
