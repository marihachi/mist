import React, { useState } from 'react';
import type { FC } from 'react';
import { api } from '../models/misskey.js';

// import './PostForm.css';

type Props = {
  account: { host: string, accessToken: string } | undefined,
  mode: string,
};

const PostForm: FC<Props> = (props) => {
  const [text, setText] = useState('');

  const onClickPost = async () => {
    if (props.account == null) return;
    const data = await api(props.account.host, 'notes/create', props.account.accessToken, {
      text: text,
    });
    if (data.error != null) {
      return;
    }
    setText('');
  };

  return (
    <>
      <div>
        <textarea value={ text } onChange={ e => setText(e.target.value) } />
        <button onClick={ onClickPost }>投稿</button>
      </div>
    </>
  );
};
export default PostForm;
