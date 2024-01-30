import React from 'react';
import type { FC } from 'react';
import PostForm from './PostForm.js';
import Timeline from './Timeline.js';

type Props = {
  account: { host: string, accessToken: string } | undefined,
  timelineKind: string,
};

const TimelinePage: FC<Props> = (props) => {
  return (
    <>
      <PostForm
        account={ props.account }
      />
      <Timeline
        account={ props.account }
        timelineKind={ props.timelineKind }
      />
    </>
  );
};
export default TimelinePage;
