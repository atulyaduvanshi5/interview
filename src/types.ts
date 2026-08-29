export interface Question {
  id: string;
  question: string;
  shortAnswer: string;
  keyPoints?: string[];
  code?: string;
}

export interface Snippet {
  id: string;
  title: string;
  description?: string;
  code: string;
}

export type SectionId = "javascript" | "react" | "coding" | "customhooks" | "polyfills" | "dsa";

export interface Section {
  id: SectionId;
  label: string;
}

export interface SubTabGroup {
  id: string;
  label: string;
  snippet: Snippet;
}

export interface SubTabGroupMulti {
  id: string;
  label: string;
  snippets: Snippet[];
}
