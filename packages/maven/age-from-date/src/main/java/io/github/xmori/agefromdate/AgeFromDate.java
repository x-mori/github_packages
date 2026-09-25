package io.github.xmori.agefromdate;

/**
 * Calculate full years since a birth date.
 */
public final class AgeFromDate {
    private AgeFromDate() {}
    /**
     * Calculate completed years between a birth date and today.
     *
     * This uses calendar dates, so a birthday later in the current year does not
     * count yet. The caller supplies today to make the result time-zone explicit.
     * @param birthDate date of birth
     * @param today date on which to calculate age
     * @return completed years
     * @throws IllegalArgumentException for null or future birth dates
     */
    public static int years(java.time.LocalDate birthDate, java.time.LocalDate today) {
    if (birthDate == null || today == null || birthDate.isAfter(today)) throw new IllegalArgumentException("invalid birth date");
    return java.time.Period.between(birthDate, today).getYears();
}
}
