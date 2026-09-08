import React, { useState, useCallback } from 'react';

export default function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="text-[10px] font-mono px-2 py-0.5 rounded-md glass-badge border-white/[0.08] text-zinc-400 hover:text-amber-400 hover:border-amber-500/20 transition-all cursor-pointer"
    >
      {copied ? '✓ Copied' : label || 'Copy'}
    </button>
  );
}
