import { useState } from 'react';
import { Zap, Sword, Shield, Sparkles, Dices, Terminal, Skull, ChevronRight, ArrowRight, ExternalLink, BookOpen, Maximize2 } from 'lucide-react';
import { BOT_COMMANDS } from '../data/gameData';
import { CHARACTERS_DATA } from '../data/charactersData';
import { WEAPONS_DATA } from '../data/weaponsData';
import { ENEMIES_DATA } from '../data/enemiesData';
import MediaPreview from '../components/ui/MediaPreview';
import CardDetailModal from '../components/ui/CardDetailModal';
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
  const [activeTab, setActiveTab] = useState('cards');
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  const [modalType, setModalType] = useState('character');

  const quickCmds = BOT_COMMANDS.slice(0, 4);

  // Top 4 preview items for each category
  const previewCharacters = CHARACTERS_DATA.slice(0, 4);
  const previewWeapons = WEAPONS_DATA.slice(0, 4);
  const previewEnemies = ENEMIES_DATA.slice(0, 4);

  const handleOpenInspect = (item, type) => {
    setSelectedModalItem(item);
    setModalType(type);
  };

  return (
    <div className="space-y-6 sm:space-y-10 pb-16 animate-float-up">

      {/* Hero Window */}
      <section className="glass-window rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-14 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full glass-badge border border-white/20 text-zinc-200 text-[11px] sm:text-xs font-mono uppercase tracking-widest">
            Official Guide
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none">
              Bluffhouse
            </h1>
            <p className="text-[11px] sm:text-xs font-mono text-zinc-300 mt-2 sm:mt-3 tracking-widest uppercase font-semibold">
              Elden Arena · Russian Roulette · Anime Gacha Bot
            </p>
          </div>

          <p className="text-zinc-200 text-sm sm:text-base leading-relaxed max-w-xl">
            The definitive companion guide for the RPG bot. Simulate your character build, inspect all anime character cards, browse armaments, examine boss encounters, and calculate weapon upgrade costs.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
            <button
              onClick={() => onNavigate('cards')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl glass-btn-primary text-xs sm:text-sm font-mono transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-white" /> View Characters ({CHARACTERS_DATA.length})
            </button>
            <button
              onClick={() => onNavigate('weapons')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl glass-btn text-xs sm:text-sm font-mono transition-all cursor-pointer active:scale-95"
            >
              <Sword className="w-4 h-4 text-zinc-300" /> Weapon Armory ({WEAPONS_DATA.length})
            </button>
            <button
              onClick={() => onNavigate('enemies')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl glass-btn text-xs sm:text-sm font-mono transition-all cursor-pointer active:scale-95"
            >
              <Skull className="w-4 h-4 text-zinc-300" /> Bestiary ({ENEMIES_DATA.length})
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED SHOWCASE CARDS (Direct Homepage Preview) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Database Showcases</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">Tap card to inspect</span>
          </div>

          {/* Showcase Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 self-start sm:self-auto text-xs font-mono">
            {[
              { id: 'cards', label: `Characters (${CHARACTERS_DATA.length})` },
              { id: 'weapons', label: `Weapons (${WEAPONS_DATA.length})` },
              { id: 'enemies', label: `Encounters (${ENEMIES_DATA.length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white font-bold border border-white/30 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Characters Cards */}
        {activeTab === 'cards' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {previewCharacters.map(char => (
                <div
                  key={char.id}
                  onClick={() => handleOpenInspect(char, 'character')}
                  className="glass-card rounded-2xl border border-white/15 hover:border-white/35 overflow-hidden flex flex-col justify-between group transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl"
                  role="button"
                  tabIndex={0}
                >
                  <div className="relative">
                    <MediaPreview
                      src={char.img_url}
                      alt={char.name}
                      isVideo={char.isVideo}
                      aspectRatio="aspect-[4/5]"
                    />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white">
                      #{char.id}
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded backdrop-blur-md border border-purple-500/30 bg-purple-500/15 text-purple-200 text-[10px] font-mono font-semibold">
                      {char.rarity}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-amber-300 font-bold">
                      {char.price.toLocaleString()} ◈
                    </div>
                  </div>

                  <div className="p-3 space-y-1.5">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider truncate">
                      {char.anime}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug truncate">
                      {char.name}
                    </h3>
                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>{char.stat ? `+${char.stat.value} ${char.stat.type}` : 'Collector'}</span>
                      <span className="text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                        Inspect <Maximize2 className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => onNavigate('cards')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-badge border-white/20 text-xs font-mono text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <span>View All 326 Anime Cards in Dex</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Weapons Cards */}
        {activeTab === 'weapons' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {previewWeapons.map(weapon => (
                <div
                  key={weapon.id}
                  onClick={() => handleOpenInspect(weapon, 'weapon')}
                  className="glass-card rounded-2xl border border-white/15 hover:border-white/35 overflow-hidden flex flex-col justify-between group transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl"
                  role="button"
                  tabIndex={0}
                >
                  <div className="relative">
                    <MediaPreview
                      src={weapon.img_url}
                      alt={weapon.name}
                      aspectRatio="aspect-[16/10]"
                    />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white">
                      #{weapon.id}
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded backdrop-blur-md border border-white/20 bg-black/60 text-zinc-200 text-[10px] font-mono">
                      Tier {weapon.tier}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-amber-300 font-bold">
                      {weapon.price > 0 ? `${weapon.price} ◈` : 'Starter'}
                    </div>
                  </div>

                  <div className="p-3 space-y-1.5">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider truncate">
                      {weapon.type}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug truncate">
                      {weapon.name}
                    </h3>
                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>{weapon.base_dmg} Base DMG</span>
                      <span className="text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                        Inspect <Maximize2 className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => onNavigate('weapons')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-badge border-white/20 text-xs font-mono text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <span>Browse All 47 Armaments in Smithy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Enemies Cards */}
        {activeTab === 'enemies' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {previewEnemies.map(enemy => (
                <div
                  key={enemy.id}
                  onClick={() => handleOpenInspect(enemy, 'enemy')}
                  className="glass-card rounded-2xl border border-white/15 hover:border-white/35 overflow-hidden flex flex-col justify-between group transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl"
                  role="button"
                  tabIndex={0}
                >
                  <div className="relative">
                    <MediaPreview
                      src={enemy.img_url}
                      alt={enemy.name}
                      aspectRatio="aspect-[16/10]"
                    />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white">
                      #{enemy.id}
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded backdrop-blur-md border border-white/20 bg-black/60 text-zinc-200 text-[10px] font-mono">
                      {enemy.tier}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-rose-300 font-bold">
                      {enemy.hp} HP
                    </div>
                  </div>

                  <div className="p-3 space-y-1.5">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider truncate">
                      XP +{enemy.xp_reward}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug truncate">
                      {enemy.name}
                    </h3>
                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>{enemy.base_dmg} Base DMG</span>
                      <span className="text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                        Inspect <Maximize2 className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => onNavigate('enemies')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-badge border-white/20 text-xs font-mono text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <span>View All 36 Encounters & Bosses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
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

      {/* Inspection Modal */}
      <CardDetailModal
        isOpen={!!selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
        item={selectedModalItem}
        type={modalType}
      />

    </div>
  );
}
