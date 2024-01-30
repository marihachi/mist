import React from 'react';
import type { FC } from 'react';
import { api } from '../../models/misskey.js';
import LoginForm from './LoginForm.js';

type Props = {
  onUpdateAccount: (account: { host: string, accessToken: string } | undefined) => void,
  mode: string,
};

const LoginPage: FC<Props> = (props) => {
  return (
    <>
      <LoginForm
        onUpdateAccount={ props.onUpdateAccount }
        mode={ props.mode }
      />
    </>
  );
};
export default LoginPage;
