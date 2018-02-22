# base-uuid
[![GitHub license](https://img.shields.io/github/license/teabore/base-uuid.svg?style=flat-square)](https://github.com/teabore/base-uuid)
[![NPM Package](https://img.shields.io/npm/v/base-uuid.svg?style=flat-square)](https://www.npmjs.org/package/base-uuid)
[![Build Status](https://img.shields.io/travis/teabore/base-uuid.svg?branch=master&style=flat-square)](https://travis-ci.org/teabore/base-uuid)

Simple UUID shortener

## Installation

```shell
npm install base-uuid
```

## Usage
```js
const baseUuid = require('base-uuid');

const base62 = baseUuid(62); // Create a base62 encoder/decoder

// UUIDs
const uuid1 = '00000000-0000-4000-8000-000000000000';
const uuid2 = 'ffffffff-ffff-4fff-bfff-ffffffffffff';

// Shorten UUIDs
const encoded1 = base62.encode(uuid1); // 1vGeH72LxVtxKg
const encoded2 = base62.encode(uuid2); // 7N42dgm5pw9utfkXp3nwyH

// Decode shortened UUIDs
const decoded1 = base62.decode(encoded1); // 00000000-0000-4000-8000-000000000000
const decoded2 = base62.decode(encoded2); // ffffffff-ffff-4fff-bfff-ffffffffffff
```

## API
`const baseN = baseUuid([radix])`
Creates an encoder/decoder using `radix`. The default radix is 64.

`const str = baseN.encode(uuid)`
Creates a shortened UUID string.

`const uuid = baseN.decode(str)`
Decodes a shortened UUID.

`const uuid = baseN.decodePlain(str)`
Like `decode` but produces UUID without dashes.

`baseN.base`
Radix of the shortener, integer between 16...64.

## Credit

Based on [uuid-base62](https://github.com/dmarcelino/uuid-base62)

## License
[MIT](LICENSE)
