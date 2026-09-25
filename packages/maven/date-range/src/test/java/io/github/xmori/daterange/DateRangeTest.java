package io.github.xmori.daterange;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class DateRangeTest {
    @Test void behavior() { assertEquals(3, DateRange.between(java.time.LocalDate.of(2026,1,1), java.time.LocalDate.of(2026,1,3), java.time.temporal.ChronoUnit.DAYS).size()); }
}
