package io.github.xmori.randomidlite;

public final class RandomIdLite {
    private RandomIdLite() {}
    private static final java.security.SecureRandom RANDOM = new java.security.SecureRandom();
private static final String ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
public static String generate(int length) {
    if (length < 1 || length > 1024) throw new IllegalArgumentException("length must be 1..1024");
    StringBuilder result = new StringBuilder(length);
    for (int i = 0; i < length; i++) result.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
    return result.toString();
}
}
