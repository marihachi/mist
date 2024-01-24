export function renderPost(ctx) {
  document.querySelector('#post').hidden = (ctx.accessToken == null);
}

export function setupPost(ctx) {
  document.querySelector('#submit').addEventListener('click', async () => {
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
  });
}
