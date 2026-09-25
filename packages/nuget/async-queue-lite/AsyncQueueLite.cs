namespace XMori.AsyncQueueLite;
public sealed class AsyncQueue : IDisposable {
    private readonly SemaphoreSlim slots;
    public AsyncQueue(int concurrency) {
        if (concurrency < 1) throw new ArgumentOutOfRangeException(nameof(concurrency));
        slots = new SemaphoreSlim(concurrency, concurrency);
    }
    public async Task<T> EnqueueAsync<T>(Func<Task<T>> action, CancellationToken cancellationToken = default) {
        ArgumentNullException.ThrowIfNull(action);
        await slots.WaitAsync(cancellationToken).ConfigureAwait(false);
        try { return await action().ConfigureAwait(false); }
        finally { slots.Release(); }
    }
    public void Dispose() => slots.Dispose();
}
