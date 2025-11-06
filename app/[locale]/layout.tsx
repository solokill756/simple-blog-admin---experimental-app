import { ToastProviders } from '../components/providers/ToastProvider';
import '../globals.css';
import { getDictionary } from '../lib/get-dictionary';
import { getSupportedLocales } from '../lib/i18n-config';
import CreateI18nProvider from './i18n-provider';
import LanguageSwitcher from '@/app/components/common/LanguageSwitcher';

export async function generateStaticParams() {
  const locales = getSupportedLocales();
  return locales.map((locale) => ({ locale }));
}

export default async function RenderLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'vi');

  return (
    <html lang={locale}>
      <body>
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <LanguageSwitcher />
          </div>
        </header>
        <main>
          <CreateI18nProvider locale={locale} dictionary={dictionary}>
            <ToastProviders>{children}</ToastProviders>
          </CreateI18nProvider>
        </main>
      </body>
    </html>
  );
}
