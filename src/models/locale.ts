const localeKey = 'MIST_LOCALE';

export function readLocale(): string | undefined {
  const data = localStorage.getItem(localeKey);
  return (data != null ? data : undefined);
}

export function writeLocale(locale: string) {
  localStorage.setItem(localeKey, locale);
}
