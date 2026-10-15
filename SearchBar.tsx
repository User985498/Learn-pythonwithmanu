import { forwardRef } from 'react';

const SearchBar = forwardRef<HTMLInputElement, {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder: string;
}>(function SearchBar({ value, onChange, onSubmit, placeholder }, ref) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="relative"
    >
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
      />
    </form>
  );
});

export default SearchBar;
