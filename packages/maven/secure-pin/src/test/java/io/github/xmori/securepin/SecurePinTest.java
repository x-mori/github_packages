package io.github.xmori.securepin;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class SecurePinTest {
    @Test void behavior() { assertTrue(SecurePin.generate(6).matches("[0-9]{6}")); }
}
