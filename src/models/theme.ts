export type ThemeConfig = {
  kind: 'preset',
  id: string,
} | {
  kind: 'custom'
} & ThemeParams;

export type ThemePreset = {
  id: string,
  name: string,
} & ThemeParams;

export type ThemeParams = {
  bg: string,
  fg: string,
  main: string,
  accent: string,
};

export const themePresets: ThemePreset[] = [
  { id: 'light', name: 'Light', bg: '#f8f8f8', fg: '#222', main: '#0bb', accent: '#fb1' },
  { id: 'dark', name: 'Dark', bg: '#222', fg: '#f8f8f8', main: '#2bb', accent: '#9c4' },
  { id: 'legacy', name: 'Legacy', bg: 'white', fg: 'black', main: 'green', accent: 'magenta' },
];

const themeKey = 'MIST_THEME';

export function readTheme(): ThemeConfig | undefined {
  const data = localStorage.getItem(themeKey);
  if (data != null) {
    let result;
    try {
      result = JSON.parse(data);
    } catch {
      console.error('Failed to read theme');
      return;
    }
    return result;
  }
}

export function writeTheme(theme: ThemeConfig) {
  const json = JSON.stringify(theme);
  localStorage.setItem(themeKey, json);
}
