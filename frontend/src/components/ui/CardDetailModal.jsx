import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Shield, Heart, Gift, Film, Sparkles } from 'lucide-react';
import CopyButton from '../CopyButton';

export default function CardDetailModal({ isOpen, onClose, item, type }) {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setVideoError(false);
  }, [item]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const isVideo = item.isVideo || (typeof item.img_url === 'string' && /\.(mp4|webm|ogg|mov)($|\?|#)/i.test(item.img_url.trim()));

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="glass-modal w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col animate-float-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              {type === 'weapon' ? 'Armament Inspector' : type === 'enemy' ? 'Bestiary Dossier' : 'Anime Card Inspection'}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white font-semibold">
              #{item.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {item.img_url && (
              <a
                href={item.img_url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Open raw media in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two columns on sm+, single column scroll on mobile */}
        <div className="overflow-y-auto p-5 sm:p-7 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left: Full Media Viewer (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-lg flex items-center justify-center min-h-[260px] max-h-[440px]">
                {isVideo ? (
                  videoError ? (
                    <div className="p-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mx-auto">
                        <Film className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-mono text-zinc-300 font-medium">
                        Inline Video Stream Blocked
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400 max-w-[220px] mx-auto">
                        Your browser restricted inline decoding. Click below to view the clip directly.
                      </p>
                      <a
                        href={item.img_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Video</span>
                      </a>
                    </div>
                  ) : (
                    <video
                      ref={(el) => {
                        videoRef.current = el;
                        if (el) {
                          el.muted = true;
                          el.defaultMuted = true;
                          const p = el.play();
                          if (p && typeof p.catch === 'function') p.catch(() => {});
                        }
                      }}
                      src={item.img_url}
                      controls
                      autoPlay
                      loop
                      playsInline
                      preload="auto"
                      onError={() => setVideoError(true)}
                      className="w-full h-auto max-h-[440px] object-contain"
                    />
                  )
                ) : (
                  <img
                    src={item.img_url}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[440px] object-contain"
                  />
                )}

                {isVideo && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-200 flex items-center gap-1 shadow-sm pointer-events-none">
                    <Film className="w-3 h-3 text-white" />
                    <span>CLIP</span>
                  </div>
                )}
              </div>

              {item.img_url && (
                <div className="text-center">
                  <a
                    href={item.img_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>View original media source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Right: Rich Details (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              {/* Header Title & Badges */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {type === 'weapon' && (
                    <>
                      <span className="px-2.5 py-0.5 rounded-md border text-xs font-mono font-semibold bg-white/10 text-white border-white/20">
                        Tier {item.tier}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md border text-xs font-mono bg-zinc-800/80 text-zinc-300 border-white/10">
                        {item.type}
                      </span>
                      {item.status_effect && item.status_effect !== 'None' && (
                        <span className="px-2.5 py-0.5 rounded-md border text-xs font-mono font-semibold bg-rose-500/15 border-rose-500/30 text-rose-300">
                          {item.status_effect}
                        </span>
                      )}
                    </>
                  )}

                  {type === 'enemy' && (
                    <>
                      <span className="px-2.5 py-0.5 rounded-md border text-xs font-mono font-semibold bg-white/10 text-white border-white/20">
                        {item.tier} Tier
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md border text-xs font-mono bg-amber-500/15 text-amber-300 border-amber-500/30">
                        XP +{item.xp_reward}
                      </span>
                    </>
                  )}

                  {type === 'character' && (
                    <>
                      <span className="px-2.5 py-0.5 rounded-md border text-xs font-mono font-bold bg-purple-500/20 text-purple-200 border-purple-500/40">
                        {item.rarity}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md border text-xs font-mono bg-white/5 text-zinc-300 border-white/10">
                        {item.anime}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md border text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border-amber-500/30">
                        {item.price ? item.price.toLocaleString() : 0} ◈
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {item.name}
                </h2>
              </div>

              {/* SPECIFIC INFORMATION SECTIONS */}

              {/* WEAPON INFO */}
              {type === 'weapon' && (
                <div className="space-y-4">
                  {/* Primary Combat Matrix */}
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Base DMG</div>
                      <div className="text-xl font-bold text-white mt-1">{item.base_dmg}</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Speed Mod</div>
                      <div className={`text-xl font-bold mt-1 ${item.speed_mod >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                        {item.speed_mod >= 0 ? `+${item.speed_mod}` : item.speed_mod}
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Crit Mult</div>
                      <div className="text-xl font-bold text-sky-300 mt-1">{item.crit_mult}x</div>
                    </div>
                  </div>

                  {/* Defense & Attribute Scalings */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-zinc-300" /> Guard Absorption
                      </span>
                      <strong className="text-white text-sm">{item.block_pct}%</strong>
                    </div>

                    <div className="pt-2.5 border-t border-white/10">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2">Attribute Scalings</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-center">
                          <span className="text-zinc-400 block text-[10px]">STR</span>
                          <strong className="text-white text-sm">+{item.scaling_str}</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-center">
                          <span className="text-zinc-400 block text-[10px]">DEX</span>
                          <strong className="text-white text-sm">+{item.scaling_dex}</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-center">
                          <span className="text-zinc-400 block text-[10px]">SPD</span>
                          <strong className="text-white text-sm">+{item.scaling_spd}</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-center">
                          <span className="text-zinc-400 block text-[10px]">DEF</span>
                          <strong className="text-white text-sm">+{item.scaling_def}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400">Armory Cost</span>
                      <span className="text-amber-300 font-bold">{item.price > 0 ? `${item.price} ◈ Shards` : 'Free Starter Weapon'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-zinc-200 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/15">
                        /equip {item.id}
                      </code>
                      <CopyButton text={`/equip ${item.id}`} label="Copy Equip" />
                    </div>
                    {item.price > 0 && (
                      <div className="flex items-center gap-2">
                        <CopyButton text={`/buy ${item.id}`} label={`Buy for ${item.price} ◈`} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ENEMY INFO */}
              {type === 'enemy' && (
                <div className="space-y-4">
                  {/* Vitality & Defense Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider flex items-center justify-center gap-1">
                        <Heart className="w-3 h-3 text-rose-400" /> Max Health
                      </div>
                      <div className="text-xl font-bold text-rose-400 mt-1">{item.hp} HP</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Base DMG</div>
                      <div className="text-xl font-bold text-white mt-1">{item.base_dmg}</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Speed / DEF</div>
                      <div className="text-sm font-bold text-sky-300 mt-1">{item.spd} SPD · {item.def} DEF</div>
                    </div>
                  </div>

                  {/* Bounty Drops Box */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="text-zinc-400 flex items-center gap-1.5">
                        <Gift className="w-4 h-4 text-amber-400" /> Shard Bounty Range
                      </span>
                      <strong className="text-amber-300 text-sm">{item.shard_min}–{item.shard_max} ◈ Shards</strong>
                    </div>

                    <div className="flex items-center justify-between text-zinc-300 pt-2 border-t border-white/10">
                      <span className="text-zinc-400">Experience Bounty</span>
                      <strong className="text-white text-sm">+{item.xp_reward} Player XP</strong>
                    </div>

                    {/* Weapon drop if available */}
                    {item.dropWeapon ? (
                      <div className="pt-2.5 border-t border-white/10 space-y-2">
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Unique Armament Drop</div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/15">
                          <div className="flex items-center gap-2.5">
                            {item.dropWeapon.img_url && (
                              <img
                                src={item.dropWeapon.img_url}
                                alt={item.dropWeapon.name}
                                className="w-10 h-10 rounded-lg object-cover border border-white/20"
                              />
                            )}
                            <div>
                              <div className="text-white font-bold text-sm">{item.dropWeapon.name}</div>
                              <div className="text-[10px] text-zinc-400">{item.dropWeapon.type} · Tier {item.dropWeapon.tier}</div>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
                            {item.drop_rate}% Drop
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-white/10 text-zinc-500 text-[11px]">
                        No rare weapon assigned · Direct shard and XP encounter
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-3">
                    <code className="text-xs font-mono text-zinc-200 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/15">
                      {item.tier === 'Major Boss' ? '/boss' : '/hunt'}
                    </code>
                    <CopyButton
                      text={item.tier === 'Major Boss' ? '/boss' : '/hunt'}
                      label={item.tier === 'Major Boss' ? 'Copy /boss' : 'Copy /hunt'}
                    />
                  </div>
                </div>
              )}

              {/* CHARACTER INFO */}
              {type === 'character' && (
                <div className="space-y-4 font-mono text-xs">
                  {/* Talisman Attribute Section */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Talisman Pouch Attribute</div>
                    
                    {item.rarity === 'Mythic' ? (
                      <div className="p-3 rounded-xl border border-purple-500/40 bg-purple-500/10 text-purple-200 space-y-1">
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <Sparkles className="w-4 h-4 text-purple-300" />
                          <span>Pinnacle Mythic Blessing: +50 Max HP Pool</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          Equipping this Mythic card into any unlocked Talisman Pouch expands your total health by 50 HP in PvE and PvP combat.
                        </p>
                      </div>
                    ) : item.stat ? (
                      <div className="p-3 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-200 space-y-1">
                        <div className="font-bold text-sm">
                          +{item.stat.value} {item.stat.type} Combat Attribute Bonus
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          Directly strengthens weapon damage, scaling modifiers, and combat rolls when equipped in your active pouch.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02] text-zinc-400">
                        Collector Grade Card · Usable for team collection and player rank.
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-zinc-300">
                      <span className="text-zinc-400">Card Dex Valuation</span>
                      <strong className="text-amber-300 text-sm">{item.price.toLocaleString()} ◈ Shards</strong>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-zinc-300">
                      <span className="text-zinc-400">Origin Anime Universe</span>
                      <span className="text-white font-medium">{item.anime}</span>
                    </div>
                  </div>

                  {/* Commands */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-zinc-200 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/15">
                        /cards
                      </code>
                      <CopyButton text="/cards" label="Copy /cards" />
                    </div>
                    {(item.rarity === 'Legendary' || item.rarity === 'Mythic' || item.rarity === 'Summer Edition') && (
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-zinc-200 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/15">
                          /pouch_equip 1 {item.id}
                        </code>
                        <CopyButton text={`/pouch_equip 1 ${item.id}`} label="Copy Pouch Equip" />
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
