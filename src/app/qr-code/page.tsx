"use client";

import { useState } from "react";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";

export default function QRCodePage() {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [size, setSize] = useState("300");

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) return;

    // Using QR Server API (free, no API key required)
    const encodedUrl = encodeURIComponent(url);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUrl}`;
    setQrCodeUrl(qrUrl);
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const a = document.createElement("a");
    a.href = qrCodeUrl;
    a.download = "qr-code.png";
    a.click();
  };

  const clearForm = () => {
    setUrl("");
    setQrCodeUrl("");
  };

  const exampleUrls = ["https://example.com", "https://github.com/A6ee6/url-query-analyzer", "https://www.google.com/search?q=url+tools"];

  return (
    <PageLayout title="QR Code Generator" description="Generate QR codes for any URL. Perfect for sharing links offline.">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-700/50">
          <form onSubmit={generateQRCode} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Enter URL
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                QR Code Size
              </label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              >
                <option value="200">Small (200x200)</option>
                <option value="300">Medium (300x300)</option>
                <option value="500">Large (500x500)</option>
                <option value="1000">Extra Large (1000x1000)</option>
              </select>
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
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                Generate QR Code
              </button>

              {qrCodeUrl && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 transition-colors"
                >
                  Clear
                </button>
              )}
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
        </div>

        {/* QR Code Display Section */}
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-700/50">
          {qrCodeUrl ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                  Your QR Code
                </h3>
                <button
                  onClick={downloadQRCode}
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>

              <div className="flex items-center justify-center p-8 bg-white dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code"
                  width={parseInt(size)}
                  height={parseInt(size)}
                  className="max-w-full h-auto"
                  style={{ imageRendering: "pixelated" }}
                  unoptimized
                />
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/50">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Tip:</strong> Scan this QR code with your phone camera to open the URL instantly!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <svg className="w-24 h-24 text-slate-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No QR code generated yet</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Enter a URL and click &quot;Generate QR Code&quot;</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
