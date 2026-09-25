# @x_mori/array-unique-by

Keep the first item for each selected key.

```js
import { arrayUniqueBy } from '@x_mori/array-unique-by';
const firstPerId = arrayUniqueBy([{ id: 1 }, { id: 1 }], 'id');
```

Node.js 20 or newer. No runtime dependencies.
