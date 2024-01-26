import React, { useState } from 'react';
import type { FC } from 'react';
import { authorize } from './misskey.js';
import { addCredential, deleteCredentialByHost } from './credential.js';

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

    // make canncellation token
    const cancellationToken = { isCancel: false };

    // start cancellation timer (5 minutes)
    const timer = setTimeout(() => {
      cancellationToken.isCancel = true;
    }, 5 * 60 * 1000);

    // start authorize
    const data = await authorize(hostName, 'Mist', 'write:notes,read:account', cancellationToken);

    // stop cancellation timer
    clearTimeout(timer);

    if (data.ok) {
      const account = {
        host: hostName,
        accessToken: data.token,
      };

      // save credential
      addCredential(props.mode, account);

      props.onUpdateAccount(account);
    } else {
      setMessage('ログイン処理がタイムアウトしました。ページをリロードしてください。');
    }
  };

  const onClickLogout = () => {
    if (props.account == null) return;
    deleteCredentialByHost(props.mode, props.account.host);
    props.onUpdateAccount(undefined);
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
