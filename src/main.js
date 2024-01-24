import { loadAccessToken, readCredentials, writeCredentials } from './credential.js';
import { sleep } from './util.js';
import './style.css';

let currentHost = 'misskey.systems';
let accessToken;

function renderLogin() {
  document.querySelector('#login-status').innerHTML = (accessToken != null) ? 'ログイン済み' : 'ログインしていません';
  document.querySelector('#logout').disabled = (accessToken == null);
  document.querySelector('#login-submit').disabled = (accessToken != null);
}

function renderPost() {
  document.querySelector('#post').hidden = (accessToken == null);
}

function setupLogin() {
  document.querySelector('#login-submit').addEventListener('click', async () => {
    // make session
    const session = crypto.randomUUID();
    open(`https://${currentHost}/miauth/${session}?name=Mist&permission=write:notes`);

    // wait authorize (10 minites)
    let data;
    const startTime = Date.now();
    while (Date.now() < startTime + 5 * 60 * 1000) {
      await sleep(2000);
      const response = await fetch(`https://${currentHost}/api/miauth/${session}/check`, { method: 'POST' });
      data = await response.json();
      if (data.ok) {
        break;
      }
    }

    if (data.ok) {
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
      renderLogin();
      renderPost();
    } else {
      console.error('timeout');
    }
  });

  document.querySelector('#logout').addEventListener('click', async () => {
    writeCredentials([]);
    accessToken = undefined;
    renderLogin();
    renderPost();
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

accessToken = loadAccessToken(currentHost);

renderLogin();
renderPost();

setupLogin();
setupPost();
