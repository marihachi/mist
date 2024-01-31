type Lang = Map<string, string>;

const langs: Map<string, Lang> = new Map ();

export class I18n {
  lang: Lang | undefined;

  constructor(lang: string) {
    this.lang = langs.get(lang);
  }

  get(id: string, params?: string[]): string {
    if (this.lang == null) {
      return id;
    }
    let word = this.lang.get(id);
    if (word == null) {
      return id;
    }
    if (params != null) {
      for (let i = 0; i < params.length; i++) {
        word = word.replace(`{${i}}`, params[i]);
      }
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
  ['operation-was-canceled', 'The operation was canceled.'],
  ['was-renote-message', '{0} was renote'],
  ['please-input-hostname', 'Please input a host name.'],
  ['do-cancel', 'Cancel'],
  ['login-timeout-message', 'The login process timed out. Please retry the login.'],
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
  ['operation-was-canceled', '操作はキャンセルされました。'],
  ['was-renote-message', '{0}がリノート'],
  ['please-input-hostname', 'ホスト名を入力してください。'],
  ['do-cancel', 'キャンセル'],
  ['login-timeout-message', 'ログイン処理がタイムアウトしました。ログインを再試行してください。'],
]));
