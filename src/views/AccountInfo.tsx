import React from 'react';
import type { FC, MutableRefObject } from 'react';
import { deleteCredentialByHost } from '../models/credential.js';
import type { I18n } from '../models/i18n.js';

type Props = {
  i18n: MutableRefObject<I18n>,
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
        { props.i18n.current.get('server') }: { props.account.host }
      </div>
      <button onClick={ onClickLogout }>
        { props.i18n.current.get('do-logout') }
      </button>
    </div>
  );
};
export default AccountInfo;
