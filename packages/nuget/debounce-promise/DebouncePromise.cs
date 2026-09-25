namespace XMori.DebouncePromise;
/// <summary>Runs only the latest async call after a quiet period.</summary>
/// <typeparam name="TArg">Argument type passed to the action.</typeparam>
/// <typeparam name="TResult">Async result type.</typeparam>
public sealed class AsyncDebouncer<TArg, TResult> {
    private readonly Func<TArg, Task<TResult>> action;
    private readonly TimeSpan delay;
    private readonly object gate = new();
    private CancellationTokenSource? timer;
    private TaskCompletionSource<TResult>? pending;
    /// <summary>Creates a debouncer for one async action.</summary>
    /// <param name="action">Function to run after the quiet period.</param>
    /// <param name="delay">Nonnegative quiet-period duration.</param>
    public AsyncDebouncer(Func<TArg, Task<TResult>> action, TimeSpan delay) {
        this.action = action ?? throw new ArgumentNullException(nameof(action));
        if (delay < TimeSpan.Zero) throw new ArgumentOutOfRangeException(nameof(delay));
        this.delay = delay;
    }
    /// <summary>Schedules the latest argument and returns the shared pending result.</summary>
    /// <param name="argument">Argument for the most recent scheduled call.</param>
    /// <returns>A task shared by callers in the current debounce group.</returns>
    /// <remarks>Another call before the timer fires replaces the argument. Once execution starts, later calls form a new group.</remarks>
    public Task<TResult> RunAsync(TArg argument) {
        lock (gate) {
            timer?.Cancel(); timer?.Dispose();
            timer = new CancellationTokenSource();
            pending ??= new(TaskCreationOptions.RunContinuationsAsynchronously);
            var completion = pending;
            _ = FireAsync(argument, timer.Token, completion);
            return completion.Task;
        }
    }
    private async Task FireAsync(TArg argument, CancellationToken token, TaskCompletionSource<TResult> completion) {
        try {
            await Task.Delay(delay, token).ConfigureAwait(false);
            lock (gate) { if (!ReferenceEquals(pending, completion) || token.IsCancellationRequested) return; pending = null; timer = null; }
            completion.TrySetResult(await action(argument).ConfigureAwait(false));
        } catch (OperationCanceledException) when (token.IsCancellationRequested) { }
        catch (Exception exception) { completion.TrySetException(exception); }
    }
}
