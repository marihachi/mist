import React from 'react';
import type { FC } from 'react';
import { deleteCredentialByHost } from '../models/credential.js';

type Props = {
  account: { host: string, accessToken: string } | undefined,
  onUpdateAccount: (account: { host: string, accessToken: string } | undefined) => void,
  mode: string,
};

const AccountInfo: FC<Props> = (props) => {
  const onClickLogout = () => {
    if (props.account == null) return;
    deleteCredentialByHost(props.mode, props.account.host);
    props.onUpdateAccount(undefined);
  };

  if (props.account == null) {
    return (<></>);
  }

  return (
    <div className='account-info'>
      <div className='server-name-label'>
        ログイン先: { props.account.host }
      </div>
      <button onClick={ onClickLogout }>
        { props.i18n.get('logout') }
      </button>
    </div>
  );
};
export default AccountInfo;
