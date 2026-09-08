import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/layout/Sidebar';
import SearchModal from './components/SearchModal';
import LandingPage from './pages/LandingPage';
import RPGProgressionPage from './pages/RPGProgressionPage';
import WeaponsDatabasePage from './pages/WeaponsDatabasePage';
import BestiaryPage from './pages/BestiaryPage';
import CombatSimulatorPage from './pages/CombatSimulatorPage';
import CardDexPage from './pages/CardDexPage';
import MiniGamesPage from './pages/MiniGamesPage';
import CommandsPage from './pages/CommandsPage';

const PAGES = ['overview', 'rpg', 'weapons', 'enemies', 'combat-sim', 'cards', 'minigames', 'commands'];

export default function App() {
  const [activePage, setActivePage] = useState('overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (PAGES.includes(hash)) setActivePage(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global Cmd+K listener
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(v => !v);
      }
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavigate = useCallback((page) => {
    setActivePage(page);
    window.location.hash = '#/' + page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans ambient-bg">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ambient-blob-gold" />
        <div className="ambient-blob-indigo" />
      </div>

      {/* Glass Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 relative z-10 pt-14 sm:pt-16">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-3 sm:px-6 lg:px-8 py-5 sm:py-8 max-w-5xl mx-auto w-full">
          {activePage === 'overview'    && <LandingPage onNavigate={handleNavigate} />}
          {activePage === 'rpg'         && <RPGProgressionPage />}
          {activePage === 'weapons'     && <WeaponsDatabasePage />}
          {activePage === 'enemies'     && <BestiaryPage />}
          {activePage === 'combat-sim'  && <CombatSimulatorPage />}
          {activePage === 'cards'       && <CardDexPage />}
          {activePage === 'minigames'   && <MiniGamesPage />}
          {activePage === 'commands'    && <CommandsPage />}
        </main>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
