package io.github.xmori.emailnormalizer;

/**
 * Trim email whitespace and lowercase only the domain.
 */
public final class EmailNormalizer {
    private EmailNormalizer() {}
    /**
     * Trim an email address and lowercase its domain only.
     *
     * The local part keeps its original case because some mail systems treat it as
     * case-sensitive. The method checks basic structure, not deliverability.
     * @param email address to normalize
     * @return address with a lowercase domain
     * @throws IllegalArgumentException for null or malformed input
     */
    public static String normalize(String email) {
    if (email == null) throw new IllegalArgumentException("email is required");
    String value = email.strip(); int at = value.lastIndexOf('@');
    if (at < 1 || at == value.length() - 1 || value.indexOf('@') != at || value.chars().anyMatch(Character::isWhitespace)) throw new IllegalArgumentException("invalid email");
    return value.substring(0, at) + "@" + value.substring(at + 1).toLowerCase(java.util.Locale.ROOT);
}
}
