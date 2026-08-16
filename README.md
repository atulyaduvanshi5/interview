# Interview Cheat Sheet

A lightweight, mobile-first personal interview cheat sheet. Static content, no backend.

## Run locally

```bash
npm install
npm run dev
```

## Add your own content

All content lives in `src/data/`. Each file exports a plain array — edit it directly, no other code needs to change.

- `src/data/javascript.ts` — JS questions (`Question[]`)
- `src/data/react.ts` — React questions
- `src/data/nextjs.ts` — Next.js questions
- `src/data/coding.ts` — coding questions
- `src/data/myCode.ts` — your personal snippets (`Snippet[]`)

**Question shape:**

```ts
{
  id: "unique-id",
  question: "What is ...?",
  shortAnswer: "...",
  keyPoints: ["...", "..."], // optional
  code: "...",               // optional
}
```

**Snippet shape (My Code section):**

```ts
{
  id: "unique-id",
  title: "Debounce",
  description: "...", // optional
  code: "...",
}
```

Just replace the sample arrays with your real content — add, remove, or reorder entries freely.

## Deploy (Vercel)

```bash
npm i -g vercel
vercel
```

Or connect the repo at [vercel.com/new](https://vercel.com/new) — it auto-detects Vite. Build command: `npm run build`, output dir: `dist`.
