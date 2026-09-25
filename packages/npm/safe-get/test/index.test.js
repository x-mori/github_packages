import test from 'node:test';
import assert from 'node:assert/strict';
import { safeGet } from '../src/index.js';

test('safe-get', async () => { assert.equal(safeGet({a:{b:0}}, 'a.b', 9), 0); assert.equal(safeGet({}, 'a.b', 9), 9); });
