const LocaleKey = 'MIST_LOCALE';

export function readLocale(): string | undefined {
  const data = localStorage.getItem(LocaleKey);
  return data;
}

export function writeLocale(locale: string) {
  localStorage.setItem(LocaleKey, data);
}
