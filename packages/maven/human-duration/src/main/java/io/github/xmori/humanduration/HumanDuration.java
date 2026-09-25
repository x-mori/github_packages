package io.github.xmori.humanduration;

/**
 * Format milliseconds as days, hours, minutes, and seconds.
 */
public final class HumanDuration {
    private HumanDuration() {}
    /**
     * Format milliseconds as days, hours, minutes, and seconds.
     *
     * Zero-valued leading units are omitted. Fractional seconds are discarded;
     * durations shorter than one second display as 0s.
     * @param milliseconds nonnegative duration in milliseconds
     * @return a compact duration string such as 1h 2m
     * @throws IllegalArgumentException if milliseconds is negative
     */
    public static String format(long milliseconds) {
    if (milliseconds < 0) throw new IllegalArgumentException("duration must be nonnegative");
    long seconds = milliseconds / 1000;
    long days = seconds / 86400; seconds %= 86400;
    long hours = seconds / 3600; seconds %= 3600;
    long minutes = seconds / 60; seconds %= 60;
    StringBuilder result = new StringBuilder();
    if (days > 0) result.append(days).append("d ");
    if (hours > 0) result.append(hours).append("h ");
    if (minutes > 0) result.append(minutes).append("m ");
    if (seconds > 0 || result.length() == 0) result.append(seconds).append("s");
    return result.toString().strip();
}
}
