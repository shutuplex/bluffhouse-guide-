import { useState, useMemo } from 'react';
import { Search, Skull, Heart, Gift, ArrowUpDown } from 'lucide-react';
import { ENEMIES_DATA, ENEMY_TIERS } from '../data/enemiesData';
import MediaPreview from './ui/MediaPreview';
import CopyButton from './CopyButton';

const TIER_META = {
  'Common': {
    label: 'Common Tier',
    badge: 'border-zinc-500/30 text-zinc-300 bg-zinc-500/10',
    huntCmd: '/hunt'
  },
  'Elite': {
    label: 'Elite Tier',
    badge: 'border-sky-500/30 text-sky-300 bg-sky-500/10',
    huntCmd: '/hunt'
  },
  'Boss': {
    label: 'Boss Tier',
    badge: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
    huntCmd: '/hunt'
  },
  'Major Boss': {
    label: 'Major Raid Boss',
    badge: 'border-amber-400/40 text-amber-300 bg-amber-400/10 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    huntCmd: '/boss'
  }
};

export default function EnemiesShowcase() {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState('All Tiers');
  const [dropFilter, setDropFilter] = useState('all');
  const [sortBy, setSortBy] = useState('id-asc');

  const filteredEnemies = useMemo(() => {
    let list = ENEMIES_DATA.filter(enemy => {
      // Search by name or drop weapon name
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = enemy.name.toLowerCase().includes(q);
        const matchesId = enemy.id.toLowerCase().includes(q);
        const matchesWeapon = enemy.dropWeapon && enemy.dropWeapon.name.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesWeapon) return false;
      }

      // Tier filter
      if (selectedTier !== 'All Tiers' && enemy.tier !== selectedTier) {
        return false;
      }

      // Drop filter
      if (dropFilter === 'with-weapon' && !enemy.drop_weapon_id) {
        return false;
      }
      if (dropFilter === 'shards-only' && enemy.drop_weapon_id) {
        return false;
      }

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'id-asc') return parseInt(a.id, 10) - parseInt(b.id, 10);
      if (sortBy === 'id-desc') return parseInt(b.id, 10) - parseInt(a.id, 10);
      if (sortBy === 'hp-desc') return b.hp - a.hp;
      if (sortBy === 'hp-asc') return a.hp - b.hp;
      if (sortBy === 'dmg-desc') return b.base_dmg - a.base_dmg;
      if (sortBy === 'spd-desc') return b.spd - a.spd;
      if (sortBy === 'xp-desc') return b.xp_reward - a.xp_reward;
      if (sortBy === 'droprate-desc') return (b.drop_rate || 0) - (a.drop_rate || 0);
      return 0;
    });

    return list;
  }, [search, selectedTier, dropFilter, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedTier('All Tiers');
    setDropFilter('all');
    setSortBy('id-asc');
  };

  return (
    <section className="space-y-5">
      {/* Title & Count Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Bestiary Showcase</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white font-semibold">
              {filteredEnemies.length} of {ENEMIES_DATA.length} Encounters
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Monsters & Raid Bosses
          </h2>
        </div>

        {/* Reset button */}
        {(search || selectedTier !== 'All Tiers' || dropFilter !== 'all' || sortBy !== 'id-asc') && (
          <button
            onClick={resetFilters}
            className="text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer transition-colors self-start sm:self-auto"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Control Bar: Search, Filters & Sorting */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/15 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search monsters by name or weapon drop (e.g. Radahn, Malenia, Messmer)..."
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
              <option value="hp-desc" className="bg-zinc-900 text-white">Sort: Health HP (Highest)</option>
              <option value="hp-asc" className="bg-zinc-900 text-white">Sort: Health HP (Lowest)</option>
              <option value="dmg-desc" className="bg-zinc-900 text-white">Sort: Base Damage (Highest)</option>
              <option value="spd-desc" className="bg-zinc-900 text-white">Sort: Speed (Fastest)</option>
              <option value="xp-desc" className="bg-zinc-900 text-white">Sort: XP Bounty (Highest)</option>
              <option value="droprate-desc" className="bg-zinc-900 text-white">Sort: Weapon Drop Rate</option>
            </select>
          </div>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-white/10 text-xs">
          {/* Tier Buttons */}
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">
              Monster Tier Classification
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ENEMY_TIERS.map(tier => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                    selectedTier === tier
                      ? 'bg-white/20 text-white font-bold border border-white/40 shadow-sm'
                      : 'bg-black/30 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Drop Filter Tabs */}
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">
              Drop Rewards Type
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Encounters' },
                { id: 'with-weapon', label: 'Weapons Dropped' },
                { id: 'shards-only', label: 'Shards & XP Only' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setDropFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                    dropFilter === f.id
                      ? 'bg-white/20 text-white font-bold border border-white/40 shadow-sm'
                      : 'bg-black/30 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Enemies */}
      {filteredEnemies.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-white/10 space-y-3">
          <Skull className="w-10 h-10 text-zinc-600 mx-auto" />
          <div className="text-white font-bold text-base">No Encounters Found</div>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto font-mono">
            No monsters matched your current search and filter settings. Try adjusting your search query.
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
          {filteredEnemies.map(enemy => {
            const tierInfo = TIER_META[enemy.tier] || TIER_META['Common'];
            const hpRatio = Math.min(100, Math.round((enemy.hp / 1100) * 100));

            return (
              <div
                key={enemy.id}
                className="glass-card rounded-2xl border border-white/15 hover:border-white/30 overflow-hidden flex flex-col justify-between group transition-all"
              >
                {/* Image Banner */}
                <div className="relative">
                  <MediaPreview
                    src={enemy.img_url}
                    alt={enemy.name}
                    aspectRatio="aspect-[16/10]"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white shadow-sm">
                      #{enemy.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md backdrop-blur-md border text-[11px] font-mono font-semibold shadow-sm ${tierInfo.badge}`}>
                      {tierInfo.label}
                    </span>
                  </div>

                  {/* Bottom Stats Preview Bar */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-200">
                    <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 flex items-center gap-1.5">
                      <Heart className="w-3 h-3 text-rose-400" />
                      <strong>{enemy.hp} HP</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-zinc-300">
                      XP +{enemy.xp_reward}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-zinc-100 transition-colors">
                      {enemy.name}
                    </h3>
                  </div>

                  {/* Combat Stats Grid */}
                  <div className="space-y-2 pt-1 border-t border-white/10 font-mono text-xs">
                    {/* HP Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span>Vitality Pool</span>
                        <span className="text-white font-bold">{enemy.hp} HP</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full"
                          style={{ width: `${hpRatio}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats columns: Base DMG, SPD, DEF */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Attack DMG</div>
                        <div className="text-sm font-bold text-white mt-0.5">{enemy.base_dmg}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Speed</div>
                        <div className="text-sm font-bold text-sky-300 mt-0.5">{enemy.spd}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Defense</div>
                        <div className="text-sm font-bold text-zinc-300 mt-0.5">{enemy.def}</div>
                      </div>
                    </div>
                  </div>

                  {/* Dropped Rewards Box */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-zinc-300">
                      <span className="text-zinc-400 flex items-center gap-1.5">
                        <Gift className="w-3 h-3 text-amber-400" /> Shard Rewards
                      </span>
                      <strong className="text-amber-300">{enemy.shard_min}–{enemy.shard_max} ◈</strong>
                    </div>

                    {/* Weapon Drop Section */}
                    <div className="pt-2 border-t border-white/5">
                      {enemy.dropWeapon ? (
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            {enemy.dropWeapon.img_url && (
                              <img
                                src={enemy.dropWeapon.img_url}
                                alt={enemy.dropWeapon.name}
                                className="w-7 h-7 rounded-lg object-cover border border-white/15 flex-shrink-0"
                              />
                            )}
                            <div className="truncate">
                              <div className="text-white font-bold text-[11px] truncate">{enemy.dropWeapon.name}</div>
                              <div className="text-[10px] text-zinc-400">{enemy.dropWeapon.type}</div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-[11px] flex-shrink-0">
                            {enemy.drop_rate}% Drop
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[10px] text-zinc-500">
                          <span>Armament Drops</span>
                          <span>No unique weapon</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Command Hint */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-zinc-300 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                        {tierInfo.huntCmd}
                      </code>
                      <CopyButton text={tierInfo.huntCmd} label="Copy Hunt" />
                    </div>
                    {enemy.dropWeapon && (
                      <CopyButton text={`/equip ${enemy.dropWeapon.id}`} label={`Equip #${enemy.dropWeapon.id}`} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
