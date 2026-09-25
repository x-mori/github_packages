package io.github.xmori.urlnormalizerlite;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UrlNormalizerLiteTest {
    @Test void behavior() { assertEquals("https://example.com/a", UrlNormalizerLite.normalize("HTTPS://EXAMPLE.COM:443/a")); }
}
