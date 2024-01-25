import { readCredentials, writeCredentials } from './credential.js';
import { authorize } from './misskey.js';
import { renderPost } from './timeline.js';

export function renderLogin(ctx) {
  if (ctx.accessToken != null) {
    document.querySelector('#login').innerHTML = [
      '<h2>アカウント</h2>',
      '<button id="logout">ログアウト</button>',
    ].join('');
    document.querySelector('#logout').addEventListener('click', () => onClickLogout(ctx));
  } else {
    document.querySelector('#login').innerHTML = [
      '<h2>アカウント</h2>',
      '<p>今のところログイン先はmisskey.systemsだけです。</p>',
      '<input type="text" id="login-host" placeholder="ホスト名"></input>',
      '<button id="login-submit">ログイン</button>',
    ].join('');
    document.querySelector('#login-submit').addEventListener('click', () => onClickLogin(ctx));
  }
}

async function onClickLogin(ctx) {
  // make canncellation token
  const cancellationToken = { isCancel: false };

  // start cancellation timer (5 minutes)
  const timer = setTimeout(() => {
    cancellationToken.isCancel = true;
  }, 5 * 60 * 1000);

  // start authorize
  const data = await authorize(ctx.currentHost, 'Mist', 'write:notes', cancellationToken);

  // stop cancellation timer
  clearTimeout(timer);

  if (data.ok) {
    ctx.accessToken = data.token;

    const credential = {
      host: ctx.currentHost,
      accessToken: data.token,
    };

    // save credential
    let credentials = readCredentials();
    if (credentials != null) {
      credentials.push(credential);
    } else {
      credentials = [credential];
    }
    writeCredentials(credentials);

    // update view
    renderLogin(ctx);
    renderPost(ctx);
  } else {
    console.error('timeout');
  }
}

async function onClickLogout(ctx) {
  writeCredentials([]);
  ctx.accessToken = undefined;

  // update view
  renderLogin(ctx);
  renderPost(ctx);
}
