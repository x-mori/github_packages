package io.github.xmori.emailnormalizer;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EmailNormalizerTest {
    @Test void behavior() { assertEquals("Jane@sample.com", EmailNormalizer.normalize(" Jane@SAMPLE.COM ")); }
}
