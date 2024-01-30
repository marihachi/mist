import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { tryLogin } from '../../models/login.js';

type Props = {
  onUpdateAccount: (account: { host: string, accessToken: string } | undefined) => void,
  mode: string,
};

const LoginForm: FC<Props> = (props) => {
  const [message, setMessage] = useState('');
  const [hostName, setHostName] = useState('');
  const [hasSession, setHasSession] = useState(false);
  const [isCancelEnabled, setIsCancelEnabled] = useState(true);

  let cancellationToken: { isCancel: boolean } | undefined;

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
    setIsCancelEnabled(true);
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
    setIsCancelEnabled(false);
    cancellationToken.isCancel = true;
  };

  return (
    <>
      <h2>Misskeyサーバーにログイン</h2>
      <input
        type="text"
        className='login-host'
        placeholder="ホスト名"
        value={ hostName }
        onChange={ e => setHostName(e.target.value) }
      />
      {
        hasSession
          ? <button onClick={ onClickCancel } disabled={ !isCancelEnabled }>キャンセル</button>
          : <button onClick={ onClickLogin }>ログイン</button>
      }
      {
        message != null &&
        <p>{ message }</p>
      }
    </>
  );
};
export default LoginForm;
