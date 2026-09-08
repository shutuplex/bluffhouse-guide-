import React from 'react';
import { Swords, Shield, Wind, Sparkles } from 'lucide-react';
import Callout from '../components/ui/Callout';
import CommandBadge, { InlineCode } from '../components/ui/CommandBadge';

const COMBAT_MOVES = [
  {
    name: 'Light Attack',
    desc: 'Fast standard strike. Applies base weapon damage scaled by STR and DEX attributes.',
    details: ['Zero charge time required', 'Standard crit chance applies', 'Initiative driven by SPD attribute'],
    formula: 'DMG = weapon_base + (STR × str_scaling) + (DEX × dex_scaling)',
  },
  {
    name: 'Heavy Attack',
    desc: '2-turn charged strike. Turn 1 winds up, Turn 2 unleashes massive burst with bonus crit rate.',
    details: ['Turn 1: Charge state (vulnerable)', 'Turn 2: 1.8× base strike damage', '+20% bonus crit chance upon release'],
    formula: 'DMG = (standard_dmg × 1.8)  [crit chance +20%]',
  },
  {
    name: 'Guard',
    desc: 'Absorbs incoming damage based on weapon Block %. Grants a 60% chance to prime a Guard Counter.',
    details: ['Blocks Block% of enemy damage', '60% chance: primes Guard Counter buff', 'Next offensive strike deals +35% damage'],
    formula: 'Absorbed = incoming_dmg × (block_pct / 100)',
  },
  {
    name: 'Dodge',
    desc: 'Active evasion attempt. Successfully dodging grants First-Strike Priority on your subsequent turn.',
    details: ['SPD-dependent evasion formula', '60% chance: First-Strike priority gained', 'Full immunity to incoming damage on success'],
    formula: 'Dodge% = 0.35 + (player_SPD − enemy_SPD) × 0.01',
  },
  {
    name: 'Flee',
    desc: 'Attempt to escape battle. Your SPD differential compared to the enemy dictates success.',
    details: ['Probability clamped between 20% and 90%', 'SPD advantage is the primary factor', 'Silent failure: encounter continues'],
    formula: 'Flee% = 0.50 + (Player_SPD − Enemy_SPD) × 0.015',
  },
];

