package io.github.xmori.businessdays;

/**
 * Count weekdays in an inclusive date range.
 */
public final class BusinessDays {
    private BusinessDays() {}
    /**
     * Count Monday through Friday in an inclusive date range.
     *
     * The method counts complete weeks in constant time and checks at most six
     * remaining days. Public holidays are not excluded.
     * @param start first included date
     * @param end last included date
     * @return number of weekdays in the range
     * @throws IllegalArgumentException for null or reversed dates
     */
    public static long count(java.time.LocalDate start, java.time.LocalDate end) {
    if (start == null || end == null || start.isAfter(end)) throw new IllegalArgumentException("invalid range");
    long days = java.time.temporal.ChronoUnit.DAYS.between(start, end) + 1;
    long fullWeeks = days / 7;
    long weekdays = fullWeeks * 5;
    for (long i = fullWeeks * 7; i < days; i++) {
        java.time.DayOfWeek day = start.plusDays(i).getDayOfWeek();
        if (day != java.time.DayOfWeek.SATURDAY && day != java.time.DayOfWeek.SUNDAY) weekdays++;
    }
    return weekdays;
}
}
