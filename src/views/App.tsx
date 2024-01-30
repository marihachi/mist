import './App.css';
import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { getCredential } from '../models/credential.js';
import Menu from './Menu.js';
import AccountInfo from './AccountInfo.js';
import LoginPage from './login-page/LoginPage.js';
import TimelinePage from './timeline-page/TimelinePage.js';
import NotificationPage from './notification-page/NotificationPage.js';
import SettingPage from './setting-page/SettingPage.js';

/*
  dark
  --bg-color: #222;
  --fg-color: #f8f8f8;
  --main-color: #2bb;
  --accent-color: #9c4;

  light
  --bg-color: #f8f8f8;
  --fg-color: #222;
  --main-color: #0bb;
  --accent-color: #fb1;

  legacy
  --bg-color: white;
  --fg-color: black;
  --main-color: green;
  --accent-color: magenta;
*/

const mode = 'production';

let initialized = false;

const App: FC = () => {
  const [account, setAccount] = useState<{ host: string, accessToken: string }>();
  const [pageSet, setPageSet] = useState<string[]>(['setting']);
  const [activePage, setActivePage] = useState<string>();

  function updateHandler(newAccount: any) {
    // update account
    setAccount(newAccount);

    // update page set
    let newPageSet;
    if (newAccount == null) {
      newPageSet = ['login', 'setting'];
    } else {
      newPageSet = ['home-timeline', 'local-timeline', 'social-timeline', 'notification', 'setting'];
    }
    setPageSet(newPageSet);

    // update current page
    setActivePage(newPageSet[0]);
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

  const pageTable = new Map([
    [
      'login',
      <LoginPage
        onUpdateAccount={ x => updateHandler(x) }
        mode={ mode }
      />
    ],
    [
      'home-timeline',
      <TimelinePage
        account={ account }
        timelineKind='home'
      />
    ],
    [
      'local-timeline',
      <TimelinePage
        account={ account }
        timelineKind='local'
      />
    ],
    [
      'social-timeline',
      <TimelinePage
        account={ account }
        timelineKind='social'
      />
    ],
    [
      'notification',
      <NotificationPage
        account={ account }
      />
    ],
    [
      'setting',
      <SettingPage />
    ],
  ]);

  return (
    <div className='app'>
      <header>
        <div className='app-title'><div className='app-title-text'>mist</div></div>
        <Menu
          pageSet={ pageSet }
          activePage={ activePage }
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
          activePage != null &&
          pageTable.get(activePage)
        }
      </main>
    </div>
  );
};

export default App;
