import { Sword, ShoppingBag } from 'lucide-react';
import { WEAPONS_DATABASE, getDailyWeapons } from '../data/gameData';
import Callout from '../components/ui/Callout';
import CommandBadge, { InlineCode } from '../components/ui/CommandBadge';
import CopyButton from '../components/CopyButton';
import UpgradeSimulator from '../components/tools/UpgradeSimulator';
import WeaponsShowcase from '../components/WeaponsShowcase';

export default function WeaponsDatabasePage() {
  const SHARD_EXAMPLES = [
    { tier: 1, label: 'Common Tier', formula: '50 × (level + 1)',  examples: [[0, 50], [4, 250], [9, 500]],   total: 2750 },
    { tier: 2, label: 'Elite Tier',  formula: '120 × (level + 1)', examples: [[0, 120], [4, 600], [9, 1200]],  total: 6600 },
    { tier: 3, label: 'Boss Tier',   formula: '250 × (level + 1)', examples: [[0, 250], [4, 1250], [9, 2500]], total: 13750 },
  ];

  return (
    <div className="space-y-10 pb-16 animate-float-up">

      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl glass-badge flex items-center justify-center text-white border-white/20">
            <Sword className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">Smithy & Armory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Weapons & Smithy Upgrades</h1>
        <p className="text-zinc-300 mt-2 text-base max-w-2xl leading-relaxed">
          Inspect rarity tiers, understand the daily shop rotation schedule, and simulate shard costs for weapon upgrades from +0 to +10.
        </p>
      </div>

      {/* Weapon Rarity Tiers */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">01.</span> Weapon Rarity Tiers
        </h2>
        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[480px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Tier</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Classification</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Acquisition Source</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px] hidden sm:table-cell">Base Strike DMG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { tier: 'Tier 1', label: 'Common', source: 'Starter equipment & /wshop daily shop', dmg: '18–35 DMG' },
                  { tier: 'Tier 2', label: 'Elite',  source: 'Uncommon monster drops from /hunt',       dmg: '36–58 DMG' },
                  { tier: 'Tier 3', label: 'Boss',   source: 'Major boss raids /boss rewards',          dmg: '60–90 DMG' },
                ].map(row => (
                  <tr key={row.tier} className="hover:bg-white/[0.04] transition-colors">
                    <td className="px-5 py-4 text-white font-bold">{row.tier}</td>
                    <td className="px-5 py-4 text-zinc-200 font-semibold">{row.label}</td>
                    <td className="px-5 py-4 text-zinc-300">{row.source}</td>
                    <td className="px-5 py-4 text-white font-semibold hidden sm:table-cell">{row.dmg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Daily Shop */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">02.</span> Daily Weapon Rotation — <CommandBadge cmd="/wshop" />
        </h2>
        <Callout variant="note" title="Daily Rotation Rules">
          Three Tier 1 weapons rotate deterministically every 24 hours at UTC midnight. The rotation sequence is synchronized for all players globally.
        </Callout>

        <div className="glass-card rounded-2xl p-5 border border-white/15 flex items-center gap-4">
          <div className="p-3 rounded-xl glass-badge border-white/15 text-white">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Use <InlineCode>/wshop</InlineCode> in Telegram to browse today’s offerings</div>
            <div className="text-xs text-zinc-300 mt-1">Purchase weapons directly with Shards · Resets at 00:00 UTC</div>
          </div>
        </div>

        {/* Current rotation preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {getDailyWeapons().map(w => (
            <div key={w.id} className="glass-card rounded-2xl p-5 border border-white/15 hover:border-white/25 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">Tier {w.tier} · {w.type}</div>
                <div className="font-bold text-base text-white mb-1.5">{w.name}</div>
                <p className="text-xs text-zinc-300 mb-4 leading-relaxed line-clamp-2">{w.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[
                    { l: 'DMG', v: w.base_dmg },
                    { l: 'STR', v: `+${w.scaling_str}` },
                    { l: 'BLK', v: `${w.block_pct}%` },
                    { l: '◈',   v: w.price },
                  ].map(s => (
                    <span key={s.l} className="glass-badge text-xs font-mono text-zinc-200 px-2 py-0.5 rounded-md border-white/10">
                      {s.l} <strong className="text-white">{s.v}</strong>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <code className="text-xs font-mono text-zinc-300">/buy {w.id}</code>
                <CopyButton text={`/buy ${w.id}`} label="Copy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weapons Database Showcase */}
      <WeaponsShowcase />

      {/* Armory & Equipment Quick Reference */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">03.</span> Armory Management — <CommandBadge cmd="/armory" /> <CommandBadge cmd="/equip" />
        </h2>
        <Callout variant="tip" title="Equipment Mechanics">
          Inspect your owned weapons using <InlineCode>/armory</InlineCode> (paginated with 3 items per page). Equip any weapon at any time using <InlineCode>/equip &lt;weapon_id&gt;</InlineCode>.
        </Callout>

        <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-3">
          <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2 font-semibold">Common Weapon ID Codes</div>
          {WEAPONS_DATABASE.slice(0, 5).map(w => (
            <div key={w.id} className="flex items-center justify-between glass-badge rounded-xl px-4 py-3 border border-white/10">
              <div>
                <span className="text-xs font-mono text-white font-semibold">{w.name}</span>
                <span className="ml-2.5 text-xs text-zinc-400 font-mono">Tier {w.tier}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <code className="text-xs font-mono text-zinc-200">/equip {w.id}</code>
                <CopyButton text={`/equip ${w.id}`} label="Copy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Smithy Upgrades */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">04.</span> Smithy Upgrades — <CommandBadge cmd="/upgrade" />
        </h2>
        <Callout variant="tip" title="Upgrades from +0 to +10">
          Weapons can be forged up to <strong>+10 Max</strong> at the Smithy. Each tier increases in base damage, scaling modifiers, and defensive block percentages.
        </Callout>

        {/* Stat Growth Formula */}
        <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-3">
          <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2 font-semibold">Stat Growth Per Level</div>
          <div className="space-y-2">
            {[
              { stat: 'Base Damage',             formula: 'base_dmg × (1.0 + 0.12 × level)',   note: '+12% per level' },
              { stat: 'STR / DEX / SPD Scalings', formula: 'scaling + (0.05 × level)',          note: '+0.05 per active scaling' },
              { stat: 'Shield Block %',          formula: 'block_pct + (1 × level)',            note: '+1% per level (capped at 85%)' },
            ].map(row => (
              <div key={row.stat} className="glass-badge rounded-xl p-3.5 border border-white/10 flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                <div className="text-xs font-mono text-white font-bold sm:w-56">{row.stat}</div>
                <code className="flex-1 text-xs font-mono text-zinc-200">{row.formula}</code>
                <span className="text-xs font-mono text-zinc-300 font-semibold">{row.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shard Cost Tables */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {SHARD_EXAMPLES.map(te => (
            <div key={te.tier} className="glass-card rounded-2xl p-5 border border-white/15">
              <div className="text-sm font-mono font-bold text-white mb-0.5">{te.label}</div>
              <div className="text-xs font-mono text-zinc-400 mb-3">{te.formula}</div>
              <div className="space-y-2">
                {te.examples.map(([lv, cost]) => (
                  <div key={lv} className="flex justify-between text-xs font-mono text-zinc-300">
                    <span>+{lv} → +{lv + 1}</span>
                    <span className="text-white font-medium">{cost.toLocaleString()} ◈</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-2 flex justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-semibold">+0 → +10 Total</span>
                  <span className="text-white font-bold">{te.total.toLocaleString()} ◈</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Upgrade Simulator */}
      <section className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-semibold">Interactive Smithy Tool</div>
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15">
          <UpgradeSimulator />
        </div>
      </section>

    </div>
  );
}
