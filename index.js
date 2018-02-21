const baseX = require('base-x');

const minBase = 16;
const maxBase = 64;

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
const format = /(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/;
const length = 32;

const _encode = (baseN, str) => {
  const buffer = Buffer.from(str.replace(/-/g, ''), 'hex');
  return baseN.encode(buffer).replace(/^0+/, '');
};

const _decodePlain = (baseN, str) => {
  const buffer = Buffer.from(baseN.decode(str));
  return buffer.toString('hex').padStart(length, '0');
};

const _decode = (baseN, str) => _decodePlain(baseN, str).replace(format, '$1-$2-$3-$4-$5');

module.exports = (base = maxBase) => {
  base = Math.max(minBase, Math.min(maxBase, 0 | base));

  const baseN = baseX(chars.substr(0, base));
  const encode = (str) => _encode(baseN, str);
  const decode = (str) => _decode(baseN, str);
  const decodePlain = (str) => _decodePlain(baseN, str);

  return { base, encode, decode, decodePlain };
};
