namespace XMori.FetchTimeout;
/// <summary>Adds a per-request deadline to HTTP GET operations.</summary>
public static class TimedFetch {
    /// <summary>Sends a GET request and cancels it when the deadline expires.</summary>
    /// <param name="client">HTTP client used for the request.</param>
    /// <param name="uri">Absolute request URI.</param>
    /// <param name="timeout">Positive timeout for this request.</param>
    /// <param name="cancellationToken">Optional caller cancellation token.</param>
    /// <returns>The HTTP response, which the caller must dispose.</returns>
    /// <remarks>Cancellation throws OperationCanceledException. The client may also enforce its own, shorter timeout.</remarks>
    public static async Task<HttpResponseMessage> GetAsync(HttpClient client, Uri uri, TimeSpan timeout, CancellationToken cancellationToken = default) {
        ArgumentNullException.ThrowIfNull(client); ArgumentNullException.ThrowIfNull(uri);
        if (timeout <= TimeSpan.Zero) throw new ArgumentOutOfRangeException(nameof(timeout));
        using var linked = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        linked.CancelAfter(timeout);
        return await client.GetAsync(uri, linked.Token).ConfigureAwait(false);
    }
}
