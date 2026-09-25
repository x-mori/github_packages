package io.github.xmori.daterange;

/**
 * Generate inclusive day, week, or month dates.
 */
public final class DateRange {
    private DateRange() {}
    /**
     * Generate an inclusive sequence of dates at a fixed step.
     *
     * Supported steps are days, weeks, and months. The start date is always included;
     * the end date appears only if it falls on a generated step.
     * @param start first date
     * @param end inclusive upper bound
     * @param unit DAYS, WEEKS, or MONTHS
     * @return an immutable list of generated dates
     * @throws IllegalArgumentException for null, reversed, or unsupported ranges
     */
    public static java.util.List<java.time.LocalDate> between(java.time.LocalDate start, java.time.LocalDate end, java.time.temporal.ChronoUnit unit) {
    if (start == null || end == null || start.isAfter(end) || !(unit == java.time.temporal.ChronoUnit.DAYS || unit == java.time.temporal.ChronoUnit.WEEKS || unit == java.time.temporal.ChronoUnit.MONTHS)) throw new IllegalArgumentException("invalid range");
    java.util.List<java.time.LocalDate> dates = new java.util.ArrayList<>();
    for (java.time.LocalDate date = start; !date.isAfter(end); date = date.plus(1, unit)) dates.add(date);
    return java.util.List.copyOf(dates);
}
}
