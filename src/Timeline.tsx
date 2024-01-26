import React from 'react';
import type { FC } from 'react';
import PostForm from './PostForm.js';

// import './Timeline.css';

type Props = {
  host: string | undefined,
  accessToken: string | undefined,
  mode: string,
};

const Timeline: FC<Props> = (props) => {
  return (
    <>
      <h2>タイムライン</h2>
      <PostForm
        host={props.host}
        accessToken={props.accessToken}
        mode={props.mode}
      />
      <ul>
      </ul>
    </>
  );
};
export default Timeline;
