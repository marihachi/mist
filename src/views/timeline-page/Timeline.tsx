import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { api } from '../../models/misskey.js';
import { sleep } from '../../models/util.js';
import type { I18n } from '../../models/i18n.js';

type Props = {
  i18n: I18n,
  account: { host: string, accessToken: string } | undefined,
  timelineKind: string,
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

    let endpoint;
    switch (props.timelineKind) {
      case 'home':
        endpoint = 'notes/timeline';
        break;

      case 'local':
        endpoint = 'notes/local-timeline';
        break;

      case 'social':
        endpoint = 'notes/hybrid-timeline';
        break;

      default:
        console.error('invalid timeline kind.');
        return;
    }

    (async () => {
      if (props.account == null) return;
      while (pollingContinued) {
        try {
          const notes = await api(
            props.account.host,
            endpoint,
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
          <div className='note-header'>
            { props.i18n.get('was-renote-message', [note.user.name]) }
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
      <ul className='timeline-list'>
        {
          notes.map(note =>
            <li key={ note.id } className={ note.renote != null ? 'note-block renote' : 'note-block' }>
              { renderNote(note) }
            </li>
          )
        }
      </ul>
    </>
  );
};
export default Timeline;
