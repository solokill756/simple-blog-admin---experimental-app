import Loading from '@/app/components/common/Loading';
import { POST_DETAIL_CONTENT } from '@/app/lib/constants';
export default function RenderPostLoading() {
  return <Loading size="lg" overlay={false} />;
}
