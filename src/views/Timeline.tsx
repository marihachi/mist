import React, { useEffect } from 'react';
import type { FC } from 'react';
import PostForm from './PostForm.js';

// import './Timeline.css';

type Props = {
  account: { host: string, accessToken: string } | undefined,
  mode: string,
};

const Timeline: FC<Props> = (props) => {
  useEffect(() => {
    console.log('start timeline');
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
      </ul>
    </>
  );
};
export default Timeline;
