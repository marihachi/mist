import * as aes from './aes.js';

const CredentialsKey = 'MIST_CREDENTIALS';

/**
 * @returns { any[] | undefined } credentials
*/
export function readCredentials() {
  const source = localStorage.getItem(CredentialsKey);
  if (source != null) {
    const json = aes.decrypt(source);
    return JSON.parse(json);
  }
}

export function writeCredentials(credentials) {
  const json = JSON.stringify(credentials);
  localStorage.setItem(CredentialsKey, aes.encrypt(json));
}

export function loadAccessToken(host) {
  let credentials = readCredentials();
  if (credentials != null) {
    const credential = credentials.find(x => x.host == host);
    if (credential != null) {
      return credential.accessToken;
    }
  }
}
