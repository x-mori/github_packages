package io.github.xmori.humanfilesize;

public final class HumanFileSize {
    private HumanFileSize() {}
    public static String format(long bytes, boolean binary) {
    if (bytes < 0) throw new IllegalArgumentException("bytes must be nonnegative");
    int base = binary ? 1024 : 1000;
    String[] units = binary ? new String[]{"B", "KiB", "MiB", "GiB", "TiB", "PiB"} : new String[]{"B", "KB", "MB", "GB", "TB", "PB"};
    double value = bytes; int unit = 0;
    while (value >= base && unit < units.length - 1) { value /= base; unit++; }
    return unit == 0 ? bytes + " B" : String.format(java.util.Locale.ROOT, "%.1f %s", value, units[unit]);
}
}
