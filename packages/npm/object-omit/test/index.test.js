import test from 'node:test';
import assert from 'node:assert/strict';
import { objectOmit } from '../src/index.js';

test('object-omit', async () => { assert.equal(objectOmit({a:1,b:2}, ['a']).b, 2); assert.equal(Object.hasOwn(objectOmit({a:1}, ['a']), 'a'), false); });
