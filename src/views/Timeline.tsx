import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import PostForm from './PostForm.js';
import { api } from '../models/misskey.js';
import { sleep } from '../models/util.js';

// import './Timeline.css';

type Props = {
  account: { host: string, accessToken: string } | undefined,
  mode: string,
};

const Timeline: FC<Props> = (props) => {
  const [notes, setNotes] = useState<{ id: string, text: string, user: { name: string, username: string } }[]>([]);

  useEffect(() => {
    let cancellationToken = { isCancel: false };
    (async () => {
      if (props.account == null) return;
      //console.log('start timeline');
      while (!cancellationToken.isCancel) {
        try {
          const notes = await api(
            props.account.host,
            'notes/hybrid-timeline',
            props.account.accessToken,
            { limit: 20 });
          setNotes(notes);
        } catch {
          console.error('failed to fetch timeline.');
        }
        await sleep(2000);
      }
      //console.log('timeline stopped');
    })();
    return () => {
      //console.log('stop timeline request');
      cancellationToken.isCancel = true;
    };
  }, []);

  return (
    <>
      <h2>タイムライン</h2>
      <PostForm
        account={ props.account }
        mode={ props.mode }
      />
      <ul>
        {
          notes.map(note =>
            <li key={ note.id } style={{ marginBottom: "0.5rem" }}>
              <div style={{ color: '#AAA' }}>{ note.user.name } @{ note.user.username }</div>
              <div>{ note.text }</div>
            </li>
          )
        }
      </ul>
    </>
  );
};
export default Timeline;
