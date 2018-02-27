const baseX = require('base-x');

const minBase = 16;
const maxBase = 64;

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
const format = /(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/;
const size = 32;

const padNative = (str, char, size) => str.padStart(size, char);

const padShim = (str, char, size) => size - str.length > 0 ? (char).repeat(size - str.length) + str : str;

const padFn = String.prototype.padStart ? padNative : padShim;

const pad = (str, size) => padFn.call(this, str, '0', size);

const _encode = (baseN, uuid) => {
  const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
  return baseN.encode(buffer).replace(/^0+/, '');
};

const _decodePlain = (baseN, str) => {
  const buffer = Buffer.from(baseN.decode(str));
  const uuid = buffer.toString('hex');
  return pad(uuid, size);
};

const _decode = (baseN, str) => _decodePlain(baseN, str).replace(format, '$1-$2-$3-$4-$5');

module.exports = (base) => {
  base = 0 | base || maxBase;

  if (base < minBase || base > maxBase) {
    throw new Error(`Base must be between ${minBase} and ${maxBase}`);
  }

  const baseN = baseX(chars.substr(0, base));
  const encode = (str) => _encode(baseN, str);
  const decode = (str) => _decode(baseN, str);
  const decodePlain = (str) => _decodePlain(baseN, str);

  return { base, encode, decode, decodePlain };
};
