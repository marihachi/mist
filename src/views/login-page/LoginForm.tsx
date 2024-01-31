import React, { useEffect, useRef, useState } from 'react';
import type { FC, MutableRefObject } from 'react';
import { tryLogin } from '../../models/login.js';
import type { I18n } from '../../models/i18n.js';

type Props = {
  i18n: MutableRefObject<I18n>,
  onUpdateAccount: (account: { host: string, accessToken: string } | undefined) => void,
  mode: string,
};

const LoginForm: FC<Props> = (props) => {
  const cancellationToken = useRef<{ isCancel: boolean } | undefined>();

  const [message, setMessage] = useState('');
  const [hostName, setHostName] = useState('');
  const [hasSession, setHasSession] = useState(false);
  const [isCancelEnabled, setIsCancelEnabled] = useState(true);

  useEffect(() => {
    return () => {
      // dispose login session
      if (cancellationToken.current != null) {
        cancellationToken.current.isCancel = true;
      }
    };
  }, []);

  const onClickLogin = async () => {
    if (hostName.length == 0) {
      setMessage(props.i18n.current.get('please-input-hostname'));
      return;
    }
    setMessage('');
    // make canncellation token
    cancellationToken.current = { isCancel: false };
    setHasSession(true);
    setIsCancelEnabled(true);
    const result = await tryLogin(props.mode, hostName, cancellationToken.current, props.i18n.current);
    if (result.ok) {
      props.onUpdateAccount(result.account);
    } else {
      setMessage(result.message);
    }
    setHasSession(false);
  };

  const onClickCancel = () => {
    if (cancellationToken.current == null) return;
    setIsCancelEnabled(false);
    cancellationToken.current.isCancel = true;
  };

  return (
    <>
      <h2>{ props.i18n.current.get('connect-misskey-server') }</h2>
      <input
        type="text"
        className='login-host'
        placeholder={ props.i18n.current.get('hostname') }
        value={ hostName }
        onChange={ e => setHostName(e.target.value) }
      />
      {
        hasSession
          ? <button onClick={ onClickCancel } disabled={ !isCancelEnabled }>{ props.i18n.current.get('do-cancel') }</button>
          : <button onClick={ onClickLogin }>{ props.i18n.current.get('do-login') }</button>
      }
      {
        message != null &&
        <p>{ message }</p>
      }
    </>
  );
};
export default LoginForm;
