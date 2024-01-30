type Lang = Map<string, string>;

const langs: Map<string, Lang> = new Map ();

export function i18n(lang: string): I18n {
  return new I18n(lang);
}

class I18n {
  lang: Lang | undefined;

  constructor(lang: string) {
    this.lang = langs.get(lang);
  }

  get(id: string): string {
    if (this.lang == null) {
      return id;
    }
    const word = this.lang.get(id);
    if (word == null) {
      return id;
    }
    return word;
  }
}

langs.set('en', new Map([
  ['login', 'Login'],
  ['do-login', 'Login'],
  ['do-logout', 'Logout'],
  ['home', 'Home'],
  ['local', 'Local'],
  ['social', 'Social'],
  ['notification', 'Notification'],
  ['setting', 'Setting'],
  ['do-note', 'Note'],
  ['server', 'Server'],
  ['hostname', 'Host name'],
  ['connect-misskey-server', 'Connect a misskey server'],
]));

langs.set('ja', new Map([
  ['login', 'ログイン'],
  ['do-login', 'ログイン'],
  ['do-logout', 'ログアウト'],
  ['home', 'ホーム'],
  ['local', 'ローカル'],
  ['social', 'ソーシャル'],
  ['notification', '通知'],
  ['setting', '設定'],
  ['do-note', 'ノート'],
  ['server', 'サーバー'],
  ['hostname', 'ホスト名'],
  ['connect-misskey-server', 'Misskeyサーバーへ接続'],
]));
