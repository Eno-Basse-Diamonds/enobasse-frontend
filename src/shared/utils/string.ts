/**
 * Converts a text string into a URL-friendly slug.
 *
 * @description Strips non-alphanumeric characters (except hyphens and spaces),
 * replaces separators with hyphens, and lowercases the result.
 *
 * @param text - The input string to slugify.
 * @returns The slugified string.
 *
 * @example
 * textToSlug("Hello World!") // "hello-world"
 */
export function textToSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extracts a user's initials from their full name.
 *
 * @description Uses the first character of the first and last words. Returns a
 * single initial for one-word names.
 *
 * @param name - The user's full name.
 * @returns Uppercase initials (e.g., "JD" for "John Doe").
 */
export function getUserInitials(name: string): string {
  if (!name) return "";

  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}
