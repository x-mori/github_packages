import test from 'node:test';
import assert from 'node:assert/strict';
import { envRequired } from '../src/index.js';

test('env-required', async () => { assert.deepEqual(envRequired(['A'], {A:'ok'}), {A:'ok'}); assert.throws(() => envRequired('B', {}), /B/); });
