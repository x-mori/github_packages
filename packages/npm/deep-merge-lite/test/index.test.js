import test from 'node:test';
import assert from 'node:assert/strict';
import { deepMergeLite } from '../src/index.js';

test('deep-merge-lite', async () => { const a={x:{a:1}}; assert.equal(deepMergeLite(a,{x:{b:2}}).x.a,1); assert.equal(deepMergeLite(a,{x:{b:2}}).x.b,2); });
