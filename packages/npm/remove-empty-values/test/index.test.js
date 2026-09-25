import test from 'node:test';
import assert from 'node:assert/strict';
import { removeEmptyValues } from '../src/index.js';

test('remove-empty-values', async () => { assert.deepEqual(removeEmptyValues({a:null,b:'',c:0},{emptyStrings:true}), {c:0}); });
