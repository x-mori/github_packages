# @x_mori/object-omit

Copy an object without selected own properties.

```js
import { objectOmit } from '@x_mori/object-omit';
const publicUser = objectOmit({ id: 1, password: 'x' }, ['password']);
```

Node.js 20 or newer. No runtime dependencies.
