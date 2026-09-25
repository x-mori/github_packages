package io.github.xmori.initialsfromname;

public final class InitialsFromName {
    private InitialsFromName() {}
    public static String of(String name) {
    if (name == null) throw new IllegalArgumentException("name is required");
    StringBuilder result = new StringBuilder();
    for (String word : name.strip().split("\s+")) if (!word.isEmpty()) result.appendCodePoint(word.codePointAt(0));
    return result.toString().toUpperCase(java.util.Locale.ROOT);
}
}
