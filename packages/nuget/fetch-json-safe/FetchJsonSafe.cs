using System.Net;
using System.Net.Http.Json;
namespace XMori.FetchJsonSafe;
public sealed record JsonFetchResult<T>(bool Success, T? Data, HttpStatusCode? Status, string? Error);
public static class JsonFetch {
    public static async Task<JsonFetchResult<T>> GetAsync<T>(HttpClient client, Uri uri, CancellationToken cancellationToken = default) {
        ArgumentNullException.ThrowIfNull(client); ArgumentNullException.ThrowIfNull(uri);
        try {
            using var response = await client.GetAsync(uri, cancellationToken).ConfigureAwait(false);
            if (!response.IsSuccessStatusCode) return new(false, default, response.StatusCode, $"HTTP {(int)response.StatusCode}");
            var data = await response.Content.ReadFromJsonAsync<T>(cancellationToken: cancellationToken).ConfigureAwait(false);
            return new(true, data, response.StatusCode, null);
        } catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested) { throw; }
        catch (Exception exception) when (exception is HttpRequestException or System.Text.Json.JsonException or NotSupportedException) {
            return new(false, default, null, exception.Message);
        }
    }
}
