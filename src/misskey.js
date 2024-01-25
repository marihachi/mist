import { sleep } from './util.js';

export async function apiNoCredential(host, endpoint, args) {
  const response = await fetch(`https://${host}/api/${endpoint}`, {
    method: 'POST',
    headers: [
      ['Content-Type', 'application/json'],
    ],
    body: JSON.stringify({
      ...args,
    }),
  });
  return response.json();
}

export async function api(host, accessToken, endpoint, args) {
  const response = await fetch(`https://${host}/api/${endpoint}`, {
    method: 'POST',
    headers: [
      ['Content-Type', 'application/json'],
    ],
    body: JSON.stringify({
      i: accessToken,
      ...args,
    }),
  });
  return response.json();
}

export async function authorize(host, appName, permissions, cancellationToken) {
  cancellationToken = cancellationToken ?? { isCancel: false };

  // start miauth session
  const session = crypto.randomUUID();
  open(`https://${host}/miauth/${session}?name=${appName}&permission=${permissions}`);

  // wait finished
  let data;
  while (!cancellationToken.isCancel) {
    await sleep(2000);
    data = await apiNoCredential(host, `miauth/${session}/check`);
    if (data.ok) {
      break;
    }
  }

  return data;
}
