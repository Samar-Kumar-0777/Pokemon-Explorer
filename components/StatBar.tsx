const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const STAT_MAX = 255;

interface StatBarProps {
  name: string;
  value: number;
  accent: string;
}

export default function StatBar({ name, value, accent }: StatBarProps) {
  const label = STAT_LABELS[name] ?? name;
  const percent = Math.min(100, Math.round((value / STAT_MAX) * 100));

  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-sm font-medium text-dex-muted">
        {label}
      </span>
      <span className="w-10 shrink-0 text-right font-mono text-sm text-dex-text">
        {value}
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-dex-panel2">
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${percent}%`, backgroundColor: accent }}
        />
      </div>
    </div>
  );
}