export default function CombatSimulatorPage() {
  return (
    <div className="space-y-10 pb-16 animate-float-up">

      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl glass-badge flex items-center justify-center text-white border-white/20">
            <Swords className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">Tactical Battles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Combat System Guide</h1>
        <p className="text-zinc-300 mt-2 text-base max-w-2xl leading-relaxed">
          Complete mechanics breakdown of turn-based battles: PvE hunting, PvP arena duels, tactical combat actions, and damage calculations.
        </p>
      </div>

      {/* PvE Hunting Flow */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">01.</span> PvE Hunting — <CommandBadge cmd="/hunt" />
        </h2>
        <Callout variant="note" title="Encounter Flow">
          Use <InlineCode>/hunt</InlineCode> or <InlineCode>/explore</InlineCode> to trigger an encounter. Inspect the monster's stats and engage with the interactive combat buttons.
        </Callout>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {[
            { step: '01', title: 'Encounter Phase',  desc: 'Monster spawns via weighted tier probabilities. Stats and level are revealed.' },
            { step: '02', title: 'Tactical Turns',   desc: 'Choose from 5 actions each round. Manage Guard, Heavy timing, and SPD.' },
            { step: '03', title: 'Victory Rewards',  desc: 'Claim XP, Shards, and chances for rare weapon drops upon slaying the beast.' },
          ].map(s => (
            <div key={s.step} className="glass-card rounded-2xl p-6 border border-white/15">
              <div className="text-3xl font-black font-mono text-zinc-400 mb-2">{s.step}</div>
              <div className="font-bold text-white text-sm mb-1.5">{s.title}</div>
              <p className="text-xs text-zinc-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Combat Moves */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">02.</span> Combat Actions
        </h2>

        <div className="space-y-3 pt-1">
          {COMBAT_MOVES.map((move, i) => (
            <div key={move.name} className="glass-card rounded-2xl p-6 border border-white/15 hover:border-white/25">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                <div className="md:w-1/3 space-y-1">
                  <div className="text-xs font-mono text-zinc-400 font-medium">Action 0{i + 1}</div>
                  <h3 className="font-bold text-base text-white">{move.name}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-1">{move.desc}</p>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="space-y-1.5">
                    {move.details.map((d, j) => (
                      <div key={j} className="text-xs font-mono text-zinc-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>

                  <div className="code-block p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">Formula</div>
                    <code className="text-xs font-mono text-white font-medium">{move.formula}</code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guard Counter & Dodge Priority */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">03.</span> Advanced Tactics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl glass-badge border-white/15">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-white text-base">Guard Counter Synergies</h3>
            </div>
            <div className="space-y-2">
              {[
                'Execute Guard to absorb incoming strike with weapon Block %',
                '60% probability triggers the Guard Counter status buff',
                'Your immediate next strike inflicts +35% amplified damage',
              ].map((step, i) => (
                <div key={i} className="glass-badge rounded-xl px-4 py-2.5 border border-white/10 text-xs font-mono text-zinc-200">
                  <strong className="text-white">0{i + 1}.</strong> {step}
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed pt-1">
              Combine Guard Counter with a Heavy Attack for devastating burst: <span className="text-white font-mono font-semibold">1.8 × 1.35 = 2.43× base power</span>!
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl glass-badge border-white/15">
                <Wind className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-white text-base">Dodge First-Strike Priority</h3>
            </div>
            <div className="space-y-2">
              {[
                'Successfully evade an attack using the Dodge maneuver',
                '60% probability awards the First-Strike combat status',
                'Your next turn activates first, ignoring speed differentials',
              ].map((step, i) => (
                <div key={i} className="glass-badge rounded-xl px-4 py-2.5 border border-white/10 text-xs font-mono text-zinc-200">
                  <strong className="text-white">0{i + 1}.</strong> {step}
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed pt-1">
              In PvP duels, First-Strike overrides opponent SPD initiative, providing decisive turn control.
            </p>
          </div>
        </div>
      </section>

      {/* PvP Arena */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">04.</span> PvP Arena — <CommandBadge cmd="/fight" />
        </h2>
        <Callout variant="warn" title="Simultaneous Commitment Rules">
          Both duelists submit their turn actions blindly. Turns are resolved simultaneously based on SPD initiative, Dodge priority, and Guard mitigation.
        </Callout>

        <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-3">
          <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2 font-semibold">Resolution Order</div>
          {[
            { n: '01', title: 'Simultaneous Selection', note: 'Both fighters submit actions via Telegram buttons without seeing the opponent’s pick' },
            { n: '02', title: 'Priority Check',         note: 'Active Dodge First-Strike priority overrides normal speed brackets' },
            { n: '03', title: 'SPD Attribute Ranking',  note: 'Higher SPD moves first when no special override priority exists' },
            { n: '04', title: 'Damage Execution',       note: 'Guard blocking percentages, mitigation, and critical multipliers are calculated' },
          ].map(item => (
            <div key={item.n} className="flex items-start gap-4 glass-badge rounded-xl p-4 border border-white/10">
              <div className="text-sm font-black font-mono text-white pt-0.5">{item.n}</div>
              <div>
                <div className="text-sm font-bold text-white">{item.title}</div>
                <div className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Damage Formula Pipeline */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-sm">05.</span> Damage Pipeline Formula
        </h2>
        <div className="code-block p-6 rounded-2xl border border-white/15 space-y-2.5">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3 font-semibold">// Full mathematical damage calculation</div>
          {[
            ['scaled_dmg',  '= weapon_base + (STR × str_scale) + (DEX × dex_scale)'],
            ['total_dmg',   '= scaled_dmg × heavy_mult × counter_mult'],
            ['absorbed',    '= total_dmg × (block_pct / 100)  [if opponent guarded]'],
            ['mitigated',   '= (total_dmg − absorbed) × (1 − (DEF / (DEF + 80)))'],
            ['crit_check',  '= random() < (0.05 + (DEX × 0.0035) + heavy_bonus)'],
            ['final_dmg',   '= mitigated × (is_crit ? crit_mult : 1.0)'],
          ].map(([lhs, rhs]) => (
            <div key={lhs} className="flex flex-col sm:flex-row sm:gap-4 font-mono text-xs sm:text-sm">
              <span className="text-zinc-400 sm:w-32 flex-shrink-0 font-medium">{lhs}</span>
              <span className="text-white font-medium">{rhs}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
