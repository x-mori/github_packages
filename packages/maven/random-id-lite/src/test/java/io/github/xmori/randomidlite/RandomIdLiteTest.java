package io.github.xmori.randomidlite;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RandomIdLiteTest {
    @Test void behavior() { assertEquals(12, RandomIdLite.generate(12).length()); }
}
