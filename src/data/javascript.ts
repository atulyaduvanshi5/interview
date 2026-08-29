import type { Question, Snippet } from "../types";

export const javascriptQuestions: Question[] = [];

export const javascriptSnippets: Snippet[] = [
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
    id: "my-flatten-array-builtin",
    title: "Flatten Array (flat)",
    description: "Uses the built-in Array.prototype.flat with Infinity depth.",
    code: `const nestedArray1 = [1, [2, [3, [4, [5]]]]];
const flatArray1 = nestedArray1.flat(Infinity);
console.log(flatArray1); // [1, 2, 3, 4, 5]`,
  },
  {
    id: "my-flatten-array-recursive",
    title: "Flatten Array (recursive)",
    description: "Custom recursive flattener without using Array.prototype.flat.",
    code: `function flattenArray(arr) {
  let result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item)); // recurse into nested array
    } else {
      result.push(item); // plain value, just add it
    }
  }

  return result;
}

const nestedArray = [1, [2, [3, [4, [5]]]]];
const flatArray = flattenArray(nestedArray);

console.log(flatArray); // Output: [1, 2, 3, 4, 5]`,
  },
  {
    id: "my-closure",
    title: "Closure",
    description: "The inner function keeps access to its own copy of count, so each call to counter() gets independent state.",
    code: `function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const c1 = counter();
console.log(c1()); // 1
console.log(c1()); // 2
console.log(c1()); // 3

const c2 = counter();
console.log(c2()); // 1 - fresh closure, separate count`,
  },
];
