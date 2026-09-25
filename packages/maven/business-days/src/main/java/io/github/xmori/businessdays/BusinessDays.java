package io.github.xmori.businessdays;

public final class BusinessDays {
    private BusinessDays() {}
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
