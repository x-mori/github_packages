package io.github.xmori.securepin;

public final class SecurePin {
    private SecurePin() {}
    private static final java.security.SecureRandom RANDOM = new java.security.SecureRandom();
public static String generate(int digits) {
    if (digits < 1 || digits > 1024) throw new IllegalArgumentException("digits must be 1..1024");
    StringBuilder pin = new StringBuilder(digits);
    for (int i = 0; i < digits; i++) pin.append(RANDOM.nextInt(10));
    return pin.toString();
}
}
