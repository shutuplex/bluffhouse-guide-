import { Sparkles, Star, Dices, RefreshCw, ShieldAlert, Ticket } from 'lucide-react';
import Callout from '../components/ui/Callout';
import CharactersShowcase from '../components/CharactersShowcase';
import CommandBadge, { InlineCode } from '../components/ui/CommandBadge';
import CopyButton from '../components/CopyButton';
import { WHEEL_OF_FORTUNE, MELTING_STATION } from '../data/gameData';

const RARITY_META = {
  Classic:   { stars: 1, color: 'text-zinc-300' },
  Common:    { stars: 1, color: 'text-zinc-300' },
  Rare:      { stars: 2, color: 'text-zinc-200' },
  Medium:    { stars: 3, color: 'text-indigo-300' },
  Epic:      { stars: 3, color: 'text-white' },
  Legendary: { stars: 4, color: 'text-amber-300' },
  Mythic:    { stars: 5, color: 'text-purple-300' },
};

const GACHA_RATES = [
  { rarity: 'Classic',   rate: '55.0%', desc: 'Foundational cards for collection and synthesis' },
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

      {/* Anime Characters Showcase (Primary Section) */}
      <CharactersShowcase />

      {/* Gacha Summon System */}
      <section className="space-y-3 sm:space-y-4 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-xs sm:text-sm">02.</span> Gacha Summon Rates
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
            <div className="bg-zinc-600 rounded-l-full" style={{ width: '55%' }} title="Classic 55%" />
            <div className="bg-zinc-400" style={{ width: '25%' }} title="Rare 25%" />
            <div className="bg-zinc-200" style={{ width: '13%' }} title="Epic 13%" />
            <div className="bg-amber-400" style={{ width: '6%' }} title="Legendary 6%" />
            <div className="bg-white rounded-r-full" style={{ width: '1%' }} title="Mythic 1%" />
          </div>
          <div className="flex flex-wrap justify-between text-xs font-mono text-zinc-300 gap-2">
            <span>55% Classic</span>
            <span>25% Rare</span>
            <span>13% Epic</span>
            <span className="text-white font-semibold">6% Leg</span>
            <span className="text-white font-bold">1% Myth</span>
          </div>
        </div>
      </section>

      {/* 03. Character Wheel of Fortune & Arena Vouchers */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-zinc-400 font-mono text-xs sm:text-sm">03.</span> Character Wheel of Fortune — <CommandBadge cmd="/spin" />
            </h2>
            <p className="text-xs text-zinc-300 font-mono mt-0.5">
              Spend Arena Vouchers to pull guaranteed character cards and progressive duplicate refund shards.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-mono text-xs font-semibold self-start sm:self-auto border border-white/15 flex items-center gap-1.5">
            <Ticket className="w-3.5 h-3.5 text-amber-400" />
            1–10 Spins / Command
          </span>
        </div>

        <Callout variant="note" title="Arena Vouchers Economy & Transparent Pull Rates">
          The Wheel of Fortune operates exclusively on <strong>Arena Vouchers</strong>. Vouchers are earned through weekly <strong>Sunday Clan Glory settlements</strong> (up to 10 vouchers), recycling duplicate cards at the <strong>Melting Station</strong> (<InlineCode>/melt</InlineCode>), and special redeem codes.
        </Callout>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Wheel Drop Rates */}
          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-4 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">Fixed Wheel Drop Rates</span>
                <span className="text-[10px] font-mono text-zinc-400">100.0% Normalized</span>
              </div>
              <p className="text-xs text-zinc-400">Transparent probabilities applied per individual spin</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="text-left py-2.5 px-3 text-zinc-300 font-semibold">Rarity</th>
                    <th className="text-center py-2.5 px-3 text-zinc-300 font-semibold">Probability</th>
                    <th className="text-right py-2.5 px-3 text-zinc-300 font-semibold">Star Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {WHEEL_OF_FORTUNE.rates.map(tier => (
                    <tr key={tier.rarity} className="hover:bg-white/[0.03]">
                      <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          tier.rarity === 'Mythic' ? 'bg-purple-400' :
                          tier.rarity === 'Legendary' ? 'bg-amber-400' :
                          tier.rarity === 'Rare' ? 'bg-sky-400' :
                          tier.rarity === 'Medium' ? 'bg-indigo-400' : 'bg-zinc-400'
                        }`} />
                        {tier.rarity}
                      </td>
                      <td className="py-2.5 px-3 text-center text-white font-bold font-mono">{tier.rate}</td>
                      <td className="py-2.5 px-3 text-right">
                        <StarRating count={tier.stars} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual Probability Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex h-3 rounded-full overflow-hidden gap-0.5 p-0.5 bg-black/40 border border-white/10">
                <div className="bg-zinc-500 rounded-l-full" style={{ width: '50%' }} title="Classic 50%" />
                <div className="bg-indigo-500" style={{ width: '25%' }} title="Medium 25%" />
                <div className="bg-sky-400" style={{ width: '15%' }} title="Rare 15%" />
                <div className="bg-amber-400" style={{ width: '8%' }} title="Legendary 8%" />
                <div className="bg-purple-400 rounded-r-full" style={{ width: '2%' }} title="Mythic 2%" />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>50% Classic</span>
                <span>25% Medium</span>
                <span>15% Rare</span>
                <span>8% Leg</span>
                <span className="text-purple-300 font-bold">2% Myth</span>
              </div>
            </div>
          </div>

          {/* Duplicate Card Refund System */}
          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-4 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">Duplicate Card Shard Refunds</span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">Instant Compensation</span>
              </div>
              <p className="text-xs text-zinc-400">Pulling already owned characters awards guaranteed bonus shards</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="text-left py-2.5 px-3 text-zinc-300 font-semibold">Duplicate Rarity</th>
                    <th className="text-right py-2.5 px-3 text-zinc-300 font-semibold">Shard Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {WHEEL_OF_FORTUNE.duplicateRefunds.map(ref => (
                    <tr key={ref.rarity} className="hover:bg-white/[0.03]">
                      <td className="py-2.5 px-3 font-semibold text-white">{ref.rarity}</td>
                      <td className="py-2.5 px-3 text-right text-amber-300 font-bold font-mono">{ref.refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300">
              <div className="font-semibold text-white mb-1">Command Syntax:</div>
              <code className="text-xs font-mono text-amber-200">/spin 1</code> · <code className="text-xs font-mono text-amber-200">/spin 5</code> · <code className="text-xs font-mono text-amber-200">/spin 10</code>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Character Card Melting Station */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-zinc-400 font-mono text-xs sm:text-sm">04.</span> Character Card Melting Station — <CommandBadge cmd="/melt" />
            </h2>
            <p className="text-xs text-zinc-300 font-mono mt-0.5">
              Recycle duplicate and surplus character cards into valuable Arena Vouchers for the Wheel of Fortune.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-mono text-xs font-semibold self-start sm:self-auto border border-white/15">
            Recycling Crucible
          </span>
        </div>

        <Callout variant="tip" title="Batch Melting Rules & Protection Safeguards">
          Sacrifice duplicates to forge vouchers. All cards submitted within a single <InlineCode>/melt</InlineCode> command must be of the <strong>exact same rarity</strong>. Favorited cards (<InlineCode>/fav</InlineCode>) and actively equipped Talismans are protected from destruction.
        </Callout>

        {/* Exchange Ratios Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">Classic Tier</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-500/20 text-zinc-300 border border-zinc-500/30">1★</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">5 : 1</div>
            <div className="text-xs font-mono text-emerald-300 font-semibold">5 Classic Cards ➔ 1 Voucher</div>
            <p className="text-[11px] text-zinc-400">Requires multiples of 5 (e.g. 5, 10, 15 cards)</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-300">Rare Tier</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-500/30">2★</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">3 : 1</div>
            <div className="text-xs font-mono text-emerald-300 font-semibold">3 Rare Cards ➔ 1 Voucher</div>
            <p className="text-[11px] text-zinc-400">Requires multiples of 3 (e.g. 3, 6, 9 cards)</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-300">Medium Tier</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">3★</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">2 : 1</div>
            <div className="text-xs font-mono text-emerald-300 font-semibold">2 Medium Cards ➔ 1 Voucher</div>
            <p className="text-[11px] text-zinc-400">Requires multiples of 2 (e.g. 2, 4, 6 cards)</p>
          </div>
        </div>

        {/* Protected Tiers & Safety Safeguards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-amber-500/30 bg-amber-500/[0.03] space-y-2.5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-white text-sm">Protected Tiers: Legendary & Mythic</h3>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed">
              <strong>Legendary (4★)</strong> and <strong>Mythic (5★)</strong> cards possess sovereign status and cannot be melted under any circumstance. This hardcoded safeguard guarantees your rarest combat talismans are never destroyed accidentally.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2.5">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">System Mechanics & Syntax Rules</h3>
            </div>
            <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
              <li><strong>Single-Rarity Batch:</strong> All card IDs in one command must share identical rarity.</li>
              <li><strong>Repeat ID for Multiples:</strong> Repeat the ID to melt multiple copies (e.g. <InlineCode>/melt 01 01 01 01 01</InlineCode>).</li>
              <li><strong>Favorite Lock:</strong> Cards marked with <InlineCode>/fav &lt;id&gt;</InlineCode> cannot be melted.</li>
              <li><strong>Confirmation Dialog:</strong> An inline confirmation prompt verifies the sacrifice before deletion.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Talismans & Abilities */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-zinc-400 font-mono text-xs sm:text-sm">05.</span> Talismans & Mythic Abilities
            </h2>
            <p className="text-xs text-zinc-300 font-mono mt-0.5">
              Pouch stat allocations, 1-Mythic limit rules, and unique in-combat passives.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-200 font-mono text-xs font-semibold self-start sm:self-auto">
            1-Mythic Limit Active
          </span>
        </div>

        <Callout variant="tip" title="1 Mythic Talisman Limit Rule">
          Players can only have <strong>1 active Mythic Talisman</strong> equipped at a time. Equipping a second Mythic automatically swaps the existing one in-place while keeping your Legendary and Summer Edition cards completely intact in your remaining slots.
        </Callout>

        <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono min-w-[500px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Rarity Grade</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Stat Boost</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Combat Effect</th>
                  <th className="text-right px-4 sm:px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Max Allowed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-white font-bold">Legendary</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-amber-300 font-bold font-mono">+5 Any Attribute</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-300">Boosts STR, DEX, SPD, or DEF scaling directly</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-right text-zinc-200">Up to 3-4 slots</td>
                </tr>
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-white font-bold">Summer Edition</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-amber-200 font-bold font-mono">+5 Any Attribute</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-300">Special seasonal variant with combat scaling</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-right text-zinc-200">Up to 3-4 slots</td>
                </tr>
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-purple-200 font-bold">Mythic</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-purple-300 font-bold font-mono">+50 Hit Points</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-zinc-200 font-medium">Expands max health pool + grants exclusive passive</td>
                  <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-right text-purple-300 font-bold">1 Active Max</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mythic Unique Passives */}
        <div className="glass-card rounded-2xl p-5 border border-purple-500/30 bg-purple-500/[0.04] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <h3 className="font-bold text-white text-sm">Mythic Passives & Universal Inline Ability Badges</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-500/40 font-semibold">
              Inline Badges
            </span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-mono">
            Mythic abilities are labeled with universal inline badges visible across <strong className="text-white">/collection</strong>, <strong className="text-white">/shop</strong>, <strong className="text-white">/talismans</strong>, <strong className="text-white">@bot</strong> inline query search, and <strong className="text-white">/rdm</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="glass-badge rounded-xl p-4 border-purple-500/30 space-y-2 bg-black/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300">✦ Lord of Blood's Exultation</span>
                <span className="text-[10px] font-mono text-zinc-400">Card #289 · Changsu OH</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed">
                Landing a Blood Loss hit triggers <strong>+20% ATK damage</strong> on your next 3 strikes (Active in PvP, PvE Hunts, and World Boss Raids).
              </p>
            </div>

            <div className="glass-badge rounded-xl p-4 border-purple-500/30 space-y-2 bg-black/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300">✦ Vampiric Rot</span>
                <span className="text-[10px] font-mono text-zinc-400">Card #189 · Bunny Iglesias</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed">
                <strong>100% of Scarlet Rot DoT ticks</strong> heal your character directly instead of draining HP (Active in PvP, PvE Hunts, and World Boss Raids).
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
