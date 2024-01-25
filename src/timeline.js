import { api } from './misskey.js';

export function renderPost(ctx) {
  if (ctx.accessToken != null) {
    document.querySelector('#post').innerHTML = [
      '<h2>タイムライン</h2>',
      '<textarea id="text"></textarea>',
      '<button id="submit">投稿</button>',
    ].join('');
    document.querySelector('#submit').addEventListener('click', () => onClickPost(ctx));
  } else {
    document.querySelector('#post').innerHTML = '';
  }
}

async function onClickPost(ctx) {
  const data = await api(ctx.host, 'notes/create', ctx.accessToken, {
    text: document.querySelector('#text').value,
  });
  if (data.error != null) {
    return;
  }
  document.querySelector('#text').value = '';
}
