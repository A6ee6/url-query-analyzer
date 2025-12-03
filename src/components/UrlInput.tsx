"use client";

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  onExport: () => void;
  hasResults?: boolean;
}

export default function UrlInput({ url, setUrl, isLoading, onSubmit, onClear, onExport, hasResults }: UrlInputProps) {
  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg shadow-slate-200/50 dark:shadow-none rounded-2xl p-6 md:p-8 mb-8 border border-slate-200/80 dark:border-slate-700/50 transition-all duration-300">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Enter URL to analyze
          </label>
          <textarea
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your URL here... (supports regular URLs, shortened URLs, and Proofpoint/campaign URLs)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 resize-none"
            rows={4}
            required
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-500 dark:hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md shadow-blue-500/25 dark:shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/30"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Analyze URL
              </>
            )}
          </button>

          {hasResults && (
            <>
              <button
                type="button"
                onClick={onClear}
                className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 dark:focus:ring-offset-slate-800 transition-all duration-300 border border-slate-200 dark:border-slate-600/50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-800 transition-all duration-300 border border-emerald-200 dark:border-emerald-700/50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export JSON
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
