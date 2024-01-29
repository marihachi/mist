import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import LoginForm from './LoginForm.js';
import Timeline from './Timeline.js';
import { getCredential } from '../models/credential.js';
import './App.css';
import AccountInfo from './AccountInfo.js';

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
    <div className='app'>
      <header>
        <div className='app-title'><div className='app-title-text'>mist</div></div>
        {
          account != null &&
          <AccountInfo
            account={ account }
            onUpdateAccount={ x => setAccount(x) }
            mode={ mode }
          />
        }
      </header>
      <div className='horizontal-divider' />
      <main>
        {
          account == null
            ? <LoginForm
                account={ account }
                onUpdateAccount={ x => setAccount(x) }
                mode={ mode }
              />
            : <Timeline
                account={ account }
                mode={ mode }
              />
        }
      </main>
    </div>
  );
};

export default App;
