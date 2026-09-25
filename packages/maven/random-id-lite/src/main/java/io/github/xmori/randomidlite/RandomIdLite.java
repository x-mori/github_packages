package io.github.xmori.randomidlite;

/**
 * Create cryptographically random readable IDs.
 */
public final class RandomIdLite {
    private RandomIdLite() {}
    private static final java.security.SecureRandom RANDOM = new java.security.SecureRandom();
private static final String ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
/**
 * Generate an ID from a readable, cryptographically random alphabet.
 *
 * The alphabet omits easily confused characters. Each character is selected
 * with SecureRandom; this method does not guarantee uniqueness across calls.
 * @param length number of characters from 1 through 1024
 * @return a random ID
 * @throws IllegalArgumentException if length is outside the supported range
 */
public static String generate(int length) {
    if (length < 1 || length > 1024) throw new IllegalArgumentException("length must be 1..1024");
    StringBuilder result = new StringBuilder(length);
    for (int i = 0; i < length; i++) result.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
    return result.toString();
}
}
