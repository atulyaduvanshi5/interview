interface JumpItem {
  id: string;
  label: string;
}

interface JumpChipsProps {
  items: JumpItem[];
  onJump: (id: string) => void;
}

export default function JumpChips({ items, onJump }: JumpChipsProps) {
  if (items.length === 0) return null;

  return (
    <div className="jump-chips">
      {items.map((item) => (
        <button
          key={item.id}
          className="jump-chip"
          onClick={() => onJump(item.id)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
