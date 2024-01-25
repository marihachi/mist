import { getCredential } from './credential.js';
import { setupLogin } from './login-form.js';
import { setupTimeline } from './timeline.js';

import './style.css';

const context = {
  host: undefined,
  accessToken: undefined,
  //development: 1,
  timeline: {
    cancellationToken: undefined,
  }
};

// load credential
const credential = getCredential(context, 0);
if (credential != null) {
  context.host = credential.host;
  context.accessToken = credential.accessToken;
}

setupLogin(ctx);
setupTimeline(ctx);
