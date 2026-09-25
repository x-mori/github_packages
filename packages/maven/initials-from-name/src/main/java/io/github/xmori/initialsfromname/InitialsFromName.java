package io.github.xmori.initialsfromname;

/**
 * Get initials from a full name.
 */
public final class InitialsFromName {
    private InitialsFromName() {}
    /**
     * Return uppercase initials from a person's whitespace-separated name.
     *
     * Each nonempty word contributes its first Unicode code point. Surrounding and
     * repeated whitespace are ignored; an empty name returns an empty string.
     * @param name the name to read
     * @return the initials in locale-independent uppercase
     * @throws IllegalArgumentException if name is null
     */
    public static String of(String name) {
    if (name == null) throw new IllegalArgumentException("name is required");
    StringBuilder result = new StringBuilder();
    for (String word : name.strip().split("\s+")) if (!word.isEmpty()) result.appendCodePoint(word.codePointAt(0));
    return result.toString().toUpperCase(java.util.Locale.ROOT);
}
}
