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

    const pathSegments = pathname.split('/');
    const localeList = i18nConfig.locales;
    if (localeList.includes(pathSegments[1])) {
      pathSegments[1] = newLocale;
    } else {
      pathSegments.splice(1, 0, newLocale);
    }
    const newPath = pathSegments.join('/');
    router.push(newPath);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-300 p-3">
      <strong className="font-semibold">{t('languageSwitcher.label')}</strong>
      {i18nConfig.locales.map((locale, index) => {
        const itemId = `lang-${locale}-${String(index)}`;
        const isCurrentLocale = currentLocale === locale;
        return (
          <button
            key={itemId}
            onClick={() => handleChange(locale)}
            disabled={isCurrentLocale}
            className={`
              ml-2 
              rounded-md 
              px-3 
              py-1
              text-sm
              transition-colors
         
              ${
                isCurrentLocale
                  ? 'font-bold bg-gray-200 text-gray-900'
                  : 'font-normal text-gray-700 hover:bg-gray-100'
              }
              disabled:opacity-50 
              disabled:cursor-not-allowed
            `}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
