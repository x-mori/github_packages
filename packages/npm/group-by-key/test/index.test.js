import test from 'node:test';
import assert from 'node:assert/strict';
import { groupByKey } from '../src/index.js';

test('group-by-key', async () => { assert.deepEqual(groupByKey([{x:1},{x:1},{x:2}], 'x').get(1).length, 2); });
