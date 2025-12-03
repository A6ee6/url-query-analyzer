"use client";

interface UrlResultsProps {
  originalUrl: string;
  finalUrl: string;
  wasProofpoint: boolean;
  onCopy: (text: string, id: string) => void;
  copied: string | null;
}

export default function UrlResults({ originalUrl, finalUrl, wasProofpoint, onCopy, copied }: UrlResultsProps) {
  return (
    <div className="mt-6 space-y-4">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-700/30 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            Original URL
            {wasProofpoint && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full border border-violet-200 dark:border-violet-700/50">
                Proofpoint Protected
              </span>
            )}
          </h3>
          <button
            onClick={() => onCopy(originalUrl, "original")}
            className="p-2 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            title="Copy to clipboard"
          >
            {copied === "original" ? (
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>
        <code className="text-sm break-all text-blue-700 dark:text-blue-300 font-mono">{originalUrl}</code>
      </div>

      {finalUrl && finalUrl !== originalUrl && (
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border border-emerald-200 dark:border-emerald-700/30 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center">
              <svg className="w-4 h-4 mr-2 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Final URL (after redirects)
            </h3>
            <button
              onClick={() => onCopy(finalUrl, "final")}
              className="p-2 text-slate-400 hover:text-emerald-600 dark:text-slate-500 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              title="Copy to clipboard"
            >
              {copied === "final" ? (
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          </div>
          <code className="text-sm break-all text-emerald-700 dark:text-emerald-300 font-mono">{finalUrl}</code>
        </div>
      )}
    </div>
  );
}
