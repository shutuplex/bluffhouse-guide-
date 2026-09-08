import React from 'react';
import { Flame, Send } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-zinc-900 bg-black text-zinc-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm font-mono">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>ELDEN ARENA & ANIME GACHA</span>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            The official web database, damage simulator, and interactive guide for the Telegram RPG & Anime Card bot.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Bot Engine v2.4 Active</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 font-mono uppercase tracking-wider text-[11px]">Database</h4>
          <ul className="space-y-2">
            <li><button onClick={() => onNavigate('weapons')} className="hover:text-white transition-colors cursor-pointer">Weapons & Smithy</button></li>
            <li><button onClick={() => onNavigate('enemies')} className="hover:text-white transition-colors cursor-pointer">Bestiary & Boss Raids</button></li>
            <li><button onClick={() => onNavigate('cards')} className="hover:text-white transition-colors cursor-pointer">Anime Card Dex</button></li>
            <li><button onClick={() => onNavigate('rpg')} className="hover:text-white transition-colors cursor-pointer">Talisman Pouches</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 font-mono uppercase tracking-wider text-[11px]">Calculators & Tools</h4>
          <ul className="space-y-2">
            <li><button onClick={() => onNavigate('rpg')} className="hover:text-white transition-colors cursor-pointer">Stat Allocator & Levels</button></li>
            <li><button onClick={() => onNavigate('combat-sim')} className="hover:text-white transition-colors cursor-pointer">Combat Turn Sandbox</button></li>
            <li><button onClick={() => onNavigate('minigames')} className="hover:text-white transition-colors cursor-pointer">Russian Roulette Guide</button></li>
            <li><button onClick={() => onNavigate('commands')} className="hover:text-white transition-colors cursor-pointer">Command Cheat Sheet</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 font-mono uppercase tracking-wider text-[11px]">Telegram Community</h4>
          <p className="text-zinc-400 mb-3">Join thousands of Tarnished warriors in PvP battles, world boss raids, and card trading.</p>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>Join Bot Channel</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
        <div>© {new Date().getFullYear()} Elden Arena Telegram RPG. Official companion & web encyclopedia.</div>
        <div className="font-mono text-[11px]">Monochrome Minimalist Theme</div>
      </div>
    </footer>
  );
}
