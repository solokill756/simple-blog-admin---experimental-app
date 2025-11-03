import Loading from '@/app/components/common/Loading';
import { POSTS_CONTENT } from '@/app/lib/constants';

export default function RenderPostsLoading() {
  return <Loading size="lg" overlay={false} />;
}
