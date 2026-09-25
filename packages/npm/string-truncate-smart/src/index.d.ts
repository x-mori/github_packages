/**
 * Shorten text to a maximum length including its suffix.
 *
 * When possible, truncation ends before the last space in the available prefix.
 * If no word boundary fits, it cuts at the exact character budget.
 * @param text - Text to shorten.
 * @param maxLength - Maximum UTF-16 code-unit length of the result.
 * @param suffix - Text appended after truncation, defaulting to an ellipsis.
 * @returns Original text if it fits, otherwise shortened text.
 */
export function stringTruncateSmart(text: string, maxLength: number, suffix?: string): string;
