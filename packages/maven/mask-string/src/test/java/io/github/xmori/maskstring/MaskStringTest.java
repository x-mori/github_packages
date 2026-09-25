package io.github.xmori.maskstring;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MaskStringTest {
    @Test void behavior() { assertEquals("***123", MaskString.of("abc123", 3, '*')); }
}
