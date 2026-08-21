import type { Question, Snippet } from "../types";

export const reactQuestions: Question[] = [];

export const reactSnippets: Snippet[] = [
  {
    id: "react-pokemon-dropdown",
    title: "Pokemon Dropdown",
    description: "Fetch a list, populate a dropdown, then fetch details on selection.",
    code: `import React, { useEffect, useState } from "react";

const PokemonDropdown = () => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((res) => res.json())
      .then((data) => setList(data.results));
  }, []);

  useEffect(() => {
    if (!selected) return;
    fetch(\`https://pokeapi.co/api/v2/pokemon/\${selected}\`)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [selected]);

  return (
    <div>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select a Pokemon</option>
        {list.map((p) => (
          <option key={p.name} value={p.name}>{p.name}</option>
        ))}
      </select>

      {details && (
        <div>
          <h3>{details.name}</h3>
          <img src={details.sprites.front_default} alt={details.name} />
          <p>Height: {details.height}</p>
          <p>Weight: {details.weight}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDropdown;`,
  },
  {
    id: "react-pokemon-dropdown-ts",
    title: "Pokemon Dropdown (TS)",
    description: "Same dropdown, typed with TypeScript interfaces and React.FC.",
    code: `import React, { useEffect, useState } from "react";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

const PokemonDropdown: React.FC = () => {
  const [list, setList] = useState<PokemonListItem[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((res) => res.json())
      .then((data) => setList(data.results));
  }, []);

  useEffect(() => {
    if (!selected) return;
    fetch(\`https://pokeapi.co/api/v2/pokemon/\${selected}\`)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [selected]);

  return (
    <div>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select a Pokemon</option>
        {list.map((p) => (
          <option key={p.name} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
      {details && (
        <div>
          <h3>{details.name}</h3>
          <img src={details.sprites.front_default} alt={details.name} />
          <p>Height: {details.height}</p>
          <p>Weight: {details.weight}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDropdown;`,
  },
  {
    id: "react-basic-tabs",
    title: "Basic Tabs",
    description: "Simple tab switcher driven by an array of tab definitions.",
    code: `import React, { useState } from "react";

const TABS = [
  { value: "html", label: "HTML", content: "This is the HTML content" },
  { value: "css", label: "CSS", content: "This is the CSS content" },
  { value: "js", label: "JS", content: "This is the JS content" },
];

function Tabs() {
  const [active, setActive] = useState("html");

  return (
    <div>
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActive(tab.value)}
          style={{ color: active === tab.value ? "blue" : "black" }}
        >
          {tab.label}
        </button>
      ))}

      {TABS.find((tab) => tab.value === active).content}
    </div>
  );
}

export default Tabs;`,
  },
  {
    id: "react-todo-local-storage",
    title: "Todo with LocalStorage",
    description: "Add, edit, toggle, and delete todos, persisted to localStorage.",
    code: `import { useState } from 'react';

export default function App1() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('todos')) || []
  );

  const add = () => {
    save([...todos, { id: Date.now(), text, done: false }]);
    setText('');
  };
  const edit = (todo) => {
    const newText = prompt('Edit todo');
    save(
      todos.map((t) => {
        return t.id === todo ? { ...t, text: newText } : t;
      })
    );
  };

  const deleteTodo = (todo) => {
    save(
      todos.filter((t) => {
        return t.id != todo;
      })
    );
  };

  const toggle = (todo) => {
    save(
      todos.map((t) => {
        return t.id === todo ? { ...t, done: !t.done } : t;
      })
    );
  };

  const save = (list) => {
    setTodos(list);
    localStorage.setItem('todos', JSON.stringify(list));
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => add()}>Add</button>
      {todos?.map((todo) => (
        <li key={todo.id}>
          <span
            onClick={() => toggle(todo.id)}
            style={{
              textDecoration: todo.done ? 'line-through' : 'none',
              padding: '5px',
            }}
          >
            {' '}
            {todo.text}{' '}
          </span>
          <button onClick={() => edit(todo.id)}>edit</button>{' '}
          <button onClick={() => deleteTodo(todo.id)}>delete</button>
        </li>
      ))}
    </div>
  );
}`,
  },
];
