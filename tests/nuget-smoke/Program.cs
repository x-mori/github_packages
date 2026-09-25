using System.Net;
using System.Net.Http;
using System.Text;

static void Check(bool value, string name)
{
    if (!value) throw new Exception($"NuGet smoke test failed: {name}");
}

Check(XMori.IsPrivateIp.IpClassifier.IsPrivate("10.0.0.1"), "private IP");
Check(!XMori.IsPrivateIp.IpClassifier.IsPrivate("8.8.8.8"), "public IP");
Check(XMori.ApiErrorNormalizer.ApiErrors.FromStatus(HttpStatusCode.NotFound).StatusCode == 404, "API error");

using (var handler = new StubHandler(call => new HttpResponseMessage(call == 1 ? HttpStatusCode.ServiceUnavailable : HttpStatusCode.OK)))
using (var client = new HttpClient(handler))
using (var response = await XMori.FetchRetry.RetryingFetch.GetAsync(client, new Uri("https://example.com"), 2, TimeSpan.Zero))
    Check(response.IsSuccessStatusCode && handler.Calls == 2, "HTTP retry");

using (var handler = new StubHandler(_ => new HttpResponseMessage(HttpStatusCode.OK) { Content = new StringContent("{\"value\":7}", Encoding.UTF8, "application/json") }))
using (var client = new HttpClient(handler))
{
    var result = await XMori.FetchJsonSafe.JsonFetch.GetAsync<Payload>(client, new Uri("https://example.com"));
    Check(result.Success && result.Data?.Value == 7, "JSON fetch");
}

using (var client = new HttpClient(new SlowHandler()))
{
    try
    {
        using var response = await XMori.FetchTimeout.TimedFetch.GetAsync(client, new Uri("https://example.com"), TimeSpan.FromMilliseconds(10));
        throw new Exception("timeout did not fire");
    }
    catch (OperationCanceledException) { }
}

var limiter = new XMori.RateLimitMemory.MemoryRateLimiter(1, TimeSpan.FromMinutes(1));
Check(limiter.TryAcquire("x") && !limiter.TryAcquire("x"), "rate limiter");

var debounce = new XMori.DebouncePromise.AsyncDebouncer<int, int>(x => Task.FromResult(x), TimeSpan.FromMilliseconds(10));
var first = debounce.RunAsync(1);
var second = debounce.RunAsync(2);
Check(await first == 2 && await second == 2, "debounce");

using (var queue = new XMori.AsyncQueueLite.AsyncQueue(1))
    Check(await queue.EnqueueAsync(() => Task.FromResult(5)) == 5, "async queue");

int calls = 0;
var memo = new XMori.MemoizeAsync.AsyncMemoizer<int, int>(x => Task.FromResult(x + ++calls), TimeSpan.FromMinutes(1));
Check(await memo.GetAsync(1) == await memo.GetAsync(1) && calls == 1, "memoizer");
Console.WriteLine("All nine NuGet package smoke tests passed.");

sealed record Payload(int Value);
sealed class StubHandler(Func<int, HttpResponseMessage> respond) : HttpMessageHandler
{
    public int Calls { get; private set; }
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken) =>
        Task.FromResult(respond(++Calls));
}
sealed class SlowHandler : HttpMessageHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        await Task.Delay(TimeSpan.FromSeconds(1), cancellationToken);
        return new HttpResponseMessage(HttpStatusCode.OK);
    }
}
