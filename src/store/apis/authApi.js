// Frontend/src/store/apis/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




const baseQuery = fetchBaseQuery({
  baseUrl: process.env.CLIENT_URL + '/api/auth',
  credentials: 'include',
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, result = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
  failedQueue = [];
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const is401 = result?.error?.status === 401;
  const isRefreshCall = typeof args === 'object' && args?.url?.includes('/refresh-token');

  if (is401 && !isRefreshCall) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: async () => {
            const retried = await baseQuery(args, api, extraOptions);
            resolve(retried);
          },
          reject: (err) => reject(err),
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshResult = await baseQuery(
        { url: '/refresh-token', method: 'POST' },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        processQueue(null);
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Ako refresh nije uspeo (npr. cookie ne postoji), radimo logout
        processQueue(new Error('Refresh token failed'));
        await baseQuery({ url: '/logout', method: 'POST' }, api, extraOptions);
        api.dispatch({ type: 'auth/logout' });
      }
    } catch (err) {
      processQueue(err);
      api.dispatch({ type: 'auth/logout' });
    } finally {
      isRefreshing = false;
    }
  }

  return result;
};



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),

    googleLogin: builder.mutation({
      query: (data) => ({
        url: '/google-login',
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/refresh-token',
        method: 'POST',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: '/check-token',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetCurrentUserQuery
} = authApi;