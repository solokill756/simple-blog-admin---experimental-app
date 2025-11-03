import { getDictionary } from '@/app/lib/get-dictionary';
import { API_BASE_URL } from '@/app/lib/constants';
import RenderPostsList from './PostList';

type Props = {
  params: Promise<{ locale: 'en' | 'vi' }>;
};

export default async function RenderPostsPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const response = await fetch(`${API_BASE_URL}/api/posts`, {
    next: { revalidate: 60 },
  });
  const posts = await response.json();
  return <RenderPostsList dict={dict} locale={locale} posts={posts} />;
}
