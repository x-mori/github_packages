using System.Collections.Concurrent;
namespace XMori.MemoizeAsync;
public sealed class AsyncMemoizer<TKey, TValue> where TKey : notnull {
    private sealed record Entry(DateTimeOffset Expires, Lazy<Task<TValue>> Value);
    private readonly ConcurrentDictionary<TKey, Entry> entries = new();
    private readonly Func<TKey, Task<TValue>> factory;
    private readonly TimeSpan ttl;
    public AsyncMemoizer(Func<TKey, Task<TValue>> factory, TimeSpan ttl) {
        this.factory = factory ?? throw new ArgumentNullException(nameof(factory));
        if (ttl <= TimeSpan.Zero) throw new ArgumentOutOfRangeException(nameof(ttl));
        this.ttl = ttl;
    }
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
    public void Clear() => entries.Clear();
}
