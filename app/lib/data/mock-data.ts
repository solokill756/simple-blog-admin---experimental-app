import { PostModel } from './models/postModel';

// Giả lập một lệnh gọi database (async)
export async function getPostsFromDatabase() {
  const posts: Array<PostModel> = [
    {
      id: '1',
      title: 'First Post',
      userId: '1',
      body: 'This is the body of the first post.',
    },
    {
      id: '2',
      title: 'Second Post',
      userId: '2',
      body: 'This is the body of the second post.',
    },
    {
      id: '3',
      title: 'Third Post',
      userId: '3',
      body: 'This is the body of the third post.',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(posts);
    }, 500);
  });
}

export async function getPostByIdFromDatabase(postId: string) {
  const posts = (await getPostsFromDatabase()) as Array<{
    id: string;
    title: string;
    userId: string;
    body: string;
  }>;
  return posts.find((post) => post.id === postId) || null;
}

export async function deletePostFromDatabase(postId: string) {
  // Simulate a database delete operation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}
