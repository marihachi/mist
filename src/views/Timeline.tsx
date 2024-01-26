import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import PostForm from './PostForm.js';

// import './Timeline.css';

type Props = {
  account: { host: string, accessToken: string } | undefined,
  mode: string,
};

const Timeline: FC<Props> = (props) => {
  const [notes, setNotes] = useState<string[]>([]);
  useEffect(() => {
    console.log('start timeline');
    //setNotes(['aaa', 'bbb']);
    return () => {
      console.log('dispose timeline');
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
