package io.github.xmori.maskstring;

public final class MaskString {
    private MaskString() {}
    public static String of(String value, int visible, char mask) {
    if (value == null || visible < 0) throw new IllegalArgumentException("invalid mask arguments");
    int[] points = value.codePoints().toArray();
    StringBuilder result = new StringBuilder();
    for (int i = 0; i < points.length; i++) result.append(i < points.length - visible ? String.valueOf(mask) : new String(Character.toChars(points[i])));
    return result.toString();
}
}
