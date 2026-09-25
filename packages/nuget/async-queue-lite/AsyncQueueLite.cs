namespace XMori.AsyncQueueLite;
/// <summary>Limits how many asynchronous operations run at one time.</summary>
public sealed class AsyncQueue : IDisposable {
    private readonly SemaphoreSlim slots;
    /// <summary>Creates a queue with a positive concurrency limit.</summary>
    /// <param name="concurrency">Maximum simultaneous operations.</param>
    public AsyncQueue(int concurrency) {
        if (concurrency < 1) throw new ArgumentOutOfRangeException(nameof(concurrency));
        slots = new SemaphoreSlim(concurrency, concurrency);
    }
    /// <summary>Waits for a slot, runs the operation, and releases the slot.</summary>
    /// <typeparam name="T">Result type of the operation.</typeparam>
    /// <param name="action">Async operation to run.</param>
    /// <param name="cancellationToken">Cancels waiting for a slot.</param>
    /// <returns>The operation result.</returns>
    /// <remarks>The token cancels the wait; the action controls its own cancellation after it starts.</remarks>
    public async Task<T> EnqueueAsync<T>(Func<Task<T>> action, CancellationToken cancellationToken = default) {
        ArgumentNullException.ThrowIfNull(action);
        await slots.WaitAsync(cancellationToken).ConfigureAwait(false);
        try { return await action().ConfigureAwait(false); }
        finally { slots.Release(); }
    }
    /// <summary>Disposes the semaphore after all queued operations have finished.</summary>
    public void Dispose() => slots.Dispose();
}
