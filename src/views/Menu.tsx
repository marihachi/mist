import React from 'react';
import type { FC } from 'react';
import type { I18n } from '../models/i18n.js';

type Props = {
  i18n: I18n,
  pageSet: string[],
  activePage: string | undefined,
};

// ページ名とi18nキー
const buttonNameTable = new Map<string, string>([
  ['login', 'login'],
  ['home-timeline', 'home'],
  ['local-timeline', 'local'],
  ['social-timeline', 'social'],
  ['notification', 'notification'],
  ['setting', 'setting'],
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
              { props.i18n.get(buttonNameTable.get(page) ?? '') }
            </div>
          )
        }
      </div>
    </>
  );
};
export default Menu;
