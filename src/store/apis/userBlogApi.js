import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const userBlogApi = createApi({
  reducerPath: 'userBlog',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_DB_LINK + '/api',
    credentials: 'include',
  }),

  endpoints(builder) {
    return {
      fetchUserBlogs: builder.query({
        query: () => '/userBlog',
        keepUnusedDataFor: 180,
        providesTags: ['UserBlog'],
        transformResponse: (response) =>
          [...response].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      }),
      addUserBlog: builder.mutation({
        query: (blog) => ({
          url: '/userBlog',
          method: 'POST',
          body: blog,
        }),
        invalidatesTags: ['UserBlog'],
      }),
      updateUserBlog: builder.mutation({
        query: ({ id, ...blog }) => ({
          url: `/userBlog/${id}`,
          method: 'PUT',
          body: blog,
        }),
        invalidatesTags: ['UserBlog'],
      }),
      removeUserBlog: builder.mutation({
        query: (blog) => ({
          url: `/userBlog/${blog._id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['UserBlog'],
      }),
    };
  },
});

export const {
  useFetchUserBlogsQuery,
  useAddUserBlogMutation,
  useUpdateUserBlogMutation,
  useRemoveUserBlogMutation,
} = userBlogApi;

export { userBlogApi };
