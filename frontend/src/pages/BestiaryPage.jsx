import React from 'react';
import { Skull, Gift } from 'lucide-react';
import Callout from '../components/ui/Callout';
import CommandBadge from '../components/ui/CommandBadge';

export default function BestiaryPage() {
  return (
    <div className="space-y-6 sm:space-y-10 pb-16 animate-float-up">

      {/* Header Banner */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-white/15 relative overflow-hidden">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl glass-badge flex items-center justify-center text-white border-white/20">
            <Skull className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">Encounters & Spawns</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">Spawn Rates & Drop Rewards</h1>
        <p className="text-zinc-300 mt-2 text-xs sm:text-base max-w-2xl leading-relaxed">
          Overview of encounter spawn probabilities, monster tier brackets, and complete reward drop tables.
        </p>
      </div>

      {/* Spawn Rates */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-xs sm:text-sm">01.</span> Encounter Spawn Rates — <CommandBadge cmd="/hunt" />
        </h2>
        <Callout variant="note" title="Encounter System">
          Trigger encounters with <span className="text-white font-mono font-medium">/hunt</span> or <span className="text-white font-mono font-medium">/explore</span>. Spawns are dynamically determined by weighted tier probabilities.
        </Callout>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1 sm:pt-2">
          {[
            { tier: 'Common Tier', rate: '65%', desc: 'Standard hunts, low risk, steady shard gain' },
            { tier: 'Elite Tier',  rate: '25%', desc: 'Challenging monsters with rare tier 2 weapons' },
            { tier: 'Boss Tier',   rate: '10%', desc: 'High-threat mini-bosses with guaranteed weapon drops' },
          ].map(t => (
            <div key={t.tier} className="glass-card rounded-2xl p-5 sm:p-6 border border-white/15">
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mb-1 sm:mb-2">{t.rate}</div>
              <div className="text-sm font-semibold text-zinc-100">{t.tier}</div>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Probability bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2.5 sm:space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-300">Encounter Weight Distribution</div>
          <div className="flex h-3 sm:h-3.5 rounded-full overflow-hidden gap-1 p-0.5 bg-black/40 border border-white/10">
            <div className="bg-zinc-300 rounded-l-full" style={{ width: '65%' }} title="Common 65%" />
            <div className="bg-zinc-500" style={{ width: '25%' }} title="Elite 25%" />
            <div className="bg-zinc-700 rounded-r-full" style={{ width: '10%' }} title="Boss 10%" />
          </div>
          <div className="flex flex-wrap justify-between text-xs font-mono text-zinc-300 gap-2">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-300" /> Common (65%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-500" /> Elite (25%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-700" /> Boss (10%)</span>
          </div>
        </div>
      </section>

      {/* Drop Rewards Table */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-xs sm:text-sm">02.</span> Drop Table & Rewards
        </h2>
        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[480px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Encounter Tier</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">XP Reward</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Shards ◈</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Armament Drops</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { tier: 'Common Tier 1', xp: '20–80 XP',      shards: '10–30 ◈',    weapon: 'Standard consumable items' },
                  { tier: 'Elite Tier 2',  xp: '80–200 XP',     shards: '30–80 ◈',    weapon: 'Tier 2 weapon drop chance' },
                  { tier: 'Boss Tier 3',   xp: '200–600 XP',    shards: '80–200 ◈',   weapon: 'Guaranteed Tier 3 weapon' },
                  { tier: 'Major Raid T5', xp: '1,000–3,000 XP', shards: '300–800 ◈', weapon: 'Exclusive boss weapon' },
                ].map(row => (
                  <tr key={row.tier} className="hover:bg-white/[0.04] transition-colors">
                    <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-white font-semibold">{row.tier}</td>
                    <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-200">{row.xp}</td>
                    <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-200 font-semibold">{row.shards}</td>
                    <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-300">{row.weapon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
