import React from 'react';
import type { FC } from 'react';

type Props = {
  pageSet: string[],
};

const Menu: FC<Props> = (props) => {
  return (
    <>
      <div>
        {
          pageSet.indexOf('login') != -1 &&
          <div className='page-button-login'></div>
        }
        {
          pageSet.indexOf('timeline1') != -1 &&
          <div className='page-button-htl'></div>
        }
        {
          pageSet.indexOf('timeline2') != -1 &&
          <div className='page-button-ltl'></div>
        }
        {
          pageSet.indexOf('timeline3') != -1 &&
          <div className='page-button-stl'></div>
        }
        {
          pageSet.indexOf('setting') != -1 &&
          <div className='page-button-setting'></div>
        }
      </div>
    </>
  );
};
export default Menu;
