using System.Collections.Concurrent;
namespace XMori.MemoizeAsync;
/// <summary>Shares in-flight work and caches successful async results by key.</summary>
/// <typeparam name="TKey">Non-null cache key type.</typeparam>
/// <typeparam name="TValue">Cached result type.</typeparam>
public sealed class AsyncMemoizer<TKey, TValue> where TKey : notnull {
    private sealed record Entry(DateTimeOffset Expires, Lazy<Task<TValue>> Value);
    private readonly ConcurrentDictionary<TKey, Entry> entries = new();
    private readonly Func<TKey, Task<TValue>> factory;
    private readonly TimeSpan ttl;
    /// <summary>Creates a memoizer with a positive time-to-live.</summary>
    /// <param name="factory">Async function called on a cache miss.</param>
    /// <param name="ttl">Time-to-live measured from cache entry creation.</param>
    public AsyncMemoizer(Func<TKey, Task<TValue>> factory, TimeSpan ttl) {
        this.factory = factory ?? throw new ArgumentNullException(nameof(factory));
        if (ttl <= TimeSpan.Zero) throw new ArgumentOutOfRangeException(nameof(ttl));
        this.ttl = ttl;
    }
    /// <summary>Returns a cached value or runs the factory once for concurrent callers.</summary>
    /// <param name="key">Key identifying the work.</param>
    /// <returns>The cached or newly computed result.</returns>
    /// <remarks>Failed computations are removed so later calls can retry. Expired entries are replaced on access.</remarks>
    public async Task<TValue> GetAsync(TKey key) {
        while (true) {
            var now = DateTimeOffset.UtcNow;
            if (entries.TryGetValue(key, out var old) && old.Expires > now) return await Resolve(key, old).ConfigureAwait(false);
            var fresh = new Entry(now + ttl, new Lazy<Task<TValue>>(() => factory(key)));
            if (old is null ? entries.TryAdd(key, fresh) : entries.TryUpdate(key, fresh, old)) return await Resolve(key, fresh).ConfigureAwait(false);
        }
    }
    private async Task<TValue> Resolve(TKey key, Entry entry) {
        try { return await entry.Value.Value.ConfigureAwait(false); }
        catch { ((ICollection<KeyValuePair<TKey, Entry>>)entries).Remove(new KeyValuePair<TKey, Entry>(key, entry)); throw; }
    }
    /// <summary>Removes all cached entries; in-flight tasks continue.</summary>
    public void Clear() => entries.Clear();
}
