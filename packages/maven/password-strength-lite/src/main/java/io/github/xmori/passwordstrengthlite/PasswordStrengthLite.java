package io.github.xmori.passwordstrengthlite;

/**
 * Give basic password quality feedback.
 */
public final class PasswordStrengthLite {
    private PasswordStrengthLite() {}
        /**
     * A basic score and suggestions for improving a password.
     */
    public record Result(int score, java.util.List<String> advice) {}
/**
 * Give basic feedback about password length and character variety.
 *
 * The score is a count from zero to five of simple checks. It is not an entropy
 * estimate or a substitute for breach checks and secure password storage.
 * @param password text to assess
 * @return a score and immutable advice list
 * @throws IllegalArgumentException if password is null
 */
public static Result analyze(String password) {
    if (password == null) throw new IllegalArgumentException("password is required");
    java.util.List<String> advice = new java.util.ArrayList<>();
    int score = 0;
    if (password.length() >= 12) score++; else advice.add("Use at least 12 characters");
    if (password.length() >= 20) score++; else advice.add("A longer passphrase is stronger");
    if (password.matches(".*[a-z].*") && password.matches(".*[A-Z].*")) score++; else advice.add("Mix letter case");
    if (password.matches(".*[0-9].*")) score++; else advice.add("Add a number");
    if (password.matches(".*[^\\p{Alnum}].*")) score++; else advice.add("Add a symbol");
    return new Result(score, java.util.List.copyOf(advice));
}
}
