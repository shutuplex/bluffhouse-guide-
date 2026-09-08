import React, { useState, useMemo } from 'react';
import { Zap, Heart, Sword, Eye, Wind, Shield } from 'lucide-react';
import { TITLES_PROGRESSION, ANIME_CARDS_DATABASE } from '../../data/gameData';

const STAT_KEYS = ['HP', 'STR', 'DEX', 'SPD', 'DEF'];

const STAT_META = {
  HP:  { icon: Heart,  label: 'HP Pool',   desc: '+10 Max HP per point' },
  STR: { icon: Sword,  label: 'Strength',  desc: 'Scales weapon damage' },
  DEX: { icon: Eye,    label: 'Dexterity', desc: 'Increases crit chance' },
  SPD: { icon: Wind,   label: 'Speed',     desc: 'Initiative & evasion' },
  DEF: { icon: Shield, label: 'Defense',   desc: 'Damage mitigation' },
};

const LEGENDARY_CARDS = ANIME_CARDS_DATABASE
  ? ANIME_CARDS_DATABASE.filter(c => c.rarity === 'Legendary' || c.rarity === 'Mythic').slice(0, 15)
  : [];

function getTitle(level) {
  const t = TITLES_PROGRESSION.find(t => level >= t.minLevel && level <= t.maxLevel);
  return t ? t.title : 'Tarnished of No Renown';
}

function calcShardCost(level) {
  return 10 + Math.floor(level * 2.4);
}

function calcXPCost(level) {
  return Math.round(50 + 20 * Math.pow(level, 1.25));
}

function getTalismanSlots(level) {
  if (level >= 50) return 3;
  if (level >= 25) return 2;
  return 1;
}

