/**
 * Convert text to a lowercase ASCII URL slug.
 *
 * Combining marks are removed after Unicode normalization. Runs of non-ASCII
 * letters, punctuation, or whitespace become one hyphen; edge hyphens are cut.
 * @param text - Text to convert.
 * @returns A slug that may be empty if no ASCII letters or digits remain.
 */
export function slugifyLite(text: string): string;
