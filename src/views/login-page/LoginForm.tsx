import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { tryLogin } from '../../models/login.js';
import type { I18n } from '../../models/i18n.js';

type Props = {
  i18n: I18n,
  onUpdateAccount: (account: { host: string, accessToken: string } | undefined) => void,
  mode: string,
};

let cancellationToken: { isCancel: boolean } | undefined;

const LoginForm: FC<Props> = (props) => {
  const [message, setMessage] = useState('');
  const [hostName, setHostName] = useState('');
  const [hasSession, setHasSession] = useState(false);
  const [isCancelEnabled, setIsCancelEnabled] = useState(true);

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
      setMessage(props.i18n.get('please-input-hostname'));
      return;
    }
    setMessage('');
    // make canncellation token
    cancellationToken = { isCancel: false };
    setHasSession(true);
    setIsCancelEnabled(true);
    const result = await tryLogin(props.mode, hostName, cancellationToken, props.i18n);
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
      <h2>{ props.i18n.get('connect-misskey-server') }</h2>
      <input
        type="text"
        className='login-host'
        placeholder={ props.i18n.get('hostname') }
        value={ hostName }
        onChange={ e => setHostName(e.target.value) }
      />
      {
        hasSession
          ? <button onClick={ onClickCancel } disabled={ !isCancelEnabled }>{ props.i18n.get('do-cancel') }</button>
          : <button onClick={ onClickLogin }>{ props.i18n.get('do-login') }</button>
      }
      {
        message != null &&
        <p>{ message }</p>
      }
    </>
  );
};
export default LoginForm;
