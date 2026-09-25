package io.github.xmori.joinurl;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class JoinUrlTest {
    @Test void behavior() { assertEquals("https://example.com/a/b", JoinUrl.join("https://example.com/a/", "/b/")); }
}
