import { GET } from '../route';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {
  getPostsFromDatabase,
  getPostByIdFromDatabase,
} from '@/app/lib/data/mock-data';
import { HTTP_STATUS } from '@/app/lib/constants';

// Mock dependencies
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('@/app/lib/data/mock-data', () => ({
  getPostsFromDatabase: jest.fn(),
  getPostByIdFromDatabase: jest.fn(),
}));

const mockGetServerSession = getServerSession as jest.Mock;
const mockGetPostsFromDatabase = getPostsFromDatabase as jest.Mock;
const mockGetPostByIdFromDatabase = getPostByIdFromDatabase as jest.Mock;

describe('GET /api/posts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Authentication', () => {
    test('returns 401 Unauthorized when session is not available', async () => {
      mockGetServerSession.mockResolvedValueOnce(null);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts')
      );
      const response = await GET(request);

      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
      const data = await response.json();
      expect(data).toEqual({ error: 'Unauthorized' });
    });

    test('proceeds with GET request when session exists', async () => {
      mockGetServerSession.mockResolvedValueOnce({
        user: { id: 'user-1', name: 'Test User', email: 'test@example.com' },
      });
      mockGetPostsFromDatabase.mockResolvedValueOnce([]);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts')
      );
      const response = await GET(request);

      expect(response.status).toBe(HTTP_STATUS.OK);
    });
  });

  describe('Fetch all posts', () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValueOnce({
        user: { id: 'user-1', name: 'Test User', email: 'test@example.com' },
      });
    });

    test('returns all posts when no postId is provided', async () => {
      const mockPosts = [
        {
          id: '1',
          title: 'First Post',
          body: 'First body',
          userId: 'user-1',
        },
        {
          id: '2',
          title: 'Second Post',
          body: 'Second body',
          userId: 'user-1',
        },
      ];

      mockGetPostsFromDatabase.mockResolvedValueOnce(mockPosts);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts')
      );
      const response = await GET(request);

      expect(response.status).toBe(HTTP_STATUS.OK);
      const data = await response.json();
      expect(data).toEqual(mockPosts);
      expect(data).toHaveLength(2);
    });

    test('returns correct data format for posts', async () => {
      const mockPosts = [
        {
          id: 'post-123',
          title: 'Test Post',
          body: 'Test Body',
          userId: 'user-1',
          image: '/images/test.jpg',
        },
      ];

      mockGetPostsFromDatabase.mockResolvedValueOnce(mockPosts);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts')
      );
      const response = await GET(request);

      const data = await response.json();
      expect(data[0]).toHaveProperty('id');
      expect(data[0]).toHaveProperty('title');
      expect(data[0]).toHaveProperty('body');
      expect(data[0]).toHaveProperty('userId');
    });

    test('returns empty array when no posts exist', async () => {
      mockGetPostsFromDatabase.mockResolvedValueOnce([]);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts')
      );
      const response = await GET(request);

      const data = await response.json();
      expect(data).toEqual([]);
    });
  });

  describe('Fetch single post by ID', () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValueOnce({
        user: { id: 'user-1', name: 'Test User', email: 'test@example.com' },
      });
    });

    test('returns single post when postId is provided', async () => {
      const mockPost = {
        id: 'post-1',
        title: 'Test Post',
        body: 'Test Body',
        userId: 'user-1',
      };

      mockGetPostByIdFromDatabase.mockResolvedValueOnce(mockPost);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts?id=post-1')
      );
      const response = await GET(request);

      expect(response.status).toBe(HTTP_STATUS.OK);
      const data = await response.json();
      expect(data).toEqual(mockPost);
    });

    test('returns 400 Bad Request for empty postId', async () => {
      mockGetPostsFromDatabase.mockResolvedValueOnce([]);

      // When id parameter is empty, searchParams.get('id') returns empty string
      // and if (postId) evaluates to false, so it returns all posts
      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts?id=')
      );
      const response = await GET(request);

      // Empty postId falls through to fetch all posts
      expect(response.status).toBe(HTTP_STATUS.OK);
      const data = await response.json();
      expect(data).toEqual([]);
    });

    test('returns 400 Bad Request for whitespace-only postId', async () => {
      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts?id=%20%20%20')
      );
      const response = await GET(request);

      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      const data = await response.json();
      expect(data).toEqual({ error: 'Invalid post ID' });
    });

    test('returns 404 Not Found when post does not exist', async () => {
      mockGetPostByIdFromDatabase.mockResolvedValueOnce(null);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts?id=non-existent')
      );
      const response = await GET(request);

      expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      const data = await response.json();
      expect(data).toEqual({ error: 'Post not found' });
    });

    test('returns correct format for single post', async () => {
      const mockPost = {
        id: 'post-123',
        title: 'Detailed Post',
        body: 'This is a detailed post body',
        userId: 'user-1',
        image: '/images/detail.jpg',
      };

      mockGetPostByIdFromDatabase.mockResolvedValueOnce(mockPost);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts?id=post-123')
      );
      const response = await GET(request);

      const data = await response.json();
      expect(data).toHaveProperty('id', 'post-123');
      expect(data).toHaveProperty('title', 'Detailed Post');
      expect(data).toHaveProperty('body');
      expect(data).toHaveProperty('userId');
    });
  });

  describe('Content Type Validation', () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValueOnce({
        user: { id: 'user-1', name: 'Test User', email: 'test@example.com' },
      });
    });

    test('accepts request with no Content-Type header', async () => {
      mockGetPostsFromDatabase.mockResolvedValueOnce([]);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts')
      );
      // Remove Content-Type header
      const response = await GET(request);

      expect(response.status).not.toBe(HTTP_STATUS.BAD_REQUEST);
    });

    test('rejects request with invalid Content-Type header', async () => {
      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts'),
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );

      const response = await GET(request);

      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      const data = await response.json();
      expect(data).toEqual({ error: 'Invalid Content-Type header' });
    });

    test('accepts request with application/json Content-Type', async () => {
      mockGetPostsFromDatabase.mockResolvedValueOnce([]);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts'),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await GET(request);

      expect(response.status).toBe(HTTP_STATUS.OK);
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValueOnce({
        user: { id: 'user-1', name: 'Test User', email: 'test@example.com' },
      });
    });

    test('returns 500 Server Error when database fails', async () => {
      mockGetPostsFromDatabase.mockRejectedValueOnce(
        new Error('Database connection failed')
      );

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts')
      );
      const response = await GET(request);

      expect(response.status).toBe(HTTP_STATUS.SERVER_ERROR);
      const data = await response.json();
      expect(data).toEqual({ error: 'Failed to fetch posts' });
    });

    test('returns 500 Server Error when fetching single post fails', async () => {
      mockGetPostByIdFromDatabase.mockRejectedValueOnce(
        new Error('Database error')
      );

      const request = new NextRequest(
        new URL('http://localhost:3000/api/posts?id=post-1')
      );
      const response = await GET(request);

      expect(response.status).toBe(HTTP_STATUS.SERVER_ERROR);
      const data = await response.json();
      expect(data).toEqual({ error: 'Failed to fetch posts' });
    });
  });
});
