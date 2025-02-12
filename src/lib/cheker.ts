export function isValidUrl(url: string | undefined) {
  try {
    if (!url) return false;

    new URL(url);
    return true;
  } catch {
    return false;
  }
}
