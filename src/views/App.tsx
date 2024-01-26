import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import LoginForm from './LoginForm.js';
import Timeline from './Timeline.js';
import { getCredential } from '../models/credential.js';
import './App.css';

const mode = 'production';

let initialized = false;

const App: FC = () => {
  const [account, setAccount] = useState<{ host: string, accessToken: string }>();

  useEffect(() => {
    if (initialized) return;
    initialized = true;

    // load credential
    const credential = getCredential(mode, 0);
    if (credential != null) {
      setAccount({
        host: credential.host,
        accessToken: credential.accessToken,
      });
    }
  }, []);

  return (
    <div className="container">
      <LoginForm
        account={ account }
        onUpdateAccount={ x => setAccount(x) }
        mode={ mode }
      />
      {
        account != null &&
        <Timeline
          account={ account }
          mode={ mode }
        />
      }
    </div>
  );
};

export default App;
