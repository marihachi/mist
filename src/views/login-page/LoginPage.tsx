import React from 'react';
import type { FC, MutableRefObject } from 'react';
import type { I18n } from '../../models/i18n.js';
import LoginForm from './LoginForm.js';

type Props = {
  i18n: MutableRefObject<I18n>,
  onUpdateAccount: (account: { host: string, accessToken: string } | undefined) => void,
  mode: string,
};

const LoginPage: FC<Props> = (props) => {
  return (
    <>
      <LoginForm
        i18n={ props.i18n }
        onUpdateAccount={ props.onUpdateAccount }
        mode={ props.mode }
      />
    </>
  );
};
export default LoginPage;
