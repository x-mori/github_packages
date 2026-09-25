package io.github.xmori.relativetimelite;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RelativeTimeLiteTest {
    @Test void behavior() { assertEquals("5 minutes ago", RelativeTimeLite.format(java.time.Instant.EPOCH, java.time.Instant.EPOCH.plusSeconds(300))); }
}
