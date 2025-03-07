import { parse } from "node-html-parser";

/**
 * Converts a number of seconds into a time string in MM:SS format.
 *
 * @param seconds - The total number of seconds to convert
 * @returns A string in MM:SS format with zero-padding
 * @example
 * secondsToTime(90) // Returns "01:30"
 * secondsToTime(65) // Returns "01:05"
 */
export function secondsToTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

/**
 * Converts a full name into a fallback username.
 *
 * @param fullName - The full name to convert
 * @returns A fallback username consisting of the initials of the name parts
 * @example
 * nameToFallback("rizky fauzi ilmi") // Returns "RFI"
 * nameToFallback("john doe") // Returns "JD"
 */
export function nameToFallback(fullName: string): string {
  return fullName
    .split(" ")
    .map((namePart) => namePart.charAt(0).toUpperCase())
    .join("");
}

/**
 * Parses an HTML string and extracts a concise summary from the first few paragraphs.
 *
 * @param html - The HTML string to parse
 * @returns A string containing a summary of the article
 * @example
 * extractArticleDescription("<p>First paragraph.</p><p>Second paragraph.</p>")
 * // Returns "First paragraph. Second paragraph."
 */
export function extractArticleDescription(html: string): string {
  // Parse HTML string into a DOM using node-html-parser
  const root = parse(html);

  // Get all <p> elements
  const paragraphs = root
    .querySelectorAll("p")
    .map((p) => p.text.trim())
    .filter((text) => text.length > 0);

  // Join the first few paragraphs to create a concise summary
  if (paragraphs.length === 0) return "";

  const summary = paragraphs.slice(0, 2).join(" ");
  return summary.length > 300 ? summary.substring(0, 300) + "..." : summary;
}
