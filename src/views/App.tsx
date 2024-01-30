import './App.css';
import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { getCredential } from '../models/credential.js';
import Menu from './Menu.js';
import AccountInfo from './AccountInfo.js';
import LoginPage from './login-page/LoginPage.js';
import TimelinePage from './timeline-page/TimelinePage.js';
import SettingPage from './setting-page/SettingPage.js';

const mode = 'production';

let initialized = false;

const App: FC = () => {
  const [account, setAccount] = useState<{ host: string, accessToken: string }>();
  const [pageSet, setPageSet] = useState<string[]>(['setting']);
  const [pageName, setPageName] = useState<string>();

  function updateHandler(newAccount: any) {
    // update account
    setAccount(newAccount);

    // update page set
    let newPageSet;
    if (newAccount == null) {
      newPageSet = ['login', 'setting'];
    } else {
      newPageSet = ['timeline1', 'timeline2', 'timeline3', 'setting'];
    }
    setPageSet(newPageSet);

    // update current page
    setPageName(newPageSet[0]);
  }

  useEffect(() => {
    if (initialized) return;
    initialized = true;

    // load credential
    const credential = getCredential(mode, 0);
    if (credential != null) {
      const newAccount = {
        host: credential.host,
        accessToken: credential.accessToken,
      };
      updateHandler(newAccount);
    } else {
      updateHandler(undefined);
    }
  }, []);

  return (
    <div className='app'>
      <header>
        <div className='app-title'><div className='app-title-text'>mist</div></div>
        <Menu
          pageSet={ pageSet }
        />
        {
          account != null &&
          <AccountInfo
            account={ account }
            onUpdateAccount={ x => updateHandler(x) }
            mode={ mode }
          />
        }
      </header>
      <div className='horizontal-divider' />
      <main>
        {
          pageName == 'login' &&
          <LoginPage
            onUpdateAccount={ x => updateHandler(x) }
            mode={ mode }
          />
        }
        {
          pageName == 'timeline1' &&
          <TimelinePage
            account={ account }
            timelineKind='home'
          />
        }
        {
          pageName == 'timeline2' &&
          <TimelinePage
            account={ account }
            timelineKind='local'
          />
        }
        {
          pageName == 'timeline3' &&
          <TimelinePage
            account={ account }
            timelineKind='social'
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
