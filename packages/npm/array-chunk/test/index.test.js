import test from 'node:test';
import assert from 'node:assert/strict';
import { arrayChunk } from '../src/index.js';

test('array-chunk', async () => { assert.deepEqual(arrayChunk([1,2,3],2), [[1,2],[3]]); assert.throws(() => arrayChunk([],0)); });
