import React, { useState, useMemo } from 'react';
import { Swords, Play, Shield, Wind, ChevronDown } from 'lucide-react';
import { WEAPONS_DATABASE } from '../../data/gameData';

function calcDamage({ atk, def, str, dex, weaponStr, weaponDex, weaponDmg, isHeavy, guardCounter, defGuarding, weaponBlock, critChance, critMult }) {
  // Base raw damage from weapon + stat scaling
  const scaledDmg = weaponDmg + str * weaponStr + dex * weaponDex;
  let dmg = scaledDmg;

  // Heavy attack multiplier
  if (isHeavy) dmg *= 1.8;

  // Guard counter bonus
  if (guardCounter) dmg *= 1.35;

  // Defender guarding: block percentage absorbs damage
  let blockedAmt = 0;
  if (defGuarding) {
    blockedAmt = dmg * (weaponBlock / 100);
    dmg -= blockedAmt;
  }

  // Defender DEF mitigation
  const mitigation = def / (def + 80);
  dmg *= (1 - mitigation);

  // Critical hit calculation
  const isCrit = Math.random() < (isHeavy ? critChance + 0.20 : critChance);
  let critBonus = 0;
  if (isCrit) {
    critBonus = dmg * (critMult - 1);
    dmg *= critMult;
  }

  return { dmg: Math.max(0, dmg), isCrit, critBonus, blockedAmt, mitigation, scaledDmg };
}

const DEFAULT_ATTACKER = { str: 10, dex: 8, spd: 6, def: 5 };
const DEFAULT_DEFENDER = { def: 8, spd: 5, hp: 120 };

