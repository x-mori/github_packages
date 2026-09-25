package io.github.xmori.passwordstrengthlite;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PasswordStrengthLiteTest {
    @Test void behavior() { assertTrue(PasswordStrengthLite.analyze("short").score() < PasswordStrengthLite.analyze("aVeryLongPassword123!").score()); }
}
