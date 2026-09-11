import { Sparkles, Star } from 'lucide-react';
import Callout from '../components/ui/Callout';
import CharactersShowcase from '../components/CharactersShowcase';

const RARITY_META = {
  Common:    { stars: 1, color: 'text-zinc-300' },
  Rare:      { stars: 2, color: 'text-zinc-200' },
  Epic:      { stars: 3, color: 'text-white' },
  Legendary: { stars: 4, color: 'text-white' },
  Mythic:    { stars: 5, color: 'text-white' },
};

const GACHA_RATES = [
  { rarity: 'Common',    rate: '55.0%', desc: 'Foundational cards for collection and synthesis' },
  { rarity: 'Rare',      rate: '25.0%', desc: 'Higher stat values and enhanced collector ratings' },
  { rarity: 'Epic',      rate: '13.0%', desc: 'Elite anime characters with potent team value' },
  { rarity: 'Legendary', rate: '6.0%',  desc: 'Grants +5 Attribute Bonus when slotted as Talisman' },
  { rarity: 'Mythic',    rate: '1.0%',  desc: 'Pinnacle power: Grants +50 Max HP pool expansion' },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`w-3 h-3 ${i < count ? 'text-white fill-white' : 'text-zinc-600'}`} />
      ))}
    </div>
  );
}

export default function CardDexPage() {
  return (
    <div className="space-y-6 sm:space-y-10 pb-16 animate-float-up">

      {/* Header Banner */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-white/15 relative overflow-hidden">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl glass-badge flex items-center justify-center text-white border-white/20">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">Gacha Encyclopedia</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">Anime Card Dex</h1>
        <p className="text-zinc-300 mt-2 text-xs sm:text-base max-w-2xl leading-relaxed">
          Overview of summon probabilities, star rarities, and talisman bonuses across collectible anime characters.
        </p>
      </div>

      {/* Gacha Summon System */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-xs sm:text-sm">01.</span> Gacha Summon Rates
        </h2>
        <Callout variant="note" title="Triple-Card Pulls & Golden Pity">
          Each summon pulls 3 character cards simultaneously. A built-in pity system guarantees Legendary or Mythic drops if no top-tier card has appeared within the pity threshold.
        </Callout>

        {/* Rate Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[480px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Rarity</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Pull Rate</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Star Level</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {GACHA_RATES.map(r => {
                  const meta = RARITY_META[r.rarity] || {};
                  return (
                    <tr key={r.rarity} className="hover:bg-white/[0.04] transition-colors">
                      <td className="px-4 sm:px-5 py-3.5 sm:py-4 font-bold text-white">{r.rarity}</td>
                      <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-white font-mono font-bold text-sm">{r.rate}</td>
                      <td className="px-4 sm:px-5 py-3.5 sm:py-4"><StarRating count={meta.stars || 1} /></td>
                      <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-300">{r.desc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Probability bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2.5 sm:space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-300">Rate Distribution Visual</div>
          <div className="flex h-3 sm:h-3.5 rounded-full overflow-hidden gap-1 p-0.5 bg-black/40 border border-white/10">
            <div className="bg-zinc-600 rounded-l-full" style={{ width: '55%' }} title="Common 55%" />
            <div className="bg-zinc-400" style={{ width: '25%' }} title="Rare 25%" />
            <div className="bg-zinc-200" style={{ width: '13%' }} title="Epic 13%" />
            <div className="bg-amber-400" style={{ width: '6%' }} title="Legendary 6%" />
            <div className="bg-white rounded-r-full" style={{ width: '1%' }} title="Mythic 1%" />
          </div>
          <div className="flex flex-wrap justify-between text-xs font-mono text-zinc-300 gap-2">
            <span>55% Common</span>
            <span>25% Rare</span>
            <span>13% Epic</span>
            <span className="text-white font-semibold">6% Leg</span>
            <span className="text-white font-bold">1% Myth</span>
          </div>
        </div>
      </section>

      {/* Legendary Talismans */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-xs sm:text-sm">02.</span> Legendary Talisman Bonuses
        </h2>
        <Callout variant="tip" title="Equip Cards as Talismans">
          Cards with Legendary or Mythic grade can be equipped into Talisman Pouches (unlocked at Level 1, 25, and 50). They provide passive stats that apply to all combat rolls.
        </Callout>

        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[480px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Rarity Grade</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Stat Boost</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Combat Effect</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Max Allowed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-white font-bold">Legendary</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-white font-bold font-mono">+5 Any Attribute</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-300">Boosts STR, DEX, SPD, or DEF scaling directly</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-200">Up to 3 slots</td>
                </tr>
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-white font-bold">Mythic</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-white font-bold font-mono">+50 Hit Points</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-300">Permanently extends maximum character health pool</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-200">Up to 3 slots</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Anime Characters Showcase */}
      <CharactersShowcase />

    </div>
  );
}
