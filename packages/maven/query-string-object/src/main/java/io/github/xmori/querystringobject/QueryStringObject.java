package io.github.xmori.querystringobject;

public final class QueryStringObject {
    private QueryStringObject() {}
    public static java.util.Map<String, java.util.List<String>> parse(String query) {
    if (query == null) throw new IllegalArgumentException("query is required");
    java.util.Map<String, java.util.List<String>> result = new java.util.LinkedHashMap<>();
    String raw = query.startsWith("?") ? query.substring(1) : query;
    if (raw.isEmpty()) return result;
    for (String pair : raw.split("&", -1)) {
        String[] parts = pair.split("=", 2);
        String key = java.net.URLDecoder.decode(parts[0], java.nio.charset.StandardCharsets.UTF_8);
        String value = java.net.URLDecoder.decode(parts.length == 2 ? parts[1] : "", java.nio.charset.StandardCharsets.UTF_8);
        result.computeIfAbsent(key, ignored -> new java.util.ArrayList<>()).add(value);
    }
    return result;
}
public static String encode(java.util.Map<String, java.util.List<String>> values) {
    java.util.List<String> parts = new java.util.ArrayList<>();
    values.forEach((key, list) -> list.forEach(value -> parts.add(java.net.URLEncoder.encode(key, java.nio.charset.StandardCharsets.UTF_8) + "=" + java.net.URLEncoder.encode(value, java.nio.charset.StandardCharsets.UTF_8))));
    return String.join("&", parts);
}
}
