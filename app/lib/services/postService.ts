import prisma from '../prisma';
import { cacheTag, revalidateTag, unstable_cache } from 'next/cache';
interface UpdatePostData {
  title?: string;
  body?: string;
  image?: string | null;
}

export const getAllPosts = async () => {
  'use cache';
  cacheTag('posts');
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
};

export const getPostById = async (id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return post;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    return null;
  }
};

export const deletePostById = async (id: string) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: { id },
    });
    revalidateTag('posts', 'max');
    return deletedPost;
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error);
    throw new Error('Failed to delete post');
  }
};
export const addPost = async (
  title: string,
  body: string,
  userId: string,
  image?: string
) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        body,
        userId,
        image,
      },
    });
    revalidateTag('posts', 'max');
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};

export const updatePost = async (id: string, updateData: UpdatePostData) => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: updateData,
    });
    revalidateTag('posts', 'max');
    return updatedPost;
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
    throw new Error('Failed to update post');
  }
};
