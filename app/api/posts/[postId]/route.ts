import {
  deletePostFromDatabase,
  getPostByIdFromDatabase,
} from '@/app/lib/data/mock-data';
import { NextResponse, NextRequest } from 'next/server';
import { HTTP_STATUS } from '@/app/lib/constants';

function validateContentType(request: NextRequest): boolean {
  const contentType = request.headers.get('content-type');
  return (
    !contentType ||
    contentType.includes('application/json') ||
    contentType.includes('text/plain')
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
): Promise<NextResponse> {
  try {
    if (!validateContentType(request)) {
      return NextResponse.json(
        { error: 'Invalid Content-Type header' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const { postId } = await params;

    const post = await getPostByIdFromDatabase(postId);
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
): Promise<NextResponse> {
  try {
    if (!validateContentType(request)) {
      return NextResponse.json(
        { error: 'Invalid Content-Type header' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const { postId } = await params;

    const post = await getPostByIdFromDatabase(postId);
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }
    await deletePostFromDatabase(postId);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
}
