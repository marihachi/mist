import React from 'react';
import type { FC } from 'react';

type Props = {
  account: { host: string, accessToken: string } | undefined,
};

const SettingPage: FC<Props> = (props) => {
  return (
    <>
      <p>Not implemented</p>
    </>
  );
};
export default SettingPage;
