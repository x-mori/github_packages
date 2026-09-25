package io.github.xmori.agefromdate;

public final class AgeFromDate {
    private AgeFromDate() {}
    public static int years(java.time.LocalDate birthDate, java.time.LocalDate today) {
    if (birthDate == null || today == null || birthDate.isAfter(today)) throw new IllegalArgumentException("invalid birth date");
    return java.time.Period.between(birthDate, today).getYears();
}
}
