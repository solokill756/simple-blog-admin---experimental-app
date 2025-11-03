import { NextResponse, NextRequest } from 'next/server';
import {
  getPostByIdFromDatabase,
  getPostsFromDatabase,
} from '../../lib/data/mock-data';
import { CONTENT_TYPES, HTTP_STATUS } from '@/app/lib/constants';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const contentType = request.headers.get('content-type');
    if (
      !contentType ||
      contentType.includes(CONTENT_TYPES.JSON) ||
      contentType.includes(CONTENT_TYPES.PLAIN_TEXT)
    ) {
      return NextResponse.json(
        { error: 'Invalid Content-Type header' },
        { status: 400 }
      );
    }
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id');

    if (postId) {
      const post = await getPostByIdFromDatabase(postId);
      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: HTTP_STATUS.NOT_FOUND }
        );
      }
      return NextResponse.json(post);
    }

    const posts = await getPostsFromDatabase();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
}
