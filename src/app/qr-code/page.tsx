"use client";

import { useState } from "react";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";

export default function QRCodePage() {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [size, setSize] = useState("200");
  const [isLoading, setIsLoading] = useState(false);

  const generateQRCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/qr-code?url=${encodeURIComponent(url)}&size=${size}`);
      const data = await response.json();

      if (data.success) {
        setQrCodeUrl(data.qrCodeUrl);
      } else {
        console.error("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setUrl("");
    setQrCodeUrl("");
  };

  const exampleUrls = ["https://example.com", "https://www.google.com/search?q=url+tools"];

  return (
    <PageLayout title="QR Code Generator" description="Generate QR codes for any URL. Perfect for sharing links offline.">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="material-card p-6">
          <form onSubmit={generateQRCode} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                QR Code Size
              </label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="150">Small (150x150)</option>
                <option value="200">Medium (200x200)</option>
                <option value="300">Large (300x300)</option>
                <option value="400">Extra Large (400x400)</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={isLoading} className="material-button px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  "Generate QR Code"
                )}
              </button>

              {qrCodeUrl && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Try these examples:</h3>
            <div className="space-y-2">
              {exampleUrls.map((exampleUrl, index) => (
                <button
                  key={index}
                  onClick={() => setUrl(exampleUrl)}
                  className="block w-full text-left px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                >
                  {exampleUrl}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="material-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated QR Code</h2>

          {qrCodeUrl ? (
            <div className="flex items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
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
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No QR code generated yet</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Enter a URL and click &quot;Generate QR Code&quot;</p>
            </div>
          )}

          {qrCodeUrl && (
            <div className="mt-6">
              <a
                href={qrCodeUrl}
                download="qrcode.png"
                className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download QR Code
              </a>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
