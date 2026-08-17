import type { HookGroup } from "../types";

export const customHooks: HookGroup[] = [
  {
    id: "hook-use-fetch",
    label: "useFetch",
    snippet: {
      id: "hook-use-fetch",
      title: "useFetch",
      description: "Fetches a URL and tracks data, error, and loading state.",
      code: `import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, error, loading };
}

export default useFetch;`,
    },
  },
  {
    id: "hook-use-local-storage",
    label: "useLocalStorage",
    snippet: {
      id: "hook-use-local-storage",
      title: "useLocalStorage",
      description: "Syncs state with localStorage, reading the initial value lazily.",
      code: `import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
}

export default useLocalStorage;`,
    },
  },
  {
    id: "hook-use-debounce",
    label: "useDebounce",
    snippet: {
      id: "hook-use-debounce",
      title: "useDebounce",
      description: "Returns a value that only updates after it stops changing for `delay` ms.",
      code: `import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;`,
    },
  },
  {
    id: "hook-use-throttle",
    label: "useThrottle",
    snippet: {
      id: "hook-use-throttle",
      title: "useThrottle",
      description: "Returns a value that updates at most once per `limit` ms.",
      code: `import { useState, useEffect, useRef } from "react";

function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    if (Date.now() - lastRan.current >= limit) {
      setThrottledValue(value);
      lastRan.current = Date.now();
    }
  }, [value, limit]);

  return throttledValue;
}

export default useThrottle;`,
    },
  },
];
