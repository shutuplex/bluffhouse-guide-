import { useState, useMemo } from 'react';
import { Search, Sparkles, ArrowUpDown, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { CHARACTERS_DATA, CHARACTER_ANIMES, CHARACTER_RARITIES, STAT_TYPES } from '../data/charactersData';
import MediaPreview from './ui/MediaPreview';
import CardDetailModal from './ui/CardDetailModal';

const RARITY_STYLES = {
  'Mythic': {
    badge: 'border-purple-400/50 text-purple-200 bg-purple-500/15 shadow-[0_0_12px_rgba(168,85,247,0.25)]',
    stars: 5,
    border: 'border-purple-500/30 hover:border-purple-400/50'
  },
  'Summer Edition': {
    badge: 'border-amber-400/50 text-amber-200 bg-amber-500/15 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
    stars: 4,
    border: 'border-amber-500/30 hover:border-amber-400/50'
  },
  'Legendary': {
    badge: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10',
    stars: 4,
    border: 'border-yellow-500/25 hover:border-yellow-400/40'
  },
  'Rare': {
    badge: 'border-sky-500/35 text-sky-300 bg-sky-500/10',
    stars: 2,
    border: 'border-sky-500/20 hover:border-sky-400/35'
  },
  'Medium': {
    badge: 'border-indigo-500/35 text-indigo-300 bg-indigo-500/10',
    stars: 3,
    border: 'border-indigo-500/20 hover:border-indigo-400/35'
  },
  'Common': {
    badge: 'border-zinc-500/30 text-zinc-300 bg-zinc-500/10',
    stars: 1,
    border: 'border-zinc-500/20 hover:border-zinc-400/35'
  }
};

const STAT_CONFIG = {
  'STR': { label: '+5 STR Attack', color: 'text-amber-300 border-amber-500/30 bg-amber-500/10' },
  'DEX': { label: '+5 DEX Precision', color: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10' },
  'SPD': { label: '+5 SPD Initiative', color: 'text-sky-300 border-sky-500/30 bg-sky-500/10' },
  'DEF': { label: '+5 DEF Mitigation', color: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10' },
};

const ITEMS_PER_PAGE = 24;

export default function CharactersShowcase() {
  const [search, setSearch] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('All Rarities');
  const [selectedAnime, setSelectedAnime] = useState('All Anime');
  const [selectedStat, setSelectedStat] = useState('All Stats');
  const [sortBy, setSortBy] = useState('id-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const filteredCharacters = useMemo(() => {
    let list = CHARACTERS_DATA.filter(char => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = char.name.toLowerCase().includes(q);
        const matchesAnime = char.anime.toLowerCase().includes(q);
        const matchesId = char.id.toLowerCase().includes(q);
        if (!matchesName && !matchesAnime && !matchesId) return false;
      }

      // Rarity
      if (selectedRarity !== 'All Rarities' && char.rarity !== selectedRarity) {
        return false;
      }

      // Anime
      if (selectedAnime !== 'All Anime' && char.anime !== selectedAnime) {
        return false;
      }

      // Stat
      if (selectedStat !== 'All Stats') {
        if (selectedStat === 'None') {
          if (char.stat && char.stat.type) return false;
        } else {
          if (!char.stat || char.stat.type !== selectedStat) return false;
        }
      }

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'id-asc') return parseInt(a.id, 10) - parseInt(b.id, 10);
      if (sortBy === 'id-desc') return parseInt(b.id, 10) - parseInt(a.id, 10);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [search, selectedRarity, selectedAnime, selectedStat, sortBy]);

  // Reset to page 1 on filter changes
  const totalPages = Math.max(1, Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);

  const paginatedCharacters = useMemo(() => {
    const start = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredCharacters.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCharacters, validPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const element = document.getElementById('characters-grid-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedRarity('All Rarities');
    setSelectedAnime('All Anime');
    setSelectedStat('All Stats');
    setSortBy('id-asc');
    setCurrentPage(1);
  };

  return (
    <section className="space-y-5" id="characters-grid-anchor">
      {/* Title & Count Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Card Dex Showcase</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white font-semibold">
              {filteredCharacters.length} of {CHARACTERS_DATA.length} Characters
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Anime Characters & Talismans
          </h2>
        </div>

        {/* Reset button */}
        {(search || selectedRarity !== 'All Rarities' || selectedAnime !== 'All Anime' || selectedStat !== 'All Stats' || sortBy !== 'id-asc') && (
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by character or anime title (e.g. Gojo, Luffy, Bleach, Lookism)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/35 focus:ring-1 focus:ring-white/20 transition-all font-mono"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-white/35 transition-all font-mono cursor-pointer appearance-none"
            >
              <option value="id-asc" className="bg-zinc-900 text-white">Sort: ID (Ascending)</option>
              <option value="id-desc" className="bg-zinc-900 text-white">Sort: ID (Descending)</option>
              <option value="price-desc" className="bg-zinc-900 text-white">Sort: Shards Price (Highest)</option>
              <option value="price-asc" className="bg-zinc-900 text-white">Sort: Shards Price (Lowest)</option>
              <option value="name-asc" className="bg-zinc-900 text-white">Sort: Character Name (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-white/10 text-xs">
          {/* Rarity Buttons */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">
              Rarity Grade
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CHARACTER_RARITIES.map(rarity => (
                <button
                  key={rarity}
                  onClick={() => { setSelectedRarity(rarity); setCurrentPage(1); }}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                    selectedRarity === rarity
                      ? 'bg-white/20 text-white font-bold border border-white/40 shadow-sm'
                      : 'bg-black/30 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  {rarity}
                </button>
              ))}
            </div>
          </div>

          {/* Anime Dropdown */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">
              Anime Universe
            </label>
            <select
              value={selectedAnime}
              onChange={e => { setSelectedAnime(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-white/35 font-mono cursor-pointer"
            >
              {CHARACTER_ANIMES.map(anime => (
                <option key={anime} value={anime} className="bg-zinc-900 text-white">
                  {anime}
                </option>
              ))}
            </select>
          </div>

          {/* Stat Type Dropdown */}
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-semibold">
              Attribute Bonus
            </label>
            <select
              value={selectedStat}
              onChange={e => { setSelectedStat(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-white/35 font-mono cursor-pointer"
            >
              {STAT_TYPES.map(stat => (
                <option key={stat} value={stat} className="bg-zinc-900 text-white">
                  {stat === 'None' ? 'No Attribute Bonus' : stat === 'All Stats' ? 'All Attributes' : `+5 ${stat}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Characters */}
      {filteredCharacters.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-white/10 space-y-3">
          <Sparkles className="w-10 h-10 text-zinc-600 mx-auto" />
          <div className="text-white font-bold text-base">No Characters Found</div>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto font-mono">
            No anime characters matched your active search and filter combinations.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl glass-badge border-white/20 text-xs text-white font-mono hover:bg-white/10 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {paginatedCharacters.map(char => {
              const rarityStyle = RARITY_STYLES[char.rarity] || RARITY_STYLES['Common'];
              const statMeta = char.stat ? STAT_CONFIG[char.stat.type] : null;

              return (
                <div
                  key={char.id}
                  onClick={() => setSelectedCharacter(char)}
                  className={`glass-card rounded-2xl border ${rarityStyle.border} overflow-hidden flex flex-col justify-between group transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSelectedCharacter(char)}
                >
                  {/* Media Aspect Container */}
                  <div className="relative">
                    <MediaPreview
                      src={char.img_url}
                      alt={char.name}
                      isVideo={char.isVideo}
                      aspectRatio="aspect-[4/5]"
                    />

                    {/* Top overlay ID and Rarity */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white shadow-sm">
                        #{char.id}
                      </span>
                    </div>

                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 rounded backdrop-blur-md border text-[10px] font-mono font-semibold shadow-sm ${rarityStyle.badge}`}>
                        {char.rarity}
                      </span>
                    </div>

                    {/* Price in Shards */}
                    <div className="absolute bottom-2 right-2">
                      <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-amber-300 font-bold">
                        {char.price.toLocaleString()} ◈
                      </span>
                    </div>
                  </div>

                  {/* Details Card Content */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider truncate mb-0.5">
                        {char.anime}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug group-hover:text-zinc-100 line-clamp-1">
                        {char.name}
                      </h3>
                    </div>

                    {/* Stat Bonus Badge */}
                    <div className="pt-1.5 border-t border-white/10">
                      {char.rarity === 'Mythic' ? (
                        <div className="px-2 py-1 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-200 text-[10px] font-mono font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-300 flex-shrink-0" />
                          <span className="truncate">+50 Max HP Pool</span>
                        </div>
                      ) : statMeta ? (
                        <div className={`px-2 py-1 rounded-lg border text-[10px] font-mono font-semibold truncate ${statMeta.color}`}>
                          {statMeta.label}
                        </div>
                      ) : (
                        <div className="px-2 py-1 rounded-lg border border-white/5 bg-white/[0.02] text-zinc-400 text-[10px] font-mono truncate">
                          Collector Card
                        </div>
                      )}
                    </div>

                    {/* Card Footer: ID & Inspect */}
                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between gap-1 text-[10px] font-mono text-zinc-400">
                      <span>ID: #{char.id}</span>
                      <span className="text-zinc-500 group-hover:text-zinc-300 flex items-center gap-1 transition-colors">
                        Inspect
                        <Maximize2 className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="glass-card rounded-2xl p-3 sm:p-4 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="text-zinc-400 text-center sm:text-left">
                Showing{' '}
                <strong className="text-white">
                  {(validPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(validPage * ITEMS_PER_PAGE, filteredCharacters.length)}
                </strong>{' '}
                of <strong className="text-white">{filteredCharacters.length}</strong> cards (Page {validPage} of {totalPages})
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, validPage - 1))}
                  disabled={validPage <= 1}
                  className="px-3 py-1.5 rounded-lg border border-white/15 bg-black/40 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <span className="px-3 py-1.5 rounded-lg bg-white/15 border border-white/30 text-white font-bold">
                  {validPage}
                </span>

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, validPage + 1))}
                  disabled={validPage >= totalPages}
                  className="px-3 py-1.5 rounded-lg border border-white/15 bg-black/40 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Card Detail Inspector Modal */}
      <CardDetailModal
        isOpen={!!selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        item={selectedCharacter}
        type="character"
      />
    </section>
  );
}
