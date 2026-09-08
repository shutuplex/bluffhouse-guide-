import React, { useState } from 'react';
import { ChevronRight, ChevronDown, X } from 'lucide-react';

const NAV_SECTIONS = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    page: 'overview',
    items: [
      { label: 'Introduction', page: 'overview' },
      { label: 'Core Economy', page: 'overview' },
    ]
  },
  {
    id: 'progression',
    label: 'Character Progression',
    page: 'rpg',
    items: [
      { label: 'Site of Grace — /levelup', page: 'rpg' },
      { label: '5 Core Stats', page: 'rpg' },
      { label: 'Talisman Pouches', page: 'rpg' },
      { label: 'RPG Titles', page: 'rpg' },
      { label: 'Respec — /respec', page: 'rpg' },
      { label: 'Stat Builder Tool', page: 'rpg', highlight: true },
    ]
  },
  {
    id: 'weapons',
    label: 'Weapons & Smithy',
    page: 'weapons',
    items: [
      { label: 'Weapon Tiers', page: 'weapons' },
      { label: 'Daily Shop — /wshop', page: 'weapons' },
      { label: 'Smithy Upgrades — /upgrade', page: 'weapons' },
      { label: 'Upgrade Simulator', page: 'weapons', highlight: true },
    ]
  },
  {
    id: 'combat',
    label: 'Combat Engine',
    page: 'combat-sim',
    items: [
      { label: 'PvE Hunting — /hunt', page: 'combat-sim' },
      { label: 'Combat Moves', page: 'combat-sim' },
      { label: 'Guard Counter & Dodge', page: 'combat-sim' },
      { label: 'PvP Arena — /fight', page: 'combat-sim' },
      { label: 'Damage Formula', page: 'combat-sim' },
    ]
  },
  {
    id: 'bosses',
    label: 'Encounters & Drops',
    page: 'enemies',
    items: [
      { label: 'Spawn Rates', page: 'enemies' },
      { label: 'Drop Rewards', page: 'enemies' },
    ]
  },
  {
    id: 'minigames',
    label: 'Minigames & Duels',
    page: 'minigames',
    items: [
      { label: 'Russian Roulette — /duel', page: 'minigames' },
      { label: 'Roulette Items', page: 'minigames' },
      { label: 'Character Duels — /rduel', page: 'minigames' },
      { label: 'Trivia Rankings', page: 'minigames' },
    ]
  },
  {
    id: 'cards',
    label: 'Anime Card Dex',
    page: 'cards',
    items: [
      { label: 'Gacha System', page: 'cards' },
      { label: 'Legendary Talismans', page: 'cards' },
    ]
  },
  {
    id: 'commands',
    label: 'Commands Reference',
    page: 'commands',
    items: [
      { label: 'Full Command List', page: 'commands' },
    ]
  },
];

function SidebarSection({ section, activePage, onNavigate, onClose, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || activePage === section.page);
  const isPageActive = activePage === section.page;

  const handleParentClick = () => {
    setOpen(o => !o);
    onNavigate(section.page);
    if (onClose) onClose();
  };

  const handleItemClick = (page) => {
    onNavigate(page);
    if (onClose) onClose();
  };

  return (
    <div className="mb-0.5">
      <button
        onClick={handleParentClick}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
          isPageActive
            ? 'sidebar-active-item'
            : 'text-zinc-300 hover:text-white hover:bg-white/[0.05]'
        }`}
      >
        <span className="text-xs font-medium tracking-wide truncate pr-2">{section.label}</span>
        {open
          ? <ChevronDown className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
          : <ChevronRight className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
        }
      </button>

      {open && (
        <div className="ml-2.5 pl-2.5 border-l border-white/10 mt-0.5 mb-1 space-y-0.5">
          {section.items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item.page)}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                item.highlight
                  ? 'text-white font-semibold hover:bg-white/10'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  return (
    <>
      {/* Desktop Sidebar (compact & sleek) */}
      <aside className="hidden lg:flex flex-col w-56 xl:w-60 flex-shrink-0 glass-sidebar sticky top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-y-auto p-2.5">
        <div className="space-y-0.5">
          <div className="px-3 py-1.5 mb-1">
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">GUIDE</p>
          </div>
          {NAV_SECTIONS.map((section) => (
            <SidebarSection
              key={section.id}
              section={section}
              activePage={activePage}
              onNavigate={onNavigate}
              defaultOpen={activePage === section.page}
            />
          ))}
        </div>
        <div className="mt-auto p-3 border-t border-white/10">
          <div className="text-[11px] font-mono text-zinc-400 text-center font-medium">Bluffhouse Docs</div>
        </div>
      </aside>

      {/* Mobile Drawer (smooth slide-in with header and close button) */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 sm:w-80 glass-sidebar overflow-y-auto p-4 transform transition-transform duration-300 ease-out shadow-2xl flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header with brand + close button */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
          <span className="text-base font-bold text-white tracking-tight font-mono">Bluffhouse</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg glass-badge text-zinc-300 hover:text-white border-white/15 cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-0.5 flex-1 overflow-y-auto pr-1">
          <div className="px-2 py-1 mb-1">
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">Navigation Menu</p>
          </div>
          {NAV_SECTIONS.map((section) => (
            <SidebarSection
              key={section.id}
              section={section}
              activePage={activePage}
              onNavigate={onNavigate}
              onClose={onClose}
              defaultOpen={true}
            />
          ))}
        </div>

        <div className="mt-auto pt-3 border-t border-white/10 text-center">
          <div className="text-[11px] font-mono text-zinc-400">Arena Companion</div>
        </div>
      </aside>
    </>
  );
}
