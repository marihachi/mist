import * as aes from './aes.js';
import './style.css';

let currentHost = 'misskey.systems';
let accessToken;

const CredentialsKey = 'MIST_CREDENTIALS';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @returns { any[] | undefined } credentials
*/
function readCredentials() {
  const source = localStorage.getItem(CredentialsKey);
  if (source != null) {
    const json = aes.decrypt(source);
    return JSON.parse(json);
  }
}

function writeCredentials(credentials) {
  const json = JSON.stringify(credentials);
  localStorage.setItem(CredentialsKey, aes.encrypt(json));
}

function loadAccessToken(host) {
  let credentials = readCredentials();
  console.log(credentials);
  if (credentials != null) {
    const credential = credentials.find(x => x.host == host);
    if (credential != null) {
      return credential.accessToken;
    }
  }
}

function setupLogin() {
  document.querySelector('#login-submit').addEventListener('click', async () => {
    // make session
    const session = crypto.randomUUID();
    open(`https://${currentHost}/miauth/${session}?name=Mist&permission=write:notes`);

    // wait authorize (10 minites)
    let data;
    const startTime = Date.now();
    while (Date.now() < startTime + 10 * 60 * 1000) {
      await sleep(1000);
      const response = await fetch(`https://${currentHost}/api/miauth/${session}/check`, { method: 'POST' });
      data = await response.json();
      if (data.ok) {
        break;
      }
    }

    // finish
    if (data.ok) {
      // save credential
      const credential = {
        host: currentHost,
        accessToken: data.token
      };
      let credentials = readCredentials();
      if (credentials != null) {
        credentials.push(credential);
      } else {
        credentials = [credential];
      }
      writeCredentials(credentials);
      accessToken = data.token;
      document.querySelector('#login-status').innerHTML = 'ログイン済み';
    } else {
      console.log('timeout');
    }
  });
}

function setupPost() {
  document.querySelector('#submit').addEventListener('click', async () => {
    const response = await fetch(`https://${currentHost}/api/notes/create`, {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json'],
      ],
      body: JSON.stringify({
        i: accessToken,
        text: document.querySelector('#text').value,
      }),
    });
    const data = await response.json();
    if (data == null) {
      return;
    }
    document.querySelector('#text').value = '';
  });
}

function setupApp() {
  accessToken = loadAccessToken(currentHost);
  if (accessToken != null) {
    document.querySelector('#login-status').innerHTML = 'ログイン済み';
  } else {
    document.querySelector('#login-status').innerHTML = 'ログインしていません';
  }
  setupLogin();
  setupPost();
}

setupApp();
