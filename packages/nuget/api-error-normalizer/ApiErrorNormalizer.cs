using System.Net;
namespace XMori.ApiErrorNormalizer;
/// <summary>A common error shape for HTTP and other exceptions.</summary>
/// <param name="Message">Human-readable error text.</param>
/// <param name="StatusCode">HTTP status when known.</param>
/// <param name="Kind">HTTP, cancellation, or unknown category.</param>
public sealed record NormalizedApiError(string Message, int? StatusCode, string Kind);
/// <summary>Converts common request failures to a stable error record.</summary>
public static class ApiErrors {
    /// <summary>Classifies an exception without discarding its message or HTTP status.</summary>
    /// <param name="error">Exception to classify.</param>
    /// <returns>A normalized error record.</returns>
    public static NormalizedApiError Normalize(Exception error) {
        ArgumentNullException.ThrowIfNull(error);
        return error switch {
            HttpRequestException http => new(http.Message, (int?)http.StatusCode, "http"),
            OperationCanceledException => new(error.Message, null, "cancelled"),
            _ => new(error.Message, null, "unknown")
        };
    }
    /// <summary>Builds a normalized error from an HTTP status code.</summary>
    /// <param name="status">HTTP status code.</param>
    /// <param name="message">Optional caller-facing message.</param>
    /// <returns>An HTTP-category error record.</returns>
    public static NormalizedApiError FromStatus(HttpStatusCode status, string? message = null) =>
        new(message ?? $"HTTP {(int)status}", (int)status, "http");
}
