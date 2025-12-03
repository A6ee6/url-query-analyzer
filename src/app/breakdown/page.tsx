"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

interface UrlComponents {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  href: string;
  username: string;
  password: string;
}

export default function BreakdownPage() {
  const [url, setUrl] = useState("");
  const [components, setComponents] = useState<UrlComponents | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const analyzeUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setComponents(null);

    try {
      const urlObj = new URL(url);
      setComponents({
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port || "(default)",
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        origin: urlObj.origin,
        href: urlObj.href,
        username: urlObj.username || "(none)",
        password: urlObj.password ? "***" : "(none)",
      });
    } catch (err) {
      setError("Invalid URL. Please enter a valid URL with protocol (e.g., https://example.com)");
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const exampleUrls = [
    "https://example.com:8080/path/to/page?param1=value1&param2=value2#section",
    "https://user:pass@subdomain.example.com/api/v1/users?sort=asc&limit=10",
    "https://www.google.com/search?q=url+parser&hl=en#results",
  ];

  return (
    <PageLayout title="URL Breakdown" description="Break down any URL into its individual components: protocol, host, port, path, query, and hash.">
      <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-700/50">
        <form onSubmit={analyzeUrl} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Enter URL to break down
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com:8080/path?query=value#hash"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
              required
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Break Down URL
            </button>
          </div>

          {/* Example URLs */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {exampleUrls.map((exampleUrl, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setUrl(exampleUrl)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600/50 transition-colors"
                >
                  Example {index + 1}
                </button>
              ))}
            </div>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {components && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              URL Components
            </h3>

            <div className="grid gap-3">
              {Object.entries(components).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/50"
                >
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{key}</p>
                    <p className="text-sm font-mono text-slate-800 dark:text-slate-200 break-all">{value || "(empty)"}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, key)}
                    className="ml-4 p-2 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
                    title="Copy value"
                  >
                    {copied === key ? (
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
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
