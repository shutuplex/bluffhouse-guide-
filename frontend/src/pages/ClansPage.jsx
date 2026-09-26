import React, { useState } from 'react';
import { Shield, Crown, Star, Users, Swords, Award, TrendingUp, Coins, Copy, Check, MessageSquare, ChevronRight, UserPlus, Flame, Calendar, Trophy, Ticket, Sparkles } from 'lucide-react';
import { CLAN_LEVELS, CLAN_ROLES, CLAN_GLORY_SYSTEM } from '../data/gameData';
import Callout from '../components/ui/Callout';
import CommandBadge, { InlineCode } from '../components/ui/CommandBadge';
import CopyButton from '../components/CopyButton';

const CLAN_COMMANDS = [
  { cmd: '/clan', params: '', desc: 'Open Clan Dashboard, roster, and active perks (Alias: /guild)' },
  { cmd: '/clan create', params: '<Name> <TAG>', desc: 'Found a new clan for 500 Shards. TAG is 2-5 alphanumeric chars' },
  { cmd: '/clan join', params: '<TAG>', desc: 'Submit application to join clan (Alias: /join <TAG>)' },
  { cmd: '/clan leave', params: '', desc: 'Leave current clan and forfeit active guild perks' },
  { cmd: '/clan donate', params: '<amount>', desc: 'Donate Shards directly to clan treasury for level-ups' },
  { cmd: '/clan requests', params: '', desc: 'View and review pending applicant requests (Leader & Officers)' },
  { cmd: '/clan promote', params: '<@user>', desc: 'Promote a Member to Officer rank (Leader only)' },
  { cmd: '/clan demote', params: '<@user>', desc: 'Demote an Officer back to standard Member (Leader only)' },
  { cmd: '/clan kick', params: '<@user>', desc: 'Remove a player from the clan roster (Leader & Officers)' },
  { cmd: '/clan transfer', params: '<@user>', desc: 'Transfer Clan Leadership ownership to another member (Leader only)' },
  { cmd: '/clan boss', params: '', desc: 'Challenge Weekly Ancient Clan Titan Boss (3 daily attacks)' },
  { cmd: '/setclanpfp', params: '[URL]', desc: 'Update Clan banner / avatar image (Leader & Officers)' },
  { cmd: '/topclans', params: '', desc: 'View global clan leaderboard ranked by Level and Treasury' },
];

