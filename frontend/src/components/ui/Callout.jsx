import React from 'react';

const VARIANT_STYLES = {
  tip:    { label: 'Tip',       cls: 'callout-tip',    labelCls: 'text-zinc-300' },
  note:   { label: 'Note',      cls: 'callout-note',   labelCls: 'text-zinc-300' },
  warn:   { label: 'Warning',   cls: 'callout-warn',   labelCls: 'text-amber-400' },
  danger: { label: 'Important', cls: 'callout-danger', labelCls: 'text-zinc-300' },
};

export default function Callout({ variant = 'note', title, children }) {
  const style = VARIANT_STYLES[variant] || VARIANT_STYLES.note;
  return (
    <div className={`rounded-xl border px-4 py-3.5 ${style.cls}`}>
      <div className={`font-semibold font-mono text-[11px] uppercase tracking-wider mb-1.5 ${style.labelCls}`}>
        {title || style.label}
      </div>
      <div className="text-zinc-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
