import { apiSlice } from '../apiSlice';
const URL_COMPTE = '/api/compte';

export const compteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompte: builder.query({
      query: () => ({
        url: URL_COMPTE,
      }),
      providesTags: ['Compte'],
      keepUnusedDataFor: 5,
    }),

    getCompteByClerk: builder.query({
      query: (clerkId) => ({
        url: URL_COMPTE + '/clerk/' + clerkId,
      }),
      providesTags: ['Compte'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetCompteByClerkQuery, useGetCompteQuery } = compteSlice;
