import React, { useState } from 'react';
import type { FC } from 'react';
import { deleteCredentialByHost } from '../models/credential.js';
import { tryLogin } from '../models/login.js';

// import './LoginForm.css';

type Props = {
  account: { host: string, accessToken: string } | undefined,
  onUpdateAccount: (account: { host: string, accessToken: string } | undefined) => void,
  mode: string,
};

const LoginForm: FC<Props> = (props) => {
  const [message, setMessage] = useState('');
  const [hostName, setHostName] = useState('');

  const onClickLogin = async () => {
    if (hostName.length == 0) {
      setMessage('ホスト名を入力してください。');
      return;
    }
    setMessage('');
    const result = await tryLogin(props.mode, hostName);
    if (result.ok) {
      props.onUpdateAccount(result.account);
    } else {
      setMessage(result.message);
    }
  };

  const onClickLogout = () => {
    if (props.account == null) return;
    deleteCredentialByHost(props.mode, props.account.host);
    props.onUpdateAccount(undefined);
    setMessage('');
    setHostName('');
  };

  if (props.account != null) {
    return (
      <>
        <h2>アカウント</h2>
        <p>ログイン先: { props.account.host }</p>
        <button onClick={ onClickLogout }>
          ログアウト
        </button>
      </>
    );
  } else {
    return (
      <>
        <h2>アカウント</h2>
        <input
          type="text"
          placeholder="ホスト名"
          value={ hostName }
          onChange={ e => setHostName(e.target.value) }
        />
        <button onClick={ onClickLogin }>ログイン</button>
        {
          message != null &&
          <p>{ message }</p>
        }
      </>
    );
  }
};
export default LoginForm;
