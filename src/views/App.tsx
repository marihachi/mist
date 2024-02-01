import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { getCredential } from '../models/credential.js';
import { I18n } from '../models/i18n.js';
import { readLocale } from '../models/locale.js';
import { ThemeConfig, ThemeParams, readTheme, themePresets } from '../models/theme.js';
import Menu from './Menu.js';
import AccountInfo from './AccountInfo.js';
import LoginPage from './login-page/LoginPage.js';
import TimelinePage from './timeline-page/TimelinePage.js';
import NotificationPage from './notification-page/NotificationPage.js';
import SettingPage from './setting-page/SettingPage.js';

export function makeThemeStyle(config: ThemeConfig): string | undefined {
  let theme: ThemeParams;
  if (config.kind == 'preset') {
    const t = themePresets.find(x => x.id == config.id);
    if (t == null) return undefined;
    theme = t;
  } else {
    theme = config;
  }
  return [
    ':root {',
    `--bg-color: ${ theme.bg };`,
    `--fg-color: ${ theme.fg };`,
    `--main-color: ${ theme.main };`,
    `--accent-color: ${ theme.accent };`,
    '}',
  ].join(' ');
}

const App: FC = () => {
  const initialized = useRef<boolean>(false);
  const i18n = useRef<I18n>(new I18n('en'));

  const [mode, setMode] = useState<string>('production');
  const [account, setAccount] = useState<{ host: string, accessToken: string }>();
  const [pageSet, setPageSet] = useState<string[]>(['setting']);
  const [activePage, setActivePage] = useState<string>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeConfig>({ kind: 'preset', id: 'light' });

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
    if (initialized.current) return;
    initialized.current = true;

    // load locale
    const locale = readLocale() ?? 'en';
    if (locale != 'en') {
      i18n.current = new I18n(locale);
    }

    // load theme
    const theme = readTheme();
    if (theme != null) {
      setTheme(theme);
    }

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

    setIsReady(true);
  }, []);

  const pageTable = new Map([
    [
      'login',
      <LoginPage
        i18n={ i18n }
        onUpdateAccount={ x => updateHandler(x) }
        mode={ mode }
      />
    ],
    [
      'home-timeline',
      <TimelinePage
        key='home-timeline'
        i18n={ i18n }
        account={ account }
        timelineKind='home'
      />
    ],
    [
      'local-timeline',
      <TimelinePage
        key='local-timeline'
        i18n={ i18n }
        account={ account }
        timelineKind='local'
      />
    ],
    [
      'social-timeline',
      <TimelinePage
        key='social-timeline'
        i18n={ i18n }
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
    <>
      <style>{ makeThemeStyle(theme) }</style>
      {
        isReady &&
        <div className='app'>
          <header>
            <div className='app-title'><div className='app-title-text'>mist</div></div>
            <Menu
              i18n={ i18n }
              pageSet={ pageSet }
              activePage={ activePage }
              onChangeActivePage={ (page) => setActivePage(page) }
            />
            {
              account != null &&
              <AccountInfo
                i18n={ i18n }
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
      }
    </>
  );
};

export default App;
