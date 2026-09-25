namespace XMori.FetchTimeout;
public static class TimedFetch {
    public static async Task<HttpResponseMessage> GetAsync(HttpClient client, Uri uri, TimeSpan timeout, CancellationToken cancellationToken = default) {
        ArgumentNullException.ThrowIfNull(client); ArgumentNullException.ThrowIfNull(uri);
        if (timeout <= TimeSpan.Zero) throw new ArgumentOutOfRangeException(nameof(timeout));
        using var linked = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        linked.CancelAfter(timeout);
        return await client.GetAsync(uri, linked.Token).ConfigureAwait(false);
    }
}
