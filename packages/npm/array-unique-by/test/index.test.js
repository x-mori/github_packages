import test from 'node:test';
import assert from 'node:assert/strict';
import { arrayUniqueBy } from '../src/index.js';

test('array-unique-by', async () => { assert.deepEqual(arrayUniqueBy([{id:1},{id:1},{id:2}], 'id').map(x=>x.id), [1,2]); });
