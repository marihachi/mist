import { loadAccessToken, readCredentials, writeCredentials } from './credential.js';
import { sleep } from './util.js';
import './style.css';

let currentHost = 'misskey.systems';
let accessToken;

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
    if (data.error != null) {
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
