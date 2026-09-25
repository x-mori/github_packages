package io.github.xmori.humanfilesize;

/**
 * Format byte counts in SI or binary units.
 */
public final class HumanFileSize {
    private HumanFileSize() {}
    /**
     * Format a nonnegative byte count with SI or binary units.
     *
     * SI uses powers of 1000 and KB, MB, and so on. Binary uses powers of 1024 and
     * KiB, MiB, and so on. Non-byte values have one decimal place.
     * @param bytes the byte count
     * @param binary whether to use binary units
     * @return a readable byte count
     * @throws IllegalArgumentException if bytes is negative
     */
    public static String format(long bytes, boolean binary) {
    if (bytes < 0) throw new IllegalArgumentException("bytes must be nonnegative");
    int base = binary ? 1024 : 1000;
    String[] units = binary ? new String[]{"B", "KiB", "MiB", "GiB", "TiB", "PiB"} : new String[]{"B", "KB", "MB", "GB", "TB", "PB"};
    double value = bytes; int unit = 0;
    while (value >= base && unit < units.length - 1) { value /= base; unit++; }
    return unit == 0 ? bytes + " B" : String.format(java.util.Locale.ROOT, "%.1f %s", value, units[unit]);
}
}
