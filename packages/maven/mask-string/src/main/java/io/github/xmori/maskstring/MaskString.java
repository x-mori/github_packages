package io.github.xmori.maskstring;

/**
 * Hide all but the final characters of a string.
 */
public final class MaskString {
    private MaskString() {}
    /**
     * Hide all but the final visible Unicode code points.
     *
     * The mask character replaces each hidden code point. If visible exceeds the
     * input length, the input is returned unchanged.
     * @param value the text to mask
     * @param visible number of trailing code points to leave visible
     * @param mask replacement character
     * @return the masked string
     * @throws IllegalArgumentException if value is null or visible is negative
     */
    public static String of(String value, int visible, char mask) {
    if (value == null || visible < 0) throw new IllegalArgumentException("invalid mask arguments");
    int[] points = value.codePoints().toArray();
    StringBuilder result = new StringBuilder();
    for (int i = 0; i < points.length; i++) result.append(i < points.length - visible ? String.valueOf(mask) : new String(Character.toChars(points[i])));
    return result.toString();
}
}
