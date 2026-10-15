import { useEffect, useMemo, useState } from 'react';
import { ALL_CHAPTERS, PART_INFO, type Chapter } from './data';
import { translations, type Locale } from './data/translations';
import CodeBlock from './components/CodeBlock';
import TableOfContents from './components/TableOfContents';
import SearchBar from './components/SearchBar';
import ScrollToTop from './components/ScrollToTop';


const STORAGE_KEY = 'python-ebook-progress';
const LOCALE_KEY = 'python-ebook-locale';

function pick(locale: Locale, en: string, fr: string) {
  return locale === 'fr' ? fr : en;
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem(LOCALE_KEY) as Locale | null;
    return saved ?? 'en';
  });
  const [activeId, setActiveId] = useState<string>('prologue');
  const [completed, setCompleted] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return new Set(saved ? JSON.parse(saved) : []);
  });
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('python-ebook-theme');
    return (saved as 'light' | 'dark') ?? 'light';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  useEffect(() => {
    localStorage.setItem('python-ebook-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        navigatePrev();
      } else if (e.key === 'ArrowRight' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        navigateNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeId]);

  const t = translations[locale];
  const chapterIndex = ALL_CHAPTERS.findIndex((c) => c.id === activeId);
  const activeChapter: Chapter = ALL_CHAPTERS[chapterIndex] ?? ALL_CHAPTERS[0];

  const filteredChapters = useMemo(() => {
    if (!search.trim()) return ALL_CHAPTERS;
    const q = search.toLowerCase();
    return ALL_CHAPTERS.filter((ch) => {
      const inTitle = (locale === 'fr' ? ch.titleFr : ch.titleEn).toLowerCase().includes(q);
      const inDesc = (locale === 'fr' ? ch.descFr : ch.descEn).toLowerCase().includes(q);
      const inBlocks = ch.blocks.some((b) => {
        const text = locale === 'fr' ? (b as any).fr : (b as any).en;
        return typeof text === 'string' && text.toLowerCase().includes(q);
      });
      return inTitle || inDesc || inBlocks;
    });
  }, [search, locale]);

  function navigatePrev() {
    if (chapterIndex > 0) {
      const next = ALL_CHAPTERS[chapterIndex - 1].id;
      setActiveId(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  function navigateNext() {
    if (chapterIndex < ALL_CHAPTERS.length - 1) {
      const next = ALL_CHAPTERS[chapterIndex + 1].id;
      setActiveId(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function toggleComplete(id: string) {
    setCompleted((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  }

  const totalChapters = ALL_CHAPTERS.length;
  const completedCount = completed.size;
  const progress = Math.round((completedCount / totalChapters) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-yellow-400 to-blue-600 flex items-center justify-center text-xl shadow-md">
              🐍
            </div>
            <div className="hidden sm:block">
              <div className="font-bold tracking-tight text-sm leading-tight">{t.siteTitle}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{t.siteTagline}</div>
            </div>
          </a>

          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar
              value={search}
              onChange={setSearch}
              onSubmit={() => {
                if (filteredChapters.length > 0) {
                  setActiveId(filteredChapters[0].id);
                  setSearch('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              placeholder={t.search}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => window.print()}
              className="hidden sm:block p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Print"
              title="Print this chapter (Ctrl/⌘+P)"
            >
              🖨️
            </button>
            {/* Progress */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="font-medium">{t.progress}</span>
              <span className="tabular-nums font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
              <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-yellow-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Locale switch */}
            <div className="flex border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setLocale('en')}
                className={`px-3 py-1.5 text-xs font-medium transition ${
                  locale === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale('fr')}
                className={`px-3 py-1.5 text-xs font-medium transition ${
                  locale === 'fr'
                    ? 'bg-blue-600 text-white'
                    : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                FR
              </button>
            </div>
          </div>
        </div>
        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={() => {
              if (filteredChapters.length > 0) {
                setActiveId(filteredChapters[0].id);
                setSearch('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            placeholder={t.search}
          />
        </div>
      </header>

      {/* HERO (only on home view) */}
      {activeId === 'prologue' && !search.trim() ? (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

          <div className="relative max-w-5xl mx-auto px-6 py-20 sm:py-28 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {locale === 'fr' ? '100% gratuit · 100% complet' : '100% Free · 100% Complete'}
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-slate-900 via-blue-700 to-slate-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text text-transparent leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setActiveId('setup')}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-lg shadow-slate-900/20 hover:scale-[1.02] transition"
              >
                {t.startReading}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <a
                href="#toc"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {t.tableOfContents}
              </a>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Stat label={locale === 'fr' ? 'Chapitres' : 'Chapters'} value={`${ALL_CHAPTERS.length}`} />
              <Stat label={locale === 'fr' ? 'Exercices' : 'Exercises'} value="27" />
              <Stat label={locale === 'fr' ? 'Exemples' : 'Code samples'} value="120+" />
              <Stat label={locale === 'fr' ? 'Langues' : 'Languages'} value="2" />
            </div>
          </div>
        </section>
      ) : null}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="top">
        <div className="flex gap-8">
          {/* SIDEBAR */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pe-4">
              <TableOfContents
                chapters={filteredChapters}
                activeId={activeId}
                onSelect={(id) => {
                  setActiveId(id);
                  setSearch('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                locale={locale}
                completed={completed}
                pick={pick}
                search={search}
              />
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1 min-w-0">
            {activeId === 'prologue' && !search.trim() ? (
              <div id="toc" className="lg:hidden mb-10">
                <TableOfContents
                  chapters={filteredChapters}
                  activeId={activeId}
                  onSelect={(id) => {
                    setActiveId(id);
                    setSearch('');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  locale={locale}
                  completed={completed}
                  pick={pick}
                  search={search}
                />
              </div>
            ) : null}

            <ArticleLayout
              chapter={activeChapter}
              chapterIndex={chapterIndex}
              totalChapters={ALL_CHAPTERS.length}
              locale={locale}
              t={t}
              pick={pick}
              isCompleted={completed.has(activeChapter.id)}
              onComplete={() => toggleComplete(activeChapter.id)}
              onPrev={navigatePrev}
              onNext={navigateNext}
            />
          </main>
        </div>
      </div>

      <ScrollToTop />

      {/* FOOTER */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <div className="text-2xl mb-2">🐍</div>
          <p className="font-medium">{t.siteTitle} — {t.siteTagline}</p>
          <p className="mt-2">{t.footer}</p>
          <p className="mt-4 text-xs">
            {locale === 'fr'
              ? 'Un livre ouvert. Éditez, partagez, apprenez.'
              : 'An open book. Edit it, share it, learn from it.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur p-4">
      <div className="text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</div>
    </div>
  );
}

function ArticleLayout(props: {
  chapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  locale: Locale;
  t: typeof translations.en;
  pick: (l: Locale, en: string, fr: string) => string;
  isCompleted: boolean;
  onComplete: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { chapter, chapterIndex, totalChapters, locale, t, pick, isCompleted, onComplete, onPrev, onNext } = props;

  const partKey = chapter.part;

  // Group blocks into the part headings
  const blocks = chapter.blocks;

  return (
    <article className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
      {/* Cover Header */}
      <header className="relative px-6 sm:px-12 lg:px-16 pt-12 pb-10 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-amber-50/40 to-blue-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="absolute top-6 right-6 text-7xl opacity-20 select-none">
          {chapter.icon}
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
          {pick(locale, PART_INFO[partKey].en, PART_INFO[partKey].fr)}
        </div>
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
          {chapter.number === 0 ? t.prologue : `${t.chapter} ${chapter.number} ${t.of} ${totalChapters - 1}`}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5 max-w-3xl">
          {pick(locale, chapter.titleEn, chapter.titleFr)}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          {pick(locale, chapter.descEn, chapter.descFr)}
        </p>

        <div className="mt-7 flex flex-wrap gap-3 items-center">
          <button
            onClick={onComplete}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              isCompleted
                ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                : 'border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isCompleted ? '✓ ' + t.completed : t.markComplete}
          </button>

          {chapterIndex > 0 && (
            <button
              onClick={onPrev}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              ← {t.prevChapter}
            </button>
          )}
          {chapterIndex < totalChapters - 1 && (
            <button
              onClick={onNext}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition"
            >
              {t.nextChapter} →
            </button>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="px-6 sm:px-12 lg:px-16 py-12 prose-content">
        {blocks.map((block, i) => {
          if (block.type === 'h1') return <h1 key={i}>{pick(locale, block.en, block.fr)}</h1>;
          if (block.type === 'h2') return <h2 key={i}>{pick(locale, block.en, block.fr)}</h2>;
          if (block.type === 'h3') return <h3 key={i}>{pick(locale, block.en, block.fr)}</h3>;
          if (block.type === 'p') return <p key={i}>{pick(locale, block.en, block.fr)}</p>;
          if (block.type === 'quote') return (
            <blockquote key={i} className="border-l-4 border-amber-400 pl-5 italic text-slate-700 dark:text-slate-300 my-6">
              {pick(locale, block.en, block.fr)}
            </blockquote>
          );
          if (block.type === 'ul') return (
            <ul key={i} className="my-5 space-y-2 list-disc pl-6 marker:text-blue-500">
              {(locale === 'fr' ? block.fr : block.en).map((item, j) => (
                <li key={j} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          );
          if (block.type === 'code') return (
            <CodeBlock
              key={i}
              code={locale === 'fr' ? block.fr : block.en}
              copyLabel={t.copy}
              copiedLabel={t.copied}
              runLabel={t.run}
              outputLabel={t.output}
            />
          );
          if (block.type === 'tip') return (
            <div key={i} className="my-6 rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-green-700 dark:text-green-400 mb-2">
                💡 {t.tip}
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                {pick(locale, block.en, block.fr)}
              </p>
            </div>
          );
          if (block.type === 'note') return (
            <div key={i} className="my-6 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-400 mb-2">
                📝 {t.note}
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                {pick(locale, block.en, block.fr)}
              </p>
            </div>
          );
          if (block.type === 'warning') return (
            <div key={i} className="my-6 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-2">
                ⚠️ {t.warning}
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                {pick(locale, block.en, block.fr)}
              </p>
            </div>
          );
          if (block.type === 'exercise') {
            const solution = locale === 'fr' ? block.solutionFr : block.solutionEn;
            return <Exercise key={i} title={t.exercise} body={pick(locale, block.en, block.fr)} solution={solution} locale={locale} labels={{ solution: t.solution, hide: t.hideSolution, run: t.run, copy: t.copy, copied: t.copied, output: t.output }} />;
          }
          return null;
        })}

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onPrev}
            disabled={chapterIndex === 0}
            className="flex-1 text-left rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">← {t.prevChapter}</div>
            <div className="font-semibold">
              {chapterIndex > 0
                ? pick(
                    locale,
                    ALL_CHAPTERS[chapterIndex - 1].titleEn,
                    ALL_CHAPTERS[chapterIndex - 1].titleFr
                  )
                : '—'}
            </div>
          </button>
          <button
            onClick={onNext}
            disabled={chapterIndex >= totalChapters - 1}
            className="flex-1 text-right rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{t.nextChapter} →</div>
            <div className="font-semibold">
              {chapterIndex < totalChapters - 1
                ? pick(
                    locale,
                    ALL_CHAPTERS[chapterIndex + 1].titleEn,
                    ALL_CHAPTERS[chapterIndex + 1].titleFr
                  )
                : '—'}
            </div>
          </button>
        </div>
      </div>
    </article>
  );
}

function Exercise(props: {
  title: string;
  body: string;
  solution?: string;
  locale: Locale;
  labels: { solution: string; hide: string; run: string; copy: string; copied: string; output: string };
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="my-8 rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/20 p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🧠</span>
        <span className="text-xs font-bold uppercase tracking-wide text-purple-700 dark:text-purple-400">
          {props.title}
        </span>
      </div>
      <p className="text-slate-800 dark:text-slate-200 leading-relaxed mb-4">{props.body}</p>
      {props.solution && (
        <>
          <button
            onClick={() => setShow(!show)}
            className="px-4 py-1.5 rounded-lg border border-purple-300 dark:border-purple-700 bg-white dark:bg-slate-900 text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
          >
            {show ? props.labels.hide : props.labels.solution}
          </button>
          {show && (
            <div className="mt-4">
              <CodeBlock code={props.solution} copyLabel={props.labels.copy} copiedLabel={props.labels.copied} runLabel={props.labels.run} outputLabel={props.labels.output} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
