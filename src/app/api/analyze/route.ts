import { NextResponse } from "next/server";

// Helper function to decode URL-encoded values recursively
function decodeUrlRecursively(value: string): string {
  try {
    let decoded = value;
    let previousDecoded = "";
    let iterations = 0;
    const maxIterations = 10; // Prevent infinite loops

    while (decoded !== previousDecoded && iterations < maxIterations) {
      previousDecoded = decoded;
      decoded = decodeURIComponent(decoded);
      iterations++;
    }

    return decoded;
  } catch (error) {
    return value;
  }
}

// Extract embedded URL from Proofpoint/urldefense URLs
function extractProofpointUrl(url: string): string | null {
  try {
    // Match Proofpoint v3 format: https://urldefense.com/v3/__ENCODED_URL__SIGNATURE
    const v3Match = url.match(/urldefense\.com\/v3\/__(.+?)__;/);
    if (v3Match) {
      let encoded = v3Match[1];
      // Proofpoint encoding: * = special char, ** = :, etc.
      // The pattern after __ contains replacement chars
      const signatureMatch = url.match(/__;([^!]+)!!/);
      const replacements = signatureMatch ? signatureMatch[1] : "";

      let result = "";
      let replaceIndex = 0;

      for (let i = 0; i < encoded.length; i++) {
        if (encoded[i] === "*") {
          if (replacements[replaceIndex]) {
            result += replacements[replaceIndex];
            replaceIndex++;
          }
        } else {
          result += encoded[i];
        }
      }

      return result || encoded;
    }

    // Match Proofpoint v2 format
    const v2Match = url.match(/urldefense\.proofpoint\.com\/v2\/url\?u=([^&]+)/);
    if (v2Match) {
      let encoded = v2Match[1];
      // v2 uses -XX- for special chars
      encoded = encoded.replace(/-3A/g, ":").replace(/-2F/g, "/").replace(/-3F/g, "?").replace(/-3D/g, "=").replace(/-26/g, "&");
      return encoded;
    }

    return null;
  } catch (error) {
    console.log("Error extracting Proofpoint URL:", error);
    return null;
  }
}

// Extract any embedded URLs from query parameters
function findEmbeddedUrls(url: string): string[] {
  const urls: string[] = [];
  try {
    const urlObj = new URL(url);

    // Check each query parameter for embedded URLs
    const params = Array.from(urlObj.searchParams.entries());
    for (const [key, value] of params) {
      const decoded = decodeUrlRecursively(value);
      if (decoded.startsWith("http://") || decoded.startsWith("https://")) {
        urls.push(decoded);
      }
    }
  } catch (error) {
    // Ignore parsing errors
  }
  return urls;
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let finalUrl = url;
    let queryParams: Array<{ name: string; value: string; isUrl?: boolean }> = [];

    // STEP 1: Check if this is a Proofpoint/urldefense URL and extract the real URL
    const proofpointUrl = extractProofpointUrl(url);
    if (proofpointUrl) {
      console.log("Extracted Proofpoint URL:", proofpointUrl);
      finalUrl = proofpointUrl;
    }

    // STEP 2: Try to follow redirects (may not work for all campaign URLs)
    try {
      console.log("Attempting to follow redirects for:", finalUrl);

      const response = await fetch(finalUrl, {
        method: "GET",
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      });

      // If we got a different URL after redirects, use it
      if (response.url && response.url !== finalUrl) {
        console.log("Redirect found:", response.url);
        finalUrl = response.url;
      }
    } catch (fetchError) {
      console.log("Fetch failed (expected for some campaign URLs):", fetchError);
      // Continue with the URL we have
    }

    // STEP 3: Parse the final URL and extract query parameters
    try {
      const urlObj = new URL(finalUrl);
      const rawParams = Array.from(urlObj.searchParams.entries());

      queryParams = rawParams.map(([name, value]) => {
        const decodedValue = decodeUrlRecursively(value);
        const isUrl = decodedValue.startsWith("http://") || decodedValue.startsWith("https://");
        return {
          name,
          value: decodedValue,
          isUrl,
        };
      });

      console.log("Found", queryParams.length, "query parameters");
    } catch (parseError) {
      console.log("URL parsing failed:", parseError);
    }

    // STEP 4: If we still have no params, try parsing the original URL directly
    if (queryParams.length === 0) {
      try {
        const originalUrlObj = new URL(url);
        const rawParams = Array.from(originalUrlObj.searchParams.entries());

        queryParams = rawParams.map(([name, value]) => {
          const decodedValue = decodeUrlRecursively(value);
          const isUrl = decodedValue.startsWith("http://") || decodedValue.startsWith("https://");
          return {
            name,
            value: decodedValue,
            isUrl,
          };
        });
      } catch (error) {
        console.log("Original URL parsing failed:", error);
      }
    }

    return NextResponse.json({
      success: true,
      finalUrl,
      queryParams,
      originalUrl: url,
      wasProofpoint: !!proofpointUrl,
    });
  } catch (error) {
    console.error("Error processing URL:", error);
    return NextResponse.json(
      {
        error: "Failed to process URL",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
