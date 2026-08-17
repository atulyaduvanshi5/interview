import type { Snippet } from "../types";

export const myCodeSnippets: Snippet[] = [
  {
    id: "my-call-apply-bind",
    title: "Call / Apply / Bind",
    code: `function greet(city) {
    console.log(this.name, city);
}

const person = {
    name: "Atul"
};

greet.call(person, "Lucknow");          // Executes immediately

greet.apply(person, ["Lucknow"]);       // Executes immediately

const fn = greet.bind(person, "Lucknow"); // Doesn't execute

fn();`,
  },
  {
    id: "my-currying",
    title: "Currying",
    code: `function sum(a) {
  return function(b) {
    return a + b;
  };
}

console.log(sum(2)(3));`,
  },
  {
    id: "my-debounce",
    title: "Debounce",
    code: `const debounce = (fn, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};


const search = (query) => console.log(\`Searching for\`, query);
const searchWithDebounce = debounce(search, 1000);

searchWithDebounce('D');
searchWithDebounce('De');
searchWithDebounce('Deb');

searchWithDebounce('Debounce');`,
  },
  {
    id: "my-throttle",
    title: "Throttle",
    code: `const throttle = (fn, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    return fn(...args);
  };
};

// The actual function we want to throttle
function sendChatMessage(message) {
  console.log(\`Sending Message\`, message);
}

// Wrap it with throttle — only 1 call allowed every 2 seconds
const sendChatMessageT = throttle(sendChatMessage, 2 * 1000);

// Now call it rapidly (all within milliseconds of each other)
sendChatMessageT('Hi');                                    // runs immediately

setTimeout(() => sendChatMessageT('Hello'), 500);           // blocked (only 500ms passed)

setTimeout(() => sendChatMessageT('Hello ji'), 2500);       // runs (2500ms passed)

setTimeout(() => sendChatMessageT('next cohort kab hoga'), 3000); // blocked (only 500ms since last)

setTimeout(() => sendChatMessageT('discount on course'), 5000)`,
  },
  {
    id: "my-shallow-copy",
    title: "Shallow Copy",
    description: "Nested objects are shared — mutating them affects the original.",
    code: `// Spread
let obj1 = { a: 1, b: { c: 2 } };
let shallowCopy = { ...obj1 };
shallowCopy.b.c = 3;
console.log(obj1.b.c); // 3 — original mutated too

// Object.assign
let obj1 = { a: 1, b: { c: 2 } };
let shallowCopy = Object.assign({}, obj1);
shallowCopy.b.c = 3;
console.log(shallowCopy.b.c); // 3
console.log(obj1.b.c); // 3 — original nested object changed too`,
  },
  {
    id: "my-deep-copy",
    title: "Deep Copy",
    description: "Fully independent — nested objects are not shared with the original.",
    code: `// structuredClone
let obj2 = { a: 1, b: { c: 2 } };
let deepCopy = structuredClone(obj2);
deepCopy.b.c = 4;
console.log(obj2.b.c); // 2 — original unchanged

// JSON parse/stringify
let obj2 = { a: 1, b: { c: 2 } };
let deepCopy = JSON.parse(JSON.stringify(obj2));
deepCopy.b.c = 4;
console.log(obj2.b.c); // 2 — original unchanged`,
  },
  {
    id: "my-pokemon-dropdown",
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
    id: "my-basic-tabs",
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
];
