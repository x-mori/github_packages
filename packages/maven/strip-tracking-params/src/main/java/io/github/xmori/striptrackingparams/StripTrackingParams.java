package io.github.xmori.striptrackingparams;

public final class StripTrackingParams {
    private StripTrackingParams() {}
    public static String strip(String input) {
    try {
        java.net.URI uri = new java.net.URI(input);
        if (uri.getScheme() == null || uri.getHost() == null) throw new IllegalArgumentException("absolute URL required");
        String query = uri.getRawQuery();
        if (query == null) return input;
        java.util.List<String> kept = new java.util.ArrayList<>();
        for (String pair : query.split("&", -1)) {
            String key = pair.split("=", 2)[0].toLowerCase(java.util.Locale.ROOT);
            if (!key.startsWith("utm_") && !java.util.Set.of("fbclid", "gclid", "msclkid").contains(key)) kept.add(pair);
        }
        String raw = kept.isEmpty() ? null : String.join("&", kept);
        String value = input.substring(0, input.indexOf('?')) + (raw == null ? "" : "?" + raw);
        return uri.getRawFragment() == null ? value : value.replace("#" + uri.getRawFragment(), "") + "#" + uri.getRawFragment();
    } catch (java.net.URISyntaxException exception) { throw new IllegalArgumentException("invalid URL", exception); }
}
}
