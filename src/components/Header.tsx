"use client";

import Link from "next/link";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  compact?: boolean;
}

export default function Header({ darkMode, onToggleDarkMode, compact = false }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 text-white shadow-md shadow-blue-500/20 dark:shadow-none border-b border-blue-500/20 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="bg-white/15 dark:bg-slate-700/50 backdrop-blur-sm p-2 rounded-xl border border-white/10 dark:border-slate-600/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">URL Tools Suite</h1>
              {!compact && <p className="text-blue-100 dark:text-slate-400 text-xs md:text-sm mt-0.5">Professional URL analysis and manipulation tools</p>}
            </div>
          </Link>
          <button
            onClick={onToggleDarkMode}
            className="p-3 rounded-xl bg-white/15 dark:bg-slate-700/50 backdrop-blur-sm hover:bg-white/25 dark:hover:bg-slate-600/50 transition-all duration-300 border border-white/10 dark:border-slate-600/50"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
