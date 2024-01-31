import React from 'react';
import type { FC } from 'react';
import PostForm from './PostForm.js';
import Timeline from './Timeline.js';
import type { I18n } from '../../models/i18n.js';

type Props = {
  i18n: I18n,
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
        i18n={ props.i18n }
        account={ props.account }
        timelineKind={ props.timelineKind }
      />
    </>
  );
};
export default TimelinePage;
