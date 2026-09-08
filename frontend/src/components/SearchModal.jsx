import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sword, Sparkles, Terminal, ChevronRight } from 'lucide-react';
import { WEAPONS_DATABASE, ANIME_CARDS_DATABASE, BOT_COMMANDS } from '../data/gameData';

export default function SearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingWeapons = q
    ? WEAPONS_DATABASE.filter(w => w.name.toLowerCase().includes(q) || w.type.toLowerCase().includes(q)).slice(0, 4)
    : [];

  const matchingCards = q
    ? ANIME_CARDS_DATABASE.filter(c => c.name.toLowerCase().includes(q) || c.anime.toLowerCase().includes(q) || c.rarity.toLowerCase().includes(q)).slice(0, 4)
    : [];

  const matchingCommands = q
    ? BOT_COMMANDS.filter(cmd => cmd.command.toLowerCase().includes(q) || cmd.desc.toLowerCase().includes(q)).slice(0, 4)
    : [];

  const hasResults = matchingWeapons.length || matchingCards.length || matchingCommands.length;

  const handleSelect = (page) => {
    onNavigate(page);
    onClose();
  };

  const quickLinks = [
    { label: 'Stat Builder', page: 'rpg' },
    { label: 'Weapon Upgrade Simulator', page: 'weapons' },
    { label: 'Combat System Guide', page: 'combat-sim' },
    { label: 'Bot Commands Directory', page: 'commands' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="glass-modal w-full max-w-xl rounded-3xl overflow-hidden animate-float-up border border-white/20 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-zinc-300 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search weapons, cards, commands..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-400 focus:outline-none font-mono"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-400 hover:text-white p-1 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] font-mono glass-badge px-2 py-1 text-zinc-300 rounded-md border-white/10">ESC</kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Quick Navigation</div>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map(link => (
                  <button
                    key={link.page}
                    onClick={() => handleSelect(link.page)}
                    className="flex items-center justify-between p-3 rounded-xl glass-badge border border-white/10 hover:border-white/25 hover:bg-white/10 text-left transition-all cursor-pointer"
                  >
                    <span className="text-xs text-white font-medium">{link.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && !hasResults && (
            <div className="py-8 text-center text-zinc-400 text-xs font-mono">
              No matching records discovered for "{q}"
            </div>
          )}

          {matchingWeapons.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Sword className="w-3.5 h-3.5 text-white" /> Weapons
              </div>
              {matchingWeapons.map(w => (
                <button
                  key={w.id}
                  onClick={() => handleSelect('weapons')}
                  className="w-full flex items-center justify-between p-3 rounded-xl glass-badge border border-white/10 hover:border-white/20 hover:bg-white/10 text-left transition-all cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{w.name}</div>
                    <div className="text-[11px] text-zinc-300 font-mono">Tier {w.tier} · {w.base_dmg} Base DMG</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              ))}
            </div>
          )}

          {matchingCards.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-white" /> Cards
              </div>
              {matchingCards.map(c => (
                <button
                  key={c.characterId}
                  onClick={() => handleSelect('cards')}
                  className="w-full flex items-center justify-between p-3 rounded-xl glass-badge border border-white/10 hover:border-white/20 hover:bg-white/10 text-left transition-all cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{c.name}</div>
                    <div className="text-[11px] text-zinc-300 font-mono">{c.anime} · {c.rarity}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              ))}
            </div>
          )}

          {matchingCommands.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-white" /> Bot Commands
              </div>
              {matchingCommands.map(cmd => (
                <button
                  key={cmd.command}
                  onClick={() => handleSelect('commands')}
                  className="w-full flex items-center justify-between p-3 rounded-xl glass-badge border border-white/10 hover:border-white/20 hover:bg-white/10 text-left transition-all cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold font-mono text-white">{cmd.command}</div>
                    <div className="text-[11px] text-zinc-300 line-clamp-1">{cmd.desc}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
