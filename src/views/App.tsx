import './App.css';
import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { getCredential } from '../models/credential.js';
import AccountInfo from './AccountInfo.js';
import LoginPage from './login-page/LoginPage.js';
import TimelinePage from './timeline-page/TimelinePage.js';
import SettingPage from './setting-page/SettingPage.js';

const mode = 'production';

let initialized = false;

const App: FC = () => {
  const [account, setAccount] = useState<{ host: string, accessToken: string }>();
  const [pageName, setPageName] = useState<string>();

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
          />
        }
      </header>
      <div className='horizontal-divider' />
      <main>
        {
          pageName == 'login' &&
          <LoginPage
            onUpdateAccount={ x => setAccount(x) }
            mode={ mode }
          />
        }
        {
          pageName == 'timeline' &&
          <TimelinePage
            account={ account }
          />
        }
        {
          pageName == 'setting' &&
          <SettingPage />
        }
      </main>
    </div>
  );
};

export default App;
