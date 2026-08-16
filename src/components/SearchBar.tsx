interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search e.g. debounce, useEffect, SSR..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search"
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange("")}
          type="button"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
