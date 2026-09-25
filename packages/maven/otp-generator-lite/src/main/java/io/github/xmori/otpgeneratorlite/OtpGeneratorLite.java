package io.github.xmori.otpgeneratorlite;

/**
 * Generate time-based one-time passwords with HMAC-SHA1 (RFC 6238). Provide the raw shared secret bytes, time, digit count from 6 to 9, and time step in seconds.
 */
public final class OtpGeneratorLite {
    private OtpGeneratorLite() {}
    /**
     * Generate an RFC 6238 time-based one-time password using HMAC-SHA1.
     *
     * The counter is the supplied epoch time divided by stepSeconds. The same
     * secret, time step, and digit count produce the same code. Keep the shared
     * secret private and verify codes with an appropriate clock window.
     * @param secret raw shared secret bytes
     * @param time instant for the code
     * @param digits number of digits, from 6 through 9
     * @param stepSeconds positive time-step length in seconds
     * @return a zero-padded numeric one-time code
     * @throws IllegalArgumentException for invalid settings
     */
    public static String generate(byte[] secret, java.time.Instant time, int digits, int stepSeconds) {
        if (secret == null || secret.length == 0 || time == null || digits < 6 || digits > 9 || stepSeconds < 1) throw new IllegalArgumentException("invalid OTP settings");
        long counter = Math.floorDiv(time.getEpochSecond(), stepSeconds);
        byte[] message = java.nio.ByteBuffer.allocate(8).putLong(counter).array();
        try {
            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA1");
            mac.init(new javax.crypto.spec.SecretKeySpec(secret, "HmacSHA1"));
            byte[] hash = mac.doFinal(message);
            int offset = hash[hash.length - 1] & 15;
            int number = ((hash[offset] & 127) << 24) | ((hash[offset + 1] & 255) << 16) | ((hash[offset + 2] & 255) << 8) | (hash[offset + 3] & 255);
            int modulus = (int) Math.pow(10, digits);
            return String.format(java.util.Locale.ROOT, "%0" + digits + "d", number % modulus);
        } catch (java.security.GeneralSecurityException exception) { throw new IllegalStateException("HmacSHA1 is unavailable", exception); }
    }
}
