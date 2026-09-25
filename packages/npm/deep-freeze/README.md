# @x-mori/deep-freeze

Freeze nested arrays and plain objects, including cycles.

```js
import { deepFreeze } from '@x-mori/deep-freeze';
const config = deepFreeze({ nested: { enabled: true } });
```

Node.js 20 or newer. No runtime dependencies.
