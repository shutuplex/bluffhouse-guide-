import React from 'react';

export default function GlassCard({ children, className = '', hover = true, glow = false }) {
  return (
    <div
      className={`glass-card rounded-xl ${hover ? '' : 'hover:border-white/[0.06] hover:bg-[rgba(18,18,24,0.55)]'} ${glow ? 'golden-glow' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function GlassSection({ children, className = '' }) {
  return (
    <div className={`glass-panel rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({ icon, title, subtitle, badge }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="p-2.5 rounded-xl glass-card border border-amber-500/15 text-amber-400">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {badge && (
        <span className="glass-badge text-amber-400 text-xs font-mono px-3 py-1 rounded-full border-amber-500/20 self-start sm:self-auto">
          {badge}
        </span>
      )}
    </div>
  );
}
