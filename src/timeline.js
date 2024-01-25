import { api } from './misskey.js';

export function renderPostForm(ctx) {
  if (ctx.accessToken != null) {
    document.querySelector('#post').innerHTML = [
      '<h2>タイムライン</h2>',
      '<textarea id="text"></textarea>',
      '<button id="submit">投稿</button>',
    ].join('');
    document.querySelector('#submit').addEventListener('click', () => onClickPostButton(ctx));
  } else {
    document.querySelector('#post').innerHTML = '';
  }
}

async function onClickPostButton(ctx) {
  const data = await api(ctx.host, 'notes/create', ctx.accessToken, {
    text: document.querySelector('#text').value,
  });
  if (data.error != null) {
    return;
  }
  document.querySelector('#text').value = '';
}

export async function renderTimeline(ctx) {
  document.querySelector('#timeline').innerHTML = '<ul></ul>';
  if (ctx.accessToken != null) {
    const notes = await api(ctx.host, 'notes/timeline', ctx.accessToken, {});
    for (const note of notes) {
      const noteElement = document.createElement("li");
      noteElement.id = `note-${note.id}`;
      noteElement.innerHTML = `<p>${note.text}</p>`;
      document.querySelector('#timeline > ul').appendChild(noteElement);
    }
  }
}
