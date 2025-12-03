"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

interface UrlAnalysis {
  url: string;
  paramCount: number;
  hostname: string;
  protocol: string;
  error?: string;
}

export default function BatchPage() {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState<UrlAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeUrls = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setResults([]);

    const urlList = urls
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    const analyzed: UrlAnalysis[] = [];

    for (const url of urlList) {
      try {
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        analyzed.push({
          url,
          paramCount: Array.from(params.keys()).length,
          hostname: urlObj.hostname,
          protocol: urlObj.protocol.replace(":", ""),
        });
      } catch (err) {
        analyzed.push({
          url,
          paramCount: 0,
          hostname: "Invalid",
          protocol: "N/A",
          error: "Invalid URL",
        });
      }
    }

    setResults(analyzed);
    setIsAnalyzing(false);
  };

  const exportResults = () => {
    const csv = [
      ["URL", "Protocol", "Hostname", "Parameter Count", "Status"].join(","),
      ...results.map((r) => [r.url, r.protocol, r.hostname, r.paramCount, r.error || "Valid"].map((v) => `"${v}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "batch-url-analysis.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearResults = () => {
    setUrls("");
    setResults([]);
  };

  return (
    <PageLayout title="Batch URL Analyzer" description="Analyze multiple URLs at once. Paste one URL per line.">
      <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-700/50">
        <form onSubmit={analyzeUrls} className="space-y-6">
          <div>
            <label htmlFor="urls" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Enter URLs (one per line)
            </label>
            <textarea
              id="urls"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="https://example.com/page1?param=value1&#10;https://example.com/page2?param=value2&#10;https://example.com/page3?param=value3"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 resize-none font-mono text-sm"
              rows={10}
              required
            />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Tip: You can paste up to 100 URLs at once</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
            >
              {isAnalyzing ? (
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  Analyze All URLs
                </>
              )}
            </button>

            {results.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={exportResults}
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export CSV
                </button>

                <button
                  type="button"
                  onClick={clearResults}
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 transition-colors"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        </form>

        {results.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Analysis Results
              </h3>
              <div className="text-sm">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{results.length}</span>
                <span className="text-slate-500 dark:text-slate-400"> URLs analyzed</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/50">
                <thead className="bg-slate-50 dark:bg-slate-800/80">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">URL</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Protocol</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hostname</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Params</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800/30 divide-y divide-slate-100 dark:divide-slate-700/30">
                  {results.map((result, index) => (
                    <tr key={index} className={result.error ? "bg-red-50/50 dark:bg-red-900/10" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 dark:text-slate-500">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400 break-all max-w-md">{result.url}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{result.protocol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{result.hostname}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {result.paramCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {result.error ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                            {result.error}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400">
                            Valid
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
