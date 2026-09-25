import test from 'node:test';
import assert from 'node:assert/strict';
import { flattenObject } from '../src/index.js';

test('flatten-object', async () => { assert.equal(flattenObject({a:{b:2}})['a.b'], 2); assert.throws(() => flattenObject({'a.b':1})); });
