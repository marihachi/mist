import React from 'react';
import type { FC, MutableRefObject } from 'react';
import type { I18n } from '../models/i18n.js';

type Props = {
  i18n: MutableRefObject<I18n>,
  pageSet: string[],
  activePage: string | undefined,
  onChangeActivePage: (page: string) => void,
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
              onClick={ () => props.onChangeActivePage(page) }
            >
              { props.i18n.current.get(buttonNameTable.get(page) ?? '') }
            </div>
          )
        }
      </div>
    </>
  );
};
export default Menu;
