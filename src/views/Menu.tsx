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
          props.pageSet.indexOf('login') != -1 &&
          <div className='page-button-login'>
            ログイン
          </div>
        }
        {
          props.pageSet.indexOf('timeline1') != -1 &&
          <div className='page-button-htl'>
            ホーム
          </div>
        }
        {
          props.pageSet.indexOf('timeline2') != -1 &&
          <div className='page-button-ltl'>
            ローカル
          </div>
        }
        {
          props.pageSet.indexOf('timeline3') != -1 &&
          <div className='page-button-stl'>
            ソーシャル
          </div>
        }
        {
          props.pageSet.indexOf('setting') != -1 &&
          <div className='page-button-setting'>
            設定
          </div>
        }
      </div>
    </>
  );
};
export default Menu;
