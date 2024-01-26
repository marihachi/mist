import { api } from './misskey.js';
import { sleep } from './util.js';

export async function setupTimeline(ctx) {
  // update view
  renderPostForm(ctx);
  renderTimeline(ctx, []);

  if (ctx.accessToken != null) {
    document.querySelector('#timeline').hidden = false;
    // start polling
    ctx.timeline.cancellationToken = { isCancel: false };
    while (!ctx.timeline.cancellationToken.isCancel) {
      try {
      const notes = await api(ctx.host, 'notes/hybrid-timeline', ctx.accessToken, {});
      await renderTimeline(ctx, notes);
      } catch {
        console.error('failed to fetch timeline.');
      }
      if (ctx.timeline.cancellationToken.isCancel) break;
      await sleep(2000);
    }
  }
}

export function disposeTimeline(ctx) {
  // stop polling
  if (ctx.timeline.cancellationToken != null) {
    ctx.timeline.cancellationToken.isCancel = true;
  }

  // update view
  document.querySelector('#timeline').hidden = true;
  renderPostForm(ctx);
}

export async function renderTimeline(ctx, notes) {
  if (ctx.accessToken != null) {
    document.querySelector('#timeline').innerHTML = '<ul></ul>';
    for (const note of notes) {
      const noteElement = document.createElement("li");
      noteElement.id = `note-${note.id}`;
      noteElement.innerHTML = `<p>${note.text}</p>`;
      document.querySelector('#timeline > ul').appendChild(noteElement);
    }
  } else {
    document.querySelector('#timeline').innerHTML = '';
  }
}

export function renderPostForm(ctx) {
  // post form
  if (ctx.accessToken != null) {
    document.querySelector('#post').innerHTML = [
      '<h2>タイムライン</h2>',
      '<div id="post-container">',
      '<textarea id="text"></textarea>',
      '<button id="submit">投稿</button>',
      '</div>',
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
