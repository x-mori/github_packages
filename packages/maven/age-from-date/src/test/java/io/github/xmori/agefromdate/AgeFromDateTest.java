package io.github.xmori.agefromdate;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AgeFromDateTest {
    @Test void behavior() { assertEquals(17, AgeFromDate.years(java.time.LocalDate.of(2008,12,1), java.time.LocalDate.of(2026,1,1))); }
}
