import React from 'react';
import type { FC } from 'react';

type Props = {
  pageSet: string[],
};

const Menu: FC<Props> = (props) => {
  return (
    <>
      <div className='menu'>
        {
          props.pageSet.indexOf('login') != -1 &&
          <div className='menu-button'>
            ログイン
          </div>
        }
        {
          props.pageSet.indexOf('timeline1') != -1 &&
          <div className='menu-button'>
            ホーム
          </div>
        }
        {
          props.pageSet.indexOf('timeline2') != -1 &&
          <div className='menu-button'>
            ローカル
          </div>
        }
        {
          props.pageSet.indexOf('timeline3') != -1 &&
          <div className='menu-button'>
            ソーシャル
          </div>
        }
        {
          props.pageSet.indexOf('setting') != -1 &&
          <div className='menu-button'>
            設定
          </div>
        }
      </div>
    </>
  );
};
export default Menu;
