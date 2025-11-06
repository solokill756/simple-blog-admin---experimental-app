import Link from 'next/link';
import { getDictionary } from '../lib/get-dictionary';

type Props = {
  params: Promise<{ locale: 'en' | 'vi' }>;
};

export default async function RenderHomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {dict.homepage.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {dict.homepage.greeting}
        </p>
        <Link
          href={`/${locale}/dashboard/posts`}
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          {dict.homepage.viewPosts}
        </Link>
      </div>
    </div>
  );
}
