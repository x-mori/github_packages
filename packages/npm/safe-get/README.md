# @x_mori/safe-get

Read a nested own property with a fallback.

```js
import { safeGet } from '@x_mori/safe-get';
const port = safeGet({ db: { port: 5432 } }, 'db.port', 3000);
```

Node.js 20 or newer. No runtime dependencies.
