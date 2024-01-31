import React, { useState } from 'react';
import type { FC, MutableRefObject } from 'react';
import { api } from '../../models/misskey.js';
import type { I18n } from '../../models/i18n.js';

type Props = {
  i18n: MutableRefObject<I18n>,
  account: { host: string, accessToken: string } | undefined,
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
      <div className='post-form'>
        <div className='post-textarea-outer'>
          <textarea className='post-textarea' value={ text } onChange={ e => setText(e.target.value) } />
        </div>
        <button className='post-button' onClick={ onClickPost }>{ props.i18n.current.get('do-note') }</button>
      </div>
    </>
  );
};
export default PostForm;
