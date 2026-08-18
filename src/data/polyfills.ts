import type { SubTabGroup } from "../types";

export const polyfills: SubTabGroup[] = [
  {
    id: "polyfill-map",
    label: "map",
    snippet: {
      id: "polyfill-map",
      title: "Array.prototype.map",
      description: "Builds a new array by applying a callback to every element.",
      code: `Array.prototype.myMap = function(fn) {
  let res = [];
  for (let i = 0; i < this.length; i++) res.push(fn(this[i], i));
  return res;
};

[1, 2, 3].myMap(x => x * 2);   // [2, 4, 6]`,
    },
  },
  {
    id: "polyfill-filter",
    label: "filter",
    snippet: {
      id: "polyfill-filter",
      title: "Array.prototype.filter",
      description: "Builds a new array with only the elements that pass the test.",
      code: `Array.prototype.myFilter = function(fn) {
  let res = [];
  for (let i = 0; i < this.length; i++) if (fn(this[i], i)) res.push(this[i]);
  return res;
};

[1, 2, 3, 4].myFilter(x => x % 2 === 0);   // [2, 4]`,
    },
  },
  {
    id: "polyfill-reduce",
    label: "reduce",
    snippet: {
      id: "polyfill-reduce",
      title: "Array.prototype.reduce",
      description: "Reduces the array to a single value by applying an accumulator function.",
      code: `Array.prototype.myReduce = function(fn, init) {
  let acc = init === undefined ? this[0] : init;
  let i = init === undefined ? 1 : 0;
  for (; i < this.length; i++) acc = fn(acc, this[i]);
  return acc;
};

[1, 2, 3, 4].myReduce((a, b) => a + b, 0);   // 10`,
    },
  },
];
