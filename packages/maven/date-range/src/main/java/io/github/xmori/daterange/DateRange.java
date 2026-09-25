package io.github.xmori.daterange;

public final class DateRange {
    private DateRange() {}
    public static java.util.List<java.time.LocalDate> between(java.time.LocalDate start, java.time.LocalDate end, java.time.temporal.ChronoUnit unit) {
    if (start == null || end == null || start.isAfter(end) || !(unit == java.time.temporal.ChronoUnit.DAYS || unit == java.time.temporal.ChronoUnit.WEEKS || unit == java.time.temporal.ChronoUnit.MONTHS)) throw new IllegalArgumentException("invalid range");
    java.util.List<java.time.LocalDate> dates = new java.util.ArrayList<>();
    for (java.time.LocalDate date = start; !date.isAfter(end); date = date.plus(1, unit)) dates.add(date);
    return java.util.List.copyOf(dates);
}
}
