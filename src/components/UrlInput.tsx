"use client";

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  url2?: string;
  setUrl2?: (url: string) => void;
  compareMode?: boolean;
  setCompareMode?: (mode: boolean) => void;
  followRedirect?: boolean;
  setFollowRedirect?: (follow: boolean) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  onExport: () => void;
  hasResults?: boolean;
}

export default function UrlInput({
  url,
  setUrl,
  url2,
  setUrl2,
  compareMode,
  setCompareMode,
  followRedirect,
  setFollowRedirect,
  isLoading,
  onSubmit,
  onClear,
  onExport,
  hasResults,
}: UrlInputProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <div className="relative glass-effect shadow-2xl shadow-purple-500/10 dark:shadow-none rounded-3xl p-6 md:p-8 mb-8 border border-purple-500/20 dark:border-slate-700/50 transition-all duration-300">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-4" style={{ gridTemplateColumns: compareMode ? "1fr 1fr" : "1fr" }}>
            <div>
              <label htmlFor="url" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {compareMode ? "First URL" : "Enter URL to analyze"}
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

            {compareMode && setUrl2 && (
              <div>
                <label htmlFor="url2" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Second URL
                </label>
                <textarea
                  id="url2"
                  value={url2}
                  onChange={(e) => setUrl2(e.target.value)}
                  placeholder="Paste second URL to compare..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 resize-none"
                  rows={4}
                  required={compareMode}
                />
              </div>
            )}
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-6 items-center p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50">
            {setCompareMode && (
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={compareMode}
                    onChange={(e) => setCompareMode(e.target.checked)}
                    className="w-5 h-5 text-blue-600 bg-white dark:bg-slate-900/50 border-slate-300 dark:border-slate-600 rounded-md focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 transition-all duration-200"
                  />
                  <div className="absolute inset-0 rounded-md bg-blue-500/20 scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Compare two URLs</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Analyze URLs side-by-side</span>
                </div>
              </label>
            )}

            {setFollowRedirect && (
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={followRedirect}
                    onChange={(e) => setFollowRedirect(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 bg-white dark:bg-slate-900/50 border-slate-300 dark:border-slate-600 rounded-md focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 transition-all duration-200"
                  />
                  <div className="absolute inset-0 rounded-md bg-emerald-500/20 scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Follow redirects</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Get final destination URL</span>
                </div>
              </label>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="relative inline-flex items-center px-8 py-3.5 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 animate-gradient"
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
    </div>
  );
}
