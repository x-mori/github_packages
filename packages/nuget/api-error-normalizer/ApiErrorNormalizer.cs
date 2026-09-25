using System.Net;
namespace XMori.ApiErrorNormalizer;
public sealed record NormalizedApiError(string Message, int? StatusCode, string Kind);
public static class ApiErrors {
    public static NormalizedApiError Normalize(Exception error) {
        ArgumentNullException.ThrowIfNull(error);
        return error switch {
            HttpRequestException http => new(http.Message, (int?)http.StatusCode, "http"),
            OperationCanceledException => new(error.Message, null, "cancelled"),
            _ => new(error.Message, null, "unknown")
        };
    }
    public static NormalizedApiError FromStatus(HttpStatusCode status, string? message = null) =>
        new(message ?? $"HTTP {(int)status}", (int)status, "http");
}
