import test from 'node:test';
import assert from 'node:assert/strict';
import { retryAsync } from '../src/index.js';

test('retry-async', async () => { let calls=0; assert.equal(await retryAsync(() => { if (++calls < 3) throw Error('wait'); return 7; }), 7); assert.equal(calls, 3); });