export default function CombatSandbox() {
  const [attackerStats, setAttackerStats] = useState(DEFAULT_ATTACKER);
  const [defenderStats, setDefenderStats] = useState(DEFAULT_DEFENDER);
  const [weaponId, setWeaponId] = useState(WEAPONS_DATABASE[0]?.id || '');
  const [weaponUpgrade, setWeaponUpgrade] = useState(0);
  const [isHeavy, setIsHeavy] = useState(false);
  const [guardCounter, setGuardCounter] = useState(false);
  const [defGuarding, setDefGuarding] = useState(false);
  const [defDodging, setDefDodging] = useState(false);
  const [combatLog, setCombatLog] = useState([]);

  const weapon = WEAPONS_DATABASE.find(w => w.id === weaponId) || WEAPONS_DATABASE[0];
  const upWeapon = weapon ? {
    ...weapon,
    base_dmg: weapon.base_dmg * (1 + 0.12 * weaponUpgrade),
    scaling_str: weapon.scaling_str + 0.05 * weaponUpgrade,
    scaling_dex: weapon.scaling_dex + 0.05 * weaponUpgrade,
    block_pct: Math.min(85, weapon.block_pct + weaponUpgrade),
  } : null;

  const attackerCrit = Math.min(0.60, 0.05 + attackerStats.dex * 0.0035);

  const simulate = () => {
    if (!upWeapon) return;

    // Dodge check
    if (defDodging) {
      const dodgeChance = 0.35 + defenderStats.spd * 0.01 - attackerStats.spd * 0.005;
      const dodged = Math.random() < Math.max(0.1, Math.min(0.75, dodgeChance));
      if (dodged) {
        const logEntry = {
          id: Date.now(),
          action: isHeavy ? 'Heavy Attack' : 'Light Attack',
          result: 'DODGED! The defender evaded the strike.',
          dmg: 0,
          isCrit: false,
          tags: ['DODGE'],
          color: 'text-emerald-400',
        };
        setCombatLog(prev => [logEntry, ...prev].slice(0, 15));
        return;
      }
    }

    const result = calcDamage({
      atk: 1,
      def: defenderStats.def,
      str: attackerStats.str,
      dex: attackerStats.dex,
      weaponStr: upWeapon.scaling_str,
      weaponDex: upWeapon.scaling_dex,
      weaponDmg: upWeapon.base_dmg,
      isHeavy,
      guardCounter,
      defGuarding,
      weaponBlock: upWeapon.block_pct,
      critChance: attackerCrit,
      critMult: upWeapon.crit_mult || 1.5,
    });

    const tags = [];
    if (isHeavy) tags.push('HEAVY ×1.8');
    if (guardCounter) tags.push('GUARD COUNTER +35%');
    if (defGuarding) tags.push(`GUARDED -${result.blockedAmt.toFixed(1)}`);
    if (result.isCrit) tags.push('CRITICAL HIT!');

    const logEntry = {
      id: Date.now(),
      action: isHeavy ? '⚡ Heavy Attack' : '⚔️ Light Attack',
      result: `Dealt ${result.dmg.toFixed(1)} damage`,
      dmg: result.dmg,
      isCrit: result.isCrit,
      tags,
      formula: `(${result.scaledDmg.toFixed(1)} scaled) × ${isHeavy ? '1.8 ' : ''}${guardCounter ? '1.35 ' : ''}${defGuarding ? `- ${result.blockedAmt.toFixed(1)} blocked ` : ''} × (1 - ${(result.mitigation * 100).toFixed(1)}% mit)`,
      color: result.isCrit ? 'text-amber-400' : 'text-rose-400',
    };
    setCombatLog(prev => [logEntry, ...prev].slice(0, 15));
  };

  const StatInput = ({ label, stateKey, statState, setStatState, color = 'text-amber-400' }) => (
    <div>
      <div className="flex justify-between text-[10px] font-mono text-zinc-600 mb-1">
        <span>{label}</span>
        <span className={`font-bold ${color}`}>{statState[stateKey]}</span>
      </div>
      <input
        type="range" min={0} max={50} value={statState[stateKey]}
        onChange={e => setStatState(prev => ({ ...prev, [stateKey]: Number(e.target.value) }))}
        style={{ background: `linear-gradient(to right, ${color.includes('rose') ? '#f43f5e' : color.includes('sky') ? '#0ea5e9' : '#f59e0b'} ${statState[stateKey] * 2}%, rgba(255,255,255,0.07) ${statState[stateKey] * 2}%)` }}
      />
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Swords className="w-5 h-5 text-amber-400" />
          Combat Damage Sandbox
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5 font-mono">Simulate any combat scenario with real formulas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attacker */}
        <div className="glass-card rounded-xl p-4 space-y-3">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            ⚔️ Attacker Stats
          </div>
          <StatInput label="STR" stateKey="str" statState={attackerStats} setStatState={setAttackerStats} />
          <StatInput label="DEX" stateKey="dex" statState={attackerStats} setStatState={setAttackerStats} color="text-sky-400" />
          <StatInput label="SPD" stateKey="spd" statState={attackerStats} setStatState={setAttackerStats} color="text-emerald-400" />
          <div className="text-[10px] font-mono text-zinc-600 pt-1">
            Crit Chance: <span className="text-sky-400">{(attackerCrit * 100).toFixed(1)}%</span>
          </div>
        </div>

        {/* Defender */}
        <div className="glass-card rounded-xl p-4 space-y-3">
          <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            Defender Stats
          </div>
          <StatInput label="DEF" stateKey="def" statState={defenderStats} setStatState={setDefenderStats} color="text-violet-400" />
          <StatInput label="SPD" stateKey="spd" statState={defenderStats} setStatState={setDefenderStats} color="text-emerald-400" />
          <StatInput label="HP" stateKey="hp" statState={defenderStats} setStatState={setDefenderStats} color="text-rose-400" />
          <div className="text-[10px] font-mono text-zinc-600 pt-1">
            Mitigation: <span className="text-violet-400">{((defenderStats.def / (defenderStats.def + 80)) * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Weapon + Upgrade */}
      <div className="glass-card rounded-xl p-4 space-y-3">
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Weapon & Upgrade</div>
        <select
          value={weaponId}
          onChange={e => setWeaponId(e.target.value)}
          className="w-full glass-badge rounded-xl px-3 py-2 text-xs font-mono text-white border-white/[0.08] focus:outline-none focus:border-amber-500/30 cursor-pointer bg-transparent"
        >
          {WEAPONS_DATABASE.map(w => (
            <option key={w.id} value={w.id} style={{ background: '#0a0a0f' }}>
              {w.name} (Tier {w.tier} · {w.base_dmg} DMG)
            </option>
          ))}
        </select>
        {upWeapon && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono text-zinc-600">
              <span>Upgrade Level</span>
              <span className="text-amber-400 font-bold">+{weaponUpgrade}</span>
            </div>
            <input
              type="range" min={0} max={10} value={weaponUpgrade}
              onChange={e => setWeaponUpgrade(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, #f59e0b ${weaponUpgrade * 10}%, rgba(255,255,255,0.07) ${weaponUpgrade * 10}%)` }}
            />
            <div className="flex gap-3 text-[10px] font-mono text-zinc-600">
              <span>DMG: <span className="text-rose-400">{upWeapon.base_dmg.toFixed(1)}</span></span>
              <span>Block: <span className="text-violet-400">{upWeapon.block_pct}%</span></span>
              <span>STR Scale: <span className="text-amber-400">{upWeapon.scaling_str.toFixed(2)}</span></span>
            </div>
          </div>
        )}
      </div>

      {/* Combat Toggles */}
      <div className="glass-card rounded-xl p-4 space-y-3">
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Combat Modifiers</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Heavy Attack (×1.8)', key: 'heavy', val: isHeavy, set: setIsHeavy, activeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
            { label: 'Guard Counter (+35%)', key: 'gc', val: guardCounter, set: setGuardCounter, activeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
            { label: 'Defender Guarding', key: 'dg', val: defGuarding, set: setDefGuarding, activeColor: 'border-violet-500/40 bg-violet-500/10 text-violet-400' },
            { label: 'Defender Dodging', key: 'dd', val: defDodging, set: setDefDodging, activeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' },
          ].map(toggle => (
            <button
              key={toggle.key}
              onClick={() => toggle.set(v => !v)}
              className={`p-2.5 rounded-xl text-xs font-mono border transition-all cursor-pointer text-left ${
                toggle.val ? toggle.activeColor : 'glass-badge text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {toggle.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulate Button */}
      <button
        onClick={simulate}
        className="w-full py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 hover:border-amber-500/50 text-amber-400 font-mono font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 golden-glow"
      >
        <Play className="w-4 h-4" />
        Simulate Strike
      </button>

      {/* Combat Log */}
      {combatLog.length > 0 && (
        <div className="glass-card rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Combat Log</span>
            <button onClick={() => setCombatLog([])} className="text-[10px] font-mono text-zinc-600 hover:text-zinc-400 cursor-pointer">Clear</button>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {combatLog.map((entry, i) => (
              <div
                key={entry.id}
                className={`rounded-xl p-3 border text-xs font-mono animate-float-up ${
                  i === 0 ? 'border-amber-500/20 bg-amber-500/5' : 'border-white/[0.04] bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-zinc-400">{entry.action}</span>
                  <span className={`font-bold text-sm ${entry.color}`}>
                    {entry.dmg > 0 ? `${entry.dmg.toFixed(1)} DMG` : entry.result}
                  </span>
                </div>
                {entry.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-1">
                    {entry.tags.map(tag => (
                      <span key={tag} className={`px-1.5 py-0.5 rounded-md text-[10px] glass-badge ${
                        tag.includes('CRITICAL') ? 'text-amber-400 border-amber-500/30' :
                        tag.includes('GUARD COUNTER') ? 'text-violet-400 border-violet-500/20' :
                        tag.includes('DODGE') ? 'text-emerald-400 border-emerald-500/20' :
                        'text-zinc-500'
                      }`}>{tag}</span>
                    ))}
                  </div>
                )}
                {entry.formula && (
                  <div className="text-zinc-700 text-[10px] truncate">{entry.formula}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
