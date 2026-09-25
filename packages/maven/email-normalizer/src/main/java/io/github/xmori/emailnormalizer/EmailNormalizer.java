package io.github.xmori.emailnormalizer;

public final class EmailNormalizer {
    private EmailNormalizer() {}
    public static String normalize(String email) {
    if (email == null) throw new IllegalArgumentException("email is required");
    String value = email.strip(); int at = value.lastIndexOf('@');
    if (at < 1 || at == value.length() - 1 || value.indexOf('@') != at || value.chars().anyMatch(Character::isWhitespace)) throw new IllegalArgumentException("invalid email");
    return value.substring(0, at) + "@" + value.substring(at + 1).toLowerCase(java.util.Locale.ROOT);
}
}
