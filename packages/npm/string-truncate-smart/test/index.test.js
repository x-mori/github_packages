import test from 'node:test';
import assert from 'node:assert/strict';
import { stringTruncateSmart } from '../src/index.js';

test('string-truncate-smart', async () => { assert.equal(stringTruncateSmart('hello world', 8), 'hello…'); assert.equal(stringTruncateSmart('abc', 3), 'abc'); });
