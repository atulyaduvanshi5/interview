import type { SubTabGroupMulti } from "../types";

export const dsa: SubTabGroupMulti[] = [
  {
    id: "dsa-approach",
    label: "Approach",
    snippets: [
      {
        id: "dsa-approach-steps",
        title: "The 7 steps — say this out loud",
        description:
          "Interviewers score you on process, not just the final code. Follow these for every question.",
        code: `// ---------------------------------------------------------------
// STEP 1 - REPEAT THE PROBLEM BACK
//   "So I need to take an array of integers and return the indices
//    of the two numbers that add up to the target. Correct?"
//
// STEP 2 - ASK 2-3 CLARIFYING QUESTIONS
//   - Can the array be empty or have one element?
//   - Can there be negative numbers or duplicates?
//   - Is the array sorted?
//   - Modify in place, or return a new array?
//   - Strings: case-sensitive? lowercase only, or ASCII/Unicode?
//   - Is exactly one valid answer guaranteed, or return all?
//
// STEP 3 - STATE THE BRUTE FORCE FIRST (WITH COMPLEXITY)
//   "The naive way is two nested loops, O(n^2) time and O(1) space.
//    Let me see if I can do better."
//   Buys thinking time + shows you understand the baseline.
//
// STEP 4 - NAME THE PATTERN  (see the pattern table)
//
// STEP 5 - DRY RUN ON A TINY EXAMPLE *BEFORE* CODING
//   Write [2, 7, 11, 15], target = 9 on the board and walk through
//   your idea. If it breaks here, you saved 10 minutes.
//
// STEP 6 - WRITE CLEAN CODE
//   - Real names: left, right, count, maxSoFar - not a, b, x.
//   - Handle the empty/null case on the first line.
//   - Talk while you type: "initialising a map of value -> index..."
//
// STEP 7 - TEST + STATE COMPLEXITY, UNPROMPTED
//   Walk one normal case and one edge case (empty, single element,
//   all duplicates). Then say:
//   "Time is O(n), I traverse the array once. Space is O(n) for the
//    hash map. If space were a constraint and the array was sorted,
//    I could do it with two pointers in O(1) space."
//   ^ Offering a trade-off is what turns a pass into a strong pass.
// ---------------------------------------------------------------`,
      },
      {
        id: "dsa-approach-patterns",
        title: "Step 4 — match the signal to the pattern",
        description: "Read the wording of the question, then pick the tool.",
        code: `// SIGNAL IN THE QUESTION              ->  PATTERN TO USE
// ---------------------------------------------------------------
// "find a pair / does X exist /
//  count frequency"                   ->  HashMap or Set - O(n)
//
// array is SORTED, find pair or
//  remove items                       ->  Two pointers (left & right)
//
// "longest / shortest substring or
//  subarray with condition"           ->  Sliding window
//
// "contiguous subarray sum"           ->  Kadane's or prefix sum
//
// "rotate / reverse in place"         ->  Reversal trick, swap in place
//
// "in-place, O(1) extra space"        ->  Two pointers:
//                                         slow (write) + fast (read)
//
// range 1..n, one number
//  missing or duplicated              ->  Math sum formula or XOR
// ---------------------------------------------------------------`,
      },
    ],
  },
  {
    id: "dsa-questions",
    label: "Questions",
    snippets: [
      {
        id: "dsa-q1-two-sum",
        title: "Q1. Two Sum",
        description:
          "Given an array of integers and a target, return the indices of the two numbers that add up to the target.",
        code: `// IN   nums = [2, 7, 11, 15], target = 9
// OUT  [0, 1]                       (because 2 + 7 = 9)
//
// APPROACH
//   1. Create an empty map to store value -> index.
//   2. Loop through the array once.
//   3. For each element, calculate need = target - current.
//   4. If need is already in the map -> return [map.get(need), i].
//   5. Otherwise store the current value + index, and continue.

function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (map.has(need)) {
      return [map.get(need), i];
    }
    map.set(nums[i], i);
  }

  return [];
}

// TIME   O(n)  - one pass.
// SPACE  O(n)  - the map can hold up to n entries.
// EDGE   Empty array; no valid pair (return []); duplicates like
//        [3, 3] target 6 - works because we check the map BEFORE
//        inserting.
// SAY    "Brute force is O(n^2) with nested loops. By trading space
//         for time and using a hash map, I get it down to a single
//         O(n) pass."`,
      },
      {
        id: "dsa-q2-kadane",
        title: "Q2. Maximum Subarray Sum (Kadane's)",
        description: "Find the contiguous subarray with the largest sum and return that sum.",
        code: `// IN   nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// OUT  6                            (the subarray [4, -1, 2, 1])
//
// APPROACH
//   1. Track curr (best sum ending at the current index) and best
//      (best sum seen anywhere).
//   2. Start both at nums[0].
//   3. At each element decide: extend the previous subarray
//      (curr + nums[i]) or start fresh from this element (nums[i]).
//      Take the bigger one.
//   4. Update best with curr if curr is larger.
//   5. Return best.

function maxSubArray(nums) {
  if (nums.length === 0) return 0;

  let curr = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    best = Math.max(best, curr);
  }

  return best;
}

// TIME   O(n)
// SPACE  O(1)
// EDGE   All negative numbers - [-3, -1, -2] returns -1, which is
//        correct. Do NOT initialise best = 0, that's the classic bug.
// SAY    "The key insight is that a negative running sum is never
//         worth carrying forward, so I reset at that point."`,
      },
      {
        id: "dsa-q3-move-zeroes",
        title: "Q3. Move Zeroes to the End",
        description:
          "Move all zeroes to the end while keeping the relative order of non-zero elements. In place.",
        code: `// IN   nums = [0, 1, 0, 3, 12]
// OUT  [1, 3, 12, 0, 0]
//
// APPROACH
//   1. Keep a pointer j = the position where the next non-zero
//      element should go. Start at 0.
//   2. Loop with i over the whole array.
//   3. If nums[i] is non-zero, swap nums[i] with nums[j], then j++.
//   4. Everything after j naturally ends up as zeroes.

function moveZeroes(nums) {
  let j = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      const temp = nums[j];
      nums[j] = nums[i];
      nums[i] = temp;
      j++;
    }
  }

  return nums;
}

// TIME   O(n)
// SPACE  O(1)
// EDGE   All zeroes [0,0,0]; no zeroes [1,2,3] - both work without
//        special handling.
// SAY    "This is the slow-fast two-pointer pattern - j is the write
//         pointer, i is the read pointer."`,
      },
      {
        id: "dsa-q4-remove-duplicates",
        title: "Q4. Remove Duplicates from a Sorted Array",
        description: "Given a sorted array, remove duplicates in place and return the new length.",
        code: `// IN   nums = [1, 1, 2, 2, 3]
// OUT  3, and the array becomes [1, 2, 3, _, _]
//
// APPROACH
//   1. If the array is empty, return 0.
//   2. Set k = 1 - the write position (first element is always kept).
//   3. Loop from index 1. Compare nums[i] with the last written
//      element nums[k - 1].
//   4. If they differ it's a new unique value - write it at nums[k]
//      and increment k.
//   5. Return k.

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let k = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}

// TIME   O(n)
// SPACE  O(1)
// EDGE   Empty array; single element; all elements identical [5,5,5]
//        -> returns 1.
// SAY    "Because the array is sorted, all duplicates are adjacent -
//         so I only ever need to compare against the last unique
//         value I wrote."`,
      },
      {
        id: "dsa-q5-rotate",
        title: "Q5. Rotate Array by K Positions",
        description: "Rotate the array to the right by k steps, in place.",
        code: `// IN   nums = [1, 2, 3, 4, 5, 6, 7], k = 3
// OUT  [5, 6, 7, 1, 2, 3, 4]
//
// APPROACH (reversal trick)
//   1. Normalise k = k % n (rotating by 10 on a 7-element array is
//      the same as rotating by 3).
//   2. Reverse the entire array.
//   3. Reverse the first k elements.
//   4. Reverse the remaining n - k elements.
//
// DRY RUN
//   [1..7] -> reverse all     -> [7,6,5,4,3,2,1]
//          -> reverse first 3 -> [5,6,7,4,3,2,1]
//          -> reverse rest    -> [5,6,7,1,2,3,4]   correct

function reverse(arr, left, right) {
  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
}

function rotate(nums, k) {
  const n = nums.length;
  if (n === 0) return nums;

  k = k % n;

  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);

  return nums;
}

// TIME   O(n)
// SPACE  O(1)
// EDGE   k = 0; k > n; empty array.
// SAY    "The simple version uses an extra array - O(n) space. The
//         reversal trick gets the same result in O(1) space."`,
      },
      {
        id: "dsa-q6-missing-number",
        title: "Q6. Find the Missing Number",
        description:
          "An array contains n distinct numbers from the range 0 to n. Find the one that's missing.",
        code: `// IN   nums = [3, 0, 1]             (n = 3)
// OUT  2
//
// APPROACH
//   1. The sum of 0 to n is n * (n + 1) / 2.
//   2. Add up all the numbers actually present in the array.
//   3. The difference between the two is the missing number.

function missingNumber(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;

  let actual = 0;
  for (const num of nums) {
    actual += num;
  }

  return expected - actual;
}

// TIME   O(n)
// SPACE  O(1)
// FOLLOW-UP  "What if the sum overflows?" -> Use XOR instead: XOR all
//        indices 0..n and all values together; everything cancels out
//        except the missing number.
// SAY    "Sorting would be O(n log n). The math formula gives O(n)
//         with constant space."`,
      },
      {
        id: "dsa-q7-stock",
        title: "Q7. Best Time to Buy and Sell Stock",
        description:
          "Given daily prices, find the maximum profit from one buy and one later sell. Return 0 if no profit is possible.",
        code: `// IN   prices = [7, 1, 5, 3, 6, 4]
// OUT  5                            (buy at 1, sell at 6)
//
// APPROACH
//   1. Track minPrice - the cheapest price seen so far. Start at
//      Infinity.
//   2. Track profit - the best profit so far. Start at 0.
//   3. For each price: if it's lower than minPrice, update minPrice.
//   4. Otherwise check if price - minPrice beats the current profit.
//   5. Return profit.

function maxProfit(prices) {
  let minPrice = Infinity;
  let profit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > profit) {
      profit = price - minPrice;
    }
  }

  return profit;
}

// TIME   O(n)
// SPACE  O(1)
// EDGE   Prices only fall [7,6,4,3] -> returns 0. Empty array -> 0.
// SAY    "At every day I only need to know the minimum price before
//         it - I don't need to look back over the whole array."`,
      },
      {
        id: "dsa-q8-majority",
        title: "Q8. Majority Element (Moore's Voting)",
        description: "Find the element that appears more than n/2 times. Assume it always exists.",
        code: `// IN   nums = [2, 2, 1, 1, 1, 2, 2]
// OUT  2
//
// APPROACH
//   1. Keep a candidate and a count, both starting empty / zero.
//   2. Loop through the array. If count is 0, adopt the current
//      element as the new candidate.
//   3. If the current element equals the candidate, count++,
//      otherwise count--.
//   4. The surviving candidate is the majority element.

function majorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }

  return candidate;
}

// TIME   O(n)
// SPACE  O(1)
// FALLBACK  If you blank: a frequency HashMap is O(n) time, O(n)
//        space - still a correct answer.
// SAY    "Every non-majority element cancels out one majority
//         element. Since the majority occurs more than n/2 times, it
//         always survives. If existence weren't guaranteed, I'd add a
//         second pass to verify the count."`,
      },
      {
        id: "dsa-q9-merge-sorted",
        title: "Q9. Merge Two Sorted Arrays",
        description: "Merge two sorted arrays into one sorted array.",
        code: `// IN   a = [1, 3, 5], b = [2, 4, 6]
// OUT  [1, 2, 3, 4, 5, 6]
//
// APPROACH
//   1. Two pointers, i for array a and j for array b.
//   2. Compare a[i] and b[j]; push the smaller one into the result
//      and advance that pointer.
//   3. When one array is exhausted, push all remaining elements of
//      the other.

function mergeSorted(a, b) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[j]);
      j++;
    }
  }

  while (i < a.length) {
    result.push(a[i]);
    i++;
  }

  while (j < b.length) {
    result.push(b[j]);
    j++;
  }

  return result;
}

// TIME   O(n + m)
// SPACE  O(n + m) for the result.
// FOLLOW-UP  "Do it in place in array a, which has extra buffer space
//        at the end." -> Fill from the BACK using three pointers, so
//        you never overwrite unread data.
// SAY    "Concatenating and sorting would be O((n+m) log(n+m)). Since
//         both inputs are already sorted, two pointers give a linear
//         merge."`,
      },
      {
        id: "dsa-q10-reverse-words",
        title: "Q10. Reverse Words in a String",
        description:
          "Reverse the order of words. Trim leading/trailing spaces and collapse multiple spaces into one.",
        code: `// IN   "  the sky   is blue  "
// OUT  "blue is sky the"
//
// APPROACH
//   1. Trim the string to remove leading and trailing spaces.
//   2. Split on one-or-more whitespace so multiple spaces don't
//      produce empty words.
//   3. Reverse the resulting array.
//   4. Join back with a single space.

function reverseWords(s) {
  return s.trim().split(/\\s+/).reverse().join(' ');
}

// IF THEY BAN BUILT-INS, build it manually:

function reverseWordsManual(s) {
  const words = [];
  let current = '';

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ' ') {
      current += s[i];
    } else if (current.length > 0) {
      words.push(current);
      current = '';
    }
  }
  if (current.length > 0) words.push(current);

  let result = '';
  for (let i = words.length - 1; i >= 0; i--) {
    result += words[i];
    if (i > 0) result += ' ';
  }

  return result;
}

// TIME   O(n)
// SPACE  O(n)
// EDGE   All spaces "   " -> returns "". Single word -> unchanged.`,
      },
      {
        id: "dsa-q11-valid-palindrome",
        title: "Q11. Valid Palindrome",
        description:
          "Check whether a string is a palindrome, considering only letters and digits, ignoring case.",
        code: `// IN   "A man, a plan, a canal: Panama"    OUT  true
// IN   "race a car"                         OUT  false
//
// APPROACH
//   1. Lowercase the string and strip out everything that isn't a
//      letter or digit.
//   2. One pointer at the start, one at the end.
//   3. Compare the characters. If they differ, return false at once.
//   4. Move both pointers inward. If they cross, it's a palindrome.

function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// TIME   O(n)
// SPACE  O(n) for the cleaned string.
// FOLLOW-UP  "Do it in O(1) space." -> Skip non-alphanumeric
//        characters on the fly inside the while loop instead of
//        pre-cleaning.
// EDGE   Empty string -> true. Single character -> true.`,
      },
      {
        id: "dsa-q12-valid-anagram",
        title: "Q12. Valid Anagram",
        description: "Check if two strings are anagrams of each other.",
        code: `// IN   s = "anagram", t = "nagaram"     OUT  true
// IN   s = "rat",     t = "car"         OUT  false
//
// APPROACH
//   1. If the lengths differ, return false straight away.
//   2. Build a frequency count of every character in s.
//   3. Loop through t and decrement each character's count.
//   4. If any character is missing or already at zero, return false.
//   5. If the loop completes, they're anagrams.

function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = {};

  for (const ch of s) {
    count[ch] = (count[ch] || 0) + 1;
  }

  for (const ch of t) {
    if (!count[ch]) {
      return false;
    }
    count[ch]--;
  }

  return true;
}

// TIME   O(n)
// SPACE  O(1) if limited to 26 lowercase letters, otherwise O(k) for
//        the character set.
// SAY    "Sorting both strings and comparing also works and is only 2
//         lines, but that's O(n log n). The frequency map is O(n)."`,
      },
      {
        id: "dsa-q13-first-unique",
        title: "Q13. First Non-Repeating Character",
        description:
          "Return the index of the first character that appears exactly once. Return -1 if there is none.",
        code: `// IN   s = "loveleetcode"
// OUT  2                            (the character 'v')
//
// APPROACH
//   1. First pass: count the frequency of every character.
//   2. Second pass: go through the string in order and return the
//      index of the first character with a count of 1.
//   3. If none found, return -1.

function firstUniqChar(s) {
  const count = {};

  for (const ch of s) {
    count[ch] = (count[ch] || 0) + 1;
  }

  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) {
      return i;
    }
  }

  return -1;
}

// TIME   O(n) - two passes is still linear.
// SPACE  O(k) where k is the size of the character set.
// EDGE   All characters repeat "aabb" -> -1. Empty string -> -1.
// SAY    "Two passes are necessary because I can't know a character
//         is unique until I've seen the whole string - but two linear
//         passes are still O(n)."`,
      },
      {
        id: "dsa-q14-longest-substring",
        title: "Q14. Longest Substring Without Repeating Characters",
        description: "Find the length of the longest substring with no repeated characters.",
        code: `// IN   s = "abcabcbb"    OUT  3     (the substring "abc")
// IN   s = "bbbbb"       OUT  1
//
// APPROACH (sliding window)
//   1. Keep a map of character -> last index seen.
//   2. Keep a start pointer marking the left edge of the window.
//   3. Move end across the string. If the current character was seen
//      INSIDE the current window, jump start to just after that
//      previous occurrence.
//   4. Update the character's last-seen index.
//   5. Update the best length as end - start + 1.

function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let start = 0;
  let best = 0;

  for (let end = 0; end < s.length; end++) {
    const ch = s[end];

    if (lastSeen.has(ch) && lastSeen.get(ch) >= start) {
      start = lastSeen.get(ch) + 1;
    }

    lastSeen.set(ch, end);
    best = Math.max(best, end - start + 1);
  }

  return best;
}

// TIME   O(n)
// SPACE  O(k) for the character set.
// CRITICAL  The lastSeen.get(ch) >= start check. Without it, "abba"
//        gives a wrong answer because start would move BACKWARDS.
//        Mention this - it shows depth.
// SAY    "This is the sliding window pattern. The window only ever
//         grows to the right and the left edge only ever moves right,
//         so each character is processed once."`,
      },
      {
        id: "dsa-q15-common-prefix",
        title: "Q15. Longest Common Prefix",
        description: "Find the longest common prefix string among an array of strings.",
        code: `// IN   ["flower", "flow", "flight"]    OUT  "fl"
// IN   ["dog", "racecar", "car"]       OUT  ""
//
// APPROACH
//   1. Assume the first string is the prefix.
//   2. For each remaining string, check whether it starts with the
//      prefix.
//   3. If not, chop the last character off the prefix and check
//      again.
//   4. If the prefix becomes empty, return "" immediately.

function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);

      if (prefix === "") {
        return "";
      }
    }
  }

  return prefix;
}

// TIME   O(n x m) - n strings, m = length of the shortest one.
// SPACE  O(1) beyond the output.
// EDGE   Empty array; one string (return it); one empty string in the
//        list -> "".`,
      },
    ],
  },
  {
    id: "dsa-cheatsheet",
    label: "Cheat Sheet",
    snippets: [
      {
        id: "dsa-cheat-complexity",
        title: "Complexity cheat sheet",
        description: "Know these cold — you should be able to state them without thinking.",
        code: `// OPERATION                          ->  TIME
// ---------------------------------------------------------------
// Single loop over n                 ->  O(n)
// Two nested loops                   ->  O(n^2)
// Sorting first                      ->  O(n log n)
// HashMap get / set                  ->  O(1) average
// Binary search                      ->  O(log n)
// String concatenation in a loop     ->  O(n^2)
//                                        avoid - use array + join
// ---------------------------------------------------------------
// SPACE
//   O(1)  = a few variables.
//   O(n)  = a map, set, or new array that grows with the input.`,
      },
      {
        id: "dsa-cheat-last-5-min",
        title: "Last 5 minutes before you walk in",
        description: "Read only this if you're short on time.",
        code: `// THE 6 PATTERNS THAT COVER ~90% OF EASY ARRAY/STRING QUESTIONS
//   1. HashMap            - pairs, frequencies, "seen this before?"
//   2. Two pointers from
//      both ends          - sorted arrays, palindromes
//   3. Slow/fast pointers - in-place removal or reordering
//   4. Sliding window     - longest/shortest substring with condition
//   5. Kadane's           - max contiguous subarray sum
//   6. Reversal trick     - rotations in O(1) space
//
// THREE THINGS TO ALWAYS DO
//   - Ask about empty input and duplicates before writing a line.
//   - State the brute force and its complexity before optimising.
//   - State the final time and space complexity without being asked.
//
// IF YOU GET STUCK
//   Say it out loud: "Let me think about the brute force first and
//   then optimise." Silence is the only thing that reads badly.
//   Interviewers give hints to people who are visibly thinking.
//
// IF YOU FINISH EARLY - offer a trade-off
//   "This uses O(n) space. If space were tight, I could sort first
//    and use two pointers - that's O(n log n) time but O(1) space."
//
// All the best.`,
      },
    ],
  },
];
