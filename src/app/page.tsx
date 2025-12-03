"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { UrlInput, LoadingState, ErrorState, UrlResults, QueryTable, NoParametersWarning, FeatureCards, ContentWrapper, QueryParam } from "@/components";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [finalUrl, setFinalUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [wasProofpoint, setWasProofpoint] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const analyzeUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze URL");
      }

      const data = await response.json();
      setQueryParams(data.queryParams || []);
      setFinalUrl(data.finalUrl || url);
      setOriginalUrl(data.originalUrl || url);
      setWasProofpoint(data.wasProofpoint || false);
    } catch (err) {
      setError("Error processing URL. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setUrl("");
    setQueryParams([]);
    setFinalUrl("");
    setOriginalUrl("");
    setWasProofpoint(false);
    setError("");
  };

  const exportAsJson = () => {
    const data = {
      originalUrl,
      finalUrl,
      wasProofpoint,
      queryParams,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "url-analysis.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasResults = queryParams.length > 0 || !!finalUrl;

  return (
    <PageLayout title="Query String Analyzer" description="Extract and analyze query parameters from any URL, including shortened URLs and Proofpoint links.">
      <ContentWrapper>
        <UrlInput
          url={url}
          setUrl={setUrl}
          isLoading={isLoading}
          onSubmit={analyzeUrl}
          onClear={clearResults}
          onExport={exportAsJson}
          hasResults={hasResults}
        />

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Error State */}
        {error && <ErrorState error={error} />}

        {/* URL Results */}
        {originalUrl && <UrlResults originalUrl={originalUrl} finalUrl={finalUrl} wasProofpoint={wasProofpoint} onCopy={copyToClipboard} copied={copied} />}

        {/* Query Parameters Table */}
        {queryParams.length > 0 && <QueryTable queryParams={queryParams} onCopy={copyToClipboard} copied={copied} />}

        {/* No Parameters Warning */}
        {!isLoading && queryParams.length === 0 && finalUrl && <NoParametersWarning />}

        {/* Features Section */}
        {!originalUrl && <FeatureCards />}
      </ContentWrapper>
    </PageLayout>
  );
}
