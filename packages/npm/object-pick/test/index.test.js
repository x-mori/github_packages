import test from 'node:test';
import assert from 'node:assert/strict';
import { objectPick } from '../src/index.js';

test('object-pick', async () => { assert.equal(objectPick({a:1,b:2}, ['a']).a, 1); assert.equal(Object.hasOwn(objectPick({}, ['toString']), 'toString'), false); });
