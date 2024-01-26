import React from 'react';
import type { FC } from 'react';
import LoginForm from './LoginForm.js';
import Timeline from './Timeline.js';
import PostForm from './PostForm.js';
import { getCredential } from './credential.js';
import './App.css';

const App: FC = () => {

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

  return (
    <div className="container">
      <LoginForm />
      <PostForm />
      <Timeline />
    </div>
  );
};

export default App;
