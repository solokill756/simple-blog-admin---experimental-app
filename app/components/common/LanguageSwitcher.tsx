// sunlint-disable-next-line S030
'use client';

import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { i18nConfig } from '@/app/lib/i18n-config';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const currentLocale = mounted ? pathname.split('/')[1] : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (newLocale: string) => {
    if (currentLocale === newLocale) {
      return;
    }

    const segments = pathname.split('/');
    if (i18nConfig.locales.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/');
    router.push(newPath);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-300 p-3">
      <strong className="font-semibold">{t('languageSwitcher.label')}</strong>
      {i18nConfig.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          disabled={currentLocale === locale}
          className={`
            ml-2 
            rounded-md 
            px-3 
            py-1
            text-sm
            transition-colors
       
            ${
              currentLocale === locale
                ? 'font-bold bg-gray-200 text-gray-900'
                : 'font-normal text-gray-700 hover:bg-gray-100'
            }
            disabled:opacity-50 
            disabled:cursor-not-allowed
          `}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
