package io.github.xmori.humanduration;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class HumanDurationTest {
    @Test void behavior() { assertEquals("1h 2m", HumanDuration.format(3720000)); }
}
