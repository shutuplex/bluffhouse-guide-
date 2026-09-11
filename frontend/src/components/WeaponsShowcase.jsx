import { useState, useMemo } from 'react';
import { Search, Sword, Shield, ArrowUpDown, Flame, Droplets, Skull, Sparkles, Maximize2 } from 'lucide-react';
import { WEAPONS_DATA, WEAPON_TYPES, STATUS_EFFECTS } from '../data/weaponsData';
import MediaPreview from './ui/MediaPreview';
import CopyButton from './CopyButton';
import CardDetailModal from './ui/CardDetailModal';

const STATUS_CONFIG = {
  'Blood Loss': {
    badge: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
    icon: Droplets
  },
  'Frostbite': {
    badge: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
    icon: Sparkles
  },
  'Scarlet Rot': {
    badge: 'bg-amber-600/15 border-amber-500/40 text-amber-300',
    icon: Flame
  },
  'Poison': {
    badge: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    icon: Skull
  },
  'None': {
    badge: 'bg-zinc-800/40 border-zinc-700 text-zinc-400',
    icon: null
  }
};

const TIER_BADGES = {
  1: { label: 'Tier 1 Common', color: 'border-zinc-500/30 text-zinc-300 bg-zinc-500/10' },
  2: { label: 'Tier 2 Elite', color: 'border-sky-500/30 text-sky-300 bg-sky-500/10' },
  3: { label: 'Tier 3 Boss', color: 'border-amber-400/30 text-amber-300 bg-amber-400/10' },
};

