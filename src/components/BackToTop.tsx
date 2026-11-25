import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 360);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#111715] border border-emerald-500/40 text-xs font-semibold text-emerald-300 hover:bg-emerald-600 hover:text-white shadow-lg transition-colors cursor-pointer"
    >
      <ArrowUp className="w-4 h-4" />
      <span className="hidden sm:inline">Back to Top</span>
    </button>
  );
};
