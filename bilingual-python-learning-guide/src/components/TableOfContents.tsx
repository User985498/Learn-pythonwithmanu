import type { Chapter } from '../data/chapters';
import type { Locale } from '../data/translations';
import { PART_INFO } from '../data/chapters';

function highlight(text: string, query: string) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(re);
  return parts.map((part, i) =>
    re.test(part) ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-500/40 text-slate-900 dark:text-yellow-100 rounded px-0.5">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function TableOfContents({
  chapters,
  activeId,
  onSelect,
  locale,
  completed,
  pick,
  search,
}: {
  chapters: Chapter[];
  activeId: string;
  onSelect: (id: string) => void;
  locale: Locale;
  completed: Set<string>;
  pick: (l: Locale, en: string, fr: string) => string;
  search?: string;
}) {
  const parts: Array<1 | 2 | 3 | 4> = [1, 2, 3, 4];

  return (
    <div>
      <div className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-4 px-2">
        {pick(locale, 'Table of Contents', 'Sommaire')}
      </div>
      <nav className="space-y-6">
        {parts.map((p) => {
          const inPart = chapters.filter((c) => c.part === p);
          if (inPart.length === 0) return null;
          return (
            <div key={p}>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 px-2 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                {pick(locale, PART_INFO[p].en, PART_INFO[p].fr)}
              </div>
              <ul className="space-y-1">
                {inPart.map((c) => {
                  const isActive = c.id === activeId;
                  const isDone = completed.has(c.id);
                  const title = pick(locale, c.titleEn, c.titleFr);
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => onSelect(c.id)}
                        className={`group w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span
                          className={`shrink-0 w-6 h-6 rounded-md text-[10px] flex items-center justify-center font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : isDone
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {isDone && !isActive ? '✓' : c.number === 0 ? '∞' : c.number}
                        </span>
                        <span className="text-sm font-medium truncate">
                          {search ? highlight(title, search) : title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {chapters.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
            {pick(locale, 'No chapters match your search.', 'Aucun chapitre ne correspond à votre recherche.')}
          </p>
        )}
      </nav>
    </div>
  );
}
