import React from 'react';
import { Zap, Sword, Shield, Sparkles, Dices, Terminal, Skull, ChevronRight, ArrowRight, ExternalLink, BookOpen } from 'lucide-react';
import { BOT_COMMANDS } from '../data/gameData';
import CopyButton from '../components/CopyButton';

const FEATURE_CARDS = [
  { id: 'rpg',        title: 'Site of Grace & Stat Builder',   badge: 'Character',   desc: 'Simulate Level 1–100 stat allocations, calculate crit %, damage mitigation, and Talisman Pouch synergies live.',     icon: Zap },
  { id: 'weapons',    title: 'Smithy & Weapon Upgrades',       badge: 'Weapons',     desc: 'Browse Tier 1–3 weapon stats, calculate +0→+10 shard costs, and preview real-time scaling modifiers.',                icon: Sword },
  { id: 'enemies',    title: 'Spawn Rates & Drop Tables',      badge: 'PvE Spawns',  desc: 'Encounter spawn probabilities across common, elite, and boss tiers with full reward and shard tables.',               icon: Skull },
  { id: 'combat-sim', title: 'Combat System Guide',            badge: 'Combat',      desc: 'Tactical breakdown of all 5 combat actions, Guard Counters, Dodge Priority mechanics, and simultaneous PvP rules.',  icon: Shield },
  { id: 'cards',      title: 'Anime Card Dex',                 badge: 'Gacha',       desc: 'Gacha summon probability rates, card rarities, and Legendary Talisman stat boosts across anime characters.',         icon: Sparkles },
  { id: 'minigames',  title: 'Russian Roulette & Duels',       badge: 'Minigames',   desc: 'Master the 5 tactical items in /duel, wager cards in 3-round battles in /rduel, and earn Shards via trivia.',        icon: Dices },
];

export default function LandingPage({ onNavigate }) {
  const quickCmds = BOT_COMMANDS.slice(0, 4);

  return (
    <div className="space-y-6 sm:space-y-10 pb-16 animate-float-up">

      {/* Hero Window matching the Glassmorphism Reference */}
      <section className="glass-window rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-14 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full glass-badge border border-white/20 text-zinc-200 text-[11px] sm:text-xs font-mono uppercase tracking-widest">
           
            Official  Guide
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none">
              Bluffhouse
            </h1>
            <p className="text-[11px] sm:text-xs font-mono text-zinc-300 mt-2 sm:mt-3 tracking-widest uppercase font-semibold">
              Elden Arena · Russian roulette ·Anime Gacha Bot 
            </p>
          </div>

          <p className="text-zinc-200 text-sm sm:text-base leading-relaxed max-w-xl">
            The definitive companion guide for the  RPG bot. Simulate your character build at the Site of Grace, calculate weapon upgrade costs, understand combat formulas, and master Russian Roulette duels.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
            <button
              onClick={() => onNavigate('rpg')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl glass-btn-primary text-xs sm:text-sm font-mono transition-all cursor-pointer active:scale-95"
            >
              <Zap className="w-4 h-4 text-white" /> Open Stat Builder
            </button>
            <button
              onClick={() => onNavigate('combat-sim')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl glass-btn text-xs sm:text-sm font-mono transition-all cursor-pointer active:scale-95"
            >
              <Sword className="w-4 h-4 text-zinc-300" /> Combat Engine
            </button>
            <a
              href="https://t.me/bluffhousexbot"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl sm:rounded-2xl glass-badge border-white/20 text-zinc-200 hover:text-white text-xs sm:text-sm font-mono transition-all active:scale-95"
            >
              <ExternalLink className="w-4 h-4" /> Telegram Bot
            </a>
          </div>
        </div>
      </section>

      {/* Feature Modules */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <h2 className="text-sm sm:text-base font-bold text-white">Documentation Modules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {FEATURE_CARDS.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="glass-card rounded-2xl p-5 sm:p-6 cursor-pointer flex flex-col justify-between group border border-white/12 hover:border-white/25 active:scale-[0.99] transition-all"
              >
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 sm:p-3 rounded-xl glass-badge border-white/15">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono text-zinc-300 glass-badge px-2.5 py-0.5 sm:py-1 rounded-full border-white/15 font-medium">{card.badge}</span>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-100 transition-colors">{card.title}</h3>
                    <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full glass-badge flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-white/30 transition-all border-white/15">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Commands */}
      <section className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-4 sm:space-y-5 border border-white/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 font-semibold mb-1">
              <Terminal className="w-3.5 h-3.5" /> Bot Commands
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">Quick Start Reference</h2>
          </div>
          <button
            onClick={() => onNavigate('commands')}
            className="text-xs font-mono text-zinc-300 hover:text-white glass-btn px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all self-start sm:self-auto cursor-pointer active:scale-95"
          >
            All Commands <ChevronRight className="w-3.5 h-3.5 inline ml-0.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {quickCmds.map(cmd => (
            <div key={cmd.command} className="glass-card rounded-xl sm:rounded-2xl p-4 flex flex-col gap-2 border border-white/12">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-white">{cmd.command}</span>
                <CopyButton text={cmd.command} label="" />
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{cmd.desc}</p>
              <div className="text-xs font-mono text-zinc-300 glass-badge rounded-lg px-2 py-1 border-white/10 break-all">{cmd.example}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
