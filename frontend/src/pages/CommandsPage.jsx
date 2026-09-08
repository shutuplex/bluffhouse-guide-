import React, { useState } from 'react';
import { Terminal, Copy, Check, Search } from 'lucide-react';
import { BOT_COMMANDS } from '../data/gameData';

const CATEGORIES = [
  { id: 'all',                   label: 'All Commands' },
  { id: 'Character Progression', label: 'Character & RPG' },
  { id: 'Combat & Raids',        label: 'Combat & Raids' },
  { id: 'Gacha & Economy',       label: 'Gacha & Economy' },
  { id: 'Minigames & Duels',     label: 'Minigames & Duels' },
  { id: 'Weapons & Armory',      label: 'Weapons & Armory' },
  { id: 'Social & Info',         label: 'Social & Info' },
];

function CommandRow({ cmd }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cmd.command + (cmd.params ? ' ' + cmd.params : ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/15 hover:border-white/25 group flex flex-col justify-between gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <code className="font-mono text-sm font-bold text-white bg-white/10 px-2 py-0.5 rounded-md border border-white/10">{cmd.command}</code>
            {cmd.params && (
              <code className="font-mono text-xs text-zinc-300">{cmd.params}</code>
            )}
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed">{cmd.desc}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-2.5 rounded-xl glass-btn text-zinc-300 hover:text-white transition-all cursor-pointer"
          title="Copy command"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      {cmd.example && (
        <div className="code-block rounded-xl px-3.5 py-2 text-xs font-mono border border-white/10 text-zinc-300">
          <span className="text-zinc-400">Example:</span> <strong className="text-white">{cmd.example}</strong>
        </div>
      )}
    </div>
  );
}

export default function CommandsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.toLowerCase().trim();
  const filtered = (BOT_COMMANDS || []).filter(cmd => {
    const matchesSearch = !q || cmd.command.toLowerCase().includes(q) || cmd.desc.toLowerCase().includes(q);
    const matchesCat = activeCategory === 'all' || cmd.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 pb-16 animate-float-up">

      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl glass-badge flex items-center justify-center text-white border-white/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">Bot Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Bot Commands Directory</h1>
        <p className="text-zinc-300 mt-2 text-base max-w-2xl leading-relaxed">
          Comprehensive directory of Telegram bot slash commands. Search, filter by category, or copy commands directly to your clipboard.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search commands by name or description..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full glass-card rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-white/30 font-mono border-white/15 bg-white/[0.04]"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white/15 border-white/30 text-white font-semibold shadow-lg'
                  : 'text-zinc-300 glass-badge border-white/10 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Counter */}
      <div className="text-xs font-mono text-zinc-300 font-medium">
        Showing <strong className="text-white">{filtered.length}</strong> command{filtered.length !== 1 ? 's' : ''}
        {q && <span> matching "<strong className="text-white">{q}</strong>"</span>}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(cmd => (
            <CommandRow key={cmd.command + (cmd.params || '')} cmd={cmd} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-12 text-center border border-white/15">
          <Terminal className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
          <p className="text-zinc-300 font-mono text-sm">No commands match your filter criteria.</p>
        </div>
      )}

      {/* Usage instructions */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15">
        <div className="text-xs text-zinc-200 leading-relaxed">
          <strong className="text-white font-semibold">Syntax Convention:</strong> Parameters in <code className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono">[brackets]</code> are optional arguments, while parameters in <code className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono">{'<angle brackets>'}</code> are required for execution.
        </div>
      </div>

    </div>
  );
}
