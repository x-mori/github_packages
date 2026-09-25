# @x_mori/object-pick

Copy selected own properties into a new object.

```js
import { objectPick } from '@x_mori/object-pick';
const publicUser = objectPick({ id: 1, password: 'x' }, ['id']);
```

Node.js 20 or newer. No runtime dependencies.
