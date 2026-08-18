import type { SubTabGroup } from "../types";

export const polyfills: SubTabGroup[] = [
  {
    id: "polyfill-map",
    label: "map",
    snippet: {
      id: "polyfill-map",
      title: "Array.prototype.map",
      description: "Builds a new array by applying a callback to every element.",
      code: `Array.prototype.myMap = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }
  return result;
};

const nums = [1, 2, 3];
console.log(nums.myMap((n) => n * 2)); // [2, 4, 6]`,
    },
  },
  {
    id: "polyfill-reduce",
    label: "reduce",
    snippet: {
      id: "polyfill-reduce",
      title: "Array.prototype.reduce",
      description: "Reduces the array to a single value by applying an accumulator function.",
      code: `Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;

  if (acc === undefined) {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    acc = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      acc = callback(acc, this[i], i, this);
    }
  }

  return acc;
};

const nums = [1, 2, 3, 4];
console.log(nums.myReduce((sum, n) => sum + n, 0)); // 10`,
    },
  },
  {
    id: "polyfill-filter",
    label: "filter",
    snippet: {
      id: "polyfill-filter",
      title: "Array.prototype.filter",
      description: "Builds a new array with only the elements that pass the test.",
      code: `Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

const nums = [1, 2, 3, 4, 5];
console.log(nums.myFilter((n) => n % 2 === 0)); // [2, 4]`,
    },
  },
];
