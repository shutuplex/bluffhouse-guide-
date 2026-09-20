import React, { useState } from 'react';
import { FlameKindling, RotateCcw, Shield, Award, Sparkles, Gift, Users } from 'lucide-react';
import CopyButton from '../components/CopyButton';
import { STAT_INFO, TITLES_PROGRESSION } from '../data/gameData';
import Callout from '../components/ui/Callout';
import CommandBadge, { InlineCode } from '../components/ui/CommandBadge';
import StatCalculator from '../components/tools/StatCalculator';

const STATS = [
  { key: 'HP',  formula: 'Total HP = 100 + (HP_points × 10)',         example: '20 HP invested → 300 Total HP pool' },
  { key: 'STR', formula: 'Damage += STR × weapon_STR_scaling',         example: '15 STR with 0.6 scaling → +9 Attack DMG' },
  { key: 'DEX', formula: 'Crit % = 0.05 + DEX × 0.0035  (capped 60%)', example: '50 DEX → 22.5% critical hit rate' },
  { key: 'SPD', formula: 'Flee % = 0.50 + (Player_SPD − Enemy_SPD) × 0.015', example: '10 SPD advantage → 65% escape chance' },
  { key: 'DEF', formula: 'Mitigation = DEF / (DEF + 80)',              example: '40 DEF → 33.3% damage reduction' },
];

