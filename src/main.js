import { loadAccessToken } from './credential.js';
import { renderLogin, setupLogin } from './login-form.js';
import { renderPost, setupPost } from './timeline.js';

import './style.css';

const context = {
  currentHost: 'misskey.systems',
  accessToken: undefined,
};

context.accessToken = loadAccessToken(context.currentHost);

renderLogin(context);
renderPost(context);

setupLogin(context);
setupPost(context);
