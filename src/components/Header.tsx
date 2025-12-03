"use client";

import Link from "next/link";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  hideTitle?: boolean;
}

export default function Header({ darkMode, onToggleDarkMode, hideTitle = false }: HeaderProps) {
  return (
    <header className="relative glass-effect border-b border-purple-500/10 dark:border-slate-700/50">
      <div className="absolute inset-0 gradient-primary opacity-5 dark:opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-2xl transform group-hover:scale-105 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
            </div>
            {!hideTitle && (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  URL Query Analyzer
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-1">Extract, analyze & compare URL parameters with ease</p>
              </div>
            )}
          </Link>
          <button
            onClick={onToggleDarkMode}
            className="relative p-3 rounded-xl glass-effect hover:scale-105 transition-all duration-300 border border-purple-500/20 dark:border-slate-600/50 group"
            aria-label="Toggle dark mode"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {darkMode ? (
              <svg className="w-6 h-6 text-amber-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-slate-700 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
