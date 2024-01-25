import { getCredential } from './credential.js';
import { renderLogin } from './login-form.js';
import { renderPostForm, renderTimeline } from './timeline.js';

import './style.css';

const context = {
  host: undefined,
  accessToken: undefined,
  //development: 1,
};

// load credential
const credential = getCredential(context, 0);
if (credential != null) {
  context.host = credential.host;
  context.accessToken = credential.accessToken;
}

// update view
renderLogin(context);
renderPostForm(context);
renderTimeline(context);
