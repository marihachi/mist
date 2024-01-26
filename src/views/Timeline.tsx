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
  const [notes, setNotes] = useState<string[]>([]);

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
            {});
          setNotes(notes.map((x: any) => x.text));
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
            <li>{ note }</li>
          )
        }
      </ul>
    </>
  );
};
export default Timeline;
