import React from 'react';
import type { FC } from 'react';

// import './LoginForm.css';

type Props = {
  host: string | undefined,
  accessToken: string | undefined,
  mode: string,
  updateAccount: (host: string, accessToken: string) => void,
};

const LoginForm: FC<Props> = (props) => {
  return (
    <div></div>
  );
};
export default LoginForm;
