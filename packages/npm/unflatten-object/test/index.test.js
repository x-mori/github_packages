import test from 'node:test';
import assert from 'node:assert/strict';
import { unflattenObject } from '../src/index.js';

test('unflatten-object', async () => { assert.equal(unflattenObject({'a.b':2}).a.b,2); assert.throws(() => unflattenObject({'__proto__.x':1})); const leaf={x:1}; assert.throws(() => unflattenObject({a:leaf,'a.b':2})); assert.deepEqual(leaf,{x:1}); });
