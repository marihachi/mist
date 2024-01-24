export function renderPost(ctx) {
  if (ctx.accessToken != null) {
    document.querySelector('#post').innerHTML = `
      <h2>投稿フォーム</h2>
      <textarea id="text"></textarea>
      <button id="submit">投稿</button>
    `;
    document.querySelector('#submit').addEventListener('click', () => onClickPost(ctx));
  } else {
    document.querySelector('#post').innerHTML = '';
  }
}

async function onClickPost(ctx) {
  const response = await fetch(`https://${ctx.currentHost}/api/notes/create`, {
    method: 'POST',
    headers: [
      ['Content-Type', 'application/json'],
    ],
    body: JSON.stringify({
      i: ctx.accessToken,
      text: document.querySelector('#text').value,
    }),
  });
  const data = await response.json();
  if (data.error != null) {
    return;
  }
  document.querySelector('#text').value = '';
}
