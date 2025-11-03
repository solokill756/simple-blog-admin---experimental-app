import { getDictionary } from '@/app/lib/get-dictionary';
import { API_BASE_URL } from '@/app/lib/constants';
import RenderPostDetail from './PostDetail.client';

type Props = {
  params: Promise<{ locale: 'en' | 'vi'; postId: string }>;
};

export default async function RenderPostPage({ params }: Props) {
  const { postId, locale } = await params;
  const dict = await getDictionary(locale);
  const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
    next: { revalidate: 60 },
  });
  const post = await response.json();
  return (
    <RenderPostDetail postId={postId} locale={locale} dict={dict} post={post} />
  );
}
