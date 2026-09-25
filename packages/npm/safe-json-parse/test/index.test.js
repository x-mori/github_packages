import test from 'node:test';
import assert from 'node:assert/strict';
import { safeJsonParse } from '../src/index.js';

test('safe-json-parse', async () => { assert.equal(safeJsonParse('{"x":1}').data.x, 1); assert.ok(safeJsonParse('{').error instanceof SyntaxError); });
