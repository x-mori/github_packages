package io.github.xmori.securepin;

/**
 * Generate a cryptographically random numeric PIN.
 */
public final class SecurePin {
    private SecurePin() {}
    private static final java.security.SecureRandom RANDOM = new java.security.SecureRandom();
/**
 * Generate a cryptographically random numeric PIN.
 *
 * Leading zeroes are retained, so the returned string always has exactly the
 * requested number of digits. Store and compare PINs securely at the call site.
 * @param digits PIN length from 1 through 1024
 * @return a numeric PIN string
 * @throws IllegalArgumentException if digits is outside the supported range
 */
public static String generate(int digits) {
    if (digits < 1 || digits > 1024) throw new IllegalArgumentException("digits must be 1..1024");
    StringBuilder pin = new StringBuilder(digits);
    for (int i = 0; i < digits; i++) pin.append(RANDOM.nextInt(10));
    return pin.toString();
}
}
