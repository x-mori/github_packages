package io.github.xmori.relativetimelite;

/**
 * Describe an instant relative to another instant.
 */
public final class RelativeTimeLite {
    private RelativeTimeLite() {}
    /**
     * Describe the target time relative to now in coarse units.
     *
     * The result uses seconds, minutes, hours, or days and distinguishes past from
     * future. Unit values are rounded down to whole units.
     * @param target instant to describe
     * @param now comparison instant
     * @return text such as 5 minutes ago or in 2 days
     */
    public static String format(java.time.Instant target, java.time.Instant now) {
    long seconds = java.time.Duration.between(now, target).getSeconds();
    long absolute = seconds == Long.MIN_VALUE ? Long.MAX_VALUE : Math.abs(seconds);
    String unit; long amount;
    if (absolute < 60) { unit = "second"; amount = absolute; }
    else if (absolute < 3600) { unit = "minute"; amount = absolute / 60; }
    else if (absolute < 86400) { unit = "hour"; amount = absolute / 3600; }
    else { unit = "day"; amount = absolute / 86400; }
    String phrase = amount + " " + unit + (amount == 1 ? "" : "s");
    return seconds < 0 ? phrase + " ago" : "in " + phrase;
}
}
