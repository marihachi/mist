import React from 'react';
import type { FC } from 'react';

type Props = {
  pageSet: string[],
  activePage: string | undefined,
};

const buttonNameTable = new Map<string, string>([
  ['login', 'ログイン'],
  ['home-timeline', 'ホーム'],
  ['local-timeline', 'ローカル'],
  ['social-timeline', 'ソーシャル'],
  ['notification', '通知'],
  ['setting', '設定'],
]);

const Menu: FC<Props> = (props) => {
  return (
    <>
      <div className='menu'>
        {
          props.pageSet.map(page =>
            <div
              className={ props.activePage == page ? 'menu-button active' : 'menu-button' }
            >
              { buttonNameTable.get(page) ?? '' }
            </div>
          )
        }
      </div>
    </>
  );
};
export default Menu;
