# @x_mori/env-required

Require named environment variables with useful errors.

```js
import { envRequired } from '@x_mori/env-required';
const { DATABASE_URL } = envRequired('DATABASE_URL');
```

Node.js 20 or newer. No runtime dependencies.
