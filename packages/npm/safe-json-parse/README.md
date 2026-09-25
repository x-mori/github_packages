# @x_mori/safe-json-parse

Return JSON data or a parse error without throwing.

```js
import { safeJsonParse } from '@x_mori/safe-json-parse';
const { data, error } = safeJsonParse('{"ok":true}');
```

Node.js 20 or newer. No runtime dependencies.
