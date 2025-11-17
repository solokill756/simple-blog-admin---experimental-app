import { PostModel } from '@/app/lib/data/models/postModel';
import { baseApi } from '../baseApi';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostModel[], void>({
      query: () => '/posts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),

    getPostById: builder.query<PostModel, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),

    addPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),

      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),

    putPost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: updatedPost,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Posts', id },
        { type: 'Posts', id: 'LIST' },
      ],
    }),

    // 5. Xóa
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostByIdQuery,
  usePutPostMutation,
  useDeletePostMutation,
} = postsApi;
