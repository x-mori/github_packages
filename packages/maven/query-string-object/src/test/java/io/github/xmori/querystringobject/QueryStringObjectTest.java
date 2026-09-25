package io.github.xmori.querystringobject;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class QueryStringObjectTest {
    @Test void behavior() { assertEquals(java.util.List.of("1", "2"), QueryStringObject.parse("a=1&a=2").get("a")); }
}
