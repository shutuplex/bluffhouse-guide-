import React, { useState, useEffect } from 'react';
import { Clock, ShieldAlert } from 'lucide-react';
import { getCurrentMajorBoss } from '../data/gameData';

export default function CountdownTimer({ onBossChange, onNavigate }) {
  const [data, setData] = useState(getCurrentMajorBoss());

  useEffect(() => {
    const timer = setInterval(() => {
      const current = getCurrentMajorBoss();
      setData(current);
      if (onBossChange) onBossChange(current.boss);
    }, 1000);
    return () => clearInterval(timer);
  }, [onBossChange]);

  const totalSec = Math.floor(data.msRemaining / 1000);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  const formattedTime = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <ShieldAlert className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Current 2-Hour Major Boss Raid</div>
          <div className="text-base font-semibold text-white flex items-center gap-2">
            <span>{data.boss.name}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60 font-mono">Tier 5</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-center">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-sm font-semibold tracking-wider">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>{formattedTime}</span>
        </div>
        {onNavigate && (
          <button
            onClick={() => onNavigate('enemies')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Raid Details
          </button>
        )}
      </div>
    </div>
  );
}
