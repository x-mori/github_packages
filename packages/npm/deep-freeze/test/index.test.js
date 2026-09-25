import test from 'node:test';
import assert from 'node:assert/strict';
import { deepFreeze } from '../src/index.js';

test('deep-freeze', async () => { const x={child:{n:1}}; deepFreeze(x); assert.equal(Object.isFrozen(x.child), true); });
