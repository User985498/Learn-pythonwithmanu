import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (scrolled / max) * 100) : 0);
      setShow(scrolled > 300);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center hover:scale-110 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 -rotate-90"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <circle cx={12} cy={12} r={9} className="opacity-25" />
        <circle
          cx={12}
          cy={12}
          r={9}
          stroke="currentColor"
          strokeDasharray={`${(progress * 0.565).toFixed(2)} 100`}
          className="text-yellow-400"
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="absolute w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
