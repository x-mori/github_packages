package io.github.xmori.otpgeneratorlite;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
class OtpGeneratorLiteTest {
    @Test void rfc6238Example() {
        assertEquals("94287082", OtpGeneratorLite.generate("12345678901234567890".getBytes(java.nio.charset.StandardCharsets.US_ASCII), java.time.Instant.ofEpochSecond(59), 8, 30));
    }
}
