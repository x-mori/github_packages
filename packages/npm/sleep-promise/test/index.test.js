import test from 'node:test';
import assert from 'node:assert/strict';
import { sleepPromise } from '../src/index.js';

test('sleep-promise', async () => { await sleepPromise(0); const c=new AbortController(); c.abort(); await assert.rejects(sleepPromise(1,{signal:c.signal})); });
