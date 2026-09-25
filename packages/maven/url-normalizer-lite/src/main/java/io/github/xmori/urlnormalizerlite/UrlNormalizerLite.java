package io.github.xmori.urlnormalizerlite;

/**
 * Normalize HTTP URLs and default ports.
 */
public final class UrlNormalizerLite {
    private UrlNormalizerLite() {}
    /**
     * Normalize an absolute HTTP or HTTPS URL without losing raw escapes.
     *
     * The scheme and host become lowercase, dot path segments are normalized,
     * default ports are removed, and an empty path becomes a slash. URLs with
     * embedded credentials are rejected.
     * @param input URL to normalize
     * @return normalized URL text
     * @throws IllegalArgumentException for malformed or unsupported URLs
     */
    public static String normalize(String input) {
        try {
            java.net.URI uri = new java.net.URI(input).normalize();
            String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase(java.util.Locale.ROOT);
            if (!(scheme.equals("http") || scheme.equals("https")) || uri.getHost() == null || uri.getRawUserInfo() != null) throw new IllegalArgumentException("expected an HTTP URL without credentials");
            String host = uri.getHost().toLowerCase(java.util.Locale.ROOT);
            int port = uri.getPort();
            if ((scheme.equals("http") && port == 80) || (scheme.equals("https") && port == 443)) port = -1;
            String path = uri.getRawPath().isEmpty() ? "/" : uri.getRawPath();
            return scheme + "://" + (host.contains(":") ? "[" + host + "]" : host) + (port < 0 ? "" : ":" + port) + path + (uri.getRawQuery() == null ? "" : "?" + uri.getRawQuery()) + (uri.getRawFragment() == null ? "" : "#" + uri.getRawFragment());
        } catch (java.net.URISyntaxException exception) { throw new IllegalArgumentException("invalid URL", exception); }
    }
}
