# @x_mori/timeout-promise

Set a deadline for a promise result.

```js
import { timeoutPromise } from '@x_mori/timeout-promise';
const value = await timeoutPromise(fetch('https://example.com'), 2000);
```

Node.js 20 or newer. No runtime dependencies.
