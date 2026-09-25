namespace XMori.RateLimitMemory;
public sealed class MemoryRateLimiter {
    private readonly Dictionary<string, (DateTimeOffset Start, int Count)> entries = new();
    private readonly object gate = new();
    private readonly int limit;
    private readonly TimeSpan window;
    public MemoryRateLimiter(int limit, TimeSpan window) {
        if (limit < 1 || window <= TimeSpan.Zero) throw new ArgumentOutOfRangeException(nameof(limit));
        this.limit = limit; this.window = window;
    }
    public bool TryAcquire(string key, DateTimeOffset? now = null) {
        ArgumentNullException.ThrowIfNull(key);
        var time = now ?? DateTimeOffset.UtcNow;
        lock (gate) {
            if (!entries.TryGetValue(key, out var state) || time - state.Start >= window) state = (time, 0);
            if (state.Count >= limit) return false;
            entries[key] = (state.Start, state.Count + 1);
            return true;
        }
    }
    public int RemoveExpired(DateTimeOffset? now = null) {
        var time = now ?? DateTimeOffset.UtcNow;
        lock (gate) { var keys = entries.Where(pair => time - pair.Value.Start >= window).Select(pair => pair.Key).ToArray(); foreach (var key in keys) entries.Remove(key); return keys.Length; }
    }
}
