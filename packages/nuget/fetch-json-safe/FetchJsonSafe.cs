using System.Net;
using System.Net.Http.Json;
namespace XMori.FetchJsonSafe;
/// <summary>Describes the result of an HTTP JSON GET.</summary>
/// <param name="Success">Whether the response succeeded and JSON was read.</param>
/// <param name="Data">Deserialized payload on success.</param>
/// <param name="Status">HTTP status when a response was received.</param>
/// <param name="Error">Failure message, if any.</param>
/// <typeparam name="T">Expected JSON payload type.</typeparam>
public sealed record JsonFetchResult<T>(bool Success, T? Data, HttpStatusCode? Status, string? Error);
/// <summary>Fetches and deserializes JSON into a consistent result object.</summary>
public static class JsonFetch {
    /// <summary>Gets JSON and returns data or a structured error.</summary>
    /// <typeparam name="T">Expected response body type.</typeparam>
    /// <param name="client">HTTP client used for the request.</param>
    /// <param name="uri">Absolute request URI.</param>
    /// <param name="cancellationToken">Token that cancels the request.</param>
    /// <returns>Success, data, status, and any error message.</returns>
    /// <remarks>Non-success HTTP status, network errors, and JSON errors become failure results. Caller cancellation still throws.</remarks>
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
