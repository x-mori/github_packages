# @x-mori/retry-async

Retry an asynchronous operation with bounded backoff.

```js
import { retryAsync } from '@x-mori/retry-async';
const value = await retryAsync(() => fetch('https://example.com'), { attempts: 3, delay: 100 });
```

Node.js 20 or newer. No runtime dependencies.
