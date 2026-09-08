import React from 'react';
import { Search, Menu, X, Send } from 'lucide-react';

const navLinks = [
  { id: 'overview',    label: 'Overview' },
  { id: 'rpg',         label: 'RPG & Stats' },
  { id: 'weapons',     label: 'Weapons' },
  { id: 'enemies',     label: 'Encounters' },
  { id: 'combat-sim',  label: 'Combat' },
  { id: 'cards',       label: 'Cards' },
  { id: 'minigames',   label: 'Mini-Games' },
  { id: 'commands',    label: 'Commands' },
];

export default function Navbar({ activePage, setActivePage, onOpenSearch, sidebarOpen, setSidebarOpen }) {
  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-40 h-14 sm:h-16 transition-all">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 h-full flex items-center justify-between gap-2 sm:gap-4">

        {/* Left: Hamburger toggle + brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/8 border border-white/15 transition-all cursor-pointer active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setActivePage('overview')}
            className="cursor-pointer group flex items-center gap-2"
          >
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
              Bluffhouse
            </span>
          </button>
        </div>

        {/* Center: Desktop Nav links (Large screens) */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(link => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/12 text-white font-semibold border border-white/20'
                    : 'text-zinc-300 hover:text-white hover:bg-white/6'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search + Telegram Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 p-2 sm:px-3.5 sm:py-1.5 rounded-xl glass-badge border border-white/15 text-zinc-200 hover:text-white text-xs font-mono transition-all cursor-pointer active:scale-95"
            aria-label="Search docs"
          >
            <Search className="w-3.5 h-3.5 text-zinc-300" />
            <span className="hidden sm:inline font-sans">Search</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-zinc-200 border border-white/10">⌘K</kbd>
          </button>

          <a
            href="https://t.me/bluffhousexbot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl glass-btn text-xs font-medium text-white transition-all active:scale-95"
          >
            <Send className="w-3 h-3" />
            <span className="hidden sm:inline">Telegram</span>
          </a>
        </div>
      </div>
    </header>
  );
}
