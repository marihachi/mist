import { loadAccessToken } from './credential.js';
import { renderLogin } from './login-form.js';
import { renderPost } from './timeline.js';

import './style.css';

const context = {
  currentHost: 'misskey.systems',
  accessToken: undefined,
};

context.accessToken = loadAccessToken(context.currentHost);

// update view
renderLogin(context);
renderPost(context);
