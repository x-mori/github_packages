import test from 'node:test';
import assert from 'node:assert/strict';
import { timeoutPromise } from '../src/index.js';

test('timeout-promise', async () => { assert.equal(await timeoutPromise(Promise.resolve(4), 100), 4); await assert.rejects(timeoutPromise(new Promise(()=>{}), 1), /timed out/); });
