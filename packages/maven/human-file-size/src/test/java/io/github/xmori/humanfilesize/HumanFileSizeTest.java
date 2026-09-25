package io.github.xmori.humanfilesize;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class HumanFileSizeTest {
    @Test void behavior() { assertEquals("1.5 KB", HumanFileSize.format(1500, false)); }
}
