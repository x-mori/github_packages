package io.github.xmori.initialsfromname;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class InitialsFromNameTest {
    @Test void behavior() { assertEquals("JS", InitialsFromName.of("John Smith")); }
}
