using System.Net;
namespace XMori.FetchRetry;
public static class RetryingFetch {
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
