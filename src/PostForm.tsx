import React from 'react';
import type { FC } from 'react';

// import './PostForm.css';

type Props = {
  host: string | undefined,
  accessToken: string | undefined,
  mode: string,
};

const PostForm: FC<Props> = (props) => {
  const post = () => {
    // TODO
  };

  return (
    <>
      <div>
        <textarea id="text"></textarea>
        <button onClick={ post }>投稿</button>
      </div>
    </>
  );
};
export default PostForm;
