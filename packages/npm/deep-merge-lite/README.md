# @x-mori/deep-merge-lite

Merge plain objects without mutating inputs.

```js
import { deepMergeLite } from '@x-mori/deep-merge-lite';
const merged = deepMergeLite({ db: { host: 'a' } }, { db: { port: 5432 } });
```

Node.js 20 or newer. No runtime dependencies.
