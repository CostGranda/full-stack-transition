import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { hashPassword, verifyPassword } from '@/lib/auth/session';

describe('auth helpers', () => {
  it('hashes and verifies user passwords', () => {
    const password = 'secret-password';
    const hash = hashPassword(password);

    assert.notEqual(hash, password);
    assert.equal(verifyPassword(password, hash), true);
    assert.equal(verifyPassword('wrong-password', hash), false);
  });
});
