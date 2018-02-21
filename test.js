const test = require('tape');
const baseUuid = require('./');

const uuid1 = '00000000-0000-4000-8000-000000000000';
const uuid2 = 'ffffffff-ffff-4fff-bfff-ffffffffffff';

const base62 = baseUuid(62); // Create a base62 encoder/decoder

test('baseUuid typechecks', function(t) {
  t.equal(typeof baseUuid, 'function');
  t.equal(typeof base62.encode, 'function');
  t.equal(typeof base62.decode, 'function');
  t.equal(typeof base62.decodePlain, 'function');
  t.equal(typeof base62.base, 'number');
  t.end();
});

test('Encodes and decodes UUIDs', function(t) {
  const encoded1 = base62.encode(uuid1); // 1vGeH72LxVtxKg
  const encoded2 = base62.encode(uuid2); // 7N42dgm5pw9utfkXp3nwyH
  const decoded1 = base62.decode(encoded1);
  const decoded2 = base62.decode(encoded2);
  const plain = base62.decodePlain(encoded1);

  t.equal(base62.base, 62);
  t.equal(decoded1, uuid1);
  t.equal(decoded2, uuid2);
  t.equal(plain.length, 32);
  t.end();
});

test('Throws with bad radix', function (t) {
  t.plan(2);
  t.throws(function () {
    baseUuid(8);
  });
  t.throws(function () {
    baseUuid(68);
  });
});
