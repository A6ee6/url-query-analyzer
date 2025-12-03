"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

interface QueryParam {
  key: string;
  value: string;
}

export default function BuilderPage() {
  const [protocol, setProtocol] = useState("https");
  const [hostname, setHostname] = useState("");
  const [port, setPort] = useState("");
  const [pathname, setPathname] = useState("");
  const [queryParams, setQueryParams] = useState<QueryParam[]>([{ key: "", value: "" }]);
  const [hash, setHash] = useState("");
  const [builtUrl, setBuiltUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: "", value: "" }]);
  };

  const removeQueryParam = (index: number) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  const updateQueryParam = (index: number, field: "key" | "value", value: string) => {
    const updated = [...queryParams];
    updated[index][field] = value;
    setQueryParams(updated);
  };

  const buildUrl = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hostname) {
      return;
    }

    let url = `${protocol}://${hostname}`;
    if (port) {
      url += `:${port}`;
    }
    if (pathname) {
      url += pathname.startsWith("/") ? pathname : `/${pathname}`;
    }

    const validParams = queryParams.filter((p) => p.key && p.value);
    if (validParams.length > 0) {
      const queryString = validParams.map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join("&");
      url += `?${queryString}`;
    }

    if (hash) {
      url += `#${hash}`;
    }

    setBuiltUrl(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(builtUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearForm = () => {
    setProtocol("https");
    setHostname("");
    setPort("");
    setPathname("");
    setQueryParams([{ key: "", value: "" }]);
    setHash("");
    setBuiltUrl("");
  };

  return (
    <PageLayout title="URL Builder" description="Construct URLs visually by filling in individual components.">
      <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-700/50">
        <form onSubmit={buildUrl} className="space-y-6">
          {/* Protocol and Hostname */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="protocol" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Protocol
              </label>
              <select
                id="protocol"
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              >
                <option value="https">https://</option>
                <option value="http">http://</option>
                <option value="ftp">ftp://</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="hostname" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Hostname *
              </label>
              <input
                type="text"
                id="hostname"
                value={hostname}
                onChange={(e) => setHostname(e.target.value)}
                placeholder="example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Port and Path */}
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="port" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Port
              </label>
              <input
                type="text"
                id="port"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="8080"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="pathname" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Path
              </label>
              <input
                type="text"
                id="pathname"
                value={pathname}
                onChange={(e) => setPathname(e.target.value)}
                placeholder="/path/to/page"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Query Parameters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Query Parameters</label>
              <button
                type="button"
                onClick={addQueryParam}
                className="text-sm px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                + Add Parameter
              </button>
            </div>

            <div className="space-y-2">
              {queryParams.map((param, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={param.key}
                    onChange={(e) => updateQueryParam(index, "key", e.target.value)}
                    placeholder="key"
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  />
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) => updateQueryParam(index, "value", e.target.value)}
                    placeholder="value"
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  />
                  {queryParams.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQueryParam(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hash */}
          <div>
            <label htmlFor="hash" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Hash Fragment
            </label>
            <input
              type="text"
              id="hash"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              placeholder="section"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Build URL
            </button>

            <button
              type="button"
              onClick={clearForm}
              className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Built URL Result */}
        {builtUrl && (
          <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Built URL:</p>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200 break-all">{builtUrl}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex-shrink-0 p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                title="Copy URL"
              >
                {copied ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          </div>
        )}
      </div>
    </PageLayout>
  );
}
