"use client";

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  url2?: string;
  setUrl2?: (url: string) => void;
  compareMode?: boolean;
  setCompareMode?: (compare: boolean) => void;
  followRedirect?: boolean;
  setFollowRedirect?: (follow: boolean) => void;
  isLoading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClear?: () => void;
  onExport?: () => void;
  hasResults?: boolean;
}

export default function UrlInput({
  url,
  setUrl,
  url2 = "",
  setUrl2,
  compareMode = false,
  setCompareMode,
  followRedirect = true,
  setFollowRedirect,
  isLoading = false,
  onSubmit,
  onClear,
  onExport,
  hasResults = false,
}: UrlInputProps) {
  return (
    <div className="material-card p-6 mb-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-4" style={{ gridTemplateColumns: compareMode ? "1fr 1fr" : "1fr" }}>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {compareMode ? "First URL" : "Enter URL"}
            </label>
            <div className="relative">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com?param1=value1&param2=value2"
                className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
            </div>
          </div>

          {compareMode && setUrl2 && (
            <div>
              <label htmlFor="url2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Second URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="url2"
                  value={url2}
                  onChange={(e) => setUrl2(e.target.value)}
                  placeholder="https://example.com?param1=value1&param2=value2"
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {setCompareMode && (
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="compareMode"
                checked={compareMode}
                onChange={(e) => setCompareMode(e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
              />
              <div>
                <label htmlFor="compareMode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Compare two URLs
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Analyze URLs side-by-side</p>
              </div>
            </div>
          )}

          {setFollowRedirect && (
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="followRedirect"
                checked={followRedirect}
                onChange={(e) => setFollowRedirect(e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
              />
              <div>
                <label htmlFor="followRedirect" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Follow redirects
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Track final destination URL</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={isLoading} className="material-button px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Analyze URL</span>
              </div>
            )}
          </button>

          {onClear && hasResults && (
            <button
              type="button"
              onClick={onClear}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Clear</span>
              </div>
            </button>
          )}

          {onExport && hasResults && (
            <button
              type="button"
              onClick={onExport}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Export JSON</span>
              </div>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
