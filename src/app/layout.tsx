import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URL Query String Analyzer - Extract and Analyze URL Parameters Online",
  description:
    "Free online tool to extract, analyze, and decode query parameters from any URL including shortened URLs. Supports redirects, Proofpoint URLs, and exports results as JSON.",
  keywords:
    "URL analyzer, query string parser, URL parameters, extract query params, URL decoder, shortened URL analyzer, Proofpoint URL decoder, online URL tool",
  authors: [{ name: "URL Query Analyzer" }],
  creator: "URL Query Analyzer",
  publisher: "URL Query Analyzer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://url-query-analyzer.vercel.app"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "URL Query String Analyzer - Extract URL Parameters Online",
    description: "Analyze any URL's query parameters instantly. Supports shortened URLs, redirects, and Proofpoint decoding. Free online tool.",
    url: "https://url-query-analyzer.vercel.app",
    siteName: "URL Query Analyzer",
    images: [
      {
        url: "/og-image.png", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "URL Query String Analyzer - Extract and analyze URL parameters",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Query String Analyzer - Extract URL Parameters Online",
    description: "Analyze any URL's query parameters instantly. Supports shortened URLs, redirects, and Proofpoint decoding.",
    images: ["/og-image.png"],
    creator: "@urlqueryanalyzer", // Replace with your Twitter handle if available
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code", // Replace with actual code
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "URL Query String Analyzer",
              description: "Free online tool to extract and analyze query parameters from URLs, including shortened URLs and Proofpoint links.",
              url: "https://url-query-analyzer.vercel.app",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "URL parameter extraction",
                "Shortened URL support",
                "Redirect following",
                "Proofpoint URL decoding",
                "JSON export",
                "Copy to clipboard",
              ],
              screenshot: "/og-image.png",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
