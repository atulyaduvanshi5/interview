import type { SubTabGroupMulti } from "../types";

export const dsa: SubTabGroupMulti[] = [
  {
    id: "dsa-string",
    label: "String",
    snippets: [
    {
      id: "dsa-str-reverse",
      title: "1. Reverse a string",
      description: "Split into characters, reverse, and join back.",
      code: `function reverse(str) {
  return str.split("").reverse().join("");
}

// Loop version (if built-ins are not allowed):
function reverseLoop(str) {
  let out = "";
  for (let i = str.length - 1; i >= 0; i--) out += str[i];
  return out;
}`,
    },
    {
      id: "dsa-str-palindrome",
      title: "2. Palindrome check",
      description: "Normalize case, strip non-alphanumerics, then compare with the reverse.",
      code: `function isPalindrome(str) {
  const s = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return s === s.split("").reverse().join("");
}`,
    },
    {
      id: "dsa-str-vowels",
      title: "3. Count vowels",
      description: "Walk the string and count characters found in the vowel set.",
      code: `function countVowels(str) {
  let count = 0;
  for (let ch of str.toLowerCase()) {
    if ("aeiou".includes(ch)) count++;
  }
  return count;
}`,
    },
    {
      id: "dsa-str-reverse-words",
      title: "4. Reverse words in a sentence",
      description: "Reverse word order, or reverse each word in place.",
      code: `function reverseWords(str) {
  return str.split(" ").reverse().join(" ");
}

// Variation: reverse each word individually
function reverseEachWord(str) {
  return str
    .split(" ")
    .map((w) => w.split("").reverse().join(""))
    .join(" ");
}`,
    },
    {
      id: "dsa-str-anagram",
      title: "5. Check anagram",
      description: "Sort both strings and compare, after a quick length check.",
      code: `function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  return a.split("").sort().join("") === b.split("").sort().join("");
}`,
    },
    {
      id: "dsa-str-char-count",
      title: "6. Character frequency",
      description: "Build a map of character to count.",
      code: `function charCount(str) {
  const map = {};
  for (let ch of str) {
    map[ch] = (map[ch] || 0) + 1;
  }
  return map;
}`,
    },
    {
      id: "dsa-str-first-unique",
      title: "7. First non-repeating character",
      description: "Count first, then scan again for the first count of 1.",
      code: `function firstUnique(str) {
  const map = {};
  for (let ch of str) map[ch] = (map[ch] || 0) + 1;
  for (let ch of str) if (map[ch] === 1) return ch;
  return null;
}`,
    },
    {
      id: "dsa-str-remove-dup",
      title: "8. Remove duplicate characters",
      description: "A Set keeps first occurrences only.",
      code: `function removeDup(str) {
  return [...new Set(str)].join("");
}`,
    },
    {
      id: "dsa-str-capitalize",
      title: "9. Capitalize first letter of each word",
      description: "Uppercase the first character of every word.",
      code: `function capitalize(str) {
  return str
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}`,
    },
    {
      id: "dsa-str-longest-word",
      title: "10. Longest word in a sentence",
      description: "Reduce to the word with the greatest length.",
      code: `function longestWord(str) {
  return str.split(" ").reduce((a, b) => (b.length > a.length ? b : a));
}`,
    },
    ],
  },
  {
    id: "dsa-array",
    label: "Array",
    snippets: [
    {
      id: "dsa-arr-max-min",
      title: "1. Find max / min",
      description: "Spread into Math.max, or track a running maximum.",
      code: `function findMax(arr) {
  return Math.max(...arr);
}

// Loop version:
function findMaxLoop(arr) {
  let max = arr[0];
  for (let n of arr) if (n > max) max = n;
  return max;
}`,
    },
    {
      id: "dsa-arr-second-largest",
      title: "2. Second largest",
      description: "Dedupe, sort descending, take index 1.",
      code: `function secondLargest(arr) {
  const unique = [...new Set(arr)].sort((a, b) => b - a);
  return unique[1];
}`,
    },
    {
      id: "dsa-arr-unique",
      title: "3. Remove duplicates",
      description: "A Set drops repeats in one step.",
      code: `function unique(arr) {
  return [...new Set(arr)];
}`,
    },
    {
      id: "dsa-arr-reverse",
      title: "4. Reverse array (without reverse)",
      description: "Push elements into a new array from the back.",
      code: `function reverseArr(arr) {
  const out = [];
  for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i]);
  return out;
}`,
    },
    {
      id: "dsa-arr-sum",
      title: "5. Sum of all elements",
      description: "Reduce with an accumulator starting at 0.",
      code: `function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}`,
    },
    {
      id: "dsa-arr-missing",
      title: "6. Find missing number (1 to n)",
      description: "Expected total minus actual total gives the gap.",
      code: `function findMissing(arr, n) {
  const total = (n * (n + 1)) / 2;
  return total - arr.reduce((a, b) => a + b, 0);
}`,
    },
    {
      id: "dsa-arr-move-zeros",
      title: "7. Move all zeros to end",
      description: "Partition into non-zeros and zeros, then join.",
      code: `function moveZeros(arr) {
  const nonZero = arr.filter((n) => n !== 0);
  const zeros = arr.filter((n) => n === 0);
  return [...nonZero, ...zeros];
}`,
    },
    {
      id: "dsa-arr-flatten",
      title: "8. Flatten nested array",
      description: "flat(Infinity), or recurse with reduce.",
      code: `function flatten(arr) {
  return arr.flat(Infinity);
}

// Manual version:
function flattenManual(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenManual(val) : val),
    []
  );
}`,
    },
    {
      id: "dsa-arr-two-sum",
      title: "9. Two sum",
      description: "Store seen values in a map and look for the complement.",
      code: `function twoSum(arr, target) {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    const need = target - arr[i];
    if (need in map) return [map[need], i];
    map[arr[i]] = i;
  }
  return [];
}`,
    },
    {
      id: "dsa-arr-freq",
      title: "10. Frequency count of elements",
      description: "Build a map of element to count.",
      code: `function freq(arr) {
  const map = {};
  for (let item of arr) {
    map[item] = (map[item] || 0) + 1;
  }
  return map;
}`,
    },
    {
      id: "dsa-arr-bonus",
      title: "Bonus: object / array mix",
      description: "Patterns that come up most in frontend interviews.",
      code: `// Group by key
function groupBy(arr, key) {
  const out = {};
  for (let item of arr) {
    const k = item[key];
    if (!out[k]) out[k] = [];
    out[k].push(item);
  }
  return out;
}

// Sort objects by key
const sorted = users.sort((a, b) => a.age - b.age);

// Sum of a field
const total = items.reduce((acc, item) => acc + item.price, 0);

// Chunk array
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

// Intersection of two arrays
const common = a.filter((x) => b.includes(x));`,
    },
    ],
  },
];