export default function RPGProgressionPage() {
  const [selectedStat, setSelectedStat] = useState('HP');
  const statEntry = STATS.find(s => s.key === selectedStat);
  const statInfo = STAT_INFO[selectedStat];

  return (
    <div className="space-y-10 pb-16 animate-float-up">

      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl glass-badge flex items-center justify-center text-white border-white/20">
            <FlameKindling className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">RPG Mechanics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Site of Grace & Character Stats</h1>
        <p className="text-zinc-300 mt-2 text-base max-w-2xl leading-relaxed">
          Level your Tarnished from 1 to 100. Allocate attribute points across 5 core combat stats, unlock Talisman Pouches, and earn prestigious progression titles.
        </p>
      </div>

      {/* Leveling System */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">01.</span> Leveling Mechanics — <CommandBadge cmd="/levelup" />
        </h2>
        <Callout variant="note" title="Site of Grace Progression">
          Spend XP and Shards at the Site of Grace to level up. Each level-up grants <strong className="text-white">+1 Attribute Point</strong> to freely invest into any combat stat.
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {[
            { title: 'Shard Cost Formula', formula: 'Shards = 10 + Math.floor(level × 2.4)', examples: [[1, 12], [10, 34], [25, 70], [50, 130], [75, 190], [99, 247]], unit: '◈' },
            { title: 'XP Required Formula', formula: 'XP = 50 + 20 × (level ^ 1.25)',        examples: [[1, 70], [10, 373], [25, 1028], [50, 2592], [75, 4803], [99, 7696]], unit: 'XP' },
          ].map(col => (
            <div key={col.title} className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
              <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">{col.title}</div>
              <div className="code-block p-3.5 rounded-xl border border-white/10">
                <code className="text-xs font-mono text-white font-medium">{col.formula}</code>
              </div>
              <div className="space-y-2">
                {col.examples.map(([lv, val]) => (
                  <div key={lv} className="flex justify-between text-xs font-mono glass-badge rounded-xl px-4 py-2 border border-white/10 text-zinc-300">
                    <span>Level {lv}</span>
                    <span className="text-white font-semibold">{val.toLocaleString()} {col.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Combat Stats */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">02.</span> 5 Core Combat Attributes
        </h2>

        {/* Tab selection */}
        <div className="flex flex-wrap gap-2 pt-1">
          {STATS.map(s => (
            <button
              key={s.key}
              onClick={() => setSelectedStat(s.key)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                selectedStat === s.key
                  ? 'bg-white/15 border-white/30 text-white shadow-lg'
                  : 'text-zinc-300 glass-badge border-white/10 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {s.key}
            </button>
          ))}
        </div>

        {statEntry && (
          <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/15 animate-float-up">
            <div>
              <div className="text-sm font-mono text-white font-bold mb-1">{STAT_INFO[selectedStat]?.name} ({selectedStat})</div>
              <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">{statInfo?.desc}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="code-block p-4 rounded-xl border border-white/10">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">Mathematical Formula</div>
                <code className="text-xs font-mono text-white font-medium">{statEntry.formula}</code>
              </div>
              <div className="code-block p-4 rounded-xl border border-white/10">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">Example Output</div>
                <code className="text-xs font-mono text-zinc-200 font-medium">{statEntry.example}</code>
              </div>
            </div>
          </div>
        )}

        {/* Quick Attribute Reference Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[500px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Attribute</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Base Effect</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px] hidden sm:table-cell">Scaling Per Point</th>
                  <th className="text-right px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Cap / Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/[0.04] transition-colors"><td className="px-5 py-4 text-white font-bold">HP</td><td className="px-5 py-4 text-zinc-300">100 Base HP pool</td><td className="px-5 py-4 text-zinc-300 hidden sm:table-cell">+10 HP per invested point</td><td className="px-5 py-4 text-right text-zinc-400">None</td></tr>
                <tr className="hover:bg-white/[0.04] transition-colors"><td className="px-5 py-4 text-white font-bold">STR</td><td className="px-5 py-4 text-zinc-300">Multiplies weapon STR scaling</td><td className="px-5 py-4 text-zinc-300 hidden sm:table-cell">Weapon STR scaling multiplier</td><td className="px-5 py-4 text-right text-zinc-400">None</td></tr>
                <tr className="hover:bg-white/[0.04] transition-colors"><td className="px-5 py-4 text-white font-bold">DEX</td><td className="px-5 py-4 text-zinc-300">5.0% Base Critical Strike chance</td><td className="px-5 py-4 text-zinc-300 hidden sm:table-cell">+0.35% Crit Rate per point</td><td className="px-5 py-4 text-right text-white font-semibold">60.0% Max</td></tr>
                <tr className="hover:bg-white/[0.04] transition-colors"><td className="px-5 py-4 text-white font-bold">SPD</td><td className="px-5 py-4 text-zinc-300">Turn initiative & evasion odds</td><td className="px-5 py-4 text-zinc-300 hidden sm:table-cell">+1.5% Flee chance per point</td><td className="px-5 py-4 text-right text-zinc-400">None</td></tr>
                <tr className="hover:bg-white/[0.04] transition-colors"><td className="px-5 py-4 text-white font-bold">DEF</td><td className="px-5 py-4 text-zinc-300">Hyperbolic damage mitigation</td><td className="px-5 py-4 text-zinc-300 hidden sm:table-cell">DEF / (DEF + 80) formula</td><td className="px-5 py-4 text-right text-white font-semibold">~80% Softcap</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Talisman Pouches */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">03.</span> Talisman Pouches & Passives — <CommandBadge cmd="/talismans" /> <CommandBadge cmd="/pouch_equip" />
        </h2>
        <Callout variant="tip" title="Talisman Card Synergy & 1-Mythic Limit Rule">
          Equip Legendary or Mythic Anime Cards into your unlocked Talisman Pouch slots to receive permanent passive bonuses. <strong>Important Rule:</strong> Players can only equip <strong>1 active Mythic Talisman</strong> at a time. Equipping a second Mythic automatically swaps the existing one in-place while keeping Legendary / Summer Edition cards intact in your other slots.
        </Callout>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-1">
          {[
            { slot: 1, level: 'Level 1',  desc: 'Active from character creation' },
            { slot: 2, level: 'Level 25', desc: 'Unlocks automatically at Level 25' },
            { slot: 3, level: 'Level 50', desc: 'Unlocks automatically at Level 50' },
            { slot: 4, level: 'Clan Lv 10', desc: 'Unlocked via Clan Level 10 Perk' },
          ].map(s => (
            <div key={s.slot} className="glass-card rounded-2xl p-5 text-center border border-white/15">
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mb-1.5">{s.slot}</div>
              <div className="text-xs font-mono text-white font-bold">Pouch Slot {s.slot}</div>
              <div className="text-xs text-zinc-300 mt-1 font-mono">{s.level}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Standard Talisman Stat Bonuses */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[480px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Talisman Grade</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Stat Type</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px] hidden sm:table-cell">In-Combat Benefit</th>
                  <th className="text-right px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Slot Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ['+5 STR', 'Strength (Legendary)',       'Boosts heavy weapon scaling and strike output', 'Up to 3-4 Slots'],
                  ['+5 DEF', 'Defense (Legendary)',        'Increases damage mitigation curve against blows', 'Up to 3-4 Slots'],
                  ['+5 DEX', 'Dexterity (Legendary)',      'Increases critical strike probability by +1.75%', 'Up to 3-4 Slots'],
                  ['+5 SPD', 'Speed (Legendary)',          'Improves initiative ranking and flee probability', 'Up to 3-4 Slots'],
                  ['+50 HP', 'Mythic Pinnacle Blessing',   'Expands total character hit point survivability pool', '1 Active Max'],
                ].map(([bonus, stat, effect, limit]) => (
                  <tr key={bonus} className="hover:bg-white/[0.04] transition-colors">
                    <td className="px-5 py-4 text-white font-bold">{bonus}</td>
                    <td className="px-5 py-4 text-zinc-200 font-medium">{stat}</td>
                    <td className="px-5 py-4 text-zinc-300 hidden sm:table-cell">{effect}</td>
                    <td className="px-5 py-4 text-right text-zinc-200 font-bold">{limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mythic Unique Passives Showcase */}
        <div className="glass-card rounded-2xl p-5 border border-purple-500/30 bg-purple-500/[0.04] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <h3 className="font-bold text-white text-sm">Mythic Passives & Universal Inline Ability Badges</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-500/40 font-semibold">
              Max 1 Mythic Equipped
            </span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Mythic abilities are labeled with inline badges across <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded text-xs">/collection</code>, <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded text-xs">/shop</code>, <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded text-xs">/talismans</code>, <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded text-xs">@bot</code> inline search, and <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded text-xs">/rdm</code>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="glass-badge rounded-xl p-4 border-purple-500/30 space-y-2 bg-black/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300">✦ Lord of Blood's Exultation</span>
                <span className="text-[10px] font-mono text-zinc-400">Card #289 · Changsu OH</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed">
                Landing a Blood Loss hit triggers <strong>+20% ATK damage</strong> on your next 3 strikes (Active in PvP Arena, PvE Hunts, and World Boss Raids).
              </p>
            </div>

            <div className="glass-badge rounded-xl p-4 border-purple-500/30 space-y-2 bg-black/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300">✦ Vampiric Rot</span>
                <span className="text-[10px] font-mono text-zinc-400">Card #189 · Bunny Iglesias</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed">
                <strong>100% of Scarlet Rot DoT ticks</strong> heal your character directly instead of suffering attrition (Active in PvP Arena, PvE Hunts, and World Boss Raids).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Progression Titles */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">04.</span> RPG Titles & Milestones
        </h2>
        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[480px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Level Bracket</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Title Earned</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px] hidden sm:table-cell">Perk / Bonus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {TITLES_PROGRESSION.map((t, i) => (
                  <tr key={i} className="hover:bg-white/[0.04] transition-colors">
                    <td className="px-5 py-4 text-zinc-300 whitespace-nowrap font-medium">{t.minLevel}–{t.maxLevel}</td>
                    <td className="px-5 py-4 font-bold text-white">{t.title}</td>
                    <td className="px-5 py-4 text-zinc-300 hidden sm:table-cell">{t.perk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Respec System */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">05.</span> Rebirth & Respec — <CommandBadge cmd="/respec" />
        </h2>
        <Callout variant="warn" title="Respec Conditions">
          Resetting reallocates all invested attribute points for a flat fee of <strong>100 Shards</strong>. Your character level and gear remain unchanged.
        </Callout>
        <div className="glass-card rounded-2xl p-6 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-base font-bold text-white">Reset Allocated Stat Points</div>
            <div className="text-xs text-zinc-300 mt-1">Level preserved · Points returned to pool · Talismans unaffected</div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 glass-badge px-4 py-2 rounded-xl border-white/15">
            <span className="text-2xl font-black font-mono text-white">100</span>
            <span className="text-xs text-zinc-300 font-mono font-medium">◈ Shards</span>
          </div>
        </div>
      </section>

      {/* Referral System & Achievements */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-zinc-400 font-mono text-sm">06.</span> Referrals & Rewards — <CommandBadge cmd="/ref" /> <CommandBadge cmd="/referral" />
            </h2>
            <p className="text-xs text-zinc-300 font-mono mt-1">
              Recruit new Tarnished into the realm to unlock weapons, legendary anime cards, stat points, and exclusive titles.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-mono text-xs font-semibold self-start sm:self-auto border border-white/15">
            Format: /start ref_&lt;USER_ID&gt;
          </span>
        </div>

        <Callout variant="tip" title="Dual Onboarding Bounties">
          Both the recruiter and the newcomer receive rewards upon successful join verification. Recruits unlock starter gear immediately, while inviters climb milestone tiers toward the Grand Recruiter title.
        </Callout>

        {/* Base Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">New Recruit Welcome Bundle</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Every newcomer who registers through your referral link receives:
            </p>
            <div className="glass-badge rounded-xl p-3 border-white/10 text-xs font-mono text-white space-y-1">
              <div>+30 Welcome Starter Shards</div>
              <div className="text-zinc-300">+ Starter RPG Combat Equipment Pack</div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-white text-sm">Inviter Bounty (Per Recruit)</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Awarded immediately when a referred player joins the realm:
            </p>
            <div className="glass-badge rounded-xl p-3 border-white/10 text-xs font-mono text-white space-y-1">
              <div>+100 Shards Currency Bonus</div>
              <div className="text-zinc-300">+ 1 Common Character Card (+50 Shards if already owned)</div>
            </div>
          </div>
        </div>

        {/* Milestone Progression Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[540px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Recruits</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Milestone Rewards</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Duplicate Protection / Perks</th>
                  <th className="text-right px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Profile Title</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-4 font-bold text-white">1 Friend</td>
                  <td className="px-5 py-4 text-zinc-200 font-semibold">Random Tier 2 Elite Weapon</td>
                  <td className="px-5 py-4 text-zinc-300">+50 Shards if weapon already owned</td>
                  <td className="px-5 py-4 text-right text-zinc-400">—</td>
                </tr>
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-4 font-bold text-white">3 Friends</td>
                  <td className="px-5 py-4 text-zinc-200 font-semibold">Tier 2 Elite Weapon + 1 Legendary Card</td>
                  <td className="px-5 py-4 text-zinc-300">Guaranteed random +5 attribute roll</td>
                  <td className="px-5 py-4 text-right text-zinc-400">—</td>
                </tr>
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-4 font-bold text-white">5 Friends</td>
                  <td className="px-5 py-4 text-amber-300 font-semibold">+500 Shards + +5 RPG Stat Points</td>
                  <td className="px-5 py-4 text-zinc-300">Direct points to allocate via /levelup</td>
                  <td className="px-5 py-4 text-right text-white font-bold">Grand Recruiter</td>
                </tr>
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-4 font-bold text-white">10 Friends</td>
                  <td className="px-5 py-4 text-purple-300 font-semibold">+1,000 Shards + Tier 3 Boss Weapon</td>
                  <td className="px-5 py-4 text-zinc-300">Apex high-tier armament drop</td>
                  <td className="px-5 py-4 text-right text-purple-300 font-bold">Master Recruiter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievement Badge Callout */}
        <div className="glass-card rounded-2xl p-5 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">Profile Achievement</div>
            <div className="text-sm font-bold text-white">Grand Recruiter Badge & Title</div>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-xl">
              Unlocks the prestigious <strong>Grand Recruiter</strong> title and badge on your <InlineCode>/profile</InlineCode> → Achievements card when you hit 5 verified recruits.
            </p>
          </div>
          <div className="glass-badge px-4 py-2 rounded-xl border-white/15 text-center flex-shrink-0">
            <code className="text-xs font-mono text-white font-bold">/profile achievements</code>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Interactive Tool */}
      <section className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-semibold">Interactive Stat Simulator</div>
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15">
          <StatCalculator />
        </div>
      </section>

    </div>
  );
}
