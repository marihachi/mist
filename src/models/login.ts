import { addCredential } from './credential.js';
import { authorize } from './misskey.js';
import type { I18n } from './i18n.js';

export async function tryLogin(mode: string, host: string, cancellationToken: { isCancel: boolean }, i18n: I18n) {
  host = host.replace(/^https?:\/\//, '').replace(/\/$/, '')

  // start cancellation timer (5 minutes)
  const timer = setTimeout(() => {
    cancellationToken.isCancel = true;
  }, 5 * 60 * 1000);

  // start authorize
  const data = await authorize(host, 'Mist', 'write:notes,read:account', cancellationToken);

  // stop cancellation timer
  clearTimeout(timer);

  if (cancellationToken.isCancel) {
    return { ok: false as const, message: i18n.get('operation-was-canceled') };
  }

  if (data.ok) {
    const account = {
      host: host,
      accessToken: data.token as string,
    };

    // save credential
    addCredential(mode, account);

    return { ok: true as const, account: account };
  } else {
    return { ok: false as const, message: i18n.get('login-timeout-message') };
  }
}
