namespace XMori.RateLimitMemory;
/// <summary>Tracks a fixed-window request limit per string key in memory.</summary>
/// <remarks>State is local to one process. Call RemoveExpired to reclaim inactive keys.</remarks>
public sealed class MemoryRateLimiter {
    private readonly Dictionary<string, (DateTimeOffset Start, int Count)> entries = new();
    private readonly object gate = new();
    private readonly int limit;
    private readonly TimeSpan window;
    /// <summary>Creates a limiter with a maximum count and window length.</summary>
    /// <param name="limit">Positive number of allowed requests per key and window.</param>
    /// <param name="window">Positive window duration.</param>
    public MemoryRateLimiter(int limit, TimeSpan window) {
        if (limit < 1 || window <= TimeSpan.Zero) throw new ArgumentOutOfRangeException(nameof(limit));
        this.limit = limit; this.window = window;
    }
    /// <summary>Consumes one slot for a key when its current window has capacity.</summary>
    /// <param name="key">Caller-defined identity to limit.</param>
    /// <param name="now">Optional clock value, useful for deterministic tests.</param>
    /// <returns>True when the request is allowed; false when the limit is reached.</returns>
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
    /// <summary>Removes key entries whose fixed window has expired.</summary>
    /// <param name="now">Optional clock value.</param>
    /// <returns>The number of removed entries.</returns>
    public int RemoveExpired(DateTimeOffset? now = null) {
        var time = now ?? DateTimeOffset.UtcNow;
        lock (gate) { var keys = entries.Where(pair => time - pair.Value.Start >= window).Select(pair => pair.Key).ToArray(); foreach (var key in keys) entries.Remove(key); return keys.Length; }
    }
}
