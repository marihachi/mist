import { sleep } from './util.js';

/**
 * overload:  
 * api(host, endpoint, accessToken, args): Promise<any>  
 * api(host, endpoint, args): Promise<any>  
*/
export async function api(...x) {
  let host, endpoint, accessToken, args;
  if (x.length == 4) {
    host = x[0];
    endpoint = x[1];
    accessToken = x[2];
    args = x[3];
  } else {
    host = x[0];
    endpoint = x[1];
    args = x[2];
  }
  const body = { ...args };
  if (accessToken != null) {
    body.i = accessToken;
  }
  const response = await fetch(`https://${host}/api/${endpoint}`, {
    method: 'POST',
    headers: [
      ['Content-Type', 'application/json'],
    ],
    body: JSON.stringify(body),
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
    data = await api(host, `miauth/${session}/check`, {});
    if (data.ok) {
      break;
    }
  }

  return data;
}
