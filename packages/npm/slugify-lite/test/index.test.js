import test from 'node:test';
import assert from 'node:assert/strict';
import { slugifyLite } from '../src/index.js';

test('slugify-lite', async () => { assert.equal(slugifyLite(' Café & Tea! '), 'cafe-tea'); });
