import aesjs from 'aes-js';

const CredentialsKey = 'MIST_CREDENTIALS';

/**
 * @returns { any[] | undefined } credentials
*/
export function readCredentials() {
  const source = localStorage.getItem(CredentialsKey);
  if (source != null) {
    const json = decrypt(source);
    return JSON.parse(json);
  }
}
/**
 * @param { any[] } credentials
*/
export function writeCredentials(credentials) {
  const json = JSON.stringify(credentials);
  localStorage.setItem(CredentialsKey, encrypt(json));
}

/**
 * @param { string } host
 * @returns { string | undefined } access token
*/
export function loadAccessToken(host) {
  let credentials = readCredentials();
  if (credentials != null) {
    const credential = credentials.find(x => x.host == host);
    if (credential != null) {
      return credential.accessToken;
    }
  }
}

const key = aesjs.utils.utf8.toBytes('ro3teYBfuxJuipWK3MEcaR3G6fCIqKqd');

function encrypt(str) {
  const textBytes = aesjs.utils.utf8.toBytes(str);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(11));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  return aesjs.utils.hex.fromBytes(encryptedBytes);
}

function decrypt(hex) {
  const encryptedBytes = aesjs.utils.hex.toBytes(hex);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(11));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}
