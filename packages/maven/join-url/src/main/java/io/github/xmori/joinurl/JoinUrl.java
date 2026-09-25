package io.github.xmori.joinurl;

/**
 * Join URL path segments without duplicate separators.
 */
public final class JoinUrl {
    private JoinUrl() {}
    /**
     * Append path segments to an absolute base URL.
     *
     * Duplicate boundary slashes are removed while the base query and fragment are
     * preserved. Segment text is expected to be URL-safe path content.
     * @param base absolute URL without credentials
     * @param segments path segments to append
     * @return URL with joined path
     * @throws IllegalArgumentException for missing or invalid input
     */
    public static String join(String base, String... segments) {
        if (base == null || base.isBlank()) throw new IllegalArgumentException("base URL is required");
        java.net.URI uri = java.net.URI.create(base);
        if (uri.getScheme() == null || uri.getHost() == null || uri.getRawUserInfo() != null) throw new IllegalArgumentException("absolute base URL without credentials is required");
        StringBuilder path = new StringBuilder(uri.getRawPath() == null ? "" : uri.getRawPath());
        for (String segment : segments) {
            if (segment == null) throw new IllegalArgumentException("null segment");
            String clean = segment.replaceAll("^/+|/+$", "");
            if (!clean.isEmpty()) { if (path.length() == 0 || path.charAt(path.length() - 1) != '/') path.append('/'); path.append(clean); }
        }
        String result = uri.getScheme() + "://" + uri.getRawAuthority() + path + (uri.getRawQuery() == null ? "" : "?" + uri.getRawQuery()) + (uri.getRawFragment() == null ? "" : "#" + uri.getRawFragment());
        java.net.URI.create(result);
        return result;
    }
}
