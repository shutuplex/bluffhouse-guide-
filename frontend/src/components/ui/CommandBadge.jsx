import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CommandBadge({ cmd, description }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <span className="inline-flex items-center gap-1.5 glass-badge rounded-lg px-2.5 py-1 border-white/[0.08] group">
      <code className="text-amber-300 font-mono text-xs font-semibold">{cmd}</code>
      {description && (
        <span className="text-zinc-500 text-xs hidden sm:inline">{description}</span>
      )}
      <button
        onClick={handleCopy}
        title="Copy command"
        className="ml-0.5 text-zinc-600 hover:text-amber-400 transition-colors cursor-pointer"
      >
        {copied
          ? <Check className="w-3 h-3 text-emerald-400" />
          : <Copy className="w-3 h-3" />
        }
      </button>
    </span>
  );
}

export function InlineCode({ children }) {
  return (
    <code className="font-mono text-amber-300 text-[0.85em] glass-badge rounded-md px-1.5 py-0.5 border-amber-500/10">
      {children}
    </code>
  );
}
