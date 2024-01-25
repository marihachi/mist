import { addCredential, deleteCredentialByHost } from './credential.js';
import { authorize } from './misskey.js';
import { setupTimeline, disposeTimeline } from './timeline.js';

export function setupLogin(ctx) {
  renderLogin(ctx);
}

export function disposeLogin(ctx) {
}

export function renderLogin(ctx) {
  if (ctx.accessToken != null) {
    document.querySelector('#login').innerHTML = [
      '<h2>アカウント</h2>',
      '<p id="host-name"></p>',
      '<button id="logout">ログアウト</button>',
    ].join('');
    document.querySelector('#logout').addEventListener('click', () => onClickLogout(ctx));
    document.querySelector('#host-name').innerHTML = `ログイン先: ${ctx.host}`;
  } else {
    document.querySelector('#login').innerHTML = [
      '<h2>アカウント</h2>',
      '<input type="text" id="login-host" placeholder="ホスト名"></input>',
      '<button id="login-submit">ログイン</button>',
      '<p id="login-message"></p>',
    ].join('');
    document.querySelector('#login-submit').addEventListener('click', () => onClickLogin(ctx));
  }
}

async function onClickLogin(ctx) {
  const host = document.querySelector('#login-host').value;

  if (host.length == 0) {
    document.querySelector('#login-message').innerHTML = 'ホスト名を入力してください。';
    return;
  }
  document.querySelector('#login-message').innerHTML = '';

  // make canncellation token
  const cancellationToken = { isCancel: false };

  // start cancellation timer (5 minutes)
  const timer = setTimeout(() => {
    cancellationToken.isCancel = true;
  }, 5 * 60 * 1000);

  // start authorize
  const data = await authorize(host, 'Mist', 'write:notes,read:account', cancellationToken);

  // stop cancellation timer
  clearTimeout(timer);

  if (data.ok) {
    ctx.host = host;
    ctx.accessToken = data.token;

    const credential = {
      host: host,
      accessToken: data.token,
    };

    // save credential
    addCredential(ctx, credential);

    // update view
    renderLogin(ctx);
    setupTimeline(ctx);
  } else {
    document.querySelector('#login-message').innerHTML = 'タイムアウトしました。';
  }
}

async function onClickLogout(ctx) {
  deleteCredentialByHost(ctx, ctx.host);
  ctx.host = undefined;
  ctx.accessToken = undefined;

  // update view
  renderLogin(ctx);
  disposeTimeline(ctx);
}
