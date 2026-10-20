export const LOCALES = ['es', 'en', 'fr'] as const;
export type Locale = typeof LOCALES[number];
export const DEFAULT_LOCALE: Locale = 'es';

export function isValidLocale(lang: string | undefined): lang is Locale {
  return !!lang && LOCALES.includes(lang as Locale);
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  return isValidLocale(lang) ? lang : DEFAULT_LOCALE;
}

export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === DEFAULT_LOCALE ? clean : `/${locale}${clean}`;
}

export function getAlternateUrls(currentPath: string, currentLocale: Locale) {
  const base = currentLocale === DEFAULT_LOCALE
    ? currentPath
    : currentPath.replace(`/${currentLocale}`, '') || '/';

  return LOCALES.map((locale) => ({
    locale,
    url: localePath(base, locale),
    isCurrent: locale === currentLocale,
  }));
}

export function getHreflangTags(currentPath: string, currentLocale: Locale) {
  return getAlternateUrls(currentPath, currentLocale).map(({ locale, url }) => ({
    hreflang: locale,
    href: url,
  }));
}
