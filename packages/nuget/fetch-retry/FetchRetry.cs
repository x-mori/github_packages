using System.Net;
namespace XMori.FetchRetry;
/// <summary>Retries idempotent HTTP GET requests after transient failures.</summary>
public static class RetryingFetch {
    /// <summary>Retries a GET after HTTP 429, HTTP 5xx, or a network request exception.</summary>
    /// <param name="client">HTTP client used for every attempt.</param>
    /// <param name="uri">Absolute request URI.</param>
    /// <param name="attempts">Maximum number of requests, including the first.</param>
    /// <param name="delay">Initial wait between attempts; later waits double up to 30 seconds.</param>
    /// <param name="cancellationToken">Token that cancels the request or backoff wait.</param>
    /// <returns>The final response, including non-success responses; the caller must dispose it.</returns>
    /// <remarks>Failed responses before the final attempt are disposed. This API only sends GET requests.</remarks>
    public static async Task<HttpResponseMessage> GetAsync(HttpClient client, Uri uri, int attempts = 3, TimeSpan? delay = null, CancellationToken cancellationToken = default) {
        ArgumentNullException.ThrowIfNull(client); ArgumentNullException.ThrowIfNull(uri);
        if (attempts < 1) throw new ArgumentOutOfRangeException(nameof(attempts));
        var wait = delay ?? TimeSpan.FromMilliseconds(200);
        if (wait < TimeSpan.Zero) throw new ArgumentOutOfRangeException(nameof(delay));
        for (int attempt = 1; ; attempt++) {
            HttpResponseMessage? response = null;
            try {
                response = await client.GetAsync(uri, cancellationToken).ConfigureAwait(false);
                if (attempt == attempts || !(response.StatusCode == HttpStatusCode.TooManyRequests || (int)response.StatusCode >= 500)) return response;
            } catch (HttpRequestException) when (attempt < attempts) { }
            response?.Dispose();
            await Task.Delay(wait, cancellationToken).ConfigureAwait(false);
            wait = TimeSpan.FromMilliseconds(Math.Min(wait.TotalMilliseconds * 2, 30_000));
        }
    }
}