export default function ClansPage() {
  const [activeTab, setActiveTab] = useState('progression');
  const [selectedLevel, setSelectedLevel] = useState(1);

  const activeLevelData = CLAN_LEVELS.find(l => l.level === selectedLevel) || CLAN_LEVELS[0];

  return (
    <div className="space-y-8 pb-16 animate-float-up">

      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl glass-badge flex items-center justify-center text-white border-white/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-semibold">Guild System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Clans & Covenants</h1>
        <p className="text-zinc-300 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
          Unite with fellow warriors to form powerful guilds, unlock realm-wide passive perks, battle weekly Titan raid bosses, and display custom <code className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded text-xs">[TAG]</code> identifiers on your profile and leaderboards.
        </p>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="glass-badge rounded-xl p-3 border-white/10">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Creation Cost</div>
            <div className="text-base sm:text-lg font-bold font-mono text-white mt-0.5">500 Shards</div>
          </div>
          <div className="glass-badge rounded-xl p-3 border-white/10">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Max Guild Level</div>
            <div className="text-base sm:text-lg font-bold font-mono text-white mt-0.5">Level 10</div>
          </div>
          <div className="glass-badge rounded-xl p-3 border-white/10">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Max Roster Cap</div>
            <div className="text-base sm:text-lg font-bold font-mono text-white mt-0.5">30 Members</div>
          </div>
          <div className="glass-badge rounded-xl p-3 border-white/10">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Titan Battles</div>
            <div className="text-base sm:text-lg font-bold font-mono text-white mt-0.5">3 Attacks / Day</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 glass-card rounded-2xl border border-white/10 text-xs font-mono">
        {[
          { id: 'progression', label: 'Leveling & Perks (Lv 1-10)' },
          { id: 'glory', label: 'Glory Points (GP) & Settlements' },
          { id: 'workflow', label: 'Creation & Approval Workflow' },
          { id: 'roles', label: 'Hierarchy & Governance' },
          { id: 'titan', label: 'Weekly Titan Boss' },
          { id: 'commands', label: 'Clan Commands Cheat Sheet' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-medium ${
              activeTab === tab.id
                ? 'bg-white/15 text-white font-bold border border-white/20 shadow-sm'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Leveling & Perks Progression (Lv 1 - 10) */}
      {activeTab === 'progression' && (
        <div className="space-y-6 animate-float-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" /> Clan Perk Progression (Level 1 – 10)
              </h2>
              <p className="text-xs text-zinc-300 font-mono mt-1">
                Guild members pool shards into the treasury via <InlineCode>/clan donate</InlineCode> to unlock escalating permanent bonuses.
              </p>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              Total to Max: <strong className="text-white">120,000 Shards</strong>
            </div>
          </div>

          <Callout variant="tip" title="Level 10 Pinnacle Perk">
            Reaching Level 10 unlocks an <strong>Extra Talisman Pouch Slot</strong> for all active clan members, along with +15% Hunt XP, +15% Shards drop boosts, +15% PvE damage, and a 15% discount on weapon upgrades at the Smithy.
          </Callout>

          {/* Interactive Level Slider/Buttons */}
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/15 space-y-4">
            <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">Inspect Level Perk Details</div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {CLAN_LEVELS.map(l => (
                <button
                  key={l.level}
                  onClick={() => setSelectedLevel(l.level)}
                  className={`p-2.5 rounded-xl font-mono text-xs font-bold transition-all border cursor-pointer ${
                    selectedLevel === l.level
                      ? 'bg-white/20 border-white/40 text-white shadow-lg scale-105'
                      : 'bg-white/[0.04] border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Lv {l.level}
                </button>
              ))}
            </div>

            {/* Selected Level Card Preview */}
            <div className="glass-badge rounded-xl p-4 sm:p-5 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white font-mono text-xs font-bold border border-white/20">
                    Clan Level {activeLevelData.level}
                  </span>
                  <span className="text-xs font-mono text-zinc-300">
                    Member Capacity: <strong className="text-white">{activeLevelData.memberCap} Players</strong>
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white pt-1">
                  {activeLevelData.perks}
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0 font-mono">
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Treasury Requirement</div>
                <div className="text-base sm:text-lg font-bold text-white">{activeLevelData.shardsNeeded}</div>
              </div>
            </div>
          </div>

          {/* Full Leveling Table */}
          <div className="glass-card rounded-2xl overflow-hidden border border-white/15">
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono min-w-[620px]">
                <thead>
                  <tr className="border-b border-white/15 bg-white/[0.04]">
                    <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Level</th>
                    <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Total Shards Needed</th>
                    <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Member Cap</th>
                    <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Unlocked Clan Perks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {CLAN_LEVELS.map(l => (
                    <tr
                      key={l.level}
                      onClick={() => setSelectedLevel(l.level)}
                      className={`hover:bg-white/[0.06] transition-colors cursor-pointer ${
                        selectedLevel === l.level ? 'bg-white/[0.05]' : ''
                      }`}
                    >
                      <td className="px-5 py-3.5 font-bold text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        Level {l.level}
                      </td>
                      <td className="px-5 py-3.5 text-zinc-200 font-semibold">{l.shardsNeeded}</td>
                      <td className="px-5 py-3.5 text-zinc-300 font-medium">{l.memberCap} Members</td>
                      <td className="px-5 py-3.5 text-white font-medium">
                        {l.level === 10 ? (
                          <span className="text-amber-200 font-bold underline decoration-amber-400/50">
                            {l.perks}
                          </span>
                        ) : (
                          l.perks
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Glory Points (GP) & Weekly Sunday Settlement */}
      {activeTab === 'glory' && (
        <div className="space-y-6 animate-float-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> Clan Glory Points (GP) & Weekly Settlement
              </h2>
              <p className="text-xs text-zinc-300 font-mono mt-1">
                Compete on the weekly guild rankings, earn Arena Vouchers, and collect Sunday dividend payouts.
              </p>
            </div>
            <div className="text-xs font-mono text-zinc-300 glass-badge px-3 py-1.5 rounded-xl border border-white/15">
              Reset: <strong className="text-white">Every Sunday 00:00 UTC</strong>
            </div>
          </div>

          <Callout variant="tip" title="Automated Telegram DM Payouts & 25 GP Eligibility Threshold">
            Rewards are automatically delivered to eligible clan members via Telegram DM every Sunday at 00:00 UTC. To prevent inactive leeching, members must contribute a <strong>minimum of 25 GP</strong> during the active week to receive tier rewards.
          </Callout>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">Weekly Settlement</span>
              </div>
              <div className="text-lg font-bold text-white font-mono">Sunday @ 00:00 UTC</div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Calculates global clan ranking positions and automatically settles Treasury funds, Shards, and Arena Vouchers.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">Minimum Threshold</span>
              </div>
              <div className="text-lg font-bold text-white font-mono">25 GP Active Minimum</div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Members must individually contribute at least 25 GP during the cycle. Rank 11+ clans require 50 GP minimum.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">Clan MVP Bonus</span>
              </div>
              <div className="text-lg font-bold text-amber-300 font-mono">+2 Vouchers & +100 ◈</div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Awarded to the single highest GP contributor in each eligible clan on top of their weekly tier dividends.
              </p>
            </div>
          </div>

          {/* Weekly Clan Tier Rewards Table */}
          <div className="glass-card rounded-2xl overflow-hidden border border-white/15 space-y-4 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">Weekly Clan Tier Rewards</div>
                <p className="text-xs text-zinc-400 mt-0.5">Distributed to all eligible members meeting contribution criteria</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/15">
                4 Placement Tiers
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono min-w-[540px]">
                <thead>
                  <tr className="border-b border-white/15 bg-white/[0.04]">
                    <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Rank Tier</th>
                    <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Member Vouchers</th>
                    <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Member Shards</th>
                    <th className="text-left px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Clan Treasury</th>
                    <th className="text-right px-5 py-3.5 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {CLAN_GLORY_SYSTEM.rankRewards.map(tier => (
                    <tr key={tier.rank} className="hover:bg-white/[0.04] transition-colors">
                      <td className="px-5 py-4 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <div>
                          <div>{tier.rank}</div>
                          <div className="text-[10px] text-zinc-400 font-normal">{tier.tierDesc}</div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-emerald-300 font-bold">
                        +{tier.vouchers} Arena Vouchers
                      </td>
                      <td className="px-5 py-4 text-amber-300 font-semibold">
                        +{tier.shards.toLocaleString()} Shards
                      </td>
                      <td className="px-5 py-4 text-zinc-200">
                        {tier.treasury > 0 ? `+${tier.treasury} Shards` : '—'}
                      </td>
                      <td className="px-5 py-4 text-right text-zinc-300 font-semibold">
                        Min. {tier.minGP} GP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Clan MVP Award Card */}
          <div className="glass-card rounded-2xl p-5 border border-amber-500/30 bg-amber-500/[0.04] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-sm">Clan MVP Recognition Award</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/40 font-semibold">
                Per Clan Winner
              </span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed">
              Every Sunday settlement, the bot tallies all individual GP contributions within each eligible clan. The member who delivered the highest GP output is crowned the <strong>Clan MVP</strong>, receiving an additional <strong>+2 Arena Vouchers</strong> and <strong>+100 Shards</strong> directly in their Telegram DM payout notification.
            </p>
          </div>

          {/* How to Earn GP */}
          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-3">
            <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">How Glory Points (GP) Are Generated</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <Swords className="w-4 h-4 text-white" /> World Boss Raids
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  Engage in server-wide major boss encounters (/boss). Total raid strike damage contributes directly to your personal GP output and overall clan standing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-white" /> Ancient Clan Titan Raids
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  Execute your 3 daily attacks against the weekly Titan Boss (/clan boss). Titan combat rewards personal XP, Shards, Treasury funds, and Glory Points.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Creation & Approval Workflow */}
      {activeTab === 'workflow' && (
        <div className="space-y-6 animate-float-up">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-white" /> Clan Creation & Join Approval System
            </h2>
            <p className="text-xs text-zinc-300 font-mono mt-1">
              Seamless recruitment workflow with automated Telegram direct messages and instant notifications.
            </p>
          </div>

          {/* Creation Rules Card */}
          <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Crown className="w-4 h-4 text-white" /> Founding a New Clan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="glass-badge rounded-xl p-3.5 border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Command</div>
                <code className="text-xs font-mono text-white font-bold block">/clan create &lt;Name&gt; &lt;TAG&gt;</code>
              </div>
              <div className="glass-badge rounded-xl p-3.5 border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Founding Fee</div>
                <div className="text-xs font-mono text-white font-bold">500 Shards</div>
              </div>
              <div className="glass-badge rounded-xl p-3.5 border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Tag Standards</div>
                <div className="text-xs font-mono text-zinc-200 font-medium">2 to 5 Alphanumeric (Unique)</div>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-mono">
              Clan tags appear as prefix badges on player profiles and server messages (e.g. <strong className="text-white">[SHP] TarnishedWarrior</strong>). Tags are globally unique and cannot conflict with existing clans.
            </p>
          </div>

          {/* Workflow Step Diagram */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">Join & Review Pipeline</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: '01',
                  title: 'Player Submits Application',
                  desc: 'Player runs /clan join <TAG> or /join <TAG>. The application is securely queued into the guild inbox.',
                  badge: 'Command /join'
                },
                {
                  step: '02',
                  title: 'Leader Automated DM',
                  desc: 'The Clan Leader receives a private bot DM showing applicant stats, level, and inline [Accept] / [Reject] buttons.',
                  badge: 'Instant Bot Alert'
                },
                {
                  step: '03',
                  title: 'Decisive Evaluation',
                  desc: 'Leader or Officers review pending requests anytime via /clan requests and confirm or decline entry.',
                  badge: 'Officer Dashboard'
                },
                {
                  step: '04',
                  title: 'Applicant Notification',
                  desc: 'The applicant instantly receives a direct confirmation DM upon approval, unlocking clan perks immediately.',
                  badge: 'Automatic Onboarding'
                },
              ].map(s => (
                <div key={s.step} className="glass-card rounded-2xl p-5 border border-white/15 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-black font-mono text-zinc-400">{s.step}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                        {s.badge}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-white mb-1">{s.title}</div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Hierarchy & Governance */}
      {activeTab === 'roles' && (
        <div className="space-y-6 animate-float-up">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-white" /> Clan Hierarchy & Management Roles
            </h2>
            <p className="text-xs text-zinc-300 font-mono mt-1">
              Structured authority tiers allowing seamless delegation of recruiting, leadership, and clan aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CLAN_ROLES.map(r => (
              <div key={r.role} className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {r.role === 'Leader' && <Crown className="w-5 h-5 text-white" />}
                    {r.role === 'Officer' && <Star className="w-5 h-5 text-zinc-200" />}
                    {r.role === 'Member' && <Shield className="w-5 h-5 text-zinc-400" />}
                    <h3 className="font-bold text-base text-white">{r.role}</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-semibold">
                    {r.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{r.desc}</p>
                <div className="pt-2 border-t border-white/10 space-y-1 text-xs font-mono text-zinc-300">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Permitted Actions</div>
                  {r.role === 'Leader' && (
                    <div className="text-zinc-200">Promote, Demote, Transfer, Kick, Treasury, Titan, PFP, Requests</div>
                  )}
                  {r.role === 'Officer' && (
                    <div className="text-zinc-200">Review Requests, Accept/Reject, Kick Member, Update PFP, Titan</div>
                  )}
                  {r.role === 'Member' && (
                    <div className="text-zinc-200">Donate Treasury, Attack Titan (3x), Leave, Earn All Perks</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Banner and Leaderboard Callout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">Clan Customization</div>
              <div className="font-bold text-white text-sm">Banner & Avatar Customization</div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Leaders and Officers can run <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded text-xs">/setclanpfp [URL]</code> or reply directly to any image to set the clan crest visible on recruitment cards and dashboards.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">Competitive Realm</div>
              <div className="font-bold text-white text-sm">Global Rankings via /topclans</div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                View top covenants globally. Ranking algorithm scores clans by total Level, Treasury Shards deposited, and total active roster strength.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Weekly Titan Boss */}
      {activeTab === 'titan' && (
        <div className="space-y-6 animate-float-up">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Swords className="w-5 h-5 text-white" /> Weekly Clan Titan Boss — <CommandBadge cmd="/clan boss" />
            </h2>
            <p className="text-xs text-zinc-300 font-mono mt-1">
              Ancient cooperative raid battle scaled dynamically to your Clan Level.
            </p>
          </div>

          <Callout variant="warn" title="Daily Strike Limit (Resets 00:00 UTC)">
            Every active clan member receives <strong>3 daily attack chances</strong> per day against the Titan. Unused strikes do not accumulate across days.
          </Callout>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
              <div className="text-2xl font-black font-mono text-white">3 Strikes</div>
              <div className="text-xs font-mono font-bold text-zinc-100">Daily Allocation</div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Each member executes 3 tactical turns per day against the Titan using equipped weapon stats and talisman buffs.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
              <div className="text-2xl font-black font-mono text-white">Level Scaled</div>
              <div className="text-xs font-mono font-bold text-zinc-100">Adaptive Health Bar</div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                The Titan's health and defensive guard scale with clan level, demanding coordinated participation from the full roster.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-2">
              <div className="text-2xl font-black font-mono text-white">Triple Rewards</div>
              <div className="text-xs font-mono font-bold text-zinc-100">Hunt XP, Shards & Treasury</div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Dealing damage awards individual Hunt XP, direct Shards into your pouch, and treasury contributions for the next clan level.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Clan Commands Cheat Sheet */}
      {activeTab === 'commands' && (
        <div className="space-y-6 animate-float-up">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-white" /> Clan Commands Reference
            </h2>
            <p className="text-xs text-zinc-300 font-mono mt-1">
              Complete command cheat sheet for leaders, officers, and members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CLAN_COMMANDS.map(c => (
              <div key={c.cmd} className="glass-card rounded-2xl p-4 border border-white/15 flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <code className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">
                      {c.cmd}
                    </code>
                    {c.params && (
                      <code className="text-xs font-mono text-zinc-300">{c.params}</code>
                    )}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{c.desc}</p>
                </div>
                <CopyButton text={`${c.cmd}${c.params ? ' ' + c.params : ''}`} label="Copy" />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
