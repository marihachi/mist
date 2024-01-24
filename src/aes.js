import aesjs from 'aes-js';

const key = aesjs.utils.utf8.toBytes('ro3teYBfuxJuipWK3MEcaR3G6fCIqKqd');

export function encrypt(str) {
  const textBytes = aesjs.utils.utf8.toBytes(str);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(11));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  return aesjs.utils.hex.fromBytes(encryptedBytes);
}

export function decrypt(hex) {
  const encryptedBytes = aesjs.utils.hex.toBytes(hex);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(11));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}