export default function WeaponsShowcase() {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedEffect, setSelectedEffect] = useState('All Effects');
  const [sortBy, setSortBy] = useState('id-asc');
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  const filteredWeapons = useMemo(() => {
    let list = WEAPONS_DATA.filter(w => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = w.name.toLowerCase().includes(q);
        const matchesType = w.type.toLowerCase().includes(q);
        const matchesId = w.id.toLowerCase().includes(q);
        if (!matchesName && !matchesType && !matchesId) return false;
      }

      // Tier filter
      if (selectedTier !== 'All') {
        const tierNum = parseInt(selectedTier, 10);
        if (w.tier !== tierNum) return false;
      }

      // Type filter
      if (selectedType !== 'All Types' && w.type !== selectedType) {
        return false;
      }

      // Status effect filter
      if (selectedEffect !== 'All Effects' && w.status_effect !== selectedEffect) {
        return false;
      }

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'id-asc') return parseInt(a.id, 10) - parseInt(b.id, 10);
      if (sortBy === 'id-desc') return parseInt(b.id, 10) - parseInt(a.id, 10);
      if (sortBy === 'dmg-desc') return b.base_dmg - a.base_dmg;
      if (sortBy === 'dmg-asc') return a.base_dmg - b.base_dmg;
      if (sortBy === 'spd-desc') return b.speed_mod - a.speed_mod;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      return 0;
    });

    return list;
  }, [search, selectedTier, selectedType, selectedEffect, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedTier('All');
    setSelectedType('All Types');
    setSelectedEffect('All Effects');
    setSortBy('id-asc');
  };

  return (
    <section className="space-y-5">
      {/* Title & Count Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Database Showcase</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white font-semibold">
              {filteredWeapons.length} of {WEAPONS_DATA.length} Armaments
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Complete Weapons Armory
          </h2>
        </div>

        {/* Active filter reset */}
        {(search || selectedTier !== 'All' || selectedType !== 'All Types' || selectedEffect !== 'All Effects' || sortBy !== 'id-asc') && (
          <button
            onClick={resetFilters}
            className="text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer transition-colors self-start sm:self-auto"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/15 space-y-4">
        {/* Search Bar + Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search weapons by name, type, or ID (e.g. Moonveil, Katana, 18)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/35 focus:ring-1 focus:ring-white/20 transition-all font-mono"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-white/35 transition-all font-mono cursor-pointer appearance-none"
            >
              <option value="id-asc" className="bg-zinc-900 text-white">Sort: ID (Ascending)</option>
              <option value="id-desc" className="bg-zinc-900 text-white">Sort: ID (Descending)</option>
              <option value="dmg-desc" className="bg-zinc-900 text-white">Sort: Base Damage (High to Low)</option>
              <option value="dmg-asc" className="bg-zinc-900 text-white">Sort: Base Damage (Low to High)</option>
              <option value="spd-desc" className="bg-zinc-900 text-white">Sort: Speed Modifier (Fastest)</option>
              <option value="price-desc" className="bg-zinc-900 text-white">Sort: Price (Highest)</option>
              <option value="price-asc" className="bg-zinc-900 text-white">Sort: Price (Lowest)</option>
            </select>
          </div>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-white/10 text-xs">
          {/* Tier Buttons */}
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">
              Rarity Tier
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['All', '1', '2', '3'].map(tier => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                    selectedTier === tier
                      ? 'bg-white/20 text-white font-bold border border-white/40 shadow-sm'
                      : 'bg-black/30 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  {tier === 'All' ? 'All Tiers' : `Tier ${tier}`}
                </button>
              ))}
            </div>
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">
              Weapon Category
            </label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-white/35 font-mono cursor-pointer"
            >
              {WEAPON_TYPES.map(type => (
                <option key={type} value={type} className="bg-zinc-900 text-white">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Status Effect Dropdown */}
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">
              Status Effect
            </label>
            <select
              value={selectedEffect}
              onChange={e => setSelectedEffect(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-white/35 font-mono cursor-pointer"
            >
              {STATUS_EFFECTS.map(effect => (
                <option key={effect} value={effect} className="bg-zinc-900 text-white">
                  {effect}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Weapons */}
      {filteredWeapons.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-white/10 space-y-3">
          <Sword className="w-10 h-10 text-zinc-600 mx-auto" />
          <div className="text-white font-bold text-base">No Armaments Found</div>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto font-mono">
            No weapons matched your current search and filter criteria. Try adjusting or resetting your filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl glass-badge border-white/20 text-xs text-white font-mono hover:bg-white/10 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredWeapons.map(weapon => {
            const tierMeta = TIER_BADGES[weapon.tier] || TIER_BADGES[1];
            const effectMeta = STATUS_CONFIG[weapon.status_effect] || STATUS_CONFIG['None'];
            const EffectIcon = effectMeta.icon;

            return (
              <div
                key={weapon.id}
                onClick={() => setSelectedWeapon(weapon)}
                className="glass-card rounded-2xl border border-white/15 hover:border-white/30 overflow-hidden flex flex-col justify-between group transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl"
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelectedWeapon(weapon)}
              >
                {/* Image Banner */}
                <div className="relative">
                  <MediaPreview
                    src={weapon.img_url}
                    alt={weapon.name}
                    aspectRatio="aspect-[16/10]"
                  />
                  {/* Top Overlay Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white shadow-sm">
                      #{weapon.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md backdrop-blur-md border text-[11px] font-mono font-semibold shadow-sm ${tierMeta.color}`}>
                      {tierMeta.label}
                    </span>
                  </div>

                  {weapon.status_effect && weapon.status_effect !== 'None' && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className={`px-2 py-0.5 rounded-md backdrop-blur-md border text-[10px] font-mono font-bold flex items-center gap-1 shadow-sm ${effectMeta.badge}`}>
                        {EffectIcon && <EffectIcon className="w-2.5 h-2.5" />}
                        <span>{weapon.status_effect}</span>
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                    <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/15">
                      {weapon.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-amber-300 font-semibold">
                      {weapon.price > 0 ? `${weapon.price} ◈` : 'Starter'}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-zinc-100 transition-colors">
                      {weapon.name}
                    </h3>
                    <span className="p-1 rounded-lg text-zinc-500 group-hover:text-white transition-colors flex-shrink-0" title="Inspect full weapon">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Core Combat Stats Matrix */}
                  <div className="space-y-2 pt-1 border-t border-white/10 font-mono text-xs">
                    {/* Row 1: Base DMG, Speed Mod, Crit */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Base DMG</div>
                        <div className="text-sm font-bold text-white mt-0.5">{weapon.base_dmg}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Speed Mod</div>
                        <div className={`text-sm font-bold mt-0.5 ${weapon.speed_mod >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {weapon.speed_mod >= 0 ? `+${weapon.speed_mod}` : weapon.speed_mod}
                        </div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Crit Mult</div>
                        <div className="text-sm font-bold text-sky-300 mt-0.5">{weapon.crit_mult}x</div>
                      </div>
                    </div>

                    {/* Row 2: Block & Scalings */}
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-zinc-300">
                        <span className="flex items-center gap-1.5 text-zinc-400">
                          <Shield className="w-3 h-3 text-zinc-300" /> Guard Block
                        </span>
                        <span className="font-bold text-white">{weapon.block_pct}%</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
                        <span className="text-zinc-400">Attribute Scalings</span>
                        <div className="flex gap-2">
                          <span className="text-zinc-300">STR <strong className="text-white">+{weapon.scaling_str}</strong></span>
                          <span className="text-zinc-300">DEX <strong className="text-white">+{weapon.scaling_dex}</strong></span>
                          {weapon.scaling_spd > 0 && (
                            <span className="text-zinc-300">SPD <strong className="text-white">+{weapon.scaling_spd}</strong></span>
                          )}
                          {weapon.scaling_def > 0 && (
                            <span className="text-zinc-300">DEF <strong className="text-white">+{weapon.scaling_def}</strong></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Equip & Buy Command Codes */}
                  <div
                    className="pt-3 border-t border-white/10 flex items-center justify-between gap-2"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-zinc-300 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                        /equip {weapon.id}
                      </code>
                      <CopyButton text={`/equip ${weapon.id}`} label="Equip" />
                    </div>

                    {weapon.price > 0 && (
                      <div className="flex items-center gap-2">
                        <CopyButton text={`/buy ${weapon.id}`} label="Buy" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Weapon Detail Inspector Modal */}
      <CardDetailModal
        isOpen={!!selectedWeapon}
        onClose={() => setSelectedWeapon(null)}
        item={selectedWeapon}
        type="weapon"
      />
    </section>
  );
}
