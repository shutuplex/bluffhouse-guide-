import React, { useState } from 'react';
import { Dices, Trophy, Target } from 'lucide-react';
import Callout from '../components/ui/Callout';
import CommandBadge, { InlineCode } from '../components/ui/CommandBadge';

const ROULETTE_ITEMS = [
  { name: 'Magnifying Glass', effect: 'Inspects the chamber to reveal whether the loaded shell is Live or Blank.', strategy: 'Use first on your turn. If live, shoot the opponent. If blank, shoot yourself to retain the turn.' },
  { name: 'Cigarette',        effect: 'Immediately restores +1 HP life point to the user.', strategy: 'Use when at 1 HP to survive an opponent’s live round. Stalls the shotgun chamber safely.' },
  { name: 'Handcuffs',        effect: 'Restrains the opponent, forcing them to skip their next action turn entirely.', strategy: 'Pair with the Hand Saw to guarantee an unblocked double-damage shotgun blast.' },
  { name: 'Beer',             effect: 'Racks the action and ejects the currently chambered shell without firing.', strategy: 'Eject known blanks to cycle quickly to live ammunition, or discard a live shell if you would perish.' },
  { name: 'Hand Saw',         effect: 'Saws off the barrel so the next live shell inflicts 2 HP damage instead of 1.', strategy: 'Deadly when paired with Magnifying Glass or Handcuffs for an instant knockout.' },
];

const QUIZ_CATEGORIES = [
  { id: 'bleach',    name: 'Bleach Universe',      desc: 'Soul Society lore, Captains, Zanpakuto shikai, Bankai releases, and Espada rankings.' },
  { id: 'lookism',   name: 'Lookism Webtoon',      desc: 'Body-swap mechanics, Four Major Crews, Allied, Workers, and martial art tiers.' },
  { id: 'eldenring', name: 'Elden Ring Lore',      desc: 'Demigods, Great Runes, Lands Between geography, boss drops, and Tarnished quests.' },
];

export default function MiniGamesPage() {
  const [activeItem, setActiveItem] = useState(0);
  const item = ROULETTE_ITEMS[activeItem];

  return (
    <div className="space-y-10 pb-16 animate-float-up">

      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl glass-badge flex items-center justify-center text-white border-white/20">
            <Dices className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">PvP Minigames</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Russian Roulette & Duels</h1>
        <p className="text-zinc-300 mt-2 text-base max-w-2xl leading-relaxed">
          High-stakes tactical Russian Roulette item combos, 3-round anime card wager battles, and knowledge trivia quizzes.
        </p>
      </div>

      {/* Russian Roulette System */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">01.</span> Russian Roulette — <CommandBadge cmd="/duel" />
        </h2>
        <Callout variant="note" title="Revolver Mechanics">
          Challenge any rival with <InlineCode>/duel [wager]</InlineCode>. A cylinder is loaded with Live and Blank shells. Players alternate turns pulling the trigger on themselves or their opponent while deploying 5 tactical items.
        </Callout>

        {/* Item selection tabs */}
        <div className="flex flex-wrap gap-2 pt-1">
          {ROULETTE_ITEMS.map((it, i) => (
            <button
              key={i}
              onClick={() => setActiveItem(i)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                activeItem === i
                  ? 'bg-white/15 border-white/30 text-white shadow-lg'
                  : 'text-zinc-300 glass-badge border-white/10 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {it.name}
            </button>
          ))}
        </div>

        {/* Active item card */}
        <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4 animate-float-up">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">{item.name}</h3>
            <span className="text-xs font-mono text-zinc-300 glass-badge px-3 py-1 rounded-full border-white/15">Tactical Item 0{activeItem + 1}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel rounded-xl p-4 border border-white/10 space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Item Effect</div>
              <p className="text-xs text-white leading-relaxed">{item.effect}</p>
            </div>
            <div className="glass-panel rounded-xl p-4 border border-white/10 space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Pro Strategy</div>
              <p className="text-xs text-zinc-200 leading-relaxed">{item.strategy}</p>
            </div>
          </div>
        </div>

        {/* Item Reference Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[480px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Item</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">In-Game Functionality</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px] hidden md:table-cell">Optimal Play</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {ROULETTE_ITEMS.map(it => (
                  <tr key={it.name} className="hover:bg-white/[0.04] transition-colors">
                    <td className="px-5 py-4 text-white font-bold whitespace-nowrap">{it.name}</td>
                    <td className="px-5 py-4 text-zinc-200">{it.effect}</td>
                    <td className="px-5 py-4 text-zinc-300 hidden md:table-cell">{it.strategy.split('.')[0]}.</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Winning combos */}
        <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-3">
          <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold mb-2">High-Winrate Item Combos</div>
          {[
            { combo: 'Glass + Hand Saw',             desc: 'Inspect live shell, saw barrel to double power → guaranteed 2 HP lethal shot.' },
            { combo: 'Handcuffs + Hand Saw',         desc: 'Lock opponent’s turn completely, saw barrel, and fire twice without retaliation.' },
            { combo: 'Beer × 2 + Glass + Hand Saw',   desc: 'Eject blanks safely to cycle to live ammo, verify with glass, and finish the duel.' },
          ].map((c, i) => (
            <div key={i} className="glass-badge rounded-xl p-3.5 border border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
              <code className="text-xs font-mono text-white font-bold sm:w-60 flex-shrink-0">{c.combo}</code>
              <span className="text-xs text-zinc-300 leading-relaxed">{c.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Card Wager Duels */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">02.</span> Character Card Wagers — <CommandBadge cmd="/rduel" />
        </h2>
        <Callout variant="tip" title="High-Stakes Card Battles">
          Wager character cards in a Best-of-3 format using <InlineCode>/rduel @rival</InlineCode>. The victor of 2 rounds claims ownership of all wagered anime cards.
        </Callout>

        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[480px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Round</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Encounter Phase Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { round: 'Round 01', desc: 'Each player selects and commits their primary card. Higher total stats score the opening point.' },
                  { round: 'Round 02', desc: 'Second cards clash. If the leader wins, the duel concludes 2-0. If tied 1-1, proceeds to final round.' },
                  { round: 'Round 03', desc: 'Tiebreaker card showdown. Winner claims the entire wager pool into their permanent binder.' },
                ].map(r => (
                  <tr key={r.round} className="hover:bg-white/[0.04] transition-colors">
                    <td className="px-5 py-4 text-white font-bold">{r.round}</td>
                    <td className="px-5 py-4 text-zinc-200 leading-relaxed">{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trivia System */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">03.</span> Trivia Quizzes — <CommandBadge cmd="/quiz_top" />
        </h2>
        <Callout variant="note" title="Earn Shards with Anime Lore">
          Test your mastery of popular anime and Elden Ring lore. Correct answers reward Shards directly into your balance.
        </Callout>

        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[480px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Quiz Topic</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Command</th>
                  <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px] hidden sm:table-cell">Question Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {QUIZ_CATEGORIES.map(cat => (
                  <tr key={cat.id} className="hover:bg-white/[0.04] transition-colors">
                    <td className="px-5 py-4 text-white font-bold">{cat.name}</td>
                    <td className="px-5 py-4"><CommandBadge cmd={`/quiz ${cat.id}`} /></td>
                    <td className="px-5 py-4 text-zinc-300 hidden sm:table-cell">{cat.desc}</td>
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
