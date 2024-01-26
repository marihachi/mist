import aesjs from 'aes-js';

const CredentialsKey = 'MIST_CREDENTIALS';

/**
 * @returns { any[] | undefined } credentials
*/
export function readCredentials(mode: string) {
  const data = localStorage.getItem(CredentialsKey);
  if (data != null) {
    let result;
    try {
      if (mode == 'development') {
        result = JSON.parse(data);
      } else {
        result = JSON.parse(decrypt(data));
      }
    } catch {
      console.error('Failed to read credential');
      return;
    }
    return result;
  }
}

/**
 * @param { any[] } credentials
*/
export function writeCredentials(mode: string, credentials: any) {
  const json = JSON.stringify(credentials);
  let data;
  if (mode == 'development') {
    data = json;
  } else {
    data = encrypt(json);
  }
  localStorage.setItem(CredentialsKey, data);
}

/**
 * @param { string } host
 * @returns { any | undefined } credential
*/
export function getCredential(mode: string, index: number) {
  let credentials = readCredentials(mode);
  if (credentials != null && index < credentials.length) {
    return credentials[index];
  }
}

export function addCredential(mode: string, credential: any) {
  let credentials = readCredentials(mode);
  if (credentials != null) {
    credentials.push(credential);
  } else {
    credentials = [credential];
  }
  writeCredentials(mode, credentials);
}

/**
 * @param { string } host
 * @returns { any | undefined } credential
*/
export function deleteCredentialByHost(mode: string, host: string) {
  let credentials = readCredentials(mode);
  if (credentials == null) return;
  const index = credentials.findIndex((x: any) => x.host == host);
  if (index == -1) return;
  credentials.splice(index, 1);
  writeCredentials(mode, credentials);
}

const key = aesjs.utils.utf8.toBytes('ro3teYBfuxJuipWK3MEcaR3G6fCIqKqd');
const initialCount = 11;

function encrypt(str: string): string {
  const textBytes = aesjs.utils.utf8.toBytes(str);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(initialCount));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  return aesjs.utils.hex.fromBytes(encryptedBytes);
}

function decrypt(hex: string): string {
  const encryptedBytes = aesjs.utils.hex.toBytes(hex);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(initialCount));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}
