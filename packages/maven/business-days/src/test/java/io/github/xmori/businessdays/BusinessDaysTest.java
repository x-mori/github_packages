package io.github.xmori.businessdays;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class BusinessDaysTest {
    @Test void behavior() { assertEquals(5, BusinessDays.count(java.time.LocalDate.of(2026,1,5), java.time.LocalDate.of(2026,1,11))); }
}
