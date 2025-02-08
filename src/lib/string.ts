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
