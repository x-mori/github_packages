namespace XMori.DebouncePromise;
public sealed class AsyncDebouncer<TArg, TResult> {
    private readonly Func<TArg, Task<TResult>> action;
    private readonly TimeSpan delay;
    private readonly object gate = new();
    private CancellationTokenSource? timer;
    private TaskCompletionSource<TResult>? pending;
    public AsyncDebouncer(Func<TArg, Task<TResult>> action, TimeSpan delay) {
        this.action = action ?? throw new ArgumentNullException(nameof(action));
        if (delay < TimeSpan.Zero) throw new ArgumentOutOfRangeException(nameof(delay));
        this.delay = delay;
    }
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
