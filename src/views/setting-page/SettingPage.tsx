import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { readLocale, writeLocale } from '../../models/locale.js';
import { readTheme, themePresets, writeTheme } from '../../models/theme.js';

type Props = {

};

const SettingPage: FC<Props> = (props) => {
  const [locale, setLocale] = useState<string>('en');
  const [themeSelect, setThemeSelect] = useState<string>('light');

  useEffect(() => {
    // load locale
    const localeSetting = readLocale();
    if (localeSetting != null) {
      setLocale(localeSetting);
    }

    // load theme
    const themeConfig = readTheme();
    if (themeConfig != null) {
      if (themeConfig.kind == 'preset') {
        setThemeSelect(themeConfig.id);
      } else {
        setThemeSelect('custom');
      }
    }
  }, []);

  const onClickSave = () => {
    writeLocale(locale);

    if (themeSelect != 'custom') {
      writeTheme({ kind: 'preset', id: themeSelect });
    }

    setTimeout(() => {
      alert('Please refresh page');
    }, 1);
  };

  return (
    <>
      <div>
        <label htmlFor="locale-select">Locale:</label>
        <select name="locale" id="locale-select" value={ locale } onChange={ e => setLocale(e.target.value) }>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>
      <div>
        <label htmlFor="theme-select">Theme:</label>
        <select name="theme" id="theme-select" value={ themeSelect } onChange={ e => setThemeSelect(e.target.value) }>
          {
            themePresets.map(preset =>
              <option key={ preset.id } value={ preset.id }>{ preset.name }</option>
            )
          }
          <option value="custom" disabled>Custom</option>
        </select>
      </div>
      <div>
        <button onClick={ onClickSave }>Save</button>
      </div>
    </>
  );
};
export default SettingPage;
