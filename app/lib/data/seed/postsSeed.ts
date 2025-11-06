import { PostModel } from '../models/postModel';

export const postsSeed: Array<PostModel> = [
  {
    id: '1',
    title: 'First Post',
    userId: '1',
    body: 'This is the body of the first post.',
    image: '/images/1.jpg',
  },
  {
    id: '2',
    title: 'Second Post',
    userId: '2',
    body: 'This is the body of the second post.',
    image: '/images/2.jpg',
  },
  {
    id: '3',
    title: 'Third Post',
    userId: '3',
    body: 'This is the body of the third post.',
    image: '/images/3.jpg',
  },
];
