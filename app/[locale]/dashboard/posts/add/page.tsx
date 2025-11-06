import { getDictionary } from '@/app/lib/get-dictionary';
import PostForm from '../PostForm';

type Props = {
  params: Promise<{ locale: 'en' | 'vi' }>;
};

export default async function AddPostPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <PostForm
      postId={undefined}
      postCard={undefined}
      dict={dict}
      locale={locale}
    />
  );
}
