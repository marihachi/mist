import React, { useState } from 'react';
import type { FC } from 'react';

// import './LoginForm.css';

type Props = {
  host: string | undefined,
  accessToken: string | undefined,
  mode: string,
  updateAccount: (host: string | undefined, accessToken: string | undefined) => void,
};

const LoginForm: FC<Props> = (props) => {
  const [message, setMessage] = useState('');

  const login = () => {
    // TODO
    setMessage('未実装です！');
  };

  const logout = () => {
    // TODO
    props.updateAccount(undefined, undefined);
  };

  if (props.accessToken != null) {
    return (
      <>
        <h2>アカウント</h2>
        <p>ログイン先: { props.host }</p>
        <button onClick={ logout }>ログアウト</button>
      </>
    );
  } else {
    return (
      <>
        <h2>アカウント</h2>
        <input type="text" placeholder="ホスト名"></input>
        <button onClick={ login }>ログイン</button>
        { message != null && <p>{ message }</p> }
      </>
    );
  }
};
export default LoginForm;
