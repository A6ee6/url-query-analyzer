export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-md shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-700/50 transition-all duration-300 group">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">URL Shorteners</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Automatically follows redirects from bit.ly, tinyurl, and other URL shorteners.
        </p>
      </div>
      <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-md shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 hover:border-violet-300 dark:hover:border-violet-700/50 transition-all duration-300 group">
        <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Proofpoint URLs</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Decodes Proofpoint URL Defense and other security-wrapped links.</p>
      </div>
      <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-md shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 hover:border-emerald-300 dark:hover:border-emerald-700/50 transition-all duration-300 group">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Export Results</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Export your analysis results to JSON for further processing or documentation.
        </p>
      </div>
    </div>
  );
}
