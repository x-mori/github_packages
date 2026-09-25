# @x_mori/flatten-object

Flatten nested plain objects into dot paths.

```js
import { flattenObject } from '@x_mori/flatten-object';
const flat = flattenObject({ db: { host: 'localhost' } }); // {'db.host':'localhost'}
```

Node.js 20 or newer. No runtime dependencies.
