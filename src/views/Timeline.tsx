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

type Note = {
  id: string,
  text: string,
  user: User,
  renote?: Note,
};

type User = {
  name: string,
  username: string
};

const Timeline: FC<Props> = (props) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    let isContinued = false;
    (async () => {
      if (props.account == null) return;
      while (!isContinued) {
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
        await sleep(1000);
      }
    })();
    return () => {
      isContinued = true;
    };
  }, []);

  return (
    <>
      <h2>タイムライン</h2>
      <PostForm
        account={ props.account }
        mode={ props.mode }
      />
      <ul className='timeline-list'>
        {
          notes.map(note =>
            <li key={ note.id } className='note-block'>
              <div className='note-header'>
                {
                  note.renote != null
                    ? `${note.user.name}がリノート`
                    : `${note.user.name} @${note.user.username}`
                }
              </div>
              <div className='note-body'>
                {
                  note.renote != null
                    ? `@${note.renote.user.username}: ` + note.renote.text
                    : note.text
                }
              </div>
            </li>
          )
        }
      </ul>
    </>
  );
};
export default Timeline;
