import { getDictionary } from '@/app/lib/get-dictionary';
import RenderPostsList from './PostList';
import { getPostsFromDatabase } from '@/app/lib/data/mock-data';
import { PostModel } from '@/app/lib/data/models/postModel';

type Props = {
  params: Promise<{ locale: 'en' | 'vi' }>;
};

export default async function RenderPostsPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const posts: PostModel[] = await getPostsFromDatabase();
  return <RenderPostsList dict={dict} locale={locale} posts={posts} />;
}
