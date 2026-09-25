package io.github.xmori.randomstringsecure;

public final class RandomStringSecure {
    private RandomStringSecure() {}
    private static final java.security.SecureRandom RANDOM = new java.security.SecureRandom();
public static String generate(int length, String alphabet) {
    if (length < 1 || length > 1024 || alphabet == null || alphabet.codePointCount(0, alphabet.length()) < 2) throw new IllegalArgumentException("invalid length or alphabet");
    int[] points = alphabet.codePoints().distinct().toArray();
    if (points.length < 2) throw new IllegalArgumentException("alphabet needs two distinct characters");
    StringBuilder result = new StringBuilder();
    for (int i = 0; i < length; i++) result.appendCodePoint(points[RANDOM.nextInt(points.length)]);
    return result.toString();
}
}
