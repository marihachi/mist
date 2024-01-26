import React, { useState } from 'react';
import type { FC } from 'react';
import LoginForm from './LoginForm.js';
import Timeline from './Timeline.js';
import PostForm from './PostForm.js';
import { getCredential } from './credential.js';
import './App.css';

const App: FC<{}> = (props) => {
  const [host, setHost] = useState<string>();
  const [accessToken, setAccessToken] = useState<string>();
  const [mode, setMode] = useState<string>('development');
  // timeline.cancellationToken

  const updateAccount = (host: string, accessToken: string) => {
    setHost(host);
    setAccessToken(accessToken);
  };

  // load credential
  const credential = getCredential(mode, 0);
  if (credential != null) {
    updateAccount(credential.host, credential.accessToken);
  }

  return (
    <div className="container">
      <LoginForm
        host={host}
        accessToken={accessToken}
        mode={mode}
        updateAccount={updateAccount}
      />
      <PostForm
        host={host}
        accessToken={accessToken}
        mode={mode}
      />
      <Timeline
        host={host}
        accessToken={accessToken}
        mode={mode}
      />
    </div>
  );
};

export default App;
