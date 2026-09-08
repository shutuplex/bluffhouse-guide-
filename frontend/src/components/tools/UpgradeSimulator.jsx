import React, { useState, useMemo } from 'react';
import { Hammer, TrendingUp, Shield } from 'lucide-react';
import { WEAPONS_DATABASE } from '../../data/gameData';

const TIER_COSTS = { 1: 50, 2: 120, 3: 250 };
const TIER_LABELS = { 1: 'Common', 2: 'Elite', 3: 'Boss' };

function calcCost(tier, level) {
  return TIER_COSTS[tier] * (level + 1);
}

function calcCumCost(tier, upTo) {
  let total = 0;
  for (let i = 0; i < upTo; i++) total += calcCost(tier, i);
  return total;
}

function calcUpgradedStats(weapon, level) {
  const base_dmg = weapon.base_dmg * (1.0 + 0.12 * level);
  const scaling_str = weapon.scaling_str + 0.05 * level;
  const scaling_dex = weapon.scaling_dex + 0.05 * level;
  const scaling_spd = weapon.scaling_spd + 0.05 * level;
  const scaling_def = weapon.scaling_def + 0.05 * level;
  const block_pct = Math.min(85, weapon.block_pct + 1 * level);
  return { base_dmg, scaling_str, scaling_dex, scaling_spd, scaling_def, block_pct };
}

export default function UpgradeSimulator() {
  const [selectedId, setSelectedId] = useState(WEAPONS_DATABASE[0]?.id || '');
  const [upgradeLevel, setUpgradeLevel] = useState(0);

  const weapon = WEAPONS_DATABASE.find(w => w.id === selectedId) || WEAPONS_DATABASE[0];
  const upgraded = useMemo(() => weapon ? calcUpgradedStats(weapon, upgradeLevel) : null, [weapon, upgradeLevel]);
  const base = useMemo(() => weapon ? calcUpgradedStats(weapon, 0) : null, [weapon]);
  const costNext = weapon && upgradeLevel < 10 ? calcCost(weapon.tier, upgradeLevel) : 0;
  const costTotal = weapon ? calcCumCost(weapon.tier, upgradeLevel) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Hammer className="w-5 h-5 text-white" />
          Weapon Upgrade Simulator
        </h3>
        <p className="text-xs text-zinc-300 mt-1 font-mono">Smithy upgrade stat progression from +0 to +10</p>
      </div>

      {/* Weapon Selector */}
      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-3">
        <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">Choose Weapon to Forge</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
          {WEAPONS_DATABASE.map(w => (
            <button
              key={w.id}
              onClick={() => { setSelectedId(w.id); setUpgradeLevel(0); }}
              className={`flex items-center justify-between p-3 rounded-xl text-left text-xs font-mono border transition-all cursor-pointer ${
                selectedId === w.id
                  ? 'bg-white/15 border-white/40 text-white font-semibold shadow-md'
                  : 'glass-badge border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span className="truncate">{w.name}</span>
              <span className="text-[11px] text-zinc-400 ml-2 flex-shrink-0">Tier {w.tier}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upgrade Level Slider */}
      {weapon && (
        <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">Smithy Upgrade Level</span>
            <span className="text-3xl font-black font-mono text-white">
              +{upgradeLevel}
              {upgradeLevel === 10 && <span className="text-xs font-bold text-white ml-2 glass-badge px-2 py-0.5 rounded-full border-white/20">MAX</span>}
            </span>
          </div>
          <input
            type="range" min={0} max={10} value={upgradeLevel}
            onChange={e => setUpgradeLevel(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs font-mono text-zinc-300">
            <span>+0 Base</span>
            <span>+5 Intermediate</span>
            <span>+10 Pinnacle</span>
          </div>
        </div>
      )}

      {/* Live Stat Deltas Grid */}
      {upgraded && base && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: 'Base Strike DMG',
              current: upgraded.base_dmg.toFixed(0),
              baseVal: base.base_dmg.toFixed(0),
              delta: `+${(upgraded.base_dmg - base.base_dmg).toFixed(0)}`,
            },
            {
              label: 'STR Scaling',
              current: upgraded.scaling_str.toFixed(2),
              baseVal: base.scaling_str.toFixed(2),
              delta: `+${(upgraded.scaling_str - base.scaling_str).toFixed(2)}`,
            },
            {
              label: 'DEX Scaling',
              current: upgraded.scaling_dex.toFixed(2),
              baseVal: base.scaling_dex.toFixed(2),
              delta: `+${(upgraded.scaling_dex - base.scaling_dex).toFixed(2)}`,
            },
            {
              label: 'Shield Block %',
              current: `${upgraded.block_pct}%`,
              baseVal: `${base.block_pct}%`,
              delta: `+${upgraded.block_pct - base.block_pct}%`,
            },
          ].map(stat => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 border border-white/15 text-center">
              <div className="text-2xl font-black font-mono text-white">{stat.current}</div>
              <div className="text-xs font-mono text-zinc-200 mt-1 font-semibold">{stat.label}</div>
              {upgradeLevel > 0 && (
                <div className="text-[11px] font-mono text-white font-bold mt-1">
                  {stat.delta} vs +0
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Cost Cards */}
      {weapon && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-white/15">
            <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1 font-semibold">Cost to Forge Next Level</div>
            <div className="text-2xl font-black font-mono text-white">
              {upgradeLevel < 10 ? `${costNext.toLocaleString()} ◈ Shards` : 'Max Level Reached'}
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 font-mono">
              {upgradeLevel < 10 ? `+{upgradeLevel} → +{upgradeLevel + 1}` : 'Weapon has reached +10 maximum limit'}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/15">
            <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1 font-semibold">Cumulative Shards Invested</div>
            <div className="text-2xl font-black font-mono text-white">
              {costTotal.toLocaleString()} ◈ Shards
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 font-mono">
              Total expenditure from +0 to +{upgradeLevel}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
