package io.github.xmori.striptrackingparams;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class StripTrackingParamsTest {
    @Test void behavior() { assertEquals("https://example.com/?q=x", StripTrackingParams.strip("https://example.com/?utm_source=y&q=x")); }
}
