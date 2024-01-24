import { readCredentials, writeCredentials } from './credential.js';
import { sleep } from './util.js';

export function renderLogin(ctx) {
  document.querySelector('#login-status').innerHTML = (ctx.accessToken != null) ? 'ログイン済み' : 'ログインしていません';
  document.querySelector('#logout').disabled = (ctx.accessToken == null);
  document.querySelector('#login-submit').disabled = (ctx.accessToken != null);
}

export function setupLogin(ctx) {
  document.querySelector('#login-submit').addEventListener('click', async () => {
    // make session
    const session = crypto.randomUUID();
    open(`https://${ctx.currentHost}/miauth/${session}?name=Mist&permission=write:notes`);

    // wait authorize (10 minites)
    let data;
    const startTime = Date.now();
    while (Date.now() < startTime + 5 * 60 * 1000) {
      await sleep(2000);
      const response = await fetch(`https://${ctx.currentHost}/api/miauth/${session}/check`, { method: 'POST' });
      data = await response.json();
      if (data.ok) {
        break;
      }
    }

    if (data.ok) {
      const credential = {
        host: ctx.currentHost,
        accessToken: data.token
      };
      let credentials = readCredentials();
      if (credentials != null) {
        credentials.push(credential);
      } else {
        credentials = [credential];
      }
      writeCredentials(credentials);
      ctx.accessToken = data.token;
      renderLogin(ctx);
      renderPost(ctx);
    } else {
      console.error('timeout');
    }
  });

  document.querySelector('#logout').addEventListener('click', async () => {
    writeCredentials([]);
    ctx.accessToken = undefined;
    renderLogin(ctx);
    renderPost(ctx);
  });
}