export default function StatCalculator() {
  const [level, setLevel] = useState(35);
  const [stats, setStats] = useState({ HP: 7, STR: 10, DEX: 8, SPD: 5, DEF: 5 });
  const [equippedTalismans, setEquippedTalismans] = useState([]);

  const slots = getTalismanSlots(level);
  const availablePoints = level;
  const usedPoints = Object.values(stats).reduce((a, b) => a + b, 0);
  const freePoints = availablePoints - usedPoints;

  // Talisman bonuses
  const talismanBonuses = useMemo(() => {
    const bonuses = { HP: 0, STR: 0, DEX: 0, SPD: 0, DEF: 0 };
    equippedTalismans.forEach(cardId => {
      const card = LEGENDARY_CARDS.find(c => c.characterId === cardId);
      if (card?.stat) {
        if (card.stat.type === 'HP') bonuses.HP += card.stat.value;
        else if (bonuses[card.stat.type] !== undefined) bonuses[card.stat.type] += card.stat.value;
      }
    });
    return bonuses;
  }, [equippedTalismans]);

  // Final computed stats
  const finalHP  = 100 + (stats.HP * 10) + talismanBonuses.HP;
  const finalSTR = stats.STR + talismanBonuses.STR;
  const finalDEX = stats.DEX + talismanBonuses.DEX;
  const finalSPD = stats.SPD + talismanBonuses.SPD;
  const finalDEF = stats.DEF + talismanBonuses.DEF;

  const critChance = Math.min(0.60, 0.05 + finalDEX * 0.0035);
  const mitigation = finalDEF / (finalDEF + 80);
  const title      = getTitle(level);

  const setStat = (key, val) => {
    const newVal = Math.max(0, Math.min(val, stats[key] + freePoints));
    setStats(prev => ({ ...prev, [key]: newVal }));
  };

  const toggleTalisman = (cardId) => {
    setEquippedTalismans(prev => {
      if (prev.includes(cardId)) return prev.filter(id => id !== cardId);
      if (prev.length >= slots) return prev;
      return [...prev, cardId];
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-white" />
            Interactive Stat Simulator
          </h3>
          <p className="text-xs text-zinc-300 mt-1 font-mono">Real-time character attribute scaling and derived parameters</p>
        </div>
        <div className="sm:text-right glass-badge px-3.5 py-1.5 rounded-xl border border-white/15">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Earned Title</div>
          <div className="text-xs font-bold text-white font-mono">{title}</div>
        </div>
      </div>

      {/* Level Slider */}
      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">Tarnished Level</span>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black font-mono text-white">Lv {level}</span>
            <div className="text-right pl-3 border-l border-white/10">
              <div className="text-xs font-mono text-zinc-300 font-medium">{calcShardCost(level)} ◈ Shards</div>
              <div className="text-xs font-mono text-zinc-300 font-medium">{calcXPCost(level).toLocaleString()} XP</div>
            </div>
          </div>
        </div>
        <input
          type="range" min={1} max={100} value={level}
          onChange={e => {
            const l = Number(e.target.value);
            setLevel(l);
            const newUsed = Object.values(stats).reduce((a, b) => a + b, 0);
            if (newUsed > l) setStats({ HP: 0, STR: 0, DEX: 0, SPD: 0, DEF: 0 });
          }}
          className="w-full"
        />
        <div className="flex justify-between text-xs font-mono text-zinc-300">
          <span>Level 1</span>
          <span className="font-bold text-white">
            {freePoints > 0 ? `${freePoints} unallocated point${freePoints > 1 ? 's' : ''}` : 'Points fully invested'}
          </span>
          <span>Level 100</span>
        </div>
      </div>

      {/* Stat Allocation Sliders */}
      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">Stat Point Allocation</span>
          <span className="text-xs font-mono text-white font-bold glass-badge px-3 py-1 rounded-lg border border-white/15">
            {usedPoints} / {availablePoints} points allocated
          </span>
        </div>

        <div className="space-y-4">
          {STAT_KEYS.map(key => {
            const meta = STAT_META[key];
            const Icon = meta.icon;
            const val = stats[key];
            const bonus = talismanBonuses[key] || 0;
            return (
              <div key={key} className="space-y-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-xs font-mono font-bold text-white">{meta.label} ({key})</span>
                    <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">— {meta.desc}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-white">
                    {val}
                    {bonus > 0 && <span className="text-zinc-300 ml-1.5 font-normal">(+{bonus} Talisman)</span>}
                  </div>
                </div>
                <input
                  type="range" min={0} max={availablePoints} value={val}
                  onChange={e => setStat(key, Number(e.target.value))}
                  className="w-full"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Derived Combat Parameters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Maximum Health', val: finalHP, unit: 'HP', desc: '100 Base + invested' },
          { label: 'Critical Strike', val: `${(critChance * 100).toFixed(1)}%`, unit: 'Chance', desc: '5% Base + DEX (cap 60%)' },
          { label: 'Damage Mitigation', val: `${(mitigation * 100).toFixed(1)}%`, unit: 'Armor', desc: 'DEF / (DEF + 80)' },
          { label: 'Speed Advantage', val: finalSPD, unit: 'SPD', desc: 'Initiative & evasion' },
        ].map(item => (
          <div key={item.label} className="glass-card rounded-2xl p-5 border border-white/15 text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mb-1">{item.val}</div>
            <div className="text-xs font-mono text-zinc-200 font-semibold">{item.label}</div>
            <div className="text-[10px] text-zinc-400 mt-1">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Talisman Pouch Synergy */}
      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">Talisman Pouch Slots</div>
            <p className="text-xs text-zinc-300 mt-0.5">Equip legendary card bonuses ({equippedTalismans.length} / {slots} slots active)</p>
          </div>
          <span className="text-xs font-mono text-zinc-300 glass-badge px-3 py-1 rounded-lg border-white/15">
            {level < 25 ? 'Slot 2 at Lv 25' : level < 50 ? 'Slot 3 at Lv 50' : 'All Slots Unlocked'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {LEGENDARY_CARDS.map(card => {
            const isEquipped = equippedTalismans.includes(card.characterId);
            return (
              <button
                key={card.characterId}
                onClick={() => toggleTalisman(card.characterId)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isEquipped
                    ? 'bg-white/15 border-white/40 shadow-lg'
                    : 'glass-badge border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div className="text-xs font-bold text-white truncate">{card.name}</div>
                <div className="text-[10px] text-zinc-400 truncate mt-0.5">{card.anime}</div>
                {card.stat && (
                  <div className="mt-2 text-[11px] font-mono text-zinc-200 font-semibold">
                    +{card.stat.value} {card.stat.type}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
