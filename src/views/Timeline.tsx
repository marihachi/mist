import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import PostForm from './PostForm.js';
import { api } from '../models/misskey.js';
import { sleep } from '../models/util.js';

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
  username: string,
  host: string | null,
};

const Timeline: FC<Props> = (props) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    let pollingContinued = true;
    (async () => {
      if (props.account == null) return;
      while (pollingContinued) {
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
      pollingContinued = false;
    };
  }, []);

  function renderNote(note: Note) {
    if (note.renote == null) {
      return (
        <>
          {
            note.user.host == null
              ? <div className='note-header'>{ note.user.name } @{ note.user.username }</div>
              : <div className='note-header'>{ note.user.name } @{ note.user.username }@{ note.user.host }</div>
          }
          <div className='note-body'>
            { note.text }
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className='note-header' style={{ color: '#2C5' }}>
            { note.user.name }がリノート
          </div>
          <div className='note-body'>
            @{ note.renote.user.username }: { note.renote.text }
          </div>
        </>
      );
    }
  }

  return (
    <>
      <PostForm
        account={ props.account }
        mode={ props.mode }
      />
      <ul className='timeline-list'>
        {
          notes.map(note =>
            <li key={ note.id } className='note-block'>
              { renderNote(note) }
            </li>
          )
        }
      </ul>
    </>
  );
};
export default Timeline;
