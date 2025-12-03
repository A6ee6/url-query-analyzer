"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { UrlInput, LoadingState, ErrorState, UrlResults, AlignedQueryTable, NoParametersWarning, FeatureCards, ContentWrapper, QueryParam } from "@/components";

export default function Home() {
  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const [followRedirect, setFollowRedirect] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [queryParams2, setQueryParams2] = useState<QueryParam[]>([]);
  const [finalUrl, setFinalUrl] = useState("");
  const [finalUrl2, setFinalUrl2] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [originalUrl2, setOriginalUrl2] = useState("");
  const [wasProofpoint, setWasProofpoint] = useState(false);
  const [wasProofpoint2, setWasProofpoint2] = useState(false);
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

    if (compareMode && !url2.trim()) {
      setError("Please enter a second URL for comparison");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Analyze first URL
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, followRedirect }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze URL");
      }

      const data = await response.json();
      setQueryParams(data.queryParams || []);
      setFinalUrl(data.finalUrl || url);
      setOriginalUrl(data.originalUrl || url);
      setWasProofpoint(data.wasProofpoint || false);

      // Analyze second URL if in compare mode
      if (compareMode && url2.trim()) {
        const response2 = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url2, followRedirect }),
        });

        if (!response2.ok) {
          throw new Error("Failed to analyze second URL");
        }

        const data2 = await response2.json();
        setQueryParams2(data2.queryParams || []);
        setFinalUrl2(data2.finalUrl || url2);
        setOriginalUrl2(data2.originalUrl || url2);
        setWasProofpoint2(data2.wasProofpoint || false);
      }
    } catch (err) {
      setError("Error processing URL. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setUrl("");
    setUrl2("");
    setQueryParams([]);
    setQueryParams2([]);
    setFinalUrl("");
    setFinalUrl2("");
    setOriginalUrl("");
    setOriginalUrl2("");
    setWasProofpoint(false);
    setWasProofpoint2(false);
    setError("");
  };

  const exportAsJson = () => {
    const data = compareMode
      ? {
          url1: { originalUrl, finalUrl, wasProofpoint, queryParams },
          url2: { originalUrl: originalUrl2, finalUrl: finalUrl2, wasProofpoint: wasProofpoint2, queryParams: queryParams2 },
          exportedAt: new Date().toISOString(),
        }
      : {
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
    <PageLayout>
      <ContentWrapper>
        <UrlInput
          url={url}
          setUrl={setUrl}
          url2={url2}
          setUrl2={setUrl2}
          compareMode={compareMode}
          setCompareMode={setCompareMode}
          followRedirect={followRedirect}
          setFollowRedirect={setFollowRedirect}
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

        {compareMode ? (
          /* Comparison Mode - Side by Side */
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">URL 1</h3>
              {queryParams.length > 0 && (
                <AlignedQueryTable queryParams={queryParams} queryParams2={queryParams2} onCopy={copyToClipboard} copied={copied} isComparison={true} />
              )}
              {!isLoading && queryParams.length === 0 && queryParams2.length === 0 && (finalUrl || finalUrl2) && <NoParametersWarning />}
              {finalUrl && <UrlResults finalUrl={finalUrl} wasProofpoint={wasProofpoint} onCopy={copyToClipboard} copied={copied} />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">URL 2</h3>
              {queryParams2.length > 0 && (
                <AlignedQueryTable queryParams={queryParams2} queryParams2={queryParams} onCopy={copyToClipboard} copied={copied} isComparison={true} />
              )}
              {!isLoading && queryParams.length === 0 && queryParams2.length === 0 && (finalUrl || finalUrl2) && <NoParametersWarning />}
              {finalUrl2 && <UrlResults finalUrl={finalUrl2} wasProofpoint={wasProofpoint2} onCopy={copyToClipboard} copied={copied} />}
            </div>
          </div>
        ) : (
          /* Single URL Mode */
          <>
            {/* Query Parameters Table */}
            {queryParams.length > 0 && <AlignedQueryTable queryParams={queryParams} onCopy={copyToClipboard} copied={copied} />}

            {/* No Parameters Warning */}
            {!isLoading && queryParams.length === 0 && finalUrl && <NoParametersWarning />}

            {/* URL Results */}
            {finalUrl && <UrlResults finalUrl={finalUrl} wasProofpoint={wasProofpoint} onCopy={copyToClipboard} copied={copied} />}

            {/* Features Section */}
            {!finalUrl && <FeatureCards />}
          </>
        )}
      </ContentWrapper>
    </PageLayout>
  );
}
