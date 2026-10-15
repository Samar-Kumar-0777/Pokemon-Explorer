import { getTypeColor } from "@/lib/pokemonTypeColors";

interface TypeBadgeProps {
  type: string;
  size?: "sm" | "md";
}

export default function TypeBadge({ type, size = "sm" }: TypeBadgeProps) {
  const color = getTypeColor(type);
  const label = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3.5 py-1.5 text-sm"
      }`}
      style={{
        borderColor: `${color}55`,
        backgroundColor: `${color}1F`,
        color,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
