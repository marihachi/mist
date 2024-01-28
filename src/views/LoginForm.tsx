import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { deleteCredentialByHost } from '../models/credential.js';
import { tryLogin } from '../models/login.js';

// import './LoginForm.css';

type Props = {
  account: { host: string, accessToken: string } | undefined,
  onUpdateAccount: (account: { host: string, accessToken: string } | undefined) => void,
  mode: string,
};

let cancellationToken: { isCancel: boolean } | undefined;

const LoginForm: FC<Props> = (props) => {
  const [message, setMessage] = useState('');
  const [hostName, setHostName] = useState('');
  const [hasSession, setHasSession] = useState(false);
  const [isCancelEnable, setIsCancelEnable] = useState(true);

  useEffect(() => {
    return () => {
      // dispose login session
      if (cancellationToken != null) {
        cancellationToken.isCancel = true;
      }
    };
  }, []);

  const onClickLogin = async () => {
    if (hostName.length == 0) {
      setMessage('ホスト名を入力してください。');
      return;
    }
    setMessage('');
    // make canncellation token
    cancellationToken = { isCancel: false };
    setHasSession(true);
    setIsCancelEnable(true);
    const result = await tryLogin(props.mode, hostName, cancellationToken);
    if (result.ok) {
      props.onUpdateAccount(result.account);
    } else {
      setMessage(result.message);
    }
    setHasSession(false);
  };

  const onClickCancel = () => {
    if (cancellationToken == null) return;
    setIsCancelEnable(false);
    cancellationToken.isCancel = true;
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
        <div className='account-header'>
          <p>ログイン先: { props.account.host }</p>
          <button onClick={ onClickLogout }>
            ログアウト
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>アカウント</h2>
        <input
          type="text"
          className='login-host'
          placeholder="ホスト名"
          value={ hostName }
          onChange={ e => setHostName(e.target.value) }
        />
        {
          hasSession
            ? <button onClick={ onClickCancel } disabled={ !isCancelEnable }>キャンセル</button>
            : <button onClick={ onClickLogin }>ログイン</button>
        }
        {
          message != null &&
          <p>{ message }</p>
        }
      </>
    );
  }
};
export default LoginForm;
