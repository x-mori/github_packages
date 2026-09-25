# @x-mori/remove-empty-values

Remove null, undefined, and optional empty strings.

```js
import { removeEmptyValues } from '@x-mori/remove-empty-values';
const clean = removeEmptyValues({ name: '', age: 0 }, { emptyStrings: true });
```

Node.js 20 or newer. No runtime dependencies.
