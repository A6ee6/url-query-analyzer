"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

interface ComparisonResult {
  component: string;
  url1Value: string;
  url2Value: string;
  match: boolean;
}

export default function ComparePage() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [error, setError] = useState("");

  const compareUrls = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResults([]);

    try {
      const urlObj1 = new URL(url1);
      const urlObj2 = new URL(url2);

      const components = [
        { key: "protocol", label: "Protocol" },
        { key: "hostname", label: "Hostname" },
        { key: "port", label: "Port" },
        { key: "pathname", label: "Path" },
        { key: "search", label: "Query String" },
        { key: "hash", label: "Hash" },
        { key: "origin", label: "Origin" },
      ];

      const comparisonResults: ComparisonResult[] = components.map(({ key, label }) => {
        const val1 = (urlObj1 as any)[key] || "(empty)";
        const val2 = (urlObj2 as any)[key] || "(empty)";
        return {
          component: label,
          url1Value: val1,
          url2Value: val2,
          match: val1 === val2,
        };
      });

      setResults(comparisonResults);
    } catch (err) {
      setError("Invalid URL(s). Please enter valid URLs with protocol (e.g., https://example.com)");
    }
  };

  const matchCount = results.filter((r) => r.match).length;
  const totalCount = results.length;

  return (
    <PageLayout title="Compare URLs" description="Compare two URLs side-by-side to see differences in their components.">
      <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-700/50">
        <form onSubmit={compareUrls} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="url1" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                First URL
              </label>
              <input
                type="text"
                id="url1"
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
                placeholder="https://example.com/path?query=1"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="url2" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Second URL
              </label>
              <input
                type="text"
                id="url2"
                value={url2}
                onChange={(e) => setUrl2(e.target.value)}
                placeholder="https://example.com/path?query=2"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            Compare URLs
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Comparison Results
              </h3>
              <div className="text-sm">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{matchCount}</span>
                <span className="text-slate-500 dark:text-slate-400"> / {totalCount} matching</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/50">
                <thead className="bg-slate-50 dark:bg-slate-800/80">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Component</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">URL 1</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">URL 2</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Match</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800/30 divide-y divide-slate-100 dark:divide-slate-700/30">
                  {results.map((result, index) => (
                    <tr key={index} className={result.match ? "" : "bg-amber-50/50 dark:bg-amber-900/10"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-300">{result.component}</td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400 break-all max-w-xs">{result.url1Value}</td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400 break-all max-w-xs">{result.url2Value}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {result.match ? (
                          <svg className="w-5 h-5 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-amber-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
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
