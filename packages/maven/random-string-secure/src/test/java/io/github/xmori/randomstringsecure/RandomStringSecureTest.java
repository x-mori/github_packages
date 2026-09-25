package io.github.xmori.randomstringsecure;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RandomStringSecureTest {
    @Test void behavior() { assertTrue(RandomStringSecure.generate(16, "ab").matches("[ab]{16}")); }
}
