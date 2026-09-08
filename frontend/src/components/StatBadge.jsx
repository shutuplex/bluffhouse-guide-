import React from 'react';

export default function StatBadge({ type, value, label, size = 'sm', color }) {
  // Support two calling conventions:
  // 1. <StatBadge type="HP" value={120} />
  // 2. <StatBadge label="DMG" value={25} color="text-rose-400 bg-rose-950/30 border-rose-800/30" />
  const defaultColors = {
    HP: 'bg-rose-950/60 text-rose-300 border-rose-800/40',
    STR: 'bg-amber-950/60 text-amber-300 border-amber-800/40',
    DEX: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40',
    SPD: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/40',
    DEF: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/40',
    XP: 'bg-purple-950/60 text-purple-300 border-purple-800/40',
    SHARDS: 'bg-yellow-950/60 text-yellow-300 border-yellow-700/40',
  };

  const colorClass = color || defaultColors[type] || 'bg-zinc-900/60 text-zinc-300 border-zinc-800/50';
  const sizeClass = size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-[11px]';
  const displayLabel = label || type;

  return (
    <span className={`inline-flex items-center gap-1 rounded-md font-mono border backdrop-blur-sm ${colorClass} ${sizeClass}`}>
      <span className="opacity-60">{displayLabel}</span>
      <span className="font-bold">{value}</span>
    </span>
  );
}
